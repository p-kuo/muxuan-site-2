/**
 * extract-cert-images.mjs
 *
 * Converts pages 1 and 2 of each heavy-metal lab certificate PDF
 * into optimised WebP images for the Services page trust section.
 * Uses mupdf (WebAssembly) — no system tools required.
 *
 * Prerequisites:
 *   npm install --save-dev mupdf sharp
 *
 * Source PDFs (place in scripts/ folder):
 *   scripts/M61-250900831-調理植物 3.pdf
 *   scripts/M61-250900833-淨化植物 2.pdf
 *
 * Outputs → client/public/assets/certs/
 *   cert-tiaoli-p1.webp   調理植物 page 1 full  (800px wide)
 *   cert-tiaoli-p2.webp   調理植物 page 2 full  (800px wide)
 *   cert-tiaoli-thumb.webp 調理植物 thumbnail   (360px wide)
 *   cert-jinghua-p1.webp  淨化植物 page 1 full  (800px wide)
 *   cert-jinghua-p2.webp  淨化植物 page 2 full  (800px wide)
 *   cert-jinghua-thumb.webp 淨化植物 thumbnail  (360px wide)
 */

import * as mupdf from "mupdf";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "client", "public", "assets", "certs");
fs.mkdirSync(outDir, { recursive: true });

const CERTS = [
  { file: path.join(__dirname, "M61-250900831-調理植物 3.pdf"), slug: "tiaoli" },
  { file: path.join(__dirname, "M61-250900833-淨化植物 2.pdf"), slug: "jinghua" },
];

const DPI        = 150;        // rendering DPI (72 = 1x, 144 = 2x retina)
const FULL_WIDTH = 800;        // final full-size width (px)
const THUMB_WIDTH = 360;       // thumbnail width (px)
const WEBP_QUALITY = 88;

async function processCert({ file, slug }) {
  if (!fs.existsSync(file)) {
    console.error(`❌  File not found: ${file}`);
    console.error(`    Copy the PDF into the scripts/ folder and re-run.`);
    process.exit(1);
  }

  const data = fs.readFileSync(file);
  const doc = mupdf.Document.openDocument(data, "application/pdf");
  const totalPages = doc.countPages();
  console.log(`📄  ${path.basename(file)} — ${totalPages} pages total (rendering 1 & 2)`);

  const scale = DPI / 72;

  for (const pageIdx of [0, 1]) { // 0-indexed; page 3 (idx 2) is skipped
    if (pageIdx >= totalPages) {
      console.warn(`⚠️   Page ${pageIdx + 1} missing — skipping.`);
      continue;
    }

    const page = doc.loadPage(pageIdx);
    const bounds = page.getBounds();

    // Render to RGBA pixmap
    const matrix = mupdf.Matrix.scale(scale, scale);
    const pixmap = page.toPixmap(matrix, mupdf.ColorSpace.DeviceRGB, false, true);
    const pngBuffer = Buffer.from(pixmap.asPNG());

    const pageNum = pageIdx + 1;

    // Full resolution WebP
    const fullPath = path.join(outDir, `cert-${slug}-p${pageNum}.webp`);
    await sharp(pngBuffer)
      .resize(FULL_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(fullPath);
    const { size } = fs.statSync(fullPath);
    console.log(`  ✅  cert-${slug}-p${pageNum}.webp   ${(size / 1024).toFixed(0)} KB`);

    // Thumbnail from page 1 only
    if (pageIdx === 0) {
      const thumbPath = path.join(outDir, `cert-${slug}-thumb.webp`);
      await sharp(pngBuffer)
        .resize(THUMB_WIDTH, null, { withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(thumbPath);
      const { size: ts } = fs.statSync(thumbPath);
      console.log(`  ✅  cert-${slug}-thumb.webp       ${(ts / 1024).toFixed(0)} KB`);
    }
  }
}

console.log("🔬  Extracting lab certificate images...\n");
for (const cert of CERTS) {
  await processCert(cert);
  console.log("");
}
console.log("🎉  Done — images written to client/public/assets/certs/");
