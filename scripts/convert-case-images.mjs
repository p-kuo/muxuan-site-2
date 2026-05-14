/**
 * Case image optimisation script
 * Converts all JPG/JPEG images in client/public/cases/ to WebP at
 * three responsive widths (480, 768, 960px), ready for the
 * BeforeAfterSlider webpSrcSet prop.
 *
 * Run with: node scripts/convert-case-images.mjs
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CASES_DIR = path.resolve(__dirname, "../client/public/cases");
const WIDTHS = [480, 768, 960];
const WEBP_QUALITY = 82; // good balance of quality vs. file size for photos

async function main() {
  const files = fs.readdirSync(CASES_DIR).filter((f) =>
    /\.(jpe?g|png)$/i.test(f)
  );

  if (files.length === 0) {
    console.log("No JPG/PNG files found in client/public/cases/");
    return;
  }

  console.log(`Found ${files.length} source image(s). Generating WebP variants...\n`);
  let total = 0;

  for (const file of files) {
    const base = file.replace(/\.(jpe?g|png)$/i, "");
    const inputPath = path.join(CASES_DIR, file);

    for (const width of WIDTHS) {
      const outputFile = path.join(CASES_DIR, `${base}-${width}w.webp`);
      await sharp(inputPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputFile);
      console.log(`  ✓ ${base}-${width}w.webp`);
      total++;
    }
  }

  console.log(`\nDone. Generated ${total} WebP variant(s).`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
