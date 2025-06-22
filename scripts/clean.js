const fs = require('fs');
const path = require('path');

const filesToClean = [
  'dist/manifest.json',
  'templates/directory.json'
];

const dirsToClean = [
  'dist'
];

// Clean specific files
filesToClean.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`Deleted ${file}`);
    }
  } catch (err) {
    console.warn(`Could not delete ${file}:`, err.message);
  }
});

// Clean directories if empty
dirsToClean.forEach(dir => {
  try {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      if (files.length === 0) {
        fs.rmdirSync(dir);
        console.log(`Removed empty directory ${dir}`);
      }
    }
  } catch (err) {
    console.warn(`Could not remove directory ${dir}:`, err.message);
  }
});

console.log('Clean completed');
