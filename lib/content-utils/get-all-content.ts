import fs from 'fs/promises';
import path from 'path';
import { readContentFile } from './read-content-file';

export async function getAllContent(contentDirectory: string) {
  const filenames = await fs.readdir(contentDirectory);

  return Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(contentDirectory, filename);
      const { data, content } = await readContentFile(filePath);

      return {
        slug: filename.replace(/\.(md|yaml)$/, ''),
        ...data,
        content,
      };
    })
  );
}