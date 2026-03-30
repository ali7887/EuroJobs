import fs from "fs";
import path from "path";

const ROOT = "./src";
const OUTPUT = "CODE_NODE.txt";

function walk(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const files = walk(ROOT);

fs.writeFileSync(OUTPUT, ""); // clear file

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  const block = `
=============================
FILE: ${file}
=============================

${content}

`;

  fs.appendFileSync(OUTPUT, block, "utf8");
});

console.log("✓ Created code.txt from src folder");

