import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, "../client/public");

const faviconSvg = await readFile(resolve(out, "favicon.svg"));
const appleSvg = await readFile(resolve(here, "icon-src/apple-touch.svg"));

const png = (svg, size) =>
  sharp(svg, { density: 384 }).resize(size, size, { fit: "contain" }).png().toBuffer();

const icoBufs = await Promise.all([16, 32, 48].map((s) => png(faviconSvg, s)));
await writeFile(resolve(out, "favicon.ico"), await pngToIco(icoBufs));

await sharp(appleSvg, { density: 384 })
  .resize(180, 180, { fit: "contain" })
  .png()
  .toFile(resolve(out, "apple-touch-icon.png"));

console.log("wrote favicon.ico (16/32/48) + apple-touch-icon.png (180)");
