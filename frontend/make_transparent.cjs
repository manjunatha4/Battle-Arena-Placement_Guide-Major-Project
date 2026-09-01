const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = [
  ...walkSync('c:/Finally-Placed-main/frontend/src/pages'),
  ...walkSync('c:/Finally-Placed-main/frontend/src/components')
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // We want to remove bg-[var(--bg-base)] from the outer containers 
  // so the global body background can be seen.
  content = content.replace(/\bbg-\[var\(--bg-base\)\]/g, 'bg-transparent');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Made background transparent in ${file}`);
  }
});
