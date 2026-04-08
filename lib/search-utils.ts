import { remark } from "remark"
import strip from "strip-markdown"
import { slugifyAnchor } from "@/lib/utils"

export interface ContentChunk {
  section: string
  content: string
}

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

// -------------------- Cleaning Helpers --------------------
export function parseFrontmatter(raw: string) {
  if (!raw.startsWith("---")) return { data: {}, content: raw }

  const end = raw.indexOf("\n---", 3)
  if (end === -1) return { data: {}, content: raw }

  const fm = raw.slice(3, end).trim()
  const content = raw.slice(end + 4)
  const data: Record<string, any> = {}

  fm.split("\n").forEach((line) => {
    const [k, ...v] = line.split(":")
    if (!k) return
    data[k.trim()] = v.join(":").trim()
  })

  return { data, content }
}

export function stripHtmlTags(s: string): string {
  return s.replace(/<[^>]*>/g, " ")
}

export function decodeBasicEntities(s: string): string {
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

export function removeMarkdownFormatting(s: string): string {
  return s
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[(.*?)]\((.*?)\)/g, "$1")
    .replace(/\\_/g, "_")
    .replace(/\\`/g, "`")
    .replace(/\\\*/g, "*")
}

export function normalizePlainText(s: string): string {
  return s
    .replace(/\r/g, "")
    .replace(/\n+/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim()
}

export function sanitizeForSearch(s: string): string {
  return normalizePlainText(
    removeMarkdownFormatting(stripHtmlTags(decodeBasicEntities(s)))
  )
}

export function removeGitBookBlocks(s: string): string {
  return s
    .replace(/\{%\s*hint[^%]*%}/g, " ")
    .replace(/\{%\s*endhint\s*%}/g, " ")
    .replace(/\{%\s*include[^%]*%}/g, " ")
    .replace(/\{%\s*content-ref[^%]*%}/g, " ")
    .replace(/\{%\s*endcontent-ref\s*%}/g, " ")
    .replace(/\{%\s*embed[^%]*%}/g, " ")
    .replace(/\{%\s*file[^%]*%}/g, " ")
    .replace(/\{%\s*endfile\s*%}/g, " ")
    .replace(/\{%\s*tabs[^%]*%}/g, " ")
    .replace(/\{%\s*endtabs\s*%}/g, " ")
    .replace(/\{%\s*tab[^%]*%}/g, " ")
    .replace(/\{%\s*endtab\s*%}/g, " ")
    .replace(/\{%\s*[\s\S]*?%}/g, " ")
}

export function removeMarkdownTables(s: string): string {
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

export function stripFencedCodeBlocks(s: string): string {
  return s.replace(/```[\s\S]*?```/g, " ")
}

// -------------------- Chunk Helpers --------------------

export function titleCaseSegment(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((w) =>
      w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)
    )
    .join(" ")
}

export function getPathSegmentsFromUrl(url: string, baseUrl: string): string[] {
  const noHash = url.split("#")[0]

  // If baseUrl is "/" just strip leading slash
  if (baseUrl === "/") {
    return noHash.replace(/^\/+/, "").split("/").filter(Boolean)
  }

  return noHash.replace(`${baseUrl}/`, "").split("/").filter(Boolean)
}

export function buildBreadcrumb(
  includeName: string,
  url: string,
  section: string,
  baseUrl: string
): { breadcrumb: string[]; pathSegments: string[] } {
  const pathSegments = getPathSegmentsFromUrl(url, baseUrl)
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

export function chunkMarkdownByHeadings(markdown: string): ContentChunk[] {
  const lines = markdown.split("\n")
  const chunks: ContentChunk[] = []
  let currentSection = ""
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

export async function markdownToPlainText(markdown: string): Promise<string> {
  let cleaned = markdown
  cleaned = removeGitBookBlocks(cleaned)
  cleaned = stripFencedCodeBlocks(cleaned)
  cleaned = removeMarkdownTables(cleaned)

  const stripped = await remark().use(strip).process(cleaned)
  return sanitizeForSearch(String(stripped))
}

// -------------------- URL Helpers --------------------
export function makeId(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/[^\w/-]+/g, "")
    .replace(/\//g, "-")
    .toLowerCase()
}

export function buildPageUrl(
  includeSlug: string,
  repoFilePath: string,
  baseUrl: string
): string {
  const rel = repoFilePath.replace(new RegExp(`^${includeSlug}/?`), "")

  if (/README\.md$/i.test(rel)) {
    const dir = rel.replace(/\/?README\.md$/i, "")
    return dir
      ? `${baseUrl}/${includeSlug}/${dir}`.replace(/\/+$/, "")
      : `${baseUrl}/${includeSlug}`
  }

  const noExt = rel.replace(/\.md$/i, "")
  return `${baseUrl}/${includeSlug}/${noExt}`.replace(/\/+$/, "")
}

export function pathHasIgnoredFolder(
  filePath: string,
  ignoredFolders: string[]
): boolean {
  const parts = filePath.split("/")
  return parts.some((p) => ignoredFolders.includes(p))
}
