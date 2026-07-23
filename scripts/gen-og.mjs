// Generate the social-share card (client/public/og-preview.png, 1200x630).
// The card is the site's first impression in Slack/LinkedIn, so it leads with
// the hero's terminal - but the machine asks in mono and the person answers
// in serif: `$ whoami` prints the name in Newsreader italic (the vendored
// italic-only face that IS the site's serif voice), while Space Mono handles
// the chrome and the manifesto line. Cream on warm near-black. Rendered at
// DPR 2 with system Chrome (same harness as visual-diff.mjs) so the real
// woff2 fonts do the typesetting, then downscaled to 1200x630 with sharp for
// crisp glyph edges.
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
  @font-face {
    font-family: 'Space Mono';
    font-style: normal;
    font-weight: 700;
    src: url('${FONTS}/space-mono-700.woff2') format('woff2');
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
    padding: 52px 64px;
    display: flex;
  }
  .win {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: hsl(28, 12%, 7%);
    border: 1px solid hsla(42, 36%, 89%, 0.12);
    border-radius: 14px;
    box-shadow: 0 24px 60px hsla(0, 0%, 0%, 0.45);
  }
  .tbar {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 26px;
    border-bottom: 1px solid hsla(42, 36%, 89%, 0.1);
  }
  .dot { width: 15px; height: 15px; border-radius: 50%; }
  .dot.r { background: hsl(6, 45%, 55%); }
  .dot.y { background: hsl(42, 45%, 58%); }
  .dot.g { background: hsl(150, 30%, 48%); }
  .tpath {
    margin-left: 10px;
    font-size: 20px;
    letter-spacing: 0.08em;
    color: hsl(42, 17%, 56%); /* label-muted */
  }
  .tbadge {
    margin-left: auto;
    font-size: 17px;
    letter-spacing: 0.1em;
    color: hsl(42, 17%, 56%);
    border: 1px solid hsla(42, 36%, 89%, 0.18);
    border-radius: 6px;
    padding: 4px 12px;
  }
  .tbody {
    flex: 1;
    padding: 40px 52px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .ln { font-size: 26px; line-height: 1.5; color: hsl(38, 11%, 70%); } /* neutral-300 */
  .ln .ps { color: hsl(42, 17%, 56%); }
  .ln b { color: hsl(42, 36%, 89%); font-weight: 700; } /* primary-400 */
  .name {
    font-family: 'Newsreader', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 94px;
    line-height: 1.08;
    color: hsl(42, 36%, 89%);
    margin: 10px 0 34px;
  }
  .cursor {
    display: inline-block;
    width: 0.55em;
    height: 1.05em;
    background: hsl(42, 36%, 89%);
    vertical-align: text-bottom;
    margin-left: 0.35em;
  }
</style>
</head>
<body>
  <div class="win">
    <div class="tbar">
      <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
      <span class="tpath">~/portfolio</span>
      <span class="tbadge">zsh</span>
    </div>
    <div class="tbody">
      <div class="ln"><span class="ps">$</span> whoami</div>
      <div class="name">Victoria Kirichenko</div>
      <div class="ln"><span class="ps">$</span> cat manifesto.txt</div>
      <div class="ln">Strong code needs <b>strong culture.</b> I build both.</div>
      <div class="ln" style="margin-top: 0.4em;"><span class="ps">$</span><span class="cursor"></span></div>
    </div>
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
