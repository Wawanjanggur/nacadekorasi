"use client";

import { useState } from "react";
import { decor, decorGroups, type DecorGroup, waLink } from "@/data/site";
import { cn } from "@/lib/cn";
import { useDragScroll } from "@/lib/useDragScroll";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Lightbox } from "@/components/ui/Lightbox";
import { WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Kartu dekorasi mengikuti pola "Our Wedding Venues" pada referensi CANNA:
 * foto bersih rasio 4:3 di atas, kotak abu hangat dengan teks serif teal + tombol di bawah,
 * bisa digeser langsung (drag mouse / swipe jari / trackpad) tanpa ikon panah di atas.
 */
export function DecorPortfolio() {
  const [filter, setFilter] = useState<DecorGroup | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const { ref: trackRef, dragging, dragProps } = useDragScroll();

  const items = filter === "all" ? decor : decor.filter((d) => d.group === filter);
  const active = decor.find((d) => d.id === openId) ?? null;

  return (
    <section id="dekorasi" className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Koleksi Dekorasi" />

        {/* Filter kategori */}
        <div className="mt-7 flex justify-center sm:mt-8">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => setFilter("all")}
              data-active={filter === "all"}
              className="chip"
              aria-pressed={filter === "all"}
            >
              Semua
            </button>
            {decorGroups.map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => setFilter(g.key)}
                data-active={filter === g.key}
                className="chip"
                aria-pressed={filter === g.key}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Deretan kartu horizontal: bisa digeser langsung dengan mouse atau sentuhan */}
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
              {/* Foto polos di atas, rasio 4:3, tanpa teks menumpuk */}
              <button
                type="button"
                onClick={() => setOpenId(item.id)}
                className="relative block aspect-[4/3] w-full overflow-hidden bg-line text-left"
                aria-label={`Lihat detail ${item.title}`}
              >
                <SmartImage
                  image={item.image}
                  alt={item.title}
                  focus={item.focus}
                  sizes="(max-width: 640px) 280px, 325px"
                  imgClassName="pointer-events-none transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </button>

              {/* Kotak teks abu hangat menyambung di bawah foto */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-[1rem] uppercase tracking-[0.05em] text-teal">
                  {item.title}
                </h3>

                <p className="font-serif mt-3 text-[0.875rem] leading-[1.68] text-teal-ink">
                  {item.detail}
                </p>

                <p className="font-serif mt-auto pt-5 text-[0.84375rem] text-teal-ink">
                  {item.specs[0]} · {item.price}
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
        label={active?.title}
        media={
          active && (
            <div className="relative aspect-[4/3] w-full sm:aspect-auto sm:h-full sm:min-h-[420px]">
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
            <div className="flex items-center gap-2.5">
              <span className="label text-teal-soft">
                {active.group === "masuk-minta" ? "Masuk minta" : "Pernikahan"}
              </span>
              <span className="h-px flex-1 bg-line" />
              <span className="text-[0.6875rem] text-muted">{active.label}</span>
            </div>

            <h3 className="font-serif serif-lg mt-3 text-teal">{active.title}</h3>

            <p className="tnum mt-3 text-xl font-medium text-ink">{active.price}</p>

            <p className="mt-4 text-sm leading-relaxed text-ink-2">{active.detail}</p>

            <div className="mt-5 border-t border-line pt-4">
              <p className="label text-teal-soft">Spesifikasi</p>
              <ul className="mt-2 space-y-1.5">
                {active.specs.map((s) => (
                  <li key={s} className="flex items-baseline gap-2.5 text-[0.8125rem] text-ink-2">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-teal-soft" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={waLink(
                `Halo NacaDecor, saya tertarik dekorasi "${active.title}" (${active.price}). Mohon info ketersediaan tanggal dan rincian itemnya.`,
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
