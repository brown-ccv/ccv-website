import { Octokit } from "@octokit/rest"
import { throttling } from "@octokit/plugin-throttling"
import { retry } from "@octokit/plugin-retry"
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"
import type { SearchDocument } from "@/lib/search-utils"
import {
  buildBreadcrumb,
  buildPageUrl,
  chunkMarkdownByHeadings,
  makeId,
  markdownToPlainText,
  parseFrontmatter,
  pathHasIgnoredFolder,
  sanitizeForSearch,
} from "@/lib/search-utils"
import { slugifyAnchor } from "@/lib/utils"
import path from "path"

interface DocConfig {
  ignore: { files: string[]; folders: string[] }
  include: { name: string; slug: string }[]
}

const OWNER = "brown-ccv"
const REPO = "ccv-documentation"
const BASE_URL = "https://docs.ccv.brown.edu"

// -------------------- Secret --------------------
async function getSecret(): Promise<string> {
  const client = new SecretManagerServiceClient()
  const [secret] = await client.accessSecretVersion({
    name: "projects/ccv-website-next/secrets/myGithubToken/versions/latest",
  })

  if (!secret.payload?.data) throw new Error("Secret payload missing or empty.")
  return secret.payload.data.toString()
}

// -------------------- Octokit with Plugins --------------------
const MyOctokit = Octokit.plugin(throttling, retry)

// -------------------- Config Fetch --------------------
async function getDocConfig(octokit: Octokit): Promise<DocConfig> {
  const res = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: OWNER,
      repo: REPO,
      path: "searchConfig.json",
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
    }
  )

  const data = res.data
  if (Array.isArray(data) || !("content" in data)) {
    throw new Error("Unexpected config response")
  }

  return JSON.parse(
    Buffer.from(data.content, "base64").toString("utf-8")
  ) as DocConfig
}

// -------------------- GraphQL (Batch) --------------------
async function fetchBlobsGraphQL(
  octokit: Octokit,
  paths: string[]
): Promise<Record<string, string>> {
  // Build query with aliases
  const exprVars = paths.map((_, i) => `$expression${i}: String!`).join(", ")
  const fields = paths
    .map(
      (_, i) => `
      f${i}: object(expression: $expression${i}) {
        ... on Blob {
          text
        }
      }`
    )
    .join("\n")

  const query = `
    query($owner: String!, $repo: String!, ${exprVars}) {
      repository(owner: $owner, name: $repo) {
        ${fields}
      }
    }
  `

  const variables: Record<string, string> = {
    owner: OWNER,
    repo: REPO,
  }

  paths.forEach((p, i) => {
    variables[`expression${i}`] = `HEAD:${p}`
  })

  const result: {
    repository: {
      [key: string]: { text?: string }
    }
  } = await octokit.graphql(query, variables)

  const out: Record<string, string> = {}
  const repo = result.repository

  paths.forEach((p, i) => {
    const text = repo?.[`f${i}`]?.text
    if (typeof text === "string") out[p] = text
  })

  return out
}

// -------------------- Tree-based Fetch (Batch Processing) --------------------
export async function walkRepo(
  octokit: Octokit,
  include: { name: string; slug: string },
  ignoredFiles: string[],
  ignoredFolders: string[],
  tree: { path?: string; type?: string; sha?: string }[]
): Promise<SearchDocument[]> {
  const docs: SearchDocument[] = []

  if (!Array.isArray(tree)) return docs

  // 2) Filter markdown blobs
  const mdFiles = tree.filter((item) => {
    if (item.type !== "blob") return false
    if (!item.path?.toLowerCase().endsWith(".md")) return false
    if (!item.path.startsWith(`${include.slug}/`)) return false
    if (ignoredFiles.includes(path.basename(item.path))) return false
    return !pathHasIgnoredFolder(item.path, ignoredFolders)
  })

  const batchSize = 10 // adjust concurrency level
  for (let i = 0; i < mdFiles.length; i += batchSize) {
    const batch = mdFiles.slice(i, i + batchSize)
    const paths = batch.map((b) => b.path!).filter(Boolean)

    const blobMap = await fetchBlobsGraphQL(octokit, paths)
    const batchResults = await Promise.all(
      batch.map(async (item) => {
        const raw = blobMap[item.path!]
        if (!raw) return []
        if (!item.sha || !item.path) return []

        const { data, content } = parseFrontmatter(raw)
        if (data.hidden === "true" || data.hidden === true) return []
        const chunks = chunkMarkdownByHeadings(content)
        const pageUrl = buildPageUrl(include.slug, item.path, BASE_URL)

        const fileDocs: SearchDocument[] = []

        for (let j = 0; j < chunks.length; j++) {
          const section = sanitizeForSearch(chunks[i].section)
          if (!section || section.toLowerCase() === "untitled") continue

          const plain = await markdownToPlainText(chunks[i].content)
          if (!plain || plain.length < 40) continue

          const anchor = slugifyAnchor(section)
          const url = anchor ? `${pageUrl}#${anchor}` : pageUrl
          const breadcrumb = buildBreadcrumb(
            include.name,
            pageUrl,
            section,
            BASE_URL
          )

          fileDocs.push({
            id: `${makeId(url)}-${i}`,
            title: sanitizeForSearch(include.name),
            content: plain,
            url,
            type: "documentation",
            category: include.slug,
            breadcrumb,
          })
        }

        return fileDocs
      })
    )

    docs.push(...batchResults.flat())
  }

  return docs
}

// -------------------- Main Export --------------------
export async function getDocumentationSearchDocuments(): Promise<
  SearchDocument[]
> {
  const token = await getSecret()
  const octokit = new MyOctokit({
    auth: token,
    throttle: {
      onRateLimit: (
        retryAfter: number,
        options: { request: { retryCount: number } }
      ) => {
        if (options.request.retryCount < 3) {
          console.warn(`Rate limit hit, retrying after ${retryAfter}s`)
          return true
        }
      },
      onSecondaryRateLimit: (
        retryAfter: number,
        options: { request: { retryCount: number } }
      ) => {
        if (options.request.retryCount < 3) {
          console.warn(`Secondary rate limit, retrying after ${retryAfter}s`)
          return true
        }
      },
    },
  })

  const config = await getDocConfig(octokit)

  // fetch tree once
  const treeRes = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      owner: OWNER,
      repo: REPO,
      tree_sha: "HEAD",
      recursive: "true",
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
    }
  )

  const tree = treeRes.data.tree
  if (!Array.isArray(tree)) return []

  const allDocs = await Promise.all(
    config.include.map((include) =>
      walkRepo(
        octokit,
        include,
        config.ignore.files,
        config.ignore.folders,
        tree
      )
    )
  )

  return allDocs.flat()
}
