// import fs from 'fs/promises';
// import path from 'path';
// import matter from 'front-matter';
// import MarkdownIt from 'markdown-it';
// import * as yaml from 'js-yaml';

// interface ParsedMarkdownContent<TData> {
//   data: TData;
//   content: string;
// }

// interface ParsedYamlContent<TData> {
//   data: TData;
//   content: '';
// }

// const md = new MarkdownIt();

// /**
//  * Reads and parses a content file (.md or .yaml/.yml).
//  * Throws an error for unsupported file types.
//  *
//  * @param filePath The absolute path to the content file.
//  * @returns A promise resolving to either ParsedMarkdownContent or ParsedYamlContent,
//  * where TData is the expected structure of the file's content/frontmatter.
//  * @throws {Error} If the file type is unsupported or reading/parsing fails.
//  */
// export async function readContentFile<TData>(
//   filePath: string
// ): Promise<ParsedMarkdownContent<TData> | ParsedYamlContent<TData>> {
//   const fileContent = await fs.readFile(filePath, 'utf8');
//   const extension = path.extname(filePath).toLowerCase();

//   if (extension === '.md') {
//     const parsed = matter(fileContent);
//     return {
//       data: (parsed.attributes || {}) as TData,
//       content: md.render(parsed.body)
//     } as ParsedMarkdownContent<TData>;
//   } else if (extension === '.yaml' || extension === '.yml') {
//     const parsedYaml = yaml.load(fileContent);
//     return {
//       data: parsedYaml as TData,
//       content: ''
//     } as ParsedYamlContent<TData>;
//   }

//   throw new Error(`Unsupported file type encountered: ${extension} for file ${filePath}`);
// }

// /**
//  * Reads and parses all content files in a specified folder.
//  * Filters out any files that cause errors or are of unsupported types.
//  *
//  * @param contentFolder The name of the subfolder within 'content' (e.g., 'about', 'storage').
//  * @returns A promise resolving to an array of parsed content objects,
//  * where TData is the expected structure for files in this folder.
//  */
// export async function readContentFolder<TData>(
//   contentFolder: string
// ): Promise<{ slug: string; data: TData; content: string }[]> {
//   const folderPath = path.join(process.cwd(), 'content', contentFolder);
//   const filenames = await fs.readdir(folderPath);

//   const results = await Promise.allSettled(
//     filenames.map(async (filename) => {
//       const filePath = path.join(folderPath, filename);
//       const extension = path.extname(filename).toLowerCase();
//       const slug = filename.replace(/\.(md|yaml|yml)$/, '');

//       try {
//         const parsed = await readContentFile<TData>(filePath);

//         if (extension === '.md') {
//           return { slug, data: parsed.data, content: parsed.content };
//         } else if (extension === '.yaml' || extension === '.yml') {
//           return { slug, data: parsed.data, content: '' };
//         }
//         console.warn(`Unexpected file type in folder: ${extension} for file ${filePath}`);
//         return null;
//       } catch (error) {
//         console.error(`Error processing file ${filePath}:`, error instanceof Error ? error.message : error);
//         return null;
//       }
//     })
//   );

//   return results
//     .filter((result): result is PromiseFulfilledResult<{ slug: string; data: TData; content: string } | null> => result.status === 'fulfilled')
//     .map(result => result.value)
//     .filter(Boolean) as ({ slug: string; data: TData; content: string })[];
// }


// @/lib/content-utils.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'front-matter';
import MarkdownIt from 'markdown-it';
import * as yaml from 'js-yaml';

const md = new MarkdownIt();

// --- Interfaces for content ---
export interface ContentLinks {
  text: string;
  target: string;
}

export interface MarkdownFrontmatter {
  title?: string;
  links?: ContentLinks[];
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
  const fileContent = await fs.readFile(fullFilePath, 'utf8');
  const extension = path.extname(fullFilePath).toLowerCase();

  if (extension === '.md') {
    const parsed = matter(fileContent);
    return {
      data: (parsed.attributes || {}) as TData,
      content: md.render(parsed.body)
    };
  } else if (extension === '.yaml' || extension === '.yml') {
    const parsedYaml = yaml.load(fileContent);
    return {
      data: parsedYaml as TData,
      content: ''
    };
  }

  // If we reach here, it's an unsupported file type, but we're assuming valid files exist
  throw new Error(`Unsupported file type encountered: ${extension} for file ${fullFilePath}`);
}

/**
 * Reads and parses all content files in a specified folder.
 * Each file is returned as an object containing its slug, frontmatter data, and rendered HTML content (if Markdown).
 * Assumes all files in the folder are valid .md or .yaml/.yml and will be successfully processed.
 *
 * @param folderRelativePath The relative path to the content folder from `process.cwd()` (e.g., 'content/services/classroom').
 * @returns A promise resolving to an array of parsed content objects.
 */
export async function readContentFolder<TData extends MarkdownFrontmatter = MarkdownFrontmatter>(
  folderRelativePath: string
): Promise<{ slug: string; data: TData; content: string }[]> {
  const folderPath = path.join(process.cwd(), folderRelativePath);
  const filenames = await fs.readdir(folderPath); // Will throw if folder doesn't exist

  // Use Promise.all directly as we're assuming all files will succeed
  const results = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(folderPath, filename);
      const slug = filename.replace(/\.(md|yaml|yml)$/, '');
      const parsed = await readContentFile<TData>(filePath); // Will throw if file is bad
      return { slug, data: parsed.data, content: parsed.content };
    })
  );

  return results;
}