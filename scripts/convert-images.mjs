/**
 * Batch image conversion script
 * Converts PNGs to WebP and AVIF at multiple responsive sizes.
 * Run with: node scripts/convert-images.mjs
 */

import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(__dirname, "../attached_assets/generated_images");
const LOGO_ASSETS = path.resolve(__dirname, "../attached_assets");

const images = [
  // Hero background — full viewport width on all screen sizes
  {
    input: path.join(ASSETS, "herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere.png"),
    base: "herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere",
    dir: ASSETS,
    widths: [320, 640, 1024],
    formats: [
      { ext: "webp", options: { quality: 80 } },
      { ext: "avif", options: { quality: 60 } },
    ],
  },
  // Features herbs image — ~50vw on desktop, 100vw on mobile
  {
    input: path.join(ASSETS, "traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates.png"),
    base: "traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates",
    dir: ASSETS,
    widths: [320, 640, 1024],
    formats: [
      { ext: "webp", options: { quality: 80 } },
      { ext: "avif", options: { quality: 60 } },
    ],
  },
  // Story image — ~33vw on desktop, 100vw on mobile
  {
    input: path.join(ASSETS, "symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs.png"),
    base: "symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs",
    dir: ASSETS,
    widths: [320, 640, 1024],
    formats: [
      { ext: "webp", options: { quality: 80 } },
      { ext: "avif", options: { quality: 60 } },
    ],
  },
  // Navbar logo — displayed at 48px height, small sizes sufficient
  {
    input: path.join(LOGO_ASSETS, "Untitled_design__15_-removebg-preview_1764006141705.png"),
    base: "Untitled_design__15_-removebg-preview_1764006141705",
    dir: LOGO_ASSETS,
    widths: [64, 128, 256],
    formats: [
      { ext: "webp", options: { quality: 85 } },
      { ext: "avif", options: { quality: 70 } },
    ],
  },
];

async function convertImage({ input, base, dir, widths, formats }) {
  const results = [];
  for (const { ext, options } of formats) {
    for (const width of widths) {
      const outputFile = path.join(dir, `${base}-${width}w.${ext}`);
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        [ext](options)
        .toFile(outputFile);
      const { size } = await sharp(outputFile).metadata().catch(() => ({ size: 0 }));
      results.push({ file: `${base}-${width}w.${ext}`, width, ext });
      process.stdout.write(`  ✓ ${base}-${width}w.${ext}\n`);
    }
  }
  return results;
}

async function main() {
  console.log("Converting images to WebP and AVIF at multiple sizes...\n");
  let total = 0;
  for (const img of images) {
    console.log(`Processing: ${img.base}`);
    const results = await convertImage(img);
    total += results.length;
    console.log("");
  }
  console.log(`Done. Generated ${total} image variants.`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
