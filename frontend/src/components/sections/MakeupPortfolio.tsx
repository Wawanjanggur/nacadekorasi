"use client";

import { useState } from "react";
import { makeup, attire, waLink } from "@/data/site";
import { formatIDR } from "@/lib/cn";
import type { ImageKey } from "@/lib/image-data";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Lightbox } from "@/components/ui/Lightbox";
import { WhatsAppIcon } from "@/components/ui/Icons";

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  price: string;
  description: string;
  points: string[];
  image: ImageKey;
  focus?: string;
}

const galleryItems: GalleryItem[] = [
  ...makeup.map((m) => ({
    id: m.id,
    category: m.occasion,
    title: m.title,
    price: m.price,
    description: m.description,
    points: m.points,
    image: m.image,
    focus: m.focus,
  })),
  ...attire.slice(0, 4).map((a) => ({
    id: `gal-${a.id}`,
    category: a.categoryLabel,
    title: a.name,
    price: `${formatIDR(a.price)} / ${a.unit}`,
    description: a.description,
    points: a.includes,
    image: a.image,
    focus: a.focus,
  })),
];

/**
 * Galeri 5x2 kotak persegi bersih tanpa overlay teks,
 * mengikuti pola "Our Gallery" pada referensi CANNA.
 */
export function MakeupPortfolio() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = galleryItems.find((item) => item.id === openId) ?? null;

  return (
    <section id="tata-rias" className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Galeri Kami" />

        {/* Grid simetris: 2x5 di HP, 5x2 di iPad & desktop (tanpa sisa ganjil) */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:mt-10 sm:gap-2.5 md:grid-cols-5 md:gap-3">
          {galleryItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenId(item.id)}
              className="group relative block aspect-square w-full overflow-hidden bg-line text-left"
              aria-label={`Lihat foto ${item.title}`}
            >
              <SmartImage
                image={item.image}
                alt={item.title}
                focus={item.focus}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                imgClassName="transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={Boolean(active)}
        onClose={() => setOpenId(null)}
        label={active?.title}
        media={
          active && (
            <div className="relative aspect-[3/4] w-full sm:aspect-auto sm:h-full sm:min-h-[460px]">
              <SmartImage
                image={active.image}
                alt={active.title}
                focus={active.focus}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          )
        }
      >
        {active && (
          <div className="flex h-full flex-col">
            <span className="label text-teal-soft">{active.category}</span>

            <h3 className="font-serif serif-lg mt-3 text-teal">{active.title}</h3>

            <p className="tnum mt-3 text-xl font-medium text-ink">{active.price}</p>

            <p className="mt-4 text-sm leading-relaxed text-ink-2">{active.description}</p>

            <div className="mt-5 border-t border-line pt-4">
              <p className="label text-teal-soft">Detail</p>
              <ul className="mt-2 space-y-1.5">
                {active.points.map((p) => (
                  <li key={p} className="flex items-baseline gap-2.5 text-[0.8125rem] text-ink-2">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-teal-soft" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={waLink(
                `Halo NacaDecor, saya tertarik dengan "${active.title}" (${active.price}). Apakah jadwal masih tersedia?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid mt-auto w-full sm:mt-7"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pesan Sekarang
            </a>
          </div>
        )}
      </Lightbox>
    </section>
  );
}
