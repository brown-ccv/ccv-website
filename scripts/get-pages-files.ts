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
  slugifyAnchor,
} from "@/lib/search-utils"

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

// -------------------- MDX/JSX Cleaning --------------------
function stripMdxJsxNoise(mdxContent: string): string {
  let cleaned = mdxContent

  // Remove import/export statements
  cleaned = cleaned.replace(/^import\s+.*$/gm, "")
  cleaned = cleaned.replace(/^export\s+.*$/gm, "")

  // Remove JSX comments {/* ... */}
  cleaned = cleaned.replace(/\{\/\*[\s\S]*?\*\/}/g, " ")

  // Remove self-closing JSX components: <Component ... />
  cleaned = cleaned.replace(/<[A-Z]\w*[^>]*\/>/g, " ")

  // Remove paired JSX components but keep inner text content
  let previousLength = -1
  let iterations = 0
  const maxIterations = 20

  while (cleaned.length !== previousLength && iterations < maxIterations) {
    previousLength = cleaned.length
    iterations++
    cleaned = cleaned.replace(/<[A-Z]\w*[^>]*>([\s\S]*?)<\/[A-Z]\w*>/g, "$1")
  }

  // Remove remaining HTML tags
  cleaned = cleaned.replace(/<\/?[a-z][a-z0-9-]*[^>]*>/gi, " ")

  // Remove JSX expressions { ... }
  cleaned = cleaned.replace(/\{[^{}]*}/g, " ")

  return cleaned
}

async function extractPlainTextFromMdx(mdxContent: string): Promise<string> {
  const cleaned = stripMdxJsxNoise(mdxContent)
  const plain = await markdownToPlainText(cleaned)
  return sanitizeForSearch(plain)
}

// -------------------- Data Ref Extraction --------------------
function extractTextFromData(data: any, depth: number = 0): string {
  if (depth > 10) return ""

  const textParts: string[] = []
  const skipKeys = new Set([
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
      if (skipKeys.has(key.toLowerCase())) continue
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
function generateSlug(filePath: string, frontmatterSlug?: string): string {
  if (frontmatterSlug) {
    return frontmatterSlug.startsWith("/")
      ? frontmatterSlug
      : `/${frontmatterSlug}`
  }

  return (
    "/" +
    filePath
      .replace(/^.*content\/routes\//, "")
      .replace(/\/(index)?\.mdx$/, "")
      .replace(/\.mdx$/, "")
  )
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

// Create chunks from markdown headings OR MDX component headings
function makeChunksForLocalMdx(
  content: string,
  headings: string[]
): ContentChunk[] {
  const mdChunks = chunkMarkdownByHeadings(content).filter(
    (c) => c.section && c.content?.trim()
  )

  if (mdChunks.length > 0) return mdChunks

  // Fallback: if headings exist only in JSX components, create synthetic chunks.
  // We cannot reliably map exact body text per heading without parsing JSX AST,
  // so use full content per section for recall.
  if (headings.length > 0) {
    return headings.map((h) => ({ section: h, content }))
  }

  return [{ section: "", content }]
}

// -------------------- Builder --------------------
export async function buildPagesDocuments(): Promise<SearchDocument[]> {
  const documents: SearchDocument[] = []
  const routesDir = path.join(process.cwd(), "content", "routes")

  const excludedFiles = ["mdx-editing-guide.mdx", "sitemap.mdx"]

  const includeName = "Pages"
  const baseUrl = "/"

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

      const slug = generateSlug(filePath, frontmatter.slug)
      const category =
        frontmatter.category || slug.split("/").filter(Boolean)[0] || "general"

      const headings = extractHeadings(content)
      const dataText = await loadAndExtractReferencedData(frontmatter)

      const chunks = makeChunksForLocalMdx(content, headings)
      let indexedChunkCount = 0

      for (const chunk of chunks) {
        const section = (chunk.section || "").trim() // empty => page-level doc
        const plainChunk = await extractPlainTextFromMdx(chunk.content)

        const combinedContent = [plainChunk, dataText]
          .filter(Boolean)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim()

        if (!isMeaningfulContent(combinedContent)) continue

        const url = section ? buildSectionUrl(slug, section) : slug
        const { breadcrumb, pathSegments } = buildBreadcrumb(
          includeName,
          url,
          section || "",
          baseUrl
        )

        const idBase = slug.replace(/^\//, "").replace(/\//g, "-") || "home"
        const sectionId = section ? slugifyAnchor(section) || "section" : "page"

        const doc: SearchDocument = {
          id: `${idBase}--${sectionId}`,
          title: frontmatter.title || "",
          content: combinedContent,
          description: frontmatter.description || "",
          headings,
          url,
          type: "page",
          category,
          breadcrumb,
          pathSegments,
          ...(section ? { section } : {}),
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
          const { breadcrumb, pathSegments } = buildBreadcrumb(
            includeName,
            slug,
            "",
            baseUrl
          )
          const idBase = slug.replace(/^\//, "").replace(/\//g, "-") || "home"

          documents.push({
            id: `${idBase}--page`,
            title: frontmatter.title || "",
            content: fallbackContent,
            description: frontmatter.description || "",
            headings,
            url: slug,
            type: "page",
            category,
            breadcrumb,
            pathSegments,
          })
          indexedChunkCount = 1
        }
      }

      console.log(`  ✓ Indexed: ${slug}`)
      console.log(
        `    Headings: ${headings.length} found - [${headings.join(", ")}]`
      )
      console.log(`    Chunks indexed: ${indexedChunkCount}`)
      console.log(`    Category: ${category}`)
    }
  }

  await processDirectory(routesDir)
  return documents
}
