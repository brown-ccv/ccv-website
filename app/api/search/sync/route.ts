// app/api/search/sync/route.ts
import { MeiliSearch } from "meilisearch"
import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST!,
  apiKey: process.env.MEILI_MASTER_KEY!,
})

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const expectedToken = `Bearer ${process.env.SYNC_SECRET_TOKEN}`

  if (authHeader !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Read the search index data
    const dataPath = path.join(process.cwd(), "content/search-index.json")
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"))

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

    // Add documents
    const task = await index.addDocuments(data)

    // Wait for task to complete
    await client.tasks.waitForTask(task.taskUid)

    const stats = await index.getStats()

    return NextResponse.json({
      success: true,
      documentsIndexed: stats.numberOfDocuments,
      taskUid: task.taskUid,
    })
  } catch (error) {
    console.error("Sync error:", error)
    return NextResponse.json(
      {
        error: "Sync failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
