import fs from "fs"
import path from "path"
import matter from "gray-matter"
import yaml from "js-yaml"

import type { ContentChunk, SearchDocument } from "@/lib/search-utils"
import {
  buildBreadcrumb,
  chunkMarkdownByHeadings,
  markdownToPlainText,
  sanitizeForSearch,
} from "@/lib/search-utils"
import { slugifyAnchor } from "@/lib/utils"

interface FrontMatter {
  title?: string
  description?: string
  slug?: string
  category?: string
  dataRefs?: string[]
  searchable?: boolean

  [key: string]: any
}

// -------------------- Heading Extraction --------------------
// Extract headings from ContentSection and other components + markdown headings
function extractHeadings(mdxContent: string): string[] {
  const headings: string[] = []
  const seen = new Set<string>()

  const add = (raw?: string) => {
    const heading = (raw || "").trim()
    if (!heading) return
    const k = heading.toLowerCase()
    if (!seen.has(k)) {
      headings.push(heading)
      seen.add(k)
    }
  }

  let match: RegExpExecArray | null

  // Pattern 1: <ContentSection title="..." ...>
  const contentSectionRegex = /<ContentSection[^>]*title="([^"]*)"/gi
  while ((match = contentSectionRegex.exec(mdxContent)) !== null) {
    add(match[1])
  }

  // Pattern 2: <LocationSection title="..." ...>
  const locationSectionRegex = /<LocationSection[^>]*title="([^"]*)"/gi
  while ((match = locationSectionRegex.exec(mdxContent)) !== null) {
    add(match[1])
  }

  // Pattern 3: Any other *Section components with title prop
  const genericSectionRegex = /<\w+Section[^>]*title="([^"]*)"/gi
  while ((match = genericSectionRegex.exec(mdxContent)) !== null) {
    add(match[1])
  }

  // Pattern 4: Markdown headings (## or ###)
  const markdownHeadingRegex = /^#{2,3}\s+(.+)$/gm
  while ((match = markdownHeadingRegex.exec(mdxContent)) !== null) {
    add(match[1])
  }

  return headings
}

// -------------------- MDX Section Block Extraction --------------------
interface SectionBlock {
  title: string
  body: string
}

function extractMdxSectionBlocks(mdx: string): SectionBlock[] {
  const blocks: SectionBlock[] = []
  const openTagRegex = /<([A-Z]\w*Section)\b([^>]*)>/g

  let openMatch: RegExpExecArray | null
  while ((openMatch = openTagRegex.exec(mdx)) !== null) {
    const componentName = openMatch[1]
    const attrs = openMatch[2] || ""
    const titleMatch = /\btitle="([^"]+)"/i.exec(attrs)
    if (!titleMatch) continue

    const title = titleMatch[1].trim()
    if (!title) continue

    const startOfBody = openTagRegex.lastIndex
    const closeTag = `</${componentName}>`

    // Find matching close tag with nesting support for same component
    let depth = 1
    let cursor = startOfBody

    while (cursor < mdx.length) {
      const nextOpen = mdx.indexOf(`<${componentName}`, cursor)
      const nextClose = mdx.indexOf(closeTag, cursor)

      if (nextClose === -1) break

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++
        cursor = nextOpen + componentName.length + 1
      } else {
        depth--
        if (depth === 0) {
          const body = mdx.slice(startOfBody, nextClose).trim()
          blocks.push({ title, body })
          openTagRegex.lastIndex = nextClose + closeTag.length
          break
        }
        cursor = nextClose + closeTag.length
      }
    }
  }

  return blocks
}

// -------------------- MDX/JSX Cleaning --------------------
function stripMdxJsxNoise(mdxContent: string): string {
  let cleaned = mdxContent

  // 1) remove import/export
  cleaned = cleaned.replace(/^import\s+.*$/gm, " ")
  cleaned = cleaned.replace(/^export\s+.*$/gm, " ")

  // 2) remove JSX comments
  cleaned = cleaned.replace(/\{\/\*[\s\S]*?\*\/}/g, " ")

  // 3) remove JSX tags themselves (keep inner text)
  // opening/closing tags + fragments
  cleaned = cleaned
    .replace(/<\/?[A-Za-z][\w.:-]*(\s[^<>]*?)?>/g, " ")
    .replace(/<\/?>/g, " ") // fragments: <> </>

  // 4) remove remaining HTML tags
  cleaned = cleaned.replace(/<\/?[a-z][a-z0-9-]*(\s[^<>]*?)?>/gi, " ")

  // 5) remove JSX expressions (best-effort, iterative)
  // handles {...} blocks that remain after tag removal
  let prev = ""
  let i = 0
  while (cleaned !== prev && i < 10) {
    prev = cleaned
    cleaned = cleaned.replace(/\{[^{}]*}/g, " ")
    i++
  }

  return cleaned
}

async function extractPlainTextFromMdx(mdxContent: string): Promise<string> {
  const cleaned = stripMdxJsxNoise(mdxContent)

  // 6) markdown -> plain
  const plain = await markdownToPlainText(cleaned)

  // 7) final normalize
  return plain
    .replace(/\\_/g, "_")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\s+/g, " ")
    .trim()
}

// -------------------- Data Ref Extraction --------------------
const SKIP_DATA_KEYS = new Set([
  "image",
  "images",
  "thumbnail",
  "avatar",
  "icon",
  "logo",
  "url",
  "href",
  "link",
  "github_username",
  "brown_directory_uuid",
  "uuid",
  "id",
  "_id",
  "slug",
  "path",
  "filename",
  "file",
])

function extractTextFromData(data: any, depth: number = 0): string {
  if (depth > 10) return ""

  const textParts: string[] = []

  if (typeof data === "string") {
    textParts.push(data)
  } else if (typeof data === "number" || typeof data === "boolean") {
    textParts.push(String(data))
  } else if (Array.isArray(data)) {
    for (const item of data) {
      const t = extractTextFromData(item, depth + 1)
      if (t) textParts.push(t)
    }
  } else if (data && typeof data === "object") {
    for (const [key, value] of Object.entries(data)) {
      if (SKIP_DATA_KEYS.has(key.toLowerCase())) continue
      const t = extractTextFromData(value, depth + 1)
      if (t) textParts.push(t)
    }
  }

  return textParts.join(" ")
}

async function loadAndExtractReferencedData(
  frontmatter: FrontMatter
): Promise<string> {
  const dataRefs = frontmatter.dataRefs || []
  const allDataText: string[] = []

  for (const ref of dataRefs) {
    const filePath = path.join(process.cwd(), "content", ref)

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Referenced file not found: ${ref}`)
      continue
    }

    try {
      const content = fs.readFileSync(filePath, "utf8")
      const ext = path.extname(filePath).toLowerCase()

      let data: any
      if (ext === ".yaml" || ext === ".yml") {
        data = yaml.load(content)
      } else if (ext === ".json") {
        data = JSON.parse(content)
      } else {
        console.warn(`⚠️  Unsupported data ref type: ${ref}`)
        continue
      }

      const dataText = extractTextFromData(data)
      if (dataText) allDataText.push(sanitizeForSearch(dataText))

      console.log(`  ✓ Loaded data from: ${ref}`)
    } catch (error) {
      console.error(`  ✗ Error loading ${ref}:`, error)
    }
  }

  return allDataText.join(" ").trim()
}

// -------------------- URL + Slug Helpers --------------------
function generateSlug(
  routesDir: string,
  filePath: string,
  frontmatterSlug?: string
): string {
  if (frontmatterSlug) {
    return frontmatterSlug.startsWith("/")
      ? frontmatterSlug
      : `/${frontmatterSlug}`
  }

  const rel = path.relative(routesDir, filePath) // works on Windows/macOS/Linux
  const normalized = rel.replace(/\\/g, "/") // normalize separators

  const noIndex = normalized.replace(/\/index\.mdx$/i, "")
  const noExt = noIndex.replace(/\.mdx$/i, "")

  return `/${noExt}`.replace(/\/+/g, "/")
}

function buildSectionUrl(baseSlug: string, section?: string): string {
  if (!section) return baseSlug
  const anchor = slugifyAnchor(section)
  return anchor ? `${baseSlug}#${anchor}` : baseSlug
}

function isMeaningfulContent(s: string): boolean {
  const cleaned = (s || "")
    .replace(/[\\/_\-|()[\]{}<>*`~#"'.,:;!?+=]+/g, "")
    .trim()
  return cleaned.length > 1
}

function normalizeSection(section?: string): string {
  const s = (section || "").trim()
  return s.toLowerCase() === "overview" ? "" : s
}

function dedupeChunksBySection(chunks: ContentChunk[]): ContentChunk[] {
  const seen = new Set<string>()
  const out: ContentChunk[] = []

  for (const c of chunks) {
    const key = normalizeSection(c.section).toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ section: normalizeSection(c.section), content: c.content })
  }

  return out
}

// Create chunks from markdown headings OR MDX component headings
/**
 * Create chunks from MDX ContentSection blocks first, then fallback to markdown headings.
 */
function makeChunksForLocalMdx(content: string): ContentChunk[] {
  // Prefer extracting ContentSection blocks so each section becomes its own document
  const sectionBlocks = extractMdxSectionBlocks(content)
  if (sectionBlocks.length > 0) {
    const jsxChunks: ContentChunk[] = sectionBlocks.map((b) => ({
      section: normalizeSection(b.title),
      content: b.body,
    }))
    return dedupeChunksBySection(jsxChunks).filter((c) => c.section)
  }

  // Fallback to markdown heading chunking if no section components exist
  const mdChunks = chunkMarkdownByHeadings(content)
    .map((c) => ({ section: normalizeSection(c.section), content: c.content }))
    .filter((c) => c.content?.trim())

  if (mdChunks.length > 0) {
    return dedupeChunksBySection(mdChunks)
  }

  // No section structure found -> one page-level chunk
  return [{ section: "", content }]
}

// -------------------- Builder --------------------
/**
 * Build search documents for local pages.
 */
export async function buildPagesDocuments(): Promise<SearchDocument[]> {
  const documents: SearchDocument[] = []
  const routesDir = path.join(process.cwd(), "content", "routes")

  const excludedFiles = ["mdx-editing-guide.mdx", "sitemap.mdx"]

  const includeName = "Pages"
  const baseUrl = "/"

  /**
   * Process a directory recursively and index MDX files.
   */
  async function processDirectory(dir: string): Promise<void> {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        await processDirectory(filePath)
        continue
      }

      if (!file.endsWith(".mdx")) continue

      if (excludedFiles.includes(file)) {
        console.log(`⏭️  Skipping: ${file} (in exclusion list)`)
        continue
      }

      const source = fs.readFileSync(filePath, "utf8")
      const { data: frontmatter, content } = matter(source) as {
        data: FrontMatter
        content: string
      }

      if (frontmatter.searchable === false) {
        console.log(`⏭️  Skipping: ${file} (marked as not searchable)`)
        continue
      }

      console.log(`\n📄 Processing: ${file}`)

      const slug = generateSlug(routesDir, filePath, frontmatter.slug)
      const category =
        frontmatter.category || slug.split("/").filter(Boolean)[0] || "general"

      const dataText = await loadAndExtractReferencedData(frontmatter)
      const chunks = makeChunksForLocalMdx(content)

      let indexedChunkCount = 0
      const usedIds = new Set<string>()

      for (const chunk of chunks) {
        const section = normalizeSection(chunk.section)
        const plainChunk = await extractPlainTextFromMdx(chunk.content)

        const combinedContent = [plainChunk, dataText]
          .filter(Boolean)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim()

        if (!isMeaningfulContent(combinedContent)) continue

        const url = section ? buildSectionUrl(slug, section) : slug
        const breadcrumb = buildBreadcrumb(includeName, url, section, baseUrl)

        const idBase = slug.replace(/^\//, "").replace(/\//g, "-") || "home"
        const sectionId = section ? slugifyAnchor(section) || "section" : "page"
        const id = `${idBase}--${sectionId}`

        if (usedIds.has(id)) continue
        usedIds.add(id)

        const doc: SearchDocument = {
          id,
          title: frontmatter.title || "",
          content: combinedContent,
          url,
          type: "page",
          category,
          breadcrumb,
        }

        documents.push(doc)
        indexedChunkCount++
      }

      // Safety fallback: if everything got filtered, create one page-level doc
      if (indexedChunkCount === 0) {
        const fallbackPlain = await extractPlainTextFromMdx(content)
        const fallbackContent = [fallbackPlain, dataText]
          .filter(Boolean)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim()

        if (isMeaningfulContent(fallbackContent)) {
          const breadcrumb = buildBreadcrumb(includeName, slug, "", baseUrl)
          const idBase = slug.replace(/^\//, "").replace(/\//g, "-") || "home"
          const id = `${idBase}--page`

          if (!usedIds.has(id)) {
            documents.push({
              id,
              title: frontmatter.title || "",
              content: fallbackContent,
              url: slug,
              type: "page",
              category,
              breadcrumb,
            })
            indexedChunkCount = 1
          }
        }
      }

      console.log(`  ✓ Indexed: ${slug}`)
      console.log(`    Chunks indexed: ${indexedChunkCount}`)
      console.log(`    Category: ${category}`)
    }
  }

  await processDirectory(routesDir)
  return documents
}
