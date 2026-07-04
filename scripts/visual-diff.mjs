// Visual regression harness. Serves the built `public/`, captures full-page
// screenshots of both routes at three widths with system Chrome, and diffs
// them against the stored baseline in `refactor-baseline/`.
//
//   npm run build && node scripts/visual-diff.mjs            # compare
//   npm run build && node scripts/visual-diff.mjs --update   # rebaseline
//
// Interpretation: the page has randomized glyph fields, particles, and
// reveal-timing animations, so the same build diffs against itself at up to
// ~0.4% of pixels. Treat anything under ~0.5% as noise; investigate above it
// (diff images land in refactor-baseline/diff/).
import puppeteer from 'puppeteer-core';
import http from 'http';
import handler from 'serve-handler';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = resolve(ROOT, 'refactor-baseline');
const UPDATE = process.argv.includes('--update');
const PORT = 3113;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const NOISE_FLOOR_PCT = 0.5;

const WIDTHS = [
  ['mobile-375', 375, 812],
  ['tablet-768', 768, 1024],
  ['desktop-1440', 1440, 900],
];
const ROUTES = [
  ['home', `http://localhost:${PORT}/`],
  ['not-found', `http://localhost:${PORT}/this-page-does-not-exist`],
];

mkdirSync(BASELINE, { recursive: true });
const server = http.createServer((req, res) =>
  handler(req, res, {
    public: resolve(ROOT, 'public'),
    rewrites: [{ source: '**', destination: '/index.html' }],
  }),
);
await new Promise((r) => server.listen(PORT, r));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
let failures = 0;

for (const [route, url] of ROUTES) {
  for (const [label, width, height] of WIDTHS) {
    const name = `${route}-${label}`;
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    // Walk the page so scroll-reveals fire, then settle back at the top.
    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 2000));
    const shot = await page.screenshot({ fullPage: true });
    await page.close();

    const baselinePath = `${BASELINE}/${name}.png`;
    if (UPDATE || !existsSync(baselinePath)) {
      writeFileSync(baselinePath, shot);
      console.log(`${name}: baseline ${UPDATE ? 'updated' : 'created'}`);
      continue;
    }

    const a = PNG.sync.read(readFileSync(baselinePath));
    const b = PNG.sync.read(shot);
    if (a.width !== b.width || a.height !== b.height) {
      console.log(`${name}: DIMENSION MISMATCH ${a.width}x${a.height} -> ${b.width}x${b.height}`);
      failures++;
      continue;
    }
    const diff = new PNG({ width: a.width, height: a.height });
    const n = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
    const pct = (n / (a.width * a.height)) * 100;
    const flag = pct > NOISE_FLOOR_PCT ? '  <-- INVESTIGATE' : '';
    console.log(`${name}: ${n} px differ (${pct.toFixed(3)}%)${flag}`);
    if (pct > NOISE_FLOOR_PCT) {
      failures++;
      mkdirSync(`${BASELINE}/diff`, { recursive: true });
      writeFileSync(`${BASELINE}/diff/${name}.png`, PNG.sync.write(diff));
    }
  }
}

await browser.close();
server.close();
process.exit(failures ? 1 : 0);
