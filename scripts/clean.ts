import fs from "fs/promises";

const dirsToClean = [
  'dist'
];

async function clean() {

  // Clean directories if empty
  for (const dir of dirsToClean) {
    try {
      await fs.access(dir);
      const files = await fs.readdir(dir);
      if (files.length === 0) {
        await fs.rmdir(dir);
        console.log(`Removed empty directory ${dir}`);
      }
    } catch (err) {
      // Directory doesn't exist, which is fine
    }
  }

  console.log('Clean completed');
}

clean().catch(console.error);
