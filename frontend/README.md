# NacaDecor — Landing Page

Situs satu halaman (landing page) untuk NacaDecor Studio: dekorasi pelaminan, sewa busana
pengantin adat Wagal, gaun & jas, serta tata rias pengantin.

Dibangun dengan **Next.js 16 (App Router)** + **Tailwind CSS v4**, sepenuhnya statis
(prerender), tanpa backend dan tanpa autentikasi.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produksi
npm run start
```

## Struktur

```
src/
├── app/
│   ├── layout.tsx          # font, metadata, header & footer
│   ├── page.tsx            # komposisi seluruh section + JSON-LD
│   ├── globals.css         # design token, tipografi, komponen dasar
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/             # SiteHeader, SiteFooter
│   ├── sections/           # Hero, Services, Approach, AttireCatalog,
│   │                       # DecorPortfolio, MakeupPortfolio,
│   │                       # PackagesAndCalculator, Faq, ClosingCta
│   └── ui/                 # SmartImage, Lightbox, SectionHead, Icons
├── data/
│   └── site.ts             # SEMUA konten & harga — satu sumber kebenaran
└── lib/
    ├── cn.ts               # helper class + format Rupiah
    └── image-data.ts       # AUTO-GENERATED: dimensi + blur placeholder
```

**Untuk mengubah teks, harga, atau daftar item, cukup edit `src/data/site.ts`.**
Tidak perlu menyentuh komponen.

## Font

| Peran | Keluarga | Dipakai untuk |
| --- | --- | --- |
| Display | **Bodoni Moda** (didone, kontras tinggi) | Judul h1/h2/h3, angka besar |
| Body | **Inter** | Semua teks baca, label, tombol |

Dimuat lewat `next/font/google` (self-host, tanpa request ke Google saat runtime).
Ukuran judul memakai `clamp()` agar tidak ada lompatan besar antara 320px dan 1440px.
Teks memakai `text-wrap: balance` / `pretty` supaya baris tidak menggantung satu kata.

## Gambar

- Semua foto berada di `public/images/real/`, sudah dikompres (10 MB → 3 MB).
- `SmartImage` selalu menyertakan dimensi intrinsik + blur placeholder → tidak ada layout shift.
- Format AVIF/WebP dipilih otomatis oleh optimizer Next (hero 159 KB → 74 KB di AVIF).
- `focus` (object-position) diatur per foto karena banyak dokumentasi acara memotong
  objek di tengah frame.

Regenerasi setelah menambah/mengganti foto:

```bash
npm run images
```

Perintah ini menjalankan kompresi + pembuatan `src/lib/image-data.ts` (dimensi & blur).

## Yang sengaja tidak ada

Versi sebelumnya punya dashboard klien, portal admin, halaman login/register, dan
halaman detail paket. Semuanya dihapus karena brief-nya landing page saja — semua
konversi diarahkan ke WhatsApp. Backup versi lama ada di commit git
`backup: kondisi awal sebelum refactor landing-only`.

## Catatan aksesibilitas

- Semua gambar punya `alt`, semua tombol punya label.
- Lightbox: fokus dipindah ke dalam dialog, `Escape` menutup, fokus terjebak di dalam,
  scroll halaman dikunci selama terbuka.
- Filter & accordion memakai `aria-pressed` / `aria-expanded`.
- Ada tautan "Lompat ke konten" untuk pengguna keyboard.
- `prefers-reduced-motion` dihormati (animasi dimatikan).
