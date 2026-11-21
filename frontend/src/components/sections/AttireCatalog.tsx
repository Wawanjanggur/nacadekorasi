"use client";

import { useState } from "react";
import { attire, attireCategories, type AttireCategory, waLink } from "@/data/site";
import { formatIDR, cn } from "@/lib/cn";
import { useDragScroll } from "@/lib/useDragScroll";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Lightbox } from "@/components/ui/Lightbox";
import { WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Katalog busana mengikuti pola kartu horizontal referensi CANNA:
 * foto bersih rasio 4:3 di atas, kotak abu hangat dengan teks serif teal + tombol di bawah,
 * bisa digeser langsung (drag mouse / swipe jari / trackpad) tanpa ikon panah di atas.
 */
export function AttireCatalog() {
  const [filter, setFilter] = useState<AttireCategory | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const { ref: trackRef, dragging, dragProps } = useDragScroll();

  const items = filter === "all" ? attire : attire.filter((a) => a.category === filter);
  const active = attire.find((a) => a.id === openId) ?? null;

  return (
    <section id="busana" className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Koleksi Busana" />

        <div className="mt-7 flex justify-center sm:mt-8">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {attireCategories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setFilter(c.key)}
                data-active={filter === c.key}
                className="chip"
                aria-pressed={filter === c.key}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kartu horizontal bersih: bisa digeser langsung dengan mouse atau sentuhan */}
        <div
          ref={trackRef}
          {...dragProps}
          className={cn(
            "no-scrollbar -mx-4 mt-6 flex gap-4 overflow-x-auto px-4 pb-2 select-none sm:mx-0 sm:mt-8 sm:gap-5 sm:px-0",
            dragging ? "cursor-grabbing" : "cursor-grab",
          )}
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="group flex w-[82vw] max-w-[300px] shrink-0 flex-col bg-panel sm:w-[300px] sm:max-w-none md:w-[310px] lg:w-[325px]"
            >
              <button
                type="button"
                onClick={() => setOpenId(item.id)}
                className="relative block aspect-[4/3] w-full overflow-hidden bg-line text-left"
                aria-label={`Lihat detail ${item.name}`}
              >
                <SmartImage
                  image={item.image}
                  alt={item.name}
                  focus={item.focus}
                  sizes="(max-width: 640px) 280px, 325px"
                  imgClassName="pointer-events-none transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </button>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-[1rem] uppercase tracking-[0.05em] text-teal">
                  {item.name}
                </h3>

                <p className="font-serif mt-3 text-[0.875rem] leading-[1.68] text-teal-ink">
                  {item.description}
                </p>

                <p className="font-serif tnum mt-auto pt-5 text-[0.84375rem] text-teal-ink">
                  Sewa: {formatIDR(item.price)} / {item.unit}
                </p>

                <button
                  type="button"
                  onClick={() => setOpenId(item.id)}
                  className="btn btn-solid mt-5 self-start"
                >
                  Selengkapnya
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Lightbox
        open={Boolean(active)}
        onClose={() => setOpenId(null)}
        label={active?.name}
        media={
          active && (
            <div className="relative aspect-[3/4] w-full sm:aspect-auto sm:h-full sm:min-h-[440px]">
              <SmartImage
                image={active.image}
                alt={active.name}
                focus={active.focus}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          )
        }
      >
        {active && (
          <div className="flex h-full flex-col">
            <span className="label text-teal-soft">{active.categoryLabel}</span>
            <h3 className="font-serif serif-lg mt-3 text-teal">{active.name}</h3>

            <p className="tnum mt-3 text-xl font-medium text-ink">
              {formatIDR(active.price)}
              <span className="ml-1.5 text-xs font-normal text-muted">/ {active.unit}</span>
            </p>

            <p className="mt-4 text-sm leading-relaxed text-ink-2">{active.description}</p>

            <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
              <div className="flex justify-between gap-6">
                <dt className="text-muted">Ukuran</dt>
                <dd className="text-right font-medium text-ink">{active.sizes.join(", ")}</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="shrink-0 text-muted">Bahan</dt>
                <dd className="text-right font-medium text-ink">{active.material}</dd>
              </div>
            </dl>

            <div className="mt-4">
              <p className="label text-teal-soft">Termasuk</p>
              <ul className="mt-2 space-y-1.5">
                {active.includes.map((inc) => (
                  <li key={inc} className="flex items-baseline gap-2.5 text-[0.8125rem] text-ink-2">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-teal-soft" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={waLink(
                `Halo NacaDecor, saya tertarik sewa "${active.name}" (${formatIDR(active.price)}/${active.unit}). Apakah tanggal acara saya masih tersedia?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("btn btn-solid mt-auto w-full sm:mt-7")}
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
