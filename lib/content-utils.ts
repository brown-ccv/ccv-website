import fs from "fs/promises"
import path from "path"
import matter from "front-matter"
import MarkdownIt from "markdown-it"
import * as yaml from "js-yaml"

const md = new MarkdownIt()

// --- Interfaces for content ---
export interface ContentLinks {
  text: string
  target: string
  category: string
}

export interface ContentSection {
  name: string
  title?: string
  content: string
  links?: ContentLinks[]
}

export interface MarkdownFrontmatter {
  title: string
  links?: ContentLinks[]
  sections?: ContentSection[]
}

export interface YamlContentData {
  title: string
  description?: string
  sections?: ContentSection[]
  links?: ContentLinks[]
}

/**
 * Reads and parses a single content file (.md or .yaml/.yml).
 * For .md files, it parses front-matter and renders markdown to HTML.
 * For .yaml/.yml files, it loads the YAML data.
 * Assumes the file exists and is correctly formatted (either MD or YAML/YML).
 *
 * @param fullFilePath The absolute path to the content file.
 * @returns A promise resolving to ParsedFile<TData>.
 */
export async function readContentFile<TData>(
  fullFilePath: string
): Promise<{ data: TData; content: string }> {
  const fileContent = await fs.readFile(fullFilePath, "utf8")
  const extension = path.extname(fullFilePath).toLowerCase()

  if (extension === ".md") {
    const parsed = matter(fileContent)
    return {
      data: (parsed.attributes || {}) as TData,
      content: md.render(parsed.body), // Return rendered HTML
    }
  } else if (extension === ".yaml" || extension === ".yml") {
    const parsedYaml = yaml.load(fileContent)
    return {
      data: parsedYaml as TData,
      content: "",
    }
  }

  // If we reach here, it's an unsupported file type, but we're assuming valid files exist
  throw new Error(
    `Unsupported file type encountered: ${extension} for file ${fullFilePath}`
  )
}

/**
 * Reads and parses a single content file (.md or .yaml/.yml).
 * For .md files, it parses front-matter and returns raw markdown content.
 * For .yaml/.yml files, it loads the YAML data.
 * Assumes the file exists and is correctly formatted (either MD or YAML/YML).
 *
 * @param fullFilePath The absolute path to the content file.
 * @returns A promise resolving to ParsedFile<TData>.
 */
export async function readContentFileRaw<TData>(
  fullFilePath: string
): Promise<{ data: TData; content: string }> {
  const fileContent = await fs.readFile(fullFilePath, "utf8")
  const extension = path.extname(fullFilePath).toLowerCase()

  if (extension === ".md") {
    const parsed = matter(fileContent)
    return {
      data: (parsed.attributes || {}) as TData,
      content: parsed.body, // Return raw markdown instead of rendered HTML
    }
  } else if (extension === ".yaml" || extension === ".yml") {
    const parsedYaml = yaml.load(fileContent)
    return {
      data: parsedYaml as TData,
      content: "",
    }
  }

  // If we reach here, it's an unsupported file type, but we're assuming valid files exist
  throw new Error(
    `Unsupported file type encountered: ${extension} for file ${fullFilePath}`
  )
}

/**
 * Reads and parses all content files in a specified folder.
 * Each file is returned as an object containing its slug, frontmatter data, and raw markdown content (if Markdown).
 * Assumes all files in the folder are valid .md or .yaml/.yml and will be successfully processed.
 *
 * @param folderRelativePath The relative path to the content folder from `process.cwd()` (e.g., 'content/services/classroom').
 * @returns A promise resolving to an array of parsed content objects.
 */
export async function readContentFolder<
  TData extends MarkdownFrontmatter = MarkdownFrontmatter,
>(
  folderRelativePath: string
): Promise<{ slug: string; data: TData; content: string }[]> {
  const folderPath = path.join(process.cwd(), folderRelativePath)
  const filenames = await fs.readdir(folderPath) // Will throw if folder doesn't exist

  // Use Promise.all directly as we're assuming all files will succeed
  const results = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(folderPath, filename)
      const slug = filename.replace(/\.(md|yaml|yml)$/, "")
      const parsed = await readContentFileRaw<TData>(filePath) // Use raw content function
      return { slug, data: parsed.data, content: parsed.content }
    })
  )

  return results
}
