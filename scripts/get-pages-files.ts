import fs from "fs"
import path from "path"
import matter from "gray-matter"
import yaml from "js-yaml"

import type { SearchDocument } from "@/lib/search-utils"
import {
  buildBreadcrumb,
  chunkMarkdownByHeadings,
  markdownToPlainText,
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

// Extract headings from ContentSection and other components
function extractHeadings(mdxContent: string): string[] {
  const headings: string[] = []
  const seen = new Set<string>()

  // Pattern 1: <ContentSection title="..." ...>
  const contentSectionRegex = /<ContentSection[^>]*title="([^"]*)"/gi
  let match: RegExpExecArray | null

  while ((match = contentSectionRegex.exec(mdxContent)) !== null) {
    const heading = match[1].trim()
    if (heading && !seen.has(heading.toLowerCase())) {
      headings.push(heading)
      seen.add(heading.toLowerCase())
    }
  }

  // Pattern 2: <LocationSection title="..." ...>
  const locationSectionRegex = /<LocationSection[^>]*title="([^"]*)"/gi
  while ((match = locationSectionRegex.exec(mdxContent)) !== null) {
    const heading = match[1].trim()
    if (heading && !seen.has(heading.toLowerCase())) {
      headings.push(heading)
      seen.add(heading.toLowerCase())
    }
  }

  // Pattern 3: Any other *Section components with title prop
  const genericSectionRegex = /<\w+Section[^>]*title="([^"]*)"/gi
  while ((match = genericSectionRegex.exec(mdxContent)) !== null) {
    const heading = match[1].trim()
    if (heading && !seen.has(heading.toLowerCase())) {
      headings.push(heading)
      seen.add(heading.toLowerCase())
    }
  }

  // Pattern 4: Markdown headings (## or ###)
  const markdownHeadingRegex = /^#{2,3}\s+(.+)$/gm
  while ((match = markdownHeadingRegex.exec(mdxContent)) !== null) {
    const heading = match[1].trim()
    if (heading && !seen.has(heading.toLowerCase())) {
      headings.push(heading)
      seen.add(heading.toLowerCase())
    }
  }

  return headings
}

// Extract all searchable text from any data structure
function extractTextFromData(data: any, depth: number = 0): string {
  if (depth > 10) return "" // Prevent infinite recursion

  const textParts: string[] = []

  if (typeof data === "string") {
    textParts.push(data)
  } else if (typeof data === "number" || typeof data === "boolean") {
    textParts.push(String(data))
  } else if (Array.isArray(data)) {
    for (const item of data) {
      textParts.push(extractTextFromData(item, depth + 1))
    }
  } else if (data && typeof data === "object") {
    for (const [key, value] of Object.entries(data)) {
      // Skip certain keys that aren't useful for search
      const skipKeys = [
        "image",
        "github_username",
        "brown_directory_uuid",
        "uuid",
        "id",
      ]
      if (skipKeys.includes(key.toLowerCase())) continue
      textParts.push(extractTextFromData(value, depth + 1))
    }
  }

  return textParts.filter(Boolean).join(" ")
}

// Load and extract text from referenced data files
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
      if (dataText) allDataText.push(dataText)

      console.log(`  ✓ Loaded data from: ${ref}`)
    } catch (error) {
      console.error(`  ✗ Error loading ${ref}:`, error)
    }
  }

  return allDataText.join(" ")
}

// Generate slug from file path or frontmatter
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

// Build section URL: "/a/b#anchor" (no anchor for Overview)
function buildSectionUrl(baseSlug: string, section: string): string {
  const isOverview = section.trim().toLowerCase() === "overview"
  if (isOverview) return baseSlug

  const anchor = slugifyAnchor(section)
  return anchor ? `${baseSlug}#${anchor}` : baseSlug
}

// Build the search index (chunked by section)
export async function buildPagesDocuments(): Promise<SearchDocument[]> {
  const documents: SearchDocument[] = []
  const routesDir = path.join(process.cwd(), "content", "routes")

  // Excluded files
  const excludedFiles = ["mdx-editing-guide.mdx", "sitemap.mdx"]

  // Breadcrumb config
  const includeName = "Routes"
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

      const headings = extractHeadings(content)
      const dataText = await loadAndExtractReferencedData(frontmatter)

      const slug = generateSlug(filePath, frontmatter.slug)
      const category =
        frontmatter.category || slug.split("/").filter(Boolean)[0] || "general"

      const chunks = chunkMarkdownByHeadings(content)
      const effectiveChunks =
        chunks.length > 0 ? chunks : [{ section: "Overview", content }]

      let indexedChunkCount = 0

      for (const chunk of effectiveChunks) {
        const section = chunk.section?.trim() || "Overview"
        const plainChunk = await markdownToPlainText(chunk.content)

        const combinedContent = [plainChunk, dataText]
          .filter(Boolean)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim()

        if (!combinedContent) continue

        const url = buildSectionUrl(slug, section)
        const { breadcrumb, pathSegments } = buildBreadcrumb(
          includeName,
          url,
          section,
          baseUrl
        )

        const idBase = slug.replace(/^\//, "").replace(/\//g, "-") || "home"
        const sectionId =
          section.toLowerCase() === "overview"
            ? "overview"
            : slugifyAnchor(section) || "section"

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
          section,
        }

        documents.push(doc)
        indexedChunkCount++
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
