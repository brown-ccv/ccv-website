import { MeiliSearch } from "meilisearch"
import searchIndexData from "../content/search-index.json" with { type: "json" }

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || "http://127.0.0.1:7700",
  apiKey: process.env.MEILISEARCH_MASTER_KEY,
})

const INDEX_NAME = "pages"

// 1. Configure index settings
async function configureIndex() {
  console.log("⚙️  Configuring index settings...")

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

  console.log("✅ Index settings configured\n")
}

// 2. Add/update documents
async function addDocuments() {
  console.log("📤 Adding documents to index...")

  const { documents } = searchIndexData
  console.log(`📚 Found ${documents.length} documents to upload\n`)

  const index = client.index(INDEX_NAME)

  const task = await index.addDocuments(documents, {
    primaryKey: "id",
  })

  console.log(`📨 Task enqueued with UID: ${task.taskUid}`)

  return task.taskUid
}

// 3. Wait for task completion and show status
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

// 4. Get and display index stats
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

// 5. Main orchestration function
async function syncSearchIndex() {
  try {
    console.log("🔍 Starting Meilisearch sync...\n")

    // Step 1: Configure index
    await configureIndex()

    // Step 2: Add documents
    const taskUid = await addDocuments()

    // Step 3: Wait for completion
    await waitForCompletion(taskUid)

    // Step 4: Show stats
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
