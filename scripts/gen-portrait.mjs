// Re-encode the hero portrait for the web.
// Source of truth: assets/victoria_pic.png (1024x1536, ~3.26 MB).
// Output: client/public/victoria-portrait-{w}.{avif,webp} plus the legacy
// victoria-portrait.webp <img> fallback — stable, hash-free paths so
// index.html can <link rel="preload"> them (hashed Vite imports can't be
// preloaded from static HTML, which serialized LCP behind the JS bundle).
//
// Widths match the hero's two layouts: mobile full-bleed banner (~100vw,
// so 768 covers DPR2 phones) and the desktop left column (<=420 CSS px).
//
// Run: node scripts/gen-portrait.mjs
import sharp from 'sharp';

const SRC = new URL('../assets/victoria_pic.png', import.meta.url).pathname;
const outPath = (name) => new URL(`../client/public/${name}`, import.meta.url).pathname;

const WIDTHS = [480, 768, 1024];
const FORMATS = [
  { ext: 'avif', options: { quality: 60 }, method: 'avif' },
  { ext: 'webp', options: { quality: 82 }, method: 'webp' },
];

for (const width of WIDTHS) {
  for (const { ext, options, method } of FORMATS) {
    const name = `victoria-portrait-${width}.${ext}`;
    const info = await sharp(SRC).resize({ width })[method](options).toFile(outPath(name));
    console.log(`wrote ${name}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} kB`);
  }
}

// Legacy full-size fallback for the <img src> (browsers without srcset/AVIF)
const fallback = await sharp(SRC).webp({ quality: 82 }).toFile(outPath('victoria-portrait.webp'));
console.log(`wrote victoria-portrait.webp: ${(fallback.size / 1024).toFixed(0)} kB`);
