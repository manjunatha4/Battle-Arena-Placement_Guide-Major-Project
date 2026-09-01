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

  // Replace gradients on buttons
  content = content.replace(/!bg-gradient-to-r from-\[var\(--accent-purple\)\] to-\[var\(--accent-cyan\)\] !border-0 text-white/g, 'bg-[var(--text-main)] text-[var(--bg-base)] border border-[var(--border-glass)] hover:bg-[var(--text-muted)]');
  content = content.replace(/!bg-gradient-to-r from-\[var\(--accent-purple\)\] to-\[var\(--accent-cyan\)\] text-white/g, 'bg-[var(--text-main)] text-[var(--bg-base)] border border-[var(--border-glass)] hover:bg-[var(--text-muted)]');
  content = content.replace(/!bg-gradient-to-r from-\[var\(--accent-purple\)\] to-\[var\(--accent-cyan\)\]/g, 'bg-[var(--text-main)] text-[var(--bg-base)] border border-[var(--border-glass)] hover:bg-[var(--text-muted)]');
  content = content.replace(/bg-gradient-to-r from-\[var\(--accent-purple\)\] to-\[var\(--accent-cyan\)\] !border-0 text-white/g, 'bg-[var(--text-main)] text-[var(--bg-base)] border border-[var(--border-glass)] hover:bg-[var(--text-muted)]');

  // Replace text gradients
  content = content.replace(/bg-clip-text text-transparent bg-gradient-to-r from-\[var\(--accent-purple\)\] to-\[var\(--accent-cyan\)\]/g, 'text-[var(--text-main)]');
  content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-\[var\(--accent-purple\)\] via-\[var\(--accent-cyan\)\] to-\[var\(--accent-blue\)\]/g, 'text-[var(--text-main)]');
  content = content.replace(/bg-gradient-to-r from-\[var\(--accent-purple\)\] via-\[var\(--accent-cyan\)\] to-\[var\(--accent-blue\)\] bg-clip-text text-transparent/g, 'text-[var(--text-main)]');
  content = content.replace(/bg-gradient-to-r from-\[var\(--accent-purple\)\] via-\[var\(--accent-cyan\)\] to-\[var\(--accent-blue\)\] text-transparent bg-clip-text/g, 'text-[var(--text-main)]');

  // Remove neon shadows
  content = content.replace(/shadow-\[0_0_15px_rgba\(147,51,234,0\.3\)\]/g, 'shadow-sm');
  content = content.replace(/shadow-\[0_0_15px_rgba\(6,182,212,0\.3\)\]/g, 'shadow-sm');
  content = content.replace(/shadow-\[0_0_20px_rgba\(147,51,234,0\.15\)\]/g, 'shadow-sm');
  content = content.replace(/shadow-\[0_0_20px_rgba\(139,92,246,0\.2\)\]/g, 'shadow-sm');
  content = content.replace(/drop-shadow-\[0_0_15px_rgba\(139,92,246,0\.5\)\]/g, '');
  content = content.replace(/shadow-lg shadow-\[var\(--accent-purple\)\]\/20/g, 'shadow-sm');
  content = content.replace(/shadow-md shadow-\[var\(--accent-purple\)\]\/10/g, 'shadow-sm');
  content = content.replace(/shadow-\[0_0_10px_rgba\(147,51,234,0\.2\)\]/g, 'shadow-sm');

  // Replace neon text and borders
  content = content.replace(/text-\[var\(--accent-purple\)\] animate-pulse/g, 'text-[var(--text-muted)]');
  content = content.replace(/text-\[var\(--accent-purple\)\]/g, 'text-[var(--text-main)]');
  content = content.replace(/hover:!border-\[var\(--accent-purple\)\]/g, 'hover:border-[var(--text-muted)]');
  content = content.replace(/hover:border-\[var\(--accent-purple\)\]\/50/g, 'hover:border-[var(--text-muted)]');
  content = content.replace(/border-\[var\(--accent-purple\)\]\/50/g, 'border-[var(--border-glass)]');
  content = content.replace(/border-\[var\(--accent-purple\)\]\/30/g, 'border-[var(--border-glass)]');
  content = content.replace(/bg-\[var\(--accent-purple\)\]\/20/g, 'bg-[var(--bg-glass-hover)]');
  content = content.replace(/bg-\[var\(--accent-purple\)\]\/10/g, 'bg-[var(--bg-glass-hover)]');
  
  // Specific Dashboard overrides
  content = content.replace(/bg-gradient-to-r from-red-600 to-orange-600 !border-0/g, 'bg-[var(--text-main)] text-[var(--bg-base)] border border-[var(--border-glass)] hover:bg-[var(--text-muted)]');
  content = content.replace(/bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400/g, 'text-[var(--text-main)]');
  content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500/g, 'text-[var(--text-main)]');
  content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600/g, 'text-[var(--text-main)]');
  content = content.replace(/shadow-\[0_0_10px_rgba\(239,68,68,0\.8\)\]/g, 'shadow-sm');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log("Cleanup complete!");
