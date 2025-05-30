import fs from 'fs/promises';
import path from 'path';
import matter from 'front-matter';
import MarkdownIt from 'markdown-it';

const contentDirectory = path.join(process.cwd(), 'content');
const md = new MarkdownIt();

export async function readContentFile(filePath: string): Promise<{ data: Record<string, any>; content: string } | undefined> {
  const fileContent = await fs.readFile(filePath, 'utf8');
  const extension = path.extname(filePath).toLowerCase();

  if (extension === '.md') {
    const parsed = matter(fileContent);
    return { data: parsed.attributes as Record<string, any> || {}, content: md.render(parsed.body) };
  } else if (extension === '.yaml' || extension === '.yml') {
    // dynamically import js-yaml to decrease bundle size and initial load times, 
    // also can help isolate dependencies and prevent unexpected interactions between parts of code
    // change if many yaml files and dependency issue isn't a problem
    const yaml = (await import('js-yaml')).load(fileContent) as Record<string, any>;
    return { data: yaml, content: '' };
  }
}

export async function getAllContent(contentFolder: string) {
  const folderPath = path.join(contentDirectory, contentFolder);
  const filenames = await fs.readdir(folderPath);

  return Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(folderPath, filename);
      const parsed = await readContentFile(filePath);
      const extension = path.extname(filename).toLowerCase();
      const slug = filename.replace(/\.(md|yaml|yml)$/, '');

      if (parsed) {
        if (extension === '.md') {
          return {
            slug,
            data: parsed.data || {},
            content: parsed.content,
          };
        } else if (extension === '.yaml' || extension === '.yml') {
          return {
            slug,
            data: parsed.data || {},
            content: '',
          };
        }
      }
      return undefined;
    })
  ).then(results => results.filter(Boolean) as ({ slug: string; data: Record<string, any>; content: string })[]);
}

// separate slugify utility
export function slugify(filename: string): string {
  return filename.replace(/\s+/g, '-').replace(/\.[^.]+$/, '').toLowerCase();
}