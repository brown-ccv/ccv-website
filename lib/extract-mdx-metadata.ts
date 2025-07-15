import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface MDXMetadata {
  [key: string]: any;
}

function extractExportsFromMDX(mdxContent: string): MDXMetadata {
  const exports: MDXMetadata = {};
  
  // Match ESM export statements
  const exportRegex = /export\s+(?:const|let|var)\s+(\w+)\s*=\s*([^;]+);/g;
  let match;
  
  while ((match = exportRegex.exec(mdxContent)) !== null) {
    const [, name, value] = match;
    try {
      // Evaluate the value (for strings, numbers, objects, etc.)
      const evaluatedValue = eval(value);
      exports[name] = evaluatedValue;
    } catch (error) {
      // If eval fails, treat as string (remove quotes)
      const stringValue = value.replace(/^["']|["']$/g, '');
      exports[name] = stringValue;
    }
  }
  
  return exports;
}

function generateMetadataFile(mdxPath: string, metadata: MDXMetadata): void {
  const dir = path.dirname(mdxPath);
  const baseName = path.basename(mdxPath, '.mdx');
  const metadataPath = path.join(dir, `${baseName}.metadata.ts`);
  
  const metadataContent = Object.entries(metadata)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `export const ${key} = "${value.replace(/"/g, '\\"')}";`;
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        return `export const ${key} = ${value};`;
      } else {
        return `export const ${key} = ${JSON.stringify(value)};`;
      }
    })
    .join('\n');
  
  fs.writeFileSync(metadataPath, metadataContent);
  console.log(`Generated metadata file: ${metadataPath}`);
}

function processMDXFiles(): void {
  const contentDir = path.join(process.cwd(), 'app', 'content');
  
  if (!fs.existsSync(contentDir)) {
    console.log('Content directory not found, skipping metadata extraction');
    return;
  }
  
  function walkDir(dir: string): void {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.mdx')) {
        console.log(`Processing MDX file: ${filePath}`);
        
        try {
          const mdxContent = fs.readFileSync(filePath, 'utf8');
          const metadata = extractExportsFromMDX(mdxContent);
          
          if (Object.keys(metadata).length > 0) {
            generateMetadataFile(filePath, metadata);
          }
        } catch (error) {
          console.error(`Error processing ${filePath}:`, error);
        }
      }
    }
  }
  
  walkDir(contentDir);
}

// Run the extraction
processMDXFiles(); 