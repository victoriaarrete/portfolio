// Generate the social-share card (client/public/og-preview.png, 1200x630).
// The card is the site's first impression in Slack/LinkedIn, so it speaks the
// site's own language: Newsreader italic for the name (the serif is vendored
// italic-only - that IS the site's serif voice), Space Mono for the chrome,
// cream on warm near-black. Rendered at DPR 2 with system Chrome (same
// harness as visual-diff.mjs) so the real woff2 fonts do the typesetting,
// then downscaled to 1200x630 with sharp for crisp glyph edges.
//
// Run: node scripts/gen-og.mjs
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = resolve(ROOT, 'client/public/og-preview.png');
const FONTS = `file://${resolve(ROOT, 'client/public/fonts')}`;

const WIDTH = 1200;
const HEIGHT = 630;

const html = /* html */ `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: 'Newsreader';
    font-style: italic;
    font-weight: 400;
    src: url('${FONTS}/newsreader-italic-400.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Space Mono';
    font-style: normal;
    font-weight: 400;
    src: url('${FONTS}/space-mono-400.woff2') format('woff2');
  }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    /* tokens.css: neutral-950 ground, warmed slightly toward the top right */
    background:
      radial-gradient(120% 140% at 85% -20%, hsl(30, 12%, 11%) 0%, transparent 60%),
      hsl(28, 12%, 5%);
    font-family: 'Space Mono', monospace;
    padding: 64px 72px;
    display: flex;
  }
  .frame {
    /* the site's hairline border language: primary-400 at 16% */
    border: 1px solid hsla(42, 36%, 89%, 0.16);
    flex: 1;
    padding: 56px 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .domain {
    font-size: 22px;
    letter-spacing: 0.22em;
    color: hsl(42, 17%, 56%); /* label-muted */
  }
  .name {
    font-family: 'Newsreader', serif;
    font-style: italic;
    font-size: 104px;
    line-height: 1.05;
    color: hsl(42, 36%, 89%); /* primary-400 */
  }
  .tagline {
    font-family: 'Newsreader', serif;
    font-style: italic;
    font-size: 40px;
    line-height: 1.3;
    color: hsl(38, 11%, 70%); /* neutral-300 */
    max-width: 21em;
    margin-top: 28px;
  }
  .meta {
    font-size: 21px;
    letter-spacing: 0.14em;
    color: hsl(42, 17%, 56%);
  }
  .meta .cursor {
    display: inline-block;
    width: 0.55em;
    height: 1.05em;
    background: hsl(42, 36%, 89%);
    vertical-align: text-bottom;
    margin-left: 10px;
  }
</style>
</head>
<body>
  <div class="frame">
    <div class="domain">victoriakirichenko.com</div>
    <div>
      <div class="name">Victoria Kirichenko</div>
      <div class="tagline">I build systems that scale - and teams that want to.</div>
    </div>
    <div class="meta">r&amp;d team leader &nbsp;&middot;&nbsp; tel aviv<span class="cursor"></span></div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.evaluateHandle('document.fonts.ready');
const shot = await page.screenshot({ type: 'png' });
await browser.close();

const info = await sharp(shot).resize(WIDTH, HEIGHT).png({ compressionLevel: 9 }).toFile(OUT);
console.log(
  `wrote og-preview.png: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} kB`,
);
