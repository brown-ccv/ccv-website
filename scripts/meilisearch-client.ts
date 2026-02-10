import { config } from "dotenv"
import { MeiliSearch } from "meilisearch"
import fs from "fs"
import path from "path"

// Load .env.local only if it exists (local dev)
const envPath = path.join(process.cwd(), ".env.local")
if (fs.existsSync(envPath)) {
  config({ path: envPath })
}

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || "http://127.0.0.1:7700",
  apiKey: process.env.MEILISEARCH_MASTER_KEY || "",
})

const INDEX_NAME = "pages"

// Load search index data at runtime instead of import
function loadSearchIndexData() {
  const indexPath = path.join(process.cwd(), "content", "search-index.json")

  if (!fs.existsSync(indexPath)) {
    throw new Error(
      `search-index.json not found at ${indexPath}. Run 'npm run search:build' first.`
    )
  }

  const data = fs.readFileSync(indexPath, "utf-8")
  return JSON.parse(data)
}

async function configureIndex() {
  const index = client.index(INDEX_NAME)

  await index.updateSettings({
    searchableAttributes: ["title", "headings", "description", "content"],
    filterableAttributes: ["category", "type"],
    sortableAttributes: [],
    rankingRules: [
      "words",
      "typo",
      "proximity",
      "attribute",
      "sort",
      "exactness",
    ],
    displayedAttributes: [
      "id",
      "title",
      "description",
      "headings",
      "url",
      "category",
    ],
  })
}

async function addDocuments() {
  const searchIndexData = loadSearchIndexData()
  const { documents } = searchIndexData

  const index = client.index(INDEX_NAME)

  const task = await index.addDocuments(documents, {
    primaryKey: "id",
  })

  return task.taskUid
}

async function waitForCompletion(taskUid: number) {
  console.log("⏳ Waiting for indexing to complete...\n")

  const result = await client.tasks.waitForTask(taskUid)

  if (result.status === "succeeded") {
    console.log("✅ Documents successfully indexed!")
    console.log(
      `   Indexed: ${result.details?.indexedDocuments || 0} documents`
    )
    console.log(
      `   Received: ${result.details?.receivedDocuments || 0} documents`
    )
    console.log(`   Duration: ${result.duration || "N/A"}`)
  } else if (result.status === "failed") {
    console.error("❌ Indexing failed!")
    console.error("   Error:", result.error)
    throw new Error("Indexing failed")
  }

  return result
}

async function showIndexStats() {
  console.log("\n📊 Index statistics:")

  const index = client.index(INDEX_NAME)
  const stats = await index.getStats()

  console.log(`   Total documents: ${stats.numberOfDocuments}`)
  console.log(`   Is indexing: ${stats.isIndexing ? "Yes" : "No"}`)
  console.log(`   Field distribution:`)

  Object.entries(stats.fieldDistribution).forEach(([field, count]) => {
    console.log(`      ${field}: ${count}`)
  })
}

async function syncSearchIndex() {
  try {
    console.log("🔍 Starting Meilisearch sync...\n")

    await configureIndex()
    const taskUid = await addDocuments()
    await waitForCompletion(taskUid)
    await showIndexStats()

    console.log("\n✨ Meilisearch sync complete!")
  } catch (error) {
    console.error("\n❌ Error syncing to Meilisearch:", error)
    if (error instanceof Error) {
      console.error(error.message)
      console.error(error.stack)
    }
    process.exit(1)
  }
}

// Run the sync
syncSearchIndex()
