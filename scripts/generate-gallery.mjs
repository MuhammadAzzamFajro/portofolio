#!/usr/bin/env node
/**
 * generate-gallery.mjs
 * Scans /public for project images and prints a suggested gallery.ts update.
 * Run: node scripts/generate-gallery.mjs
 *
 * Convention: name files as <projectId>_<n>.png
 * e.g. eschool_1.png, eschool_2.png, noctua_novel_1.png
 *
 * Edit src/data/gallery.ts manually after reviewing the output.
 */

import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const IMAGE_EXT = /\.(png|jpg|jpeg|webp|avif)$/i;

const files = readdirSync(PUBLIC).filter((f) => IMAGE_EXT.test(f));

// Group by prefix (everything before last underscore + number)
const grouped = {};
for (const file of files) {
  const match = file.match(/^(.+?)(?:_(\d+))?\.(?:png|jpg|jpeg|webp|avif)$/i);
  if (!match) continue;
  const key = match[1].replace(/_/g, '-');
  if (!grouped[key]) grouped[key] = [];
  grouped[key].push(file);
}

console.log('\n// === Auto-generated gallery suggestions ===\n');
for (const [projectId, imgs] of Object.entries(grouped)) {
  console.log(`// Project: ${projectId}`);
  imgs.forEach((img, i) => {
    const code = `XX-${String(i + 1).padStart(2, '0')}`;
    console.log(`  { src: '/${img}', alt: '${projectId} screenshot ${i + 1}', code: '${code}', size: 'wide' },`);
  });
  console.log('');
}
