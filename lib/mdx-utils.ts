import fs from "fs"
import path from "path"
import frontMatter from "front-matter"

/**
 * Interface for MDX front matter metadata
 */
export interface MDXMetadata {
  /** The Hero title for the page */
  title?: string
  /** The Hero description for the page */
  description?: string

  /** Additional metadata properties */
  [key: string]: any
}

export type MdxSectionItem = {
  id: string
  label: string
}

/**
 * Extracts front matter metadata from an MDX file
 * @param filePath - The relative path to the MDX file from the project root
 * @returns The parsed front matter metadata
 * @example
 * ```typescript
 * const metadata = getMDXMetadata('content/services/stronghold.mdx');
 * console.log(metadata.title); // "Stronghold"
 * ```
 */
export function getMDXMetadata(filePath: string): MDXMetadata {
  const fullPath = path.join(process.cwd(), filePath)
  const content = fs.readFileSync(fullPath, "utf8")
  const { attributes } = frontMatter(content)
  return attributes as MDXMetadata
}

export function getMdxSectionItems(mdxRelativePath: string): MdxSectionItem[] {
  const fullPath = path.join(process.cwd(), mdxRelativePath)
  const source = fs.readFileSync(fullPath, "utf8")

  // Matches: <ContentSection ... title="X" ... id="Y" ...>
  // in either title->id or id->title order
  const tagRegex = /<ContentSection\b[^>]*>/g
  const idRegex = /\bid=["']([^"']+)["']/
  const titleRegex = /\btitle=["']([^"']+)["']/

  const items: MdxSectionItem[] = []
  const tags = source.match(tagRegex) ?? []

  for (const tag of tags) {
    const idMatch = tag.match(idRegex)
    const titleMatch = tag.match(titleRegex)
    if (idMatch?.[1] && titleMatch?.[1]) {
      items.push({
        id: idMatch[1],
        label: titleMatch[1],
      })
    }
  }

  return items
}
