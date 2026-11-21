// Menerangkan semua foto secara terukur: gamma untuk mengangkat shadow,
// brightness secukupnya, dan sedikit saturasi. Penambahan dibatasi agar
// foto yang sudah terang tidak jadi pecah (blowout).
//
// Jalankan: node scripts/brighten-images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "images", "real");
const TARGET_MEAN = 168; // rata-rata luminance yang dituju
const MAX_BOOST = 1.22; // batas atas agar tidak pecah
const MIN_BOOST = 1.06; // foto yang sudah terang tetap dapat sedikit

const files = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));

const rows = [];

for (const file of files) {
  const full = path.join(dir, file);

  // 1. Ukur kecerahan awal
  const before = await sharp(full).stats();
  const meanBefore =
    (before.channels[0].mean + before.channels[1].mean + before.channels[2].mean) / 3;

  // 2. Hitung boost proporsional terhadap target
  const ideal = TARGET_MEAN / Math.max(meanBefore, 1);
  const boost = Math.min(Math.max(ideal, MIN_BOOST), MAX_BOOST);

  // 3. Proses: gamma > 1 mengangkat midtone/shadow, lalu brightness + saturasi
  const buf = await sharp(full)
    .rotate()
    .gamma(1.06)
    .modulate({ brightness: boost, saturation: 1.06 })
    .sharpen({ sigma: 0.4 })
    .jpeg({ quality: 84, progressive: true, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toBuffer();

  fs.writeFileSync(full, buf);

  // Ukur dari buffer hasil, bukan dari file yang sudah ditimpa
  const after = await sharp(buf).stats();
  const meanAfter =
    (after.channels[0].mean + after.channels[1].mean + after.channels[2].mean) / 3;

  rows.push({
    file,
    before: Math.round(meanBefore),
    after: Math.round(meanAfter),
    boost: boost.toFixed(2),
    kb: Math.round(fs.statSync(full).size / 1024),
  });
}

console.log("file".padEnd(38) + "sebelum  sesudah  boost   size");
for (const r of rows) {
  console.log(
    r.file.padEnd(38) +
      String(r.before).padStart(6) +
      String(r.after).padStart(9) +
      String(r.boost).padStart(7) +
      String(r.kb + "KB").padStart(8),
  );
}

const total = fs
  .readdirSync(dir)
  .reduce((s, f) => s + fs.statSync(path.join(dir, f)).size, 0);
console.log(`\nTotal: ${(total / 1024 / 1024).toFixed(2)} MB`);
