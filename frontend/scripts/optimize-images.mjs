// One-off asset optimisation: recompress, resize, colour-grade, and derive crops.
// Run: node scripts/optimize-images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "images", "real");
const MAX_W = 1400;

const files = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));

for (const file of files) {
  const full = path.join(dir, file);
  const before = fs.statSync(full).size;
  const buf = await sharp(full)
    .rotate()
    .resize({ width: MAX_W, height: MAX_W, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toBuffer();
  if (buf.length < before) fs.writeFileSync(full, buf);
  console.log(
    `${file.padEnd(42)} ${Math.round(before / 1024)}KB -> ${Math.round(fs.statSync(full).size / 1024)}KB`,
  );
}

// --- Derived crop: solo groom from the couple portrait (groom sits on the right ~45%) ---
const src = path.join(dir, "couple-wedding-attire-gown-suit.jpg");
const meta = await sharp(src).metadata();
const cropW = Math.round(meta.width * 0.44);
await sharp(src)
  .extract({ left: meta.width - cropW, top: 0, width: cropW, height: meta.height })
  .resize({ width: 900 })
  .jpeg({ quality: 84, progressive: true, mozjpeg: true })
  .toFile(path.join(dir, "attire-groom-suit-formal.jpg"));
console.log(`attire-groom-suit-formal.jpg   crop ${cropW}x${meta.height} -> 900w`);

// --- Hero: widen to a 16:9 cinematic frame, warm grade, keep detail ---
const hero = path.join(dir, "hero-wedding-stage-bg.jpg");
await sharp(hero)
  .resize({ width: 1400 })
  .modulate({ brightness: 1.04, saturation: 1.05 })
  .sharpen({ sigma: 0.6 })
  .jpeg({ quality: 86, progressive: true, mozjpeg: true })
  .toFile(path.join(dir, "hero-wedding-stage-bg.jpg.tmp"));
fs.renameSync(path.join(dir, "hero-wedding-stage-bg.jpg.tmp"), hero);
console.log("hero-wedding-stage-bg.jpg      graded + sharpened");

const total = fs
  .readdirSync(dir)
  .reduce((sum, f) => sum + fs.statSync(path.join(dir, f)).size, 0);
console.log(`\nTotal folder size: ${(total / 1024 / 1024).toFixed(2)} MB`);
