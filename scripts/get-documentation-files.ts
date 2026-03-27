import { Octokit } from "octokit"
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"
import {
  buildBreadcrumb,
  buildPageUrl,
  chunkMarkdownByHeadings,
  makeId,
  markdownToPlainText,
  pathHasIgnoredFolder,
  removeFrontmatter,
  sanitizeForSearch,
  SearchDocument,
  slugifyAnchor,
} from "@/lib/search-utils"

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

// -------------------- Recursive Fetch --------------------
async function walkRepo(
  octokit: Octokit,
  include: { name: string; slug: string },
  repoPath: string,
  ignoredFiles: string[],
  ignoredFolders: string[]
): Promise<SearchDocument[]> {
  const docs: SearchDocument[] = []

  const res = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: OWNER,
      repo: REPO,
      path: repoPath,
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
    }
  )

  if (!Array.isArray(res.data)) return docs

  for (const item of res.data) {
    if (item.type === "dir") {
      if (ignoredFolders.includes(item.name)) continue
      docs.push(
        ...(await walkRepo(
          octokit,
          include,
          item.path,
          ignoredFiles,
          ignoredFolders
        ))
      )
      continue
    }

    if (
      item.type === "file" &&
      item.name.toLowerCase().endsWith(".md") &&
      !ignoredFiles.includes(item.name) &&
      !pathHasIgnoredFolder(item.path, ignoredFolders)
    ) {
      const fileRes = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: OWNER,
          repo: REPO,
          path: item.path,
          headers: { "X-GitHub-Api-Version": "2022-11-28" },
        }
      )

      if (Array.isArray(fileRes.data) || !("content" in fileRes.data)) continue

      const raw = Buffer.from(fileRes.data.content, "base64").toString("utf-8")
      const markdown = removeFrontmatter(raw)
      const chunks = chunkMarkdownByHeadings(markdown)
      const pageUrl = buildPageUrl(include.slug, item.path, BASE_URL)

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

        docs.push({
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
    }
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
  const allDocs: SearchDocument[] = []

  for (const include of config.include) {
    const docs = await walkRepo(
      octokit,
      include,
      include.slug,
      config.ignore.files,
      config.ignore.folders
    )
    allDocs.push(...docs)
  }

  return allDocs
}
