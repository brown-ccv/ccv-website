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
  breadcrumb: string[]
  pathSegments: string[]
  section?: string
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

interface ContentChunk {
  section: string
  content: string
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

// -------------------- Cleaning Helpers --------------------
function removeFrontmatter(markdown: string): string {
  return markdown.replace(/^---[\s\S]*?---\n?/, "")
}

function stripHtmlTags(s: string): string {
  return s.replace(/<[^>]*>/g, " ")
}

function decodeBasicEntities(s: string): string {
  return s
    .replace(/&#x20;/gi, " ")
    .replace(/&#x9;/gi, " ")
    .replace(/&#xA;/gi, "\n")
    .replace(/&#xNAN;/gi, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
}

function removeMarkdownFormatting(s: string): string {
  return s
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\\_/g, "_")
    .replace(/\\`/g, "`")
    .replace(/\\\*/g, "*")
}

function normalizePlainText(s: string): string {
  return s
    .replace(/\r/g, "")
    .replace(/\n+/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim()
}

function sanitizeForSearch(s: string): string {
  return normalizePlainText(
    removeMarkdownFormatting(stripHtmlTags(decodeBasicEntities(s)))
  )
}

function removeGitBookBlocks(s: string): string {
  return s
    .replace(/\{%\s*hint[^%]*%\}/g, " ")
    .replace(/\{%\s*endhint\s*%\}/g, " ")
    .replace(/\{%\s*include[^%]*%\}/g, " ")
    .replace(/\{%\s*content-ref[^%]*%\}/g, " ")
    .replace(/\{%\s*endcontent-ref\s*%\}/g, " ")
    .replace(/\{%\s*embed[^%]*%\}/g, " ")
    .replace(/\{%\s*file[^%]*%\}/g, " ")
    .replace(/\{%\s*endfile\s*%\}/g, " ")
    .replace(/\{%\s*tabs[^%]*%\}/g, " ")
    .replace(/\{%\s*endtabs\s*%\}/g, " ")
    .replace(/\{%\s*tab[^%]*%\}/g, " ")
    .replace(/\{%\s*endtab\s*%\}/g, " ")
    .replace(/\{%\s*[\s\S]*?%\}/g, " ")
}

function removeMarkdownTables(s: string): string {
  const lines = s.split("\n")
  const kept: string[] = []
  for (const line of lines) {
    const t = line.trim()
    const isSeparator = /^\|?[\s:-]+\|[\s|:-]*$/.test(t)
    const looksLikeRow = t.includes("|") && /^\|?.+\|.+\|?$/.test(t)
    if (isSeparator || looksLikeRow) continue
    kept.push(line)
  }
  return kept.join("\n")
}

function stripFencedCodeBlocks(s: string): string {
  return s.replace(/```[\s\S]*?```/g, " ")
}

// -------------------- Chunk Helpers --------------------
function slugifyAnchor(raw: string): string {
  const cleaned = sanitizeForSearch(raw)
  return cleaned
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function titleCaseSegment(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((w) =>
      w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join(" ")
}

function getPathSegmentsFromUrl(url: string): string[] {
  const noHash = url.split("#")[0]
  const withoutBase = noHash.replace(`${BASE_URL}/`, "")
  return withoutBase.split("/").filter(Boolean)
}

function buildBreadcrumb(
  includeName: string,
  url: string,
  section: string
): { breadcrumb: string[]; pathSegments: string[] } {
  const pathSegments = getPathSegmentsFromUrl(url)
  const labelSegments = pathSegments.map(titleCaseSegment)

  if (labelSegments.length > 0) {
    labelSegments[0] = includeName
  }

  const cleanSection = sanitizeForSearch(section)
  if (cleanSection) {
    const last = labelSegments[labelSegments.length - 1]
    if (!last || last.toLowerCase() !== cleanSection.toLowerCase()) {
      labelSegments.push(cleanSection)
      pathSegments.push(slugifyAnchor(cleanSection))
    }
  }

  return { breadcrumb: labelSegments, pathSegments }
}

function chunkMarkdownByHeadings(markdown: string): ContentChunk[] {
  const lines = markdown.split("\n")
  const chunks: ContentChunk[] = []
  let currentSection = "Overview"
  let buffer: string[] = []
  let inFence = false

  const flush = () => {
    const content = buffer.join("\n").trim()
    if (content) chunks.push({ section: currentSection, content })
    buffer = []
  }

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      buffer.push(line)
      continue
    }

    if (!inFence) {
      const m = /^(#{1,3})\s+(.+)$/.exec(line)
      if (m) {
        flush()
        currentSection = m[2].trim()
        continue
      }
    }

    buffer.push(line)
  }

  flush()
  return chunks
}

// -------------------- Content Conversion --------------------
async function markdownToPlainText(markdown: string): Promise<string> {
  let cleaned = markdown
  cleaned = removeGitBookBlocks(cleaned)
  cleaned = stripFencedCodeBlocks(cleaned)
  cleaned = removeMarkdownTables(cleaned)

  const stripped = await remark().use(strip).process(cleaned)
  return sanitizeForSearch(String(stripped))
}

// -------------------- URL Helpers --------------------
function makeId(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/[^\w/-]+/g, "")
    .replace(/\//g, "-")
    .toLowerCase()
}

function buildPageUrl(includeSlug: string, repoFilePath: string): string {
  const rel = repoFilePath.replace(new RegExp(`^${includeSlug}/?`), "")

  if (/README\.md$/i.test(rel)) {
    const dir = rel.replace(/\/?README\.md$/i, "")
    return dir
      ? `${BASE_URL}/${includeSlug}/${dir}`.replace(/\/+$/, "")
      : `${BASE_URL}/${includeSlug}`
  }

  const noExt = rel.replace(/\.md$/i, "")
  return `${BASE_URL}/${includeSlug}/${noExt}`.replace(/\/+$/, "")
}

function pathHasIgnoredFolder(
  filePath: string,
  ignoredFolders: string[]
): boolean {
  const parts = filePath.split("/")
  return parts.some((p) => ignoredFolders.includes(p))
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
      const pageUrl = buildPageUrl(include.slug, item.path)

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
          section
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
