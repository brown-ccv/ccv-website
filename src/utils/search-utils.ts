import { slugifyAnchor } from "@/utils/helper"
import { SKIP, visit } from "unist-util-visit"
import { toString } from "mdast-util-to-string"
import { unified } from "unified"
import remarkParse from "remark-parse"

export interface ContentChunk {
  section: string
  content: string
}

export interface SearchDocument {
  id: string
  title: string
  content: string
  url: string
  type: string
  category: string
  breadcrumb: string[]
}

// -------------------- Cleaning Helpers --------------------
/**
 * Remark plugin to remove unwanted markdown AST nodes.
 */
function remarkStripCustom() {
  return (tree: any) => {
    visit(tree, (node, index, parent) => {
      if (!parent || typeof index !== "number") return

      // Remove full nodes entirely
      if (
        node.type === "image" || // Match images.
        node.type === "table" || // Match markdown tables.
        node.type === "html" || // Match raw HTML blocks like <table>.
        node.type === "code" // Match fenced/inline code blocks.
      ) {
        parent.children.splice(index, 1)
        return [SKIP, index]
      }

      if (node.type === "link") {
        const text = toString(node) // extract visible label
        parent.children.splice(index, 1, { type: "text", value: text })
        return [SKIP, index]
      }

      // Flatten emphasis/strong to just text content
      if (
        node.type === "strong" || // Match bold nodes.
        node.type === "emphasis" // Match italic nodes.
      ) {
        const text = toString(node)
        parent.children.splice(index, 1, { type: "text", value: text })
        return [SKIP, index]
      }
    })
  }
}

/**
 * Parse a simple frontmatter block and return metadata plus content.
 */
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

/**
 * Remove HTML tags from text.
 */
export function stripHtmlTags(s: string): string {
  return s.replace(/<[^>]*>/g, " ") // Match any HTML tag and replace with a space.
}

/**
 * Remove common urls from text.
 */
export function stripUrls(s: string): string {
  return s.replace(/(?:https?|ftp):\/\/[^\s)]+/g, " ") // Match URLs starting with http:// or https:// and replace with a space.
}

/**
 * Decode common HTML entities into plain text.
 */
export function decodeBasicEntities(s: string): string {
  return s
    .replace(/&#x20;/gi, " ") // Match hex entity for space.
    .replace(/&#x9;/gi, " ") // Match hex entity for tab.
    .replace(/&#xA;/gi, "\n") // Match hex entity for newline.
    .replace(/&#xNAN;/gi, " ") // Match non-standard noisy entity seen in source data.
    .replace(/&nbsp;/gi, " ") // Match non-breaking space entity.
    .replace(/&amp;/gi, "&") // Match ampersand entity.
    .replace(/&quot;/gi, '"') // Match double-quote entity.
    .replace(/&apos;/gi, "'") // Match apostrophe entity.
    .replace(/&lt;/gi, "<") // Match less-than entity.
    .replace(/&gt;/gi, ">") // Match greater-than entity.
}

/**
 * Remove markdown formatting markers while preserving readable text.
 */
export function removeMarkdownFormatting(s: string): string {
  return s
    .replace(/\*\*(.*?)\*\*/g, "$1") // Match bold markdown and keep inner text.
    .replace(/\*(.*?)\*/g, "$1") // Match italic markdown and keep inner text.
    .replace(/__(.*?)__/g, "$1") // Match underscore bold markdown and keep inner text.
    .replace(/_(.*?)_/g, "$1") // Match underscore italic markdown and keep inner text.
    .replace(/`([^`]+)`/g, "$1") // Match inline code markdown and keep inner text.
    .replace(/\[(.*?)]\((.*?)\)/g, "$1") // Match markdown links and keep label text.
    .replace(/\\_/g, "_") // Match escaped underscore.
    .replace(/\\`/g, "`") // Match escaped backtick.
    .replace(/\\\*/g, "*") // Match escaped asterisk.
}

/**
 * Normalize whitespace for indexing.
 */
export function normalizePlainText(s: string): string {
  return s
    .replace(/\r/g, "") // Match carriage returns.
    .replace(/\n+/g, " ") // Match one or more newlines.
    .replace(/[ \t]+/g, " ") // Match repeated spaces or tabs.
    .trim()
}

/**
 * Apply final search sanitization to plain text.
 */
export function sanitizeForSearch(s: string): string {
  return normalizePlainText(
    removeMarkdownFormatting(stripHtmlTags(decodeBasicEntities(s)))
  )
}

/**
 * Remove GitBook liquid-style directives.
 */
export function removeGitBookBlocks(s: string): string {
  return s
    .replace(/\{%\s*hint[^%]*%}/g, " ") // Match opening hint tag.
    .replace(/\{%\s*endhint\s*%}/g, " ") // Match closing hint tag.
    .replace(/\{%\s*include[^%]*%}/g, " ") // Match include directive.
    .replace(/\{%\s*content-ref[^%]*%}/g, " ") // Match opening content-ref tag.
    .replace(/\{%\s*endcontent-ref\s*%}/g, " ") // Match closing content-ref tag.
    .replace(/\{%\s*embed[^%]*%}/g, " ") // Match embed directive.
    .replace(/\{%\s*file[^%]*%}/g, " ") // Match opening file tag.
    .replace(/\{%\s*endfile\s*%}/g, " ") // Match closing file tag.
    .replace(/\{%\s*tabs[^%]*%}/g, " ") // Match opening tabs tag.
    .replace(/\{%\s*endtabs\s*%}/g, " ") // Match closing tabs tag.
    .replace(/\{%\s*tab[^%]*%}/g, " ") // Match opening tab tag.
    .replace(/\{%\s*endtab\s*%}/g, " ") // Match closing tab tag.
    .replace(/\{%\s*[\s\S]*?%}/g, " ") // Match any remaining liquid-style block.
}

/**
 * Remove raw HTML table blocks.
 */
export function removeRawHtmlTables(s: string): string {
  return s.replace(/<table\b[\s\S]*?<\/table>/gi, " ") // Match full HTML table blocks.
}

/**
 * Remove markdown table rows and separators.
 */
export function removeMarkdownTables(s: string): string {
  const lines = s.split("\n")
  const kept: string[] = []
  for (const line of lines) {
    const t = line.trim()
    const isSeparator = /^\|?[\s:-]+\|[\s|:-]*$/.test(t) // Match markdown table separator rows.
    const looksLikeRow = t.includes("|") && /^\|?.+\|.+\|?$/.test(t) // Match markdown table data rows.
    if (isSeparator || looksLikeRow) continue
    kept.push(line)
  }
  return kept.join("\n")
}

/**
 * Remove fenced code blocks.
 */
export function stripFencedCodeBlocks(s: string): string {
  return s.replace(/```[\s\S]*?```/g, " ") // Match triple-backtick fenced code blocks.
}

/**
 * Pre-clean non-standard markdown before AST parsing.
 */
export function precleanMarkdown(markdown: string): string {
  let cleaned = markdown
  cleaned = removeGitBookBlocks(cleaned)
  cleaned = removeRawHtmlTables(cleaned)
  cleaned = stripFencedCodeBlocks(cleaned)
  cleaned = removeMarkdownTables(cleaned)
  return cleaned
}

// -------------------- Chunk Helpers --------------------

/**
 * Convert a slug segment to readable title case.
 */
const ACRONYMS = new Set(["api", "cpu", "gpu", "ml", "ai", "r", "sql"])

export function titleCaseSegment(segment: string): string {
  return segment
    .replace(/_+/g, "-") // Match underscores and normalize to hyphens.
    .split("-")
    .filter(Boolean)
    .map((w) => {
      const lower = w.toLowerCase()
      if (ACRONYMS.has(lower)) return lower.toUpperCase()
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join(" ")
}

/**
 * Extract path segments from URL while respecting base URL.
 */
export function getPathSegmentsFromUrl(url: string, baseUrl: string): string[] {
  const noHash = url.split("#")[0]

  // If baseUrl is "/" just strip leading slash
  if (baseUrl === "/") {
    return noHash.replace(/^\/+/, "").split("/").filter(Boolean) // Match one or more leading slashes.
  }

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "") // Match one or more trailing slashes.

  if (noHash === normalizedBaseUrl) {
    return []
  }

  if (noHash.startsWith(`${normalizedBaseUrl}/`)) {
    return noHash
      .slice(normalizedBaseUrl.length + 1)
      .split("/")
      .filter(Boolean)
  }

  return noHash.split("/").filter(Boolean)
}

/**
 * Build breadcrumb labels from URL and optional section.
 */
export function buildBreadcrumb(
  includeName: string,
  url: string,
  section: string,
  baseUrl: string
): string[] {
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

  return labelSegments
}

/**
 * Split markdown into chunks using H1-H3 headings.
 */
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
      // Match opening or closing fence lines.
      inFence = !inFence
      buffer.push(line)
      continue
    }

    if (!inFence) {
      const m = /^(#{1,3})\s+(.+)$/.exec(line) // Match markdown headings H1-H3.
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

/**
 * Convert markdown into plain text via unified remark pipeline.
 */
export async function markdownToPlainText(markdown: string): Promise<string> {
  // Pre-clean non-standard syntax first
  const cleaned = precleanMarkdown(markdown)

  // Parse → transform → extract text
  const tree = unified().use(remarkParse).parse(cleaned)

  // Apply AST stripping
  remarkStripCustom()(tree)

  // Convert AST to plain text
  const text = toString(tree)

  const postclean = stripUrls(text)

  return sanitizeForSearch(postclean)
}

// -------------------- URL Helpers --------------------
/**
 * Build a stable document id from URL.
 */
export function makeId(url: string): string {
  return url
    .replace(/^https?:\/\//, "") // Match protocol prefix.
    .replace(/[^\w/-]+/g, "") // Match disallowed id characters.
    .replace(/\//g, "-") // Match path separators.
    .toLowerCase()
}

/**
 * Build public documentation page URL from repository file path.
 */
export function buildPageUrl(
  includeSlug: string,
  repoFilePath: string,
  baseUrl: string
): string {
  const rel = repoFilePath.replace(new RegExp(`^${includeSlug}/?`), "") // Match include slug prefix.

  if (/README\.md$/i.test(rel)) {
    const dir = rel.replace(/\/?README\.md$/i, "") // Match trailing README.md with optional slash.
    return dir
      ? `${baseUrl}/${includeSlug}/${dir}`.replace(/\/+$/, "") // Match trailing slashes.
      : `${baseUrl}/${includeSlug}`
  }

  const noExt = rel.replace(/\.md$/i, "") // Match markdown file extension.
  return `${baseUrl}/${includeSlug}/${noExt}`.replace(/\/+$/, "") // Match trailing slashes.
}

/**
 * Check whether file path contains any ignored folder segment.
 */
export function pathHasIgnoredFolder(
  filePath: string,
  ignoredFolders: string[]
): boolean {
  const parts = filePath.split("/")
  return parts.some((p) => ignoredFolders.includes(p))
}
