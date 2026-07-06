import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ghPagesDir = path.resolve('docs');
const distDir = path.resolve('dist');

if (!fs.existsSync(ghPagesDir)) {
  fs.mkdirSync(ghPagesDir, { recursive: true });
}

const indexHtml = path.join(distDir, 'index.html');
const destHtml = path.join(ghPagesDir, 'index.html');

fs.copyFileSync(indexHtml, destHtml);

console.log('Build copied to docs/');
console.log('Run: git add docs && git commit && git push');