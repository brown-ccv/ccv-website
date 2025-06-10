import fs from 'fs/promises';
import path from 'path';
import matter from 'front-matter';
import MarkdownIt from 'markdown-it';
import * as yaml from 'js-yaml';
import { PageContentData } from '@/lib/storage-types';

const md = new MarkdownIt();

// define diff md/yaml return structures so typescript knows the return can be diff shapes
interface ParsedMarkdownContent {
  data: Record<string, any>;
  content: string;
}

interface ParsedYamlContent {
  data: PageContentData; 
  content: string;
}

export async function readContentFile(filePath: string): Promise<ParsedMarkdownContent | ParsedYamlContent | undefined> {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const extension = path.extname(filePath).toLowerCase();

    if (extension === '.md') {
        const parsed = matter(fileContent);
        return { data: (parsed.attributes || {}) as Record<string, any>, content: md.render(parsed.body) };
    } else if (extension === '.yaml' || extension === '.yml') {
        const parsedYaml = yaml.load(fileContent); // js-yaml.load returns 'unknown' or 'any' by default
        return { data: parsedYaml as PageContentData, content: '' };
    }
    console.warn(`Unsupported file type encountered: ${extension} for file ${filePath}`);
    return undefined;
}

export async function readContentFolder(contentFolder: string) {
  const folderPath = path.join(process.cwd(), 'content', contentFolder);
  const filenames = await fs.readdir(folderPath);

  const results = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(folderPath, filename);
      const parsed = await readContentFile(filePath);
      const extension = path.extname(filename).toLowerCase();
      const slug = filename.replace(/\.(md|yaml|yml)$/, '');

      if (parsed) {
        if (extension === '.md') {
          return { slug, data: parsed.data, content: parsed.content };
        } else if (extension === '.yaml' || extension === '.yml') {
          return { slug, data: parsed.data, content: '' };
        }
      }
      return undefined;
    })
  );
  // filter out undefined results... the final cast assumes all valid files in the folder result in PageContentData,
  // which might need adjustment if your folder contains a mix of YAML (PageContentData) and other Markdown files.
  return results.filter(Boolean) as ({ slug: string; data: PageContentData; content: string })[];
}