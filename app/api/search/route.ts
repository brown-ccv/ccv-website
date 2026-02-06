import { MeiliSearch } from "meilisearch"
import { NextRequest, NextResponse } from "next/server"

// Create Meilisearch client
// Uses MEILISEARCH_SEARCH_KEY if available, otherwise falls back to MASTER_KEY
const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || "http://127.0.0.1:7700",
  apiKey:
    process.env.MEILISEARCH_SEARCH_KEY ||
    process.env.MEILISEARCH_MASTER_KEY ||
    "",
})

export async function GET(request: NextRequest) {
  try {
    // Extract search parameters from URL
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""
    const category = searchParams.get("category")
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = parseInt(searchParams.get("offset") || "0")

    // Validate query parameter
    if (!query || query.trim() === "") {
      return NextResponse.json(
        { error: "Query parameter 'q' is required and cannot be empty" },
        { status: 400 }
      )
    }

    // Get the index
    const index = client.index("pages")

    // Build search options
    const searchOptions: Record<string, any> = {
      limit,
      offset,
      attributesToHighlight: ["title", "headings", "description", "content"],
      attributesToCrop: ["content"],
      cropLength: 200,
      attributesToRetrieve: [
        "id",
        "title",
        "description",
        "headings",
        "url",
        "category",
      ],
    }

    // Add category filter if specified
    if (category) {
      searchOptions.filter = `category = "${category}"`
    }

    // Perform search
    const results = await index.search(query, searchOptions)

    // Return results
    return NextResponse.json({
      hits: results.hits,
      query: results.query,
      processingTimeMs: results.processingTimeMs,
      hitsCount: results.estimatedTotalHits,
      limit: results.limit,
      offset: results.offset,
    })
  } catch (error) {
    console.error("Search error:", error)

    // Provide more detailed error information
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Search failed",
          message: error.message,
          // Only include stack trace in development
          ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}

// Add OPTIONS for CORS if needed
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  )
}
