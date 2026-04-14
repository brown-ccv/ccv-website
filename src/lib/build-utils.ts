import fs from "fs-extra"
import path from "path"

async function copyImages(): Promise<void> {
  const sourceDir: string = path.join(process.cwd(), "content", "images")
  const targetDir: string = path.join(process.cwd(), "public", "images")

  try {
    if (await fs.pathExists(targetDir)) {
      await fs.remove(targetDir)
    }
    await fs.copy(sourceDir, targetDir)
  } catch (err: any) {
    console.error("Error during image synchronization:", err)
    throw err
  }
}

// Execute the function
copyImages()
  .then(() => console.log("Image synchronization process completed."))
  .catch((error) =>
    console.error("Image synchronization process failed:", error)
  )
