import type { Metadata, Viewport } from "next";
import { Great_Vibes, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

/* Script: hanya untuk judul section — aksen romantis. */
const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/* Serif: judul blok, judul kartu, nama paket. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Sans: semua teks baca, label, tombol. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} di Lewat, Kecamatan Kuwus`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "dekorasi acara Kuwus",
    "sewa gaun pengantin",
    "baju adat Wagal",
    "rias pengantin",
    "pelaminan",
    "dekorasi masuk minta",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/images/real/pelaminan-full-stage.jpg",
        width: 768,
        height: 1024,
        alt: `Pelaminan ${site.name}`,
      },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fff9f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${greatVibes.variable} ${playfair.variable} ${inter.variable}`}
    >
      <body>
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-teal focus:px-5 focus:py-3 focus:text-xs focus:font-medium focus:uppercase focus:tracking-widest focus:text-white"
        >
          Lompat ke konten
        </a>
        <SiteHeader />
        <main id="konten">{children}</main>
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
