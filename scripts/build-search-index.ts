import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import strip from "strip-markdown"

interface SearchDocument {
  id: string
  title: string
  content: string
  description: string
  url: string
  type: string
  category: string
}

interface FrontMatter {
  title?: string
  description?: string
  category?: string

  [key: string]: any
}

async function cleanContent(content: string): Promise<string> {
  let cleaned = content

  // Remove import/export statements
  cleaned = cleaned.replace(/^import\s+.*$/gm, "")
  cleaned = cleaned.replace(/^export\s+.*$/gm, "")

  // Remove self-closing JSX components completely (they have no text content)
  // <PeopleSection ... />, <LocationSection ... />
  cleaned = cleaned.replace(/<[A-Z]\w*[^>]*\/>/g, "")

  // For JSX components WITH children, keep the children but remove the tags
  // <ContentSection ...>KEEP THIS TEXT</ContentSection>
  // We need to do this iteratively for nested components
  let previousLength = 0
  let iterations = 0
  const maxIterations = 10 // Prevent infinite loops

  while (cleaned.length !== previousLength && iterations < maxIterations) {
    previousLength = cleaned.length
    iterations++

    // Replace <ComponentName ...>content</ComponentName> with just content
    // This regex captures the content between tags
    cleaned = cleaned.replace(
      /<[A-Z]\w*[^>]*>([\s\S]*?)<\/[A-Z]\w*>/,
      "$1" // Keep only the content (group 1)
    )
  }

  // Remove any remaining HTML tags (lowercase)
  cleaned = cleaned.replace(/<\/?[a-z][a-z0-9]*[^>]*>/gi, "")

  // Remove JSX expressions {something}
  cleaned = cleaned.replace(/\{[^}]*}/g, "")

  // Now process with remark to strip markdown
  const result = await remark().use(strip).process(cleaned)

  let finalCleaned = String(result)

  // Clean up escaped characters
  finalCleaned = finalCleaned.replace(/\\_/g, "_")
  finalCleaned = finalCleaned.replace(/\\"/g, '"')
  finalCleaned = finalCleaned.replace(/\\'/g, "'")

  // Normalize whitespace
  finalCleaned = finalCleaned
    .replace(/[ \t]+/g, " ") // Multiple spaces -> single space
    .replace(/\n\s*\n\s*\n/g, "\n\n") // Multiple blank lines -> one blank line
    .trim()

  return finalCleaned
}

async function indexMDXFiles(): Promise<SearchDocument[]> {
  const documents: SearchDocument[] = []
  const contentDir = "./content"

  async function traverseDirectory(dir: string): Promise<void> {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        await traverseDirectory(filePath)
      } else if (file.endsWith(".mdx") || file.endsWith(".md")) {
        const fileContent = fs.readFileSync(filePath, "utf-8")
        const { data, content } = matter(fileContent)
        const frontmatter = data as FrontMatter

        const slug = filePath
          .replace("content/", "")
          .replace(/\.(mdx?|md)$/, "")
          .replace(/\/index$/, "")

        const cleanedContent = await cleanContent(content)

        // Debug logging
        if (content.length > 100 && cleanedContent.length < 50) {
          console.warn(`⚠️  Short content for ${filePath}`)
          console.warn(
            `   Original: ${content.length} chars, Cleaned: ${cleanedContent.length} chars`
          )
        }

        // Create a valid Meilisearch ID by replacing invalid characters
        const validId = filePath
          .replace(/[^a-zA-Z0-9\-_]/g, "-") // Replace invalid chars with hyphens
          .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
          .replace(/^-|-$/g, "") // Remove leading/trailing hyphens

        documents.push({
          id: validId,
          title: frontmatter.title || "",
          content: cleanedContent,
          description: frontmatter.description || "",
          url: `/${slug}`,
          type: "page",
          category: frontmatter.category || slug.split("/")[0],
        })
      }
    }
  }

  await traverseDirectory(contentDir)
  return documents
}

function getSpecialPages(): SearchDocument[] {
  return [
    {
      id: "home",
      title: "Center for Computation and Visualization",
      description:
        "Advancing computational research with scientific and computing expertise.",
      content:
        "CCV Center for Computation and Visualization Featured Projects Events Work with us",
      url: "/",
      type: "page",
      category: "home",
    },
  ]
}

async function exportToJSON(): Promise<void> {
  try {
    const mdxDocuments = await indexMDXFiles()
    const specialPages = getSpecialPages()
    const allDocuments = [...mdxDocuments, ...specialPages]

    console.log(`📚 Found ${allDocuments.length} documents`)

    // Wrap in an object instead of exporting raw array
    const searchData = {
      documents: allDocuments,
      meta: {
        totalDocuments: allDocuments.length,
        generatedAt: new Date().toISOString(),
        version: "1.0",
      },
    }

    const outputPath = path.join("./content", "search-index.json")
    fs.writeFileSync(outputPath, JSON.stringify(searchData, null, 2), "utf-8")

    console.log(`✅ Exported search index to: ${outputPath}`)
    console.log(`📊 Total documents: ${allDocuments.length}`)

    if (allDocuments.length > 0) {
      console.log("\n📄 Sample cleaned content:")
      console.log("Title:", allDocuments[0].title)
      console.log(
        "Content preview:",
        allDocuments[0].content.substring(0, 200) + "..."
      )
    }
  } catch (error) {
    console.error("❌ Error exporting search index:", error)
    if (error instanceof Error) {
      console.error(error.message)
      console.error(error.stack)
    }
    process.exit(1)
  }
}

exportToJSON().then((r) => `${r} completed.`)
