import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

/**
 * Interface for MDX front matter metadata
 */
export interface MDXMetadata {
  /** The Hero title for the page */
  title?: string;
  /** The Hero description for the page */
  description?: string;
  /** Additional metadata properties */
  [key: string]: any;
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
  const fullPath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const { attributes } = frontMatter(content);
  return attributes as MDXMetadata;
}