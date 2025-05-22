import fs from 'fs/promises';
import matter from 'gray-matter';

export async function readContentFile(filePath: string) {
  const fileContent = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  return { data, content };
}