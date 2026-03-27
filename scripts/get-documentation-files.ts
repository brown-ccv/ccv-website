import { Octokit } from "octokit"
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"
import { remark } from "remark"
import strip from "strip-markdown"

export interface SearchDocument {
  id: string
  title: string
  content: string
  description: string
  headings: string[]
  url: string
  type: string
  category: string
}

interface DocConfig {
  ignore: {
    files: string[]
    folders: string[]
  }
  include: {
    name: string
    slug: string
  }[]
}

interface IncludeItem {
  name: string
  slug: string
}

interface DocumentationPageRaw {
  includeName: string // config include.name
  includeSlug: string // config include.slug (base category)
  repoFilePath: string // e.g. hibernate/getting-started-with-hibernate/login-procedure.md
  url: string // final docs url
  markdown: string // markdown with frontmatter removed
}

const OWNER = "brown-ccv"
const REPO = "ccv-documentation"
const BASE_URL = "https://docs.ccv.brown.edu"

async function getSecret() {
  const client = new SecretManagerServiceClient()
  const [secret] = await client.accessSecretVersion({
    name: "projects/ccv-website-next/secrets/myGithubToken/versions/latest",
  })

  if (!secret.payload?.data) {
    throw new Error("Secret payload missing or empty.")
  }

  return secret.payload.data.toString()
}

function removeFrontmatter(markdown: string): string {
  return markdown.replace(/^---[\s\S]*?---\n?/, "")
}

function extractHeadingsFromMarkdown(markdown: string): string[] {
  const headings: string[] = []
  const seen = new Set<string>()
  const re = /^#{1,6}\s+(.+)$/gm
  let match: RegExpExecArray | null

  while ((match = re.exec(markdown)) !== null) {
    const h = match[1].trim()
    const key = h.toLowerCase()
    if (h && !seen.has(key)) {
      seen.add(key)
      headings.push(h)
    }
  }

  return headings
}

async function markdownToPlainText(markdown: string): Promise<string> {
  const stripped = await remark().use(strip).process(markdown)
  return String(stripped)
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function toUrl(includeSlug: string, repoFilePath: string): string {
  // repoFilePath is full path from repo root; convert to relative inside includeSlug
  // e.g. includeSlug=hibernate, repoFilePath=hibernate/README.md => ""
  // e.g. includeSlug=hibernate, repoFilePath=hibernate/faq.md => "faq"
  // e.g. includeSlug=hibernate, repoFilePath=hibernate/getting-started/login.md => "getting-started/login"
  const rel = repoFilePath.replace(new RegExp(`^${includeSlug}/?`), "")
  if (/^README\.md$/i.test(rel)) return `${BASE_URL}/${includeSlug}`
  const noExt = rel.replace(/\.md$/i, "")
  return `${BASE_URL}/${includeSlug}/${noExt}`.replace(/\/+$/, "")
}

function makeId(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/[^\w/-]+/g, "")
    .replace(/\//g, "-")
    .toLowerCase()
}

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
    throw new Error("Unexpected searchConfig.json response")
  }

  return JSON.parse(
    Buffer.from(data.content, "base64").toString("utf-8")
  ) as DocConfig
}

async function walkMarkdown(
  octokit: Octokit,
  include: IncludeItem,
  ignoredFiles: string[],
  ignoredFolders: string[],
  currentPath: string
): Promise<DocumentationPageRaw[]> {
  const out: DocumentationPageRaw[] = []

  const res = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: OWNER,
      repo: REPO,
      path: currentPath,
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
    }
  )

  const data = res.data
  if (!Array.isArray(data)) return out

  for (const item of data) {
    if (item.type === "dir") {
      if (ignoredFolders.includes(item.name)) continue
      const nested = await walkMarkdown(
        octokit,
        include,
        ignoredFiles,
        ignoredFolders,
        item.path
      )
      out.push(...nested)
      continue
    }

    if (item.type === "file" && item.name.toLowerCase().endsWith(".md")) {
      if (ignoredFiles.includes(item.name)) continue

      const fileRes = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: OWNER,
          repo: REPO,
          path: item.path,
          headers: { "X-GitHub-Api-Version": "2022-11-28" },
        }
      )

      const fileData = fileRes.data
      if (Array.isArray(fileData) || !("content" in fileData)) continue

      const raw = Buffer.from(fileData.content, "base64").toString("utf-8")
      const markdown = removeFrontmatter(raw)

      out.push({
        includeName: include.name,
        includeSlug: include.slug,
        repoFilePath: item.path,
        url: toUrl(include.slug, item.path),
        markdown,
      })
    }
  }

  return out
}

export async function getDocumentationSearchDocuments(): Promise<
  SearchDocument[]
> {
  const token = await getSecret()
  const octokit = new Octokit({ auth: token })

  const config = await getDocConfig(octokit)
  const docs: SearchDocument[] = []

  for (const include of config.include) {
    const rawPages = await walkMarkdown(
      octokit,
      include,
      config.ignore.files,
      config.ignore.folders,
      include.slug
    )

    for (const page of rawPages) {
      const plain = await markdownToPlainText(page.markdown)
      const headings = extractHeadingsFromMarkdown(page.markdown)

      docs.push({
        id: makeId(page.url),
        title: include.name, // per your requirement
        content: plain, // markdown/html stripped
        description: "",
        headings,
        url: page.url,
        type: "documentation",
        category: `${BASE_URL}/${include.slug}`, // base url category
      })
    }
  }

  return docs
}
