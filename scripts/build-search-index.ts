import fs from "fs"
import path from "path"
import { buildPagesDocuments } from "./get-pages-files"
import { getDocumentationSearchDocuments } from "./get-documentation-files"

// Export to JSON
export async function exportToJSON(): Promise<void> {
  try {
    console.log("🔍 Building search index...\n")

    const documentsPages = await buildPagesDocuments()
    const documentsDocumentation = await getDocumentationSearchDocuments()

    const documents = [...documentsPages, ...documentsDocumentation]
    console.log(`\n📚 Found ${documents.length} documents`)

    const searchData = {
      documents,
      meta: {
        totalDocuments: documents.length,
        generatedAt: new Date().toISOString(),
        version: "3.0",
        chunkedBy: "headings",
      },
    }

    const outputPath = path.join(process.cwd(), "content", "search-index.json")
    fs.writeFileSync(outputPath, JSON.stringify(searchData, null, 2), "utf-8")

    console.log(`\n✅ Exported search index to: ${outputPath}`)
    console.log(`📊 Total documents: ${documents.length}`)

    if (documents.length > 0) {
      const sample = documents[0]
      console.log("\n📄 Sample document:")
      console.log("  ID:", sample.id)
      console.log("  Title:", sample.title)
      console.log("  URL:", sample.url)
      console.log("  Category:", sample.category)
      console.log("  Breadcrumb:", sample.breadcrumb)
      console.log("  Content length:", sample.content.length, "chars")
      console.log(
        "  Content preview:",
        sample.content.substring(0, 200) + "..."
      )
    }

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
