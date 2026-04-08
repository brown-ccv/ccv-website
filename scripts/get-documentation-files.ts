import { Octokit } from "@octokit/rest"
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"
import type { SearchDocument } from "@/lib/search-utils"
import {
  buildBreadcrumb,
  buildPageUrl,
  chunkMarkdownByHeadings,
  makeId,
  markdownToPlainText,
  pathHasIgnoredFolder,
  removeFrontmatter,
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

    const batchResults = await Promise.all(
      batch.map(async (item) => {
        if (!item.sha || !item.path) return []

        const blobRes = await octokit.request(
          "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
          {
            owner: OWNER,
            repo: REPO,
            file_sha: item.sha,
            headers: { "X-GitHub-Api-Version": "2022-11-28" },
          }
        )

        if (!("content" in blobRes.data)) return []

        const raw = Buffer.from(blobRes.data.content, "base64").toString(
          "utf-8"
        )
        const markdown = removeFrontmatter(raw)
        const chunks = chunkMarkdownByHeadings(markdown)
        const pageUrl = buildPageUrl(include.slug, item.path, BASE_URL)

        const fileDocs: SearchDocument[] = []

        for (let i = 0; i < chunks.length; i++) {
          const section = sanitizeForSearch(chunks[i].section)
          if (!section || section.toLowerCase() === "untitled") continue

          const plain = await markdownToPlainText(chunks[i].content)
          if (!plain || plain.length < 40) continue

          const anchor = slugifyAnchor(section)
          const url = anchor ? `${pageUrl}#${anchor}` : pageUrl
          const { breadcrumb, pathSegments } = buildBreadcrumb(
            include.name,
            pageUrl,
            section,
            BASE_URL
          )

          fileDocs.push({
            id: `${makeId(url)}-${i}`,
            title: sanitizeForSearch(include.name),
            content: plain,
            description: section,
            headings: [section],
            url,
            type: "documentation",
            category: include.slug,
            breadcrumb,
            pathSegments,
            section,
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
  const octokit = new Octokit({ auth: token })

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
