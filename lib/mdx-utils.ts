import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

export interface MDXMetadata {
  title?: string;
  description?: string;
  [key: string]: any;
}

export function getMDXMetadata(filePath: string): MDXMetadata {
  const fullPath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const { attributes } = frontMatter(content);
  return attributes as MDXMetadata;
}