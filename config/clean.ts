import fs from "fs/promises";

const dirsToClean = [
  'dist'
];

async function clean() {
  for (const dir of dirsToClean) {
    await fs.rm(dir, { recursive: true, force: true });
  }

  console.log('Clean completed');
}

clean().catch(console.error);
