import fs from "fs"
import path from "path"
import matter from "gray-matter"
import yaml from "js-yaml"
import { remark } from "remark"
import strip from "strip-markdown"

interface SearchDocument {
  id: string
  title: string
  content: string
  description: string
  headings: string[]
  url: string
  type: string
  category: string
}

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
  let match

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

// Extract plain text from MDX content
async function extractPlainText(mdxContent: string): Promise<string> {
  let cleaned = mdxContent

  // Remove import/export statements
  cleaned = cleaned.replace(/^import\s+.*$/gm, "")
  cleaned = cleaned.replace(/^export\s+.*$/gm, "")

  // Remove self-closing JSX components
  cleaned = cleaned.replace(/<[A-Z]\w*[^>]*\/>/g, "")

  // Remove JSX components but keep their text content
  let previousLength = 0
  let iterations = 0
  const maxIterations = 10

  while (cleaned.length !== previousLength && iterations < maxIterations) {
    previousLength = cleaned.length
    iterations++
    cleaned = cleaned.replace(/<[A-Z]\w*[^>]*>([\s\S]*?)<\/[A-Z]\w*>/, "$1")
  }

  // Remove HTML tags
  cleaned = cleaned.replace(/<\/?[a-z][a-z0-9]*[^>]*>/gi, "")

  // Remove JSX expressions
  cleaned = cleaned.replace(/\{[^}]*}/g, "")

  // Process with remark to strip markdown
  const result = await remark().use(strip).process(cleaned)
  let finalCleaned = String(result)

  // Clean up escaped characters and normalize whitespace
  finalCleaned = finalCleaned
    .replace(/\\_/g, "_")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim()

  return finalCleaned
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
      if (skipKeys.includes(key.toLowerCase())) {
        continue
      }

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
      const ext = path.extname(filePath)

      let data
      if (ext === ".yaml" || ext === ".yml") {
        data = yaml.load(content)
      } else if (ext === ".json") {
        data = JSON.parse(content)
      }

      // Extract all text from the data structure
      const dataText = extractTextFromData(data)
      allDataText.push(dataText)

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
    // Ensure it starts with /
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

// Build the search index
async function buildSearchIndex(): Promise<SearchDocument[]> {
  const documents: SearchDocument[] = []
  const routesDir = path.join(process.cwd(), "content", "routes")

  // Excluded files
  const excludedFiles = ["mdx-editing-guide.mdx", "sitemap.mdx"]

  async function processDirectory(dir: string): Promise<void> {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        await processDirectory(filePath)
      } else if (file.endsWith(".mdx")) {
        // Skip excluded files
        if (excludedFiles.includes(file)) {
          console.log(`⏭️  Skipping: ${file} (in exclusion list)`)
          continue
        }

        const source = fs.readFileSync(filePath, "utf8")
        const { data: frontmatter, content } = matter(source) as {
          data: FrontMatter
          content: string
        }

        // Skip if marked as not searchable
        if (frontmatter.searchable === false) {
          console.log(`⏭️  Skipping: ${file} (marked as not searchable)`)
          continue
        }

        console.log(`\n📄 Processing: ${file}`)

        // Extract headings from the content
        const headings = extractHeadings(content)

        // Extract plain text from MDX
        const plainText = await extractPlainText(content)

        // Load and extract text from referenced data files
        const dataText = await loadAndExtractReferencedData(frontmatter)

        // Combine MDX content with data content
        const combinedContent = [plainText, dataText]
          .filter(Boolean)
          .join(" ")
          .replace(/\s+/g, " ") // Normalize whitespace
          .trim()

        // Generate slug
        const slug = generateSlug(filePath, frontmatter.slug)

        // Determine category
        const category =
          frontmatter.category ||
          slug.split("/").filter(Boolean)[0] ||
          "general"

        // Create search document
        const doc: SearchDocument = {
          id: slug.replace(/^\//, "").replace(/\//g, "-") || "home",
          title: frontmatter.title || "",
          content: combinedContent,
          description: frontmatter.description || "",
          headings: headings,
          url: slug,
          type: "page",
          category: category,
        }

        documents.push(doc)

        console.log(`  ✓ Indexed: ${slug}`)
        console.log(
          `    Headings: ${headings.length} found - [${headings.join(", ")}]`
        )
        console.log(`    Content length: ${combinedContent.length} chars`)
        console.log(`    Category: ${category}`)
      }
    }
  }

  await processDirectory(routesDir)
  return documents
}

// Export to JSON
async function exportToJSON(): Promise<void> {
  try {
    console.log("🔍 Building search index...\n")

    const documents = await buildSearchIndex()

    console.log(`\n📚 Found ${documents.length} documents`)

    // Create search data object
    const searchData = {
      documents: documents,
      meta: {
        totalDocuments: documents.length,
        generatedAt: new Date().toISOString(),
        version: "1.0",
      },
    }

    // Write to file
    const outputPath = path.join(process.cwd(), "content", "search-index.json")
    fs.writeFileSync(outputPath, JSON.stringify(searchData, null, 2), "utf-8")

    console.log(`\n✅ Exported search index to: ${outputPath}`)
    console.log(`📊 Total documents: ${documents.length}`)

    // Log sample
    if (documents.length > 0) {
      const sample = documents[0]
      console.log("\n📄 Sample document:")
      console.log("  ID:", sample.id)
      console.log("  Title:", sample.title)
      console.log("  URL:", sample.url)
      console.log("  Category:", sample.category)
      console.log("  Headings:", sample.headings)
      console.log("  Description length:", sample.description.length, "chars")
      console.log("  Content length:", sample.content.length, "chars")
      console.log(
        "  Content preview:",
        sample.content.substring(0, 200) + "..."
      )
    }

    // Log statistics
    const categoryCounts = documents.reduce(
      (acc, doc) => {
        acc[doc.category] = (acc[doc.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    console.log("\n📊 Documents by category:")
    Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([category, count]) => {
        console.log(`  ${category}: ${count}`)
      })

    // Log content length statistics
    const contentLengths = documents.map((d) => d.content.length)
    const avgLength = Math.round(
      contentLengths.reduce((a, b) => a + b, 0) / contentLengths.length
    )
    const minLength = Math.min(...contentLengths)
    const maxLength = Math.max(...contentLengths)

    console.log("\n📏 Content length statistics:")
    console.log(`  Average: ${avgLength} chars`)
    console.log(`  Min: ${minLength} chars`)
    console.log(`  Max: ${maxLength} chars`)

    // Log heading statistics
    const totalHeadings = documents.reduce(
      (sum, doc) => sum + doc.headings.length,
      0
    )
    const avgHeadings = Math.round(totalHeadings / documents.length)
    console.log("\n📑 Heading statistics:")
    console.log(`  Total: ${totalHeadings} headings`)
    console.log(`  Average per document: ${avgHeadings}`)
  } catch (error) {
    console.error("\n❌ Error building search index:", error)
    if (error instanceof Error) {
      console.error(error.message)
      console.error(error.stack)
    }
    process.exit(1)
  }
}

// Run the export
exportToJSON().then(() => console.log("\n✨ Search index build complete!"))
