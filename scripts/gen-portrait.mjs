// Re-encode the hero portrait for the web.
// Source of truth: assets/victoria_pic.png (1024x1536, ~3.26 MB).
// Output: client/public/victoria-portrait.webp — a stable, hash-free path so
// index.html can <link rel="preload"> it (hashed Vite imports can't be
// preloaded from static HTML, which serialized LCP behind the JS bundle).
//
// Run: node scripts/gen-portrait.mjs
import sharp from 'sharp';

const SRC = new URL('../assets/victoria_pic.png', import.meta.url).pathname;
const OUT = new URL('../client/public/victoria-portrait.webp', import.meta.url).pathname;

const info = await sharp(SRC).webp({ quality: 82 }).toFile(OUT);

console.log(`wrote ${OUT}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} kB`);
