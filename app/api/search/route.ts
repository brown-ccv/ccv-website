// app/api/search/route.ts
import { MeiliSearch } from "meilisearch"
import { NextRequest, NextResponse } from "next/server"

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST!,
  apiKey: process.env.MEILI_MASTER_KEY!,
})

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q") || ""
  const limit = parseInt(searchParams.get("limit") || "10")
  const category = searchParams.get("category")

  try {
    const index = client.index("pages")

    const searchOptions: any = {
      limit,
      attributesToHighlight: ["title", "content", "description"],
      highlightPreTag: "<mark>",
      highlightPostTag: "</mark>",
    }

    // Add filters if category is provided
    if (category) {
      searchOptions.filter = `category = ${category}`
    }

    const results = await index.search(query, searchOptions)

    return NextResponse.json(results)
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
