import fs from "fs/promises"
import path from "path"
import matter from "front-matter"
import MarkdownIt from "markdown-it"
import * as yaml from "js-yaml"

const md = new MarkdownIt()

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
