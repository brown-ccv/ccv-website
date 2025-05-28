import fs from 'fs/promises';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import yaml from 'js-yaml';

const contentDirectory = path.join(process.cwd(), 'content');

export async function parseMarkdownWithFrontmatter(markdown: string): Promise<{ data: Record<string, any>; content: string }> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .process(markdown);

    console.log('Parsed Markdown Result:', result); // Add this line

  return { data: result.data || {}, content: String(result.value) };
}

export async function readContentFile(filePath: string): Promise<{ data: Record<string, any>; content: string } | undefined> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const extension = path.extname(filePath).toLowerCase();

    if (extension === '.md') {
      return await parseMarkdownWithFrontmatter(fileContent); // Await the parsing
    } else if (extension === '.yaml' || extension === '.yml') {
      const data = yaml.load(fileContent) as Record<string, any>;
      return { data, content: '' };
    }
  } catch (error) {
    console.error('Error reading or parsing file:', filePath, error);
    return undefined; // Handle potential file reading errors
  }
  return undefined; // For other file types
}

export async function getAllContent(contentFolder: string) {
  const folderPath = path.join(contentDirectory, contentFolder);
  const filenames = await fs.readdir(folderPath);

  return Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(folderPath, filename);
      const parsed = await readContentFile(filePath);
      if (parsed) {
        return {
          slug: filename.replace(/\.(md|yaml|yml)$/, ''),
          ...parsed.data,
          content: parsed.content,
        };
      }
      // Handle the case where readContentFile might have failed or returned undefined
      return undefined;
    })
  ).then(results => results.filter(Boolean) as { slug: string; [key: string]: any; content: string }[]);
}

// separate slugify utility
export function slugify(filename: string): string {
  return filename.replace(/\s+/g, '-').replace(/\.[^.]+$/, '').toLowerCase();
}
