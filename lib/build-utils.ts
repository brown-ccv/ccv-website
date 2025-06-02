import fs from 'fs-extra';
import path from 'path';

async function copyImages(): Promise<void> {
  const sourceDir: string = path.join(process.cwd(), 'content', 'images');
  const targetDir: string = path.join(process.cwd(), 'public', 'images'); 

  try {
    await fs.ensureDir(targetDir);
    await fs.copy(sourceDir, targetDir, { overwrite: true });
    console.log('Images copied from content/images to public/images');
  } catch (err: any) { 
    console.error('Error copying images:', err);
  }
}

copyImages();