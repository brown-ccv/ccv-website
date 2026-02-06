import { config } from "dotenv"
import { MeiliSearch } from "meilisearch"

config({ path: ".env.production" }) // or .env.local for testing

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST!,
  apiKey: process.env.MEILISEARCH_MASTER_KEY!,
})

async function setupProductionSearchKey() {
  try {
    console.log("🔑 Setting up production search key...\n")

    // Check if key already exists
    const { results: existingKeys } = await client.getKeys()

    let searchKey = existingKeys.find((key) => key.name === "Public Search Key")

    if (!searchKey) {
      // Create a new search-only key
      searchKey = await client.createKey({
        name: "Public Search Key",
        description: "Public search key for website",
        actions: ["search"],
        indexes: ["pages"],
        expiresAt: null,
      })
      console.log("✅ Search key created!")
    } else {
      console.log("✅ Search key already exists")
    }

    console.log("\n📋 Add these to your environment variables:")
    console.log(`MEILISEARCH_SEARCH_KEY=${searchKey.key}`)
    console.log(`MEILISEARCH_SEARCH_KEY_UID=${searchKey.uid}`)
  } catch (error) {
    console.error("❌ Error setting up search key:");
    if (error instanceof Error) {
      console.error(`Name: ${error.name}`);
      console.error(`Message: ${error.message}`);
      if (error.stack) {
        console.error("Stack:", error.stack);
      }
    } else {
      try {
        console.error("Details:", JSON.stringify(error, null, 2));
      } catch {
        console.error("Details:", error);
      }
    }
    process.exit(1);
  }
}

setupProductionSearchKey()
