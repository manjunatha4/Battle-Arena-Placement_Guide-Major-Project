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

  // Replace text-white and text-gray-* to ensure light mode compatibility
  // Only replace if they are standalone tailwind classes
  content = content.replace(/\btext-white\b/g, 'text-[var(--text-main)]');
  content = content.replace(/\btext-gray-200\b/g, 'text-[var(--text-muted)]');
  content = content.replace(/\btext-gray-300\b/g, 'text-[var(--text-muted)]');
  content = content.replace(/\btext-gray-400\b/g, 'text-[var(--text-muted)]');
  content = content.replace(/\btext-gray-500\b/g, 'text-[var(--text-muted)]');
  
  // Specific bg-black/40 that hides text in light mode
  // bg-black/40 in light mode makes a gray box. It's better to use bg-[var(--bg-glass-hover)] or var(--bg-glass)
  content = content.replace(/\bbg-black\/40\b/g, 'bg-[var(--bg-glass)]');
  content = content.replace(/\bbg-black\/20\b/g, 'bg-[var(--bg-glass)]');
  content = content.replace(/\bbg-black\/10\b/g, 'bg-[var(--bg-glass-hover)]');
  content = content.replace(/\bbg-black\/50\b/g, 'bg-[var(--bg-glass)]');
  content = content.replace(/\bbg-black\/60\b/g, 'bg-[var(--bg-glass-hover)]');

  // Fix hover states
  content = content.replace(/\bhover:text-white\b/g, 'hover:text-[var(--text-main)]');
  content = content.replace(/\bhover:bg-black\/60\b/g, 'hover:bg-[var(--bg-glass-hover)]');
  
  // Keep badges with bg-red-* visible
  // The badge bg is bg-red-500, we want text-white on red badges, so we restore text-white ONLY for those explicitly
  content = content.replace(/bg-red-500\/80 text-\[var\(--text-main\)\]/g, 'bg-red-500/80 text-white');
  content = content.replace(/bg-red-600 hover:bg-red-700 text-\[var\(--text-main\)\]/g, 'bg-red-600 hover:bg-red-700 text-white');
  content = content.replace(/bg-red-600\/90 backdrop-blur-md px-3\.5 py-1\.5 rounded-full font-bold flex items-center gap-1\.5 z-10 text-\[var\(--text-main\)\]/g, 'text-white bg-red-600/90 backdrop-blur-md px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 z-10');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed light theme in ${file}`);
  }
});
