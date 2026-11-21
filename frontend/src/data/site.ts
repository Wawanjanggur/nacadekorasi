import type { ImageKey } from "@/lib/image-data";

/* ------------------------------------------------------------------ */
/*  Brand & kontak — satu sumber kebenaran untuk seluruh halaman       */
/* ------------------------------------------------------------------ */

export const site = {
  name: "NacaDecor",
  legalName: "NacaDecor Studio & Gallery",
  tagline: "Dekorasi & Busana Pengantin",
  headline: "Dekorasi pernikahan yang tenang dipandang, rapi dikerjakan.",
  description:
    "NacaDecor merancang pelaminan, menyewakan busana pengantin adat Wagal dan gaun, serta tata rias pengantin dalam satu tim yang sama — jadi Anda hanya perlu bicara dengan satu pihak.",
  url: "https://nacadecor.com",
  waNumber: "6281236589891",
  waDisplay: "+62 812-3658-9891",
  email: "halo@nacadecor.com",
  address: "NacaDecor Studio & Gallery, Lewat, Kecamatan Kuwus",
  hours: [
    { day: "Senin – Sabtu", time: "09.00 – 19.00 WITA" },
    { day: "Minggu & libur", time: "10.00 – 17.00 WITA" },
  ],
  socials: [
    {
      label: "Instagram",
      handle: "@ayujanggur4",
      href: "https://www.instagram.com/ayujanggur4?bqrl=Z3hiOGFvYzRwcnBu",
    },
    {
      label: "Facebook",
      handle: "Facebook",
      href: "https://www.facebook.com/share/19zMYg4CPq/",
    },
  ],
} as const;

/** Bangun tautan WhatsApp dengan pesan terisi otomatis. */
export function waLink(message: string): string {
  return `https://api.whatsapp.com/send?phone=${site.waNumber}&text=${encodeURIComponent(message)}`;
}

export const waDefault = waLink(
  `Halo ${site.name}, saya ingin konsultasi mengenai layanan dekorasi, busana, atau tata rias untuk acara saya, sekaligus minta info ketersediaan tanggalnya.`,
);

/* ------------------------------------------------------------------ */
/*  Navigasi                                                          */
/* ------------------------------------------------------------------ */

export const navItems = [
  { label: "Layanan", href: "#layanan" },
  { label: "Dekorasi", href: "#dekorasi" },
  { label: "Busana", href: "#busana" },
  { label: "Galeri", href: "#tata-rias" },
] as const;

/* ------------------------------------------------------------------ */
/*  Angka kunci                                                       */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: "120+", label: "Acara ditangani" },
  { value: "9 thn", label: "Pengalaman tim" },
  { value: "1 tim", label: "Dekor, busana & rias" },
  { value: "H-7", label: "Fitting terakhir" },
] as const;

/* ------------------------------------------------------------------ */
/*  Layanan                                                           */
/* ------------------------------------------------------------------ */

export interface Service {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  href: string;
  cta: string;
  icon: "flower" | "suit" | "dress" | "brush";
}

export const services: Service[] = [
  {
    id: "dekorasi",
    eyebrow: "01 — Dekorasi",
    title: "Pelaminan & dekorasi acara",
    description:
      "Instalasi panggung, latar dekorasi, tata cahaya, dan rangkaian bunga segar. Dihitung per meter dan disurvei dulu ke lokasi, bukan perkiraan.",
    points: ["Panggung 4–12 meter", "Bunga segar & dedaunan asli", "Tim instalasi + bongkar"],
    href: "#dekorasi",
    cta: "Lihat portofolio dekorasi",
    icon: "flower",
  },
  {
    id: "wagal",
    eyebrow: "02 — Busana adat",
    title: "Baju adat Wagal sepasang",
    description:
      "Setelan pengantin pria & wanita lengkap dengan mahkota, selempang, dan sarung tenun. Termasuk pasang ukuran dan cuci kering sebelum dipakai.",
    points: ["Pria & wanita satu set", "Mahkota, aksesori lengkap", "Pasang ukuran & cuci bersih"],
    href: "#busana",
    cta: "Lihat koleksi Wagal",
    icon: "suit",
  },
  {
    id: "gaun",
    eyebrow: "03 — Gaun pengantin",
    title: "Sewa gaun pengantin",
    description:
      "Gaun pengantin berpayet dengan korset berstruktur. Semua gaun dicek jahitan dan aksesorinya di antara dua penyewa, tidak hanya disetrika.",
    points: ["Gaun mengembang & potongan A", "Ukuran S–XL tersedia", "Gratis penyesuaian"],
    href: "#busana",
    cta: "Lihat katalog gaun",
    icon: "dress",
  },
  {
    id: "rias",
    eyebrow: "04 — Tata rias",
    title: "Tata rias pengantin & pendamping",
    description:
      "Rias akad dan resepsi dengan produk yang cocok untuk kulit tropis. Ada sesi uji coba rias sebelum hari-H supaya tidak ada kejutan.",
    points: ["Akad & resepsi 2 gaya", "Uji coba rias sebelum hari-H", "Rias ibu & pendamping"],
    href: "#tata-rias",
    cta: "Lihat hasil rias",
    icon: "brush",
  },
];

/* ------------------------------------------------------------------ */
/*  Busana                                                            */
/* ------------------------------------------------------------------ */

export type AttireCategory = "wagal" | "gaun";

export interface AttireItem {
  id: string;
  name: string;
  category: AttireCategory;
  categoryLabel: string;
  price: number;
  unit: string;
  image: ImageKey;
  focus?: string;
  ratio: "portrait" | "landscape";
  sizes: string[];
  material: string;
  includes: string[];
  description: string;
}

export const attireCategories: { key: AttireCategory | "all"; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "wagal", label: "Adat Wagal" },
  { key: "gaun", label: "Gaun pengantin" },
];

export const attire: AttireItem[] = [
  {
    id: "wagal-pasangan",
    name: "Adat Wagal — setelan sepasang",
    category: "wagal",
    categoryLabel: "Adat Wagal",
    price: 850_000,
    unit: "hari",
    image: "attire-wagal-couple-portrait",
    focus: "center 25%",
    ratio: "portrait",
    sizes: ["M", "L", "XL"],
    material: "Beludru marun, sulam manik mutiara, tenun ikat",
    includes: ["Setelan pria & wanita", "Mahkota rumbai & bulan sabit", "Selempang dan sarung tenun"],
    description:
      "Setelan lengkap untuk prosesi masuk minta dan lamaran adat. Beludru marun dengan sulaman manik, dilengkapi mahkota emas untuk pria, mahkota bulan sabit untuk wanita, serta kain tenun asli.",
  },
  {
    id: "wagal-berdampingan",
    name: "Adat Wagal — pose berdampingan",
    category: "wagal",
    categoryLabel: "Adat Wagal",
    price: 850_000,
    unit: "hari",
    image: "attire-wagal-couple-side",
    focus: "center 20%",
    ratio: "portrait",
    sizes: ["M", "L", "XL"],
    material: "Beludru marun, mahkota rumbai emas, selendang tenun",
    includes: ["Setelan pria & wanita", "Selendang tenun", "Aksesori kepala lengkap"],
    description:
      "Varian yang sama dengan tatanan aksesori lebih ringan, sering dipilih untuk sesi foto prewedding bertema budaya sebelum acara adat utama.",
  },
  {
    id: "gaun-ballgown",
    name: "Gaun pengantin putih berpayet",
    category: "gaun",
    categoryLabel: "Gaun pengantin",
    price: 1_250_000,
    unit: "hari",
    image: "bride-ballgown-luxury",
    focus: "center 40%",
    ratio: "landscape",
    sizes: ["S", "M", "L"],
    material: "Renda, organza, payet tangan",
    includes: ["Gaun utama", "Mahkota tiara", "Kerudung veil dan kalung mutiara"],
    description:
      "Rok mengembang dengan korset berstruktur dan lengan transparan berenda. Jadi pilihan paling sering untuk resepsi malam karena siluetnya tetap terbaca dari jauh.",
  },
  {
    id: "gaun-buket",
    name: "Gaun anggun dengan buket segar",
    category: "gaun",
    categoryLabel: "Gaun pengantin",
    price: 1_150_000,
    unit: "hari",
    image: "bride-happy-bouquet",
    focus: "center 30%",
    ratio: "landscape",
    sizes: ["S", "M", "L"],
    material: "Tile berlapis, aplikasi bunga 3D",
    includes: ["Gaun utama", "Buket bunga segar", "Penyesuaian panjang rok"],
    description:
      "Potongan melebar lembut yang lebih ringan untuk akad dan sesi foto siang. Aplikasi bunga tiga dimensi di bagian dada membuatnya tetap terlihat mewah tanpa payet penuh.",
  },
  {
    id: "gaun-pelaminan",
    name: "Gaun pengantin lengan transparan",
    category: "gaun",
    categoryLabel: "Gaun pengantin",
    price: 1_200_000,
    unit: "hari",
    image: "wedding-couple-pelaminan",
    focus: "center 25%",
    ratio: "portrait",
    sizes: ["S", "M", "L"],
    material: "Payet halus, lengan tile transparan",
    includes: ["Gaun utama", "Aksesori rambut", "Pasang ukuran H-7"],
    description:
      "Gaun dengan lengan transparan berpayet dan rok jatuh lurus. Cocok untuk akad di ruangan tertutup dengan pencahayaan hangat.",
  },
];

/* ------------------------------------------------------------------ */
/*  Dekorasi                                                          */
/* ------------------------------------------------------------------ */

export type DecorGroup = "masuk-minta" | "pernikahan";

export interface DecorItem {
  id: string;
  title: string;
  group: DecorGroup;
  label: string;
  image: ImageKey;
  focus?: string;
  price: string;
  detail: string;
  specs: string[];
}

/**
 * Dua kelompok dekorasi dipisah tegas karena kebutuhan acaranya berbeda:
 * masuk minta/lamaran berskala kecil (latar ±4 m, lesehan), sedangkan
 * pernikahan butuh panggung resepsi penuh.
 */
export const decorGroups: {
  key: DecorGroup;
  label: string;
  eyebrow: string;
  title: string;
  lede: string;
  priceNote: string;
}[] = [
  {
    key: "masuk-minta",
    label: "Dekorasi Masuk Minta",
    eyebrow: "Dekorasi masuk minta",
    title: "Dekorasi masuk minta & lamaran",
    lede:
      "Penataan berskala intim untuk prosesi adat masuk minta, lamaran, dan hajatan keluarga di rumah. Latar sekitar 4 meter dengan area duduk lesehan.",
    priceNote: "Mulai Rp 1.500.000",
  },
  {
    key: "pernikahan",
    label: "Dekorasi Pernikahan",
    eyebrow: "Dekorasi pernikahan",
    title: "Dekorasi pernikahan & panggung resepsi",
    lede:
      "Panggung pelaminan penuh untuk akad dan resepsi di gedung atau tenda, lengkap dengan lorong, tata cahaya, dan rangkaian bunga segar.",
    priceNote: "Paket komplit Rp 7.000.000",
  },
];

export const decor: DecorItem[] = [
  {
    id: "d1",
    title: "Lengkung hati beludru marun",
    group: "masuk-minta",
    label: "Masuk minta",
    image: "decor-wagal-twin-arch-maroon",
    focus: "center 40%",
    price: "Rp 1.500.000",
    detail:
      "Dua lengkungan hati sebagai latar, tirai beludru marun, tiang lampu kelopak bunga, tikar anyam, dan bantal duduk adat.",
    specs: ["Latar 4 meter", "Tikar & bantal duduk", "6 tiang lampu"],
  },
  {
    id: "d2",
    title: "Tirai satin biru muda",
    group: "masuk-minta",
    label: "Lamaran",
    image: "decor-soft-blue-pastel",
    focus: "center 35%",
    price: "Rp 1.500.000",
    detail:
      "Tirai satin biru muda melengkung dengan lampu bola hangat dan rangkaian bunga aneka warna. Sering dipakai untuk hajatan keluarga di rumah.",
    specs: ["Latar 4 meter", "Lampu bola hangat", "Karpet lesehan"],
  },
  {
    id: "d3",
    title: "Beludru marun & lampu kristal",
    group: "masuk-minta",
    label: "Lamaran",
    image: "decor-royal-maroon-chandelier",
    focus: "center 45%",
    price: "Rp 1.500.000",
    detail:
      "Beludru marun berpadu kain putih, dua lampu gantung kristal, tiang lampu berdiri, dan karpet lesehan rapi.",
    specs: ["Latar 4 meter", "2 lampu kristal", "Tikar lesehan"],
  },
  {
    id: "d4",
    title: "Lengkung ganda emas sampanye",
    group: "masuk-minta",
    label: "Akad & pertunangan",
    image: "decor-champagne-gold-arch",
    focus: "center 40%",
    price: "Rp 1.500.000",
    detail:
      "Dua lengkungan bunga segar di atas kain emas sampanye, dengan lampu kristal gantung dan lampu tiang bercahaya hangat.",
    specs: ["Latar 4 meter", "Bunga segar", "2 lampu kristal"],
  },
  {
    id: "d5",
    title: "Lengkung hati dengan lampu menyala",
    group: "masuk-minta",
    label: "Masuk minta",
    image: "decor-wagal-heart-arch",
    focus: "center 42%",
    price: "Rp 1.500.000",
    detail:
      "Lengkungan berbentuk hati dengan lampu putih menyala, untaian bunga merah-putih, tiang lampu berdiri, dan tikar adat.",
    specs: ["Latar 4 meter", "Lampu menyala", "Tikar adat"],
  },
  {
    id: "d6",
    title: "Hijau zamrud & menara bunga",
    group: "masuk-minta",
    label: "Nuansa alam",
    image: "decor-wagal-emerald-garden",
    focus: "center 40%",
    price: "Rp 1.500.000",
    detail:
      "Nuansa hijau zamrud dengan dua menara pilar bunga rimbun, lampu tiang kristal emas, dan area duduk lesehan.",
    specs: ["Latar 4 meter", "2 menara bunga", "Area lesehan"],
  },
  {
    id: "d7",
    title: "Panggung pelaminan terakota",
    group: "pernikahan",
    label: "Resepsi",
    image: "pelaminan-full-stage",
    focus: "center 45%",
    price: "Rp 7.000.000",
    detail:
      "Panggung penuh dengan pilar artistik putih, tirai terakota, kursi pelaminan putih, dan rangkaian bunga segar melimpah.",
    specs: ["Panggung 8 meter", "Kursi pelaminan", "Bunga segar"],
  },
  {
    id: "d8",
    title: "Panggung tenda biru putih",
    group: "pernikahan",
    label: "Resepsi",
    image: "decor-grand-stage-blue-white",
    focus: "center 45%",
    price: "Rp 7.000.000",
    detail:
      "Pelaminan di bawah tenda pesta biru-putih dengan rangkaian bunga aneka warna, kursi pengantin, dan lantai panggung bercahaya.",
    specs: ["Panggung 8 meter", "Tenda pesta", "Lantai bercahaya"],
  },
  {
    id: "d9",
    title: "Panggung mewah & lorong kaca",
    group: "pernikahan",
    label: "Resepsi",
    image: "decor-grand-stage-egen-agnes",
    focus: "center 42%",
    price: "Rp 7.000.000",
    detail:
      "Panggung pelaminan dengan pilar artistik, sofa putih, karpet jalan merah, dan lorong kaca reflektif yang menyala saat prosesi.",
    specs: ["Panggung 10 meter", "Lorong kaca", "Karpet jalan"],
  },
  {
    id: "d10",
    title: "Panggung tirai putih & lantai kaca",
    group: "pernikahan",
    label: "Resepsi",
    image: "decor-wedding-stage-warm-drape-1",
    focus: "center 48%",
    price: "Rp 7.000.000",
    detail:
      "Pelaminan dengan tirai putih berlampu hangat, rangkaian bunga merah-biru-putih, kursi pengantin putih, dan lantai kaca LED menyala di depan panggung.",
    specs: ["Panggung 8 meter", "Lantai kaca menyala", "Bunga & lampu hangat"],
  },
  {
    id: "d11",
    title: "Panggung resepsi lampu hangat",
    group: "pernikahan",
    label: "Resepsi",
    image: "decor-wedding-stage-warm-drape-2",
    focus: "center 48%",
    price: "Rp 7.000.000",
    detail:
      "Penataan panggung resepsi bernuansa hangat dengan lampu gantung, tirai kain putih elegan, kursi pelaminan lengkap, dan lorong kaca bercahaya.",
    specs: ["Panggung 8 meter", "Lampu gantung", "Lorong kaca LED"],
  },
];

/* ------------------------------------------------------------------ */
/*  Tata rias                                                         */
/* ------------------------------------------------------------------ */

export interface MakeupLook {
  id: string;
  title: string;
  style: string;
  occasion: string;
  image: ImageKey;
  focus?: string;
  price: string;
  points: string[];
  description: string;
}

export const makeup: MakeupLook[] = [
  {
    id: "m1",
    title: "Rias hangat berkilau & tiara kristal",
    style: "Hangat berkilau",
    occasion: "Akad & resepsi siang",
    image: "makeup-bride-warm-glow",
    focus: "center 18%",
    price: "Rp 2.200.000",
    points: ["Tahan 12 jam", "Tiara & kalung", "Bulu mata bertingkat"],
    description:
      "Kompleksi hangat dengan bibir koral dan kilau lembut di tulang pipi. Tahan lama untuk acara siang sampai sore.",
  },
  {
    id: "m2",
    title: "Rias natural halus & buket bunga putih",
    style: "Natural lembut",
    occasion: "Resepsi modern",
    image: "makeup-bride-natural-flawless",
    focus: "center 20%",
    price: "Rp 2.200.000",
    points: ["Alas bedak ringan", "Kerudung & tiara mutiara", "Alis berserat"],
    description:
      "Riasan yang dibuat untuk terlihat seperti kulit aslinya, dengan mata berdimensi dan bibir berkilau lembut. Paling sering diminta untuk akad.",
  },
  {
    id: "m3",
    title: "Rias glamor lembut & brokat sutra",
    style: "Glamor lembut",
    occasion: "Pemberkatan & resepsi malam",
    image: "makeup-bride-soft-glam",
    focus: "center 18%",
    price: "Rp 2.200.000",
    points: ["Kontur proporsional", "Bibir satin lembut", "Perbaikan rias siaga"],
    description:
      "Gradasi warna tanah hangat di kelopak mata, bibir satin lembut, dan pendamping rias yang siaga selama acara.",
  },
  {
    id: "m4",
    title: "Rias elegan tegas & mata berkilau",
    style: "Elegan tegas",
    occasion: "Resepsi malam",
    image: "makeup-bride-bold-elegance",
    focus: "center 20%",
    price: "Rp 2.200.000",
    points: ["Garis mata tegas", "Bibir merah beri", "Tiara tinggi"],
    description:
      "Garis mata tajam, bulu mata dramatis, dan bibir warna beri yang tidak mudah luntur. Cocok untuk resepsi malam dan sesi foto elegan.",
  },
  {
    id: "m5",
    title: "Rias klasik anggun & mahkota mutiara",
    style: "Klasik anggun",
    occasion: "Resepsi adat",
    image: "makeup-bride-royal-tiara",
    focus: "center 22%",
    price: "Rp 3.200.000",
    points: ["Tiara mutiara", "Bauran halus", "Perawatan pra-rias"],
    description:
      "Tampilan agung dengan tiara mutiara bertingkat dan kerudung bordir. Termasuk perawatan kulit pra-rias yang steril.",
  },
  {
    id: "m6",
    title: "Anggun bersahaja & buket mawar",
    style: "Natural cerah",
    occasion: "Akad & lamaran",
    image: "makeup-bride-sitting-portrait",
    focus: "center 15%",
    price: "Rp 1.200.000",
    points: ["Hasil menyatu kulit", "Kerudung jatuh lembut", "Bedak anti-kilap"],
    description:
      "Riasan natural dengan perona bibir terakota lembut, kerudung jatuh anggun, dan bedak yang tidak mengkilap di cuaca tropis.",
  },
];

/* ------------------------------------------------------------------ */
/*  Alur pemesanan                                                    */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    step: "01",
    title: "Konsultasi & cek tanggal",
    body: "Ceritakan konsep, lokasi, dan perkiraan jumlah tamu. Kami cek ketersediaan tanggal dan tim di hari yang sama.",
  },
  {
    step: "02",
    title: "Survei lokasi & proposal",
    body: "Untuk dekorasi, kami ukur area langsung. Anda menerima rincian item, ukuran, dan harga per baris — bukan satu angka bulat.",
  },
  {
    step: "03",
    title: "Kunci tanggal dengan DP 30%",
    body: "Setelah proposal disetujui, DP 30% mengunci tanggal, tim, dan busana. Sisa pembayaran dilunasi H-3.",
  },
  {
    step: "04",
    title: "Fitting H-7 & hari acara",
    body: "Fitting terakhir seminggu sebelum acara. Di hari-H tim kami yang memasang, menjaga, dan membongkar semuanya.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Janji layanan                                                     */
/* ------------------------------------------------------------------ */

export const promises = [
  {
    title: "Harga per baris, bukan paket misterius",
    body: "Setiap penawaran memecah item, ukuran, dan jumlah. Anda tahu persis apa yang dibayar dan bisa mencoret yang tidak perlu.",
  },
  {
    title: "Satu koordinator untuk semua vendor",
    body: "Dekorasi, busana, dan rias ditangani tim yang sama, jadi tidak ada saling tunjuk saat hari-H.",
  },
  {
    title: "Busana dicek di antara dua penyewa",
    body: "Jahitan, payet, dan aksesori diperiksa dan dicuci kering setiap kali kembali — bukan hanya disetrika.",
  },
  {
    title: "Tim siaga sampai bongkar",
    body: "Selama acara ada orang kami di lokasi untuk retouch rias dan membenahi dekorasi yang bergeser.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  FAQ                                                               */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "Bagaimana alur sewa busana dan pasang ukuran?",
    a: "Pilih koleksi dari katalog, lalu jadwalkan fitting gratis di studio. Setelah ukuran dan aksesori dipastikan, DP 30% mengunci tanggal. Busana bisa diambil H-1 dalam kondisi bersih dan sudah diperiksa.",
  },
  {
    q: "Apakah ada deposit jaminan busana?",
    a: "Ya, Rp 200.000 per set sebagai jaminan titipan. Dana dikembalikan penuh saat busana kembali dalam kondisi baik, paling lambat 2 hari setelah acara.",
  },
  {
    q: "Dekorasi bisa disesuaikan dengan gedung atau rumah saya?",
    a: "Bisa. Kami survei lokasi dulu untuk mengukur luas area, tinggi plafon, dan titik listrik, lalu menyesuaikan komposisi bunga serta tata cahaya. Biaya survei tidak dipungut terpisah.",
  },
  {
    q: "Apakah melayani acara di luar kota?",
    a: "Ya, dengan penyesuaian biaya akomodasi dan logistik armada. Untuk luar Kecamatan Kuwus, sebaiknya dikonsultasikan minimal 2 bulan sebelum acara.",
  },
  {
    q: "Berapa lama sebelumnya sebaiknya memesan?",
    a: "Untuk dekorasi dan busana, 2–3 bulan sebelum acara sudah ideal, terutama untuk tanggal populer. Kalau acara Anda kurang dari 1 bulan, tetap hubungi kami — sering ada slot yang belum terisi.",
  },
  {
    q: "Apakah bisa trial rias sebelum hari-H?",
    a: "Bisa, dan kami sarankan. Trial dilakukan di studio dengan MUA yang sama yang akan merias di hari acara, supaya hasilnya bisa diprediksi.",
  },
] as const;
