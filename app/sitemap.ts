import fs from "fs"
import { MetadataRoute } from "next"
import path from "path"

// Required for static export
export const dynamic = "force-static"

const baseUrl = process.env.SITE_URL || "http://localhost:3000"
const baseDir = "app"

async function getRoutes(): Promise<MetadataRoute.Sitemap> {
  const fullPath = path.join(process.cwd(), baseDir)
  let routes: string[] = ["/"] // Always include home page

  function scanDirectory(dirPath: string, currentRoute: string = "") {
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true })

      entries.forEach((entry) => {
        if (entry.isDirectory()) {
          const routePath = currentRoute
            ? `${currentRoute}/${entry.name}`
            : `/${entry.name}`

          const subDirPath = path.join(dirPath, entry.name)

          // Only add route if it has a page.tsx file
          const pageFilePath = path.join(subDirPath, "page.tsx")
          if (fs.existsSync(pageFilePath)) {
            routes.push(routePath)
          }

          // Recursively scan subdirectories
          scanDirectory(subDirPath, routePath)
        }
      })
    } catch (error) {
      // Handle case where directory doesn't exist or can't be read
      console.warn(`Could not read directory: ${dirPath}`)
    }
  }

  // Start scanning from the base directory
  scanDirectory(fullPath)

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1.0 : 0.8, // Give home page higher priority
  }))
}

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getRoutes()
}
