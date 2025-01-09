import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { remark } from "remark"
import html from "remark-html"

export interface RouteData {
  slug: string
  title: string
  description: string
}

const routeDirectory = path.join(process.cwd(), "content/routes")

export function getRoutes(): RouteData[] {
  const fileNames = fs.readdirSync(routeDirectory)
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(routeDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      ...data,
    } as RouteData
  })
}
