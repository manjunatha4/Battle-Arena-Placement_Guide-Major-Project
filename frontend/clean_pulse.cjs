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

  // Remove animate-pulse
  content = content.replace(/animate-pulse/g, '');
  // Clean up any double spaces left behind
  content = content.replace(/  +/g, ' ');
  // Clean up any empty classNames like className=" "
  content = content.replace(/className="\s+"/g, '');
  
  // Remove remaining custom drop shadows that are colored
  content = content.replace(/shadow-\[0_0_[0-9]+px_var\(--accent-purple\)\]/g, 'shadow-sm');
  content = content.replace(/shadow-\[0_0_[0-9]+px_rgba\([0-9]+,[0-9]+,[0-9]+,0\.[0-9]+\)\]/g, 'shadow-sm');
  content = content.replace(/shadow-\[0_0_[0-9]+px_#[0-9a-fA-F]+\]/g, 'shadow-sm');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Removed pulse and glows from ${file}`);
  }
});
