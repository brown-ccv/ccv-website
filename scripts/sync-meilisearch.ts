import { MeiliSearch } from "meilisearch"
import fs from "fs"
import path from "path"

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST!,
  apiKey: process.env.MEILI_MASTER_KEY!,
})

async function sync() {
  try {
    const dataPath = path.join(process.cwd(), "content/search-index.json")
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"))

    console.log(`📋 Configuring index "pages"...`)
    const index = client.index("pages")

    // Update settings
    await index.updateSettings({
      searchableAttributes: ["title", "description", "content", "category"],
      displayedAttributes: [
        "id",
        "title",
        "description",
        "url",
        "type",
        "category",
      ],
      filterableAttributes: ["type", "category"],
      sortableAttributes: ["title"],
      rankingRules: [
        "words",
        "typo",
        "proximity",
        "attribute",
        "sort",
        "exactness",
      ],
    })

    console.log(`📚 Adding ${data.length} documents...`)
    const task = await index.addDocuments(data)

    console.log(`⏳ Waiting for indexing task ${task.taskUid}...`)
    await client.tasks.waitForTask(task.taskUid)

    const stats = await index.getStats()
    console.log(
      `✅ Success! Total documents indexed: ${stats.numberOfDocuments}`
    )
  } catch (error) {
    console.error("❌ Error syncing to Meilisearch:", error)
    process.exit(1)
  }
}

sync()
