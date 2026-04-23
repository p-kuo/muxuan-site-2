/**
 * optimize-line-qr.mjs
 *
 * Crops white-space borders, resizes to a common square, and exports
 * both LINE QR codes as WebP for optimal web loading / SEO / GEO.
 *
 * Prerequisites:
 *   npm install --save-dev sharp
 *
 * Usage:
 *   1. Save your raw QR images anywhere (see INPUT paths below).
 *   2. node scripts/optimize-line-qr.mjs
 *   3. Outputs go to client/public/assets/ ready for the modal.
 */

import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// ── EDIT THESE if your source files have different names/locations ───────────
const SOURCES = {
  chiayi: path.join(root, "scripts", "qr-raw-chiayi.png"),  // drop your Chiayi QR here
  taipei: path.join(root, "scripts", "qr-raw-taipei.png"),  // drop your Taipei QR here
};
// ─────────────────────────────────────────────────────────────────────────────

const OUT_DIR = path.join(root, "client", "public", "assets");
const TARGET_SIZE = 400; // final px — large enough for crisp display, small enough to load fast
const WEBP_QUALITY = 90; // high quality for QR scanability

async function trimAndExport(srcPath, outName) {
  const img = sharp(srcPath);
  const { data, info } = await img
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Find bounding box of non-white pixels
  const { width, height, channels } = info;
  let top = height, left = width, bottom = 0, right = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      // Consider anything not near-white as content
      if (r < 240 || g < 240 || b < 240) {
        if (y < top)    top    = y;
        if (y > bottom) bottom = y;
        if (x < left)   left   = x;
        if (x > right)  right  = x;
      }
    }
  }

  // Add a small padding so finder squares aren't clipped
  const PAD = 8;
  top    = Math.max(0, top    - PAD);
  left   = Math.max(0, left   - PAD);
  bottom = Math.min(height - 1, bottom + PAD);
  right  = Math.min(width  - 1, right  + PAD);

  const cropW = right  - left  + 1;
  const cropH = bottom - top   + 1;
  // Make the crop square (take the larger dimension)
  const side = Math.max(cropW, cropH);
  const padX = Math.floor((side - cropW) / 2);
  const padY = Math.floor((side - cropH) / 2);

  const outPath = path.join(OUT_DIR, `${outName}.webp`);
  await sharp(srcPath)
    .extract({ left, top, width: cropW, height: cropH })
    .extend({
      top:    padY,
      bottom: side - cropH - padY,
      left:   padX,
      right:  side - cropW - padX,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .resize(TARGET_SIZE, TARGET_SIZE, { fit: "fill" })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(outPath);

  console.log(`✅  ${outName}.webp  (${TARGET_SIZE}×${TARGET_SIZE}px)  →  client/public/assets/`);
}

console.log("🔧  Optimising LINE QR codes...\n");
await trimAndExport(SOURCES.chiayi, "line-qr-chiayi");
await trimAndExport(SOURCES.taipei, "line-qr-taipei");
console.log("\n🎉  Done. Both QR codes are ready.");
