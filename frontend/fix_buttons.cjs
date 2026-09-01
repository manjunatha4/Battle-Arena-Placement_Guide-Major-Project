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

  // Add ! to enforce solid colors over .glass-button class
  content = content.replace(/bg-\[var\(--text-main\)\] text-\[var\(--bg-base\)\] border border-\[var\(--border-glass\)\] hover:bg-\[var\(--text-muted\)\]/g, '!bg-[var(--text-main)] !text-[var(--bg-base)] border border-[var(--border-glass)] hover:!bg-[var(--text-muted)]');
  
  // There was also an edge case in JobRecommendations and others where the class might be slightly different if they didn't have border
  content = content.replace(/bg-\[var\(--text-main\)\] text-\[var\(--bg-base\)\]/g, '!bg-[var(--text-main)] !text-[var(--bg-base)]');
  content = content.replace(/hover:bg-\[var\(--text-muted\)\]/g, 'hover:!bg-[var(--text-muted)]');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed button visibility in ${file}`);
  }
});
