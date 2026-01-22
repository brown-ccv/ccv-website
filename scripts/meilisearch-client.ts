import { MeiliSearch } from "meilisearch"
import data from "../content/search-index.json" with { type: "json" }

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST!,
  apiKey: process.env.MEILI_MASTER_KEY!,
})

const index = client.index("pages")

async function addDocumentsWithStatus() {
  try {
    // Add documents and get the task
    const task = await index.addDocuments(data.documents)
    console.log(`Task enqueued with UID: ${task.taskUid}`)

    // Wait for the task to complete
    const result = await client.tasks.waitForTask(task.taskUid)

    if (result.status === "succeeded") {
      console.log("✅ Documents successfully added!")
      console.log(
        `Indexed ${result.details?.indexedDocuments} out of ${result.details?.receivedDocuments} documents`
      )
      console.log(`Duration: ${result.duration}`)
    } else if (result.status === "failed") {
      console.error("❌ Task failed!")
      console.error("Error:", result.error)
    }

    console.log("\nFull task details:", result)
  } catch (error) {
    console.error("Error adding documents:", error)
  }
}

addDocumentsWithStatus().then(() => console.log("complete"))
