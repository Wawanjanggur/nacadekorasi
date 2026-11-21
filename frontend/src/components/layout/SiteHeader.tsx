"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { navItems, site, waDefault } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/**
 * Header mengikuti referensi CANNA: bar putih/krem solid di atas,
 * hamburger teal di kiri, logo serif teal di tengah,
 * "Layanan" bergaris bawah + tombol kotak "Book Now" di kanan.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky inset-x-0 top-0 z-50 bg-[#fffdf9] transition-shadow duration-300",
          scrolled ? "shadow-[0_1px_0_rgba(222,218,210,1)]" : "border-b border-transparent",
        )}
        style={{ height: "var(--header-h)" }}
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Kiri: hamburger tipis teal */}
          <div className="flex flex-1 items-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Buka menu"
              aria-expanded={open}
              className="-ml-2 flex h-11 w-11 items-center justify-center text-teal transition-opacity hover:opacity-75"
            >
              <span className="flex flex-col gap-[5px] sm:gap-[6px]">
                <span className="block h-[1.5px] w-6 bg-current sm:w-7" />
                <span className="block h-[1.5px] w-6 bg-current sm:w-7" />
                <span className="block h-[1.5px] w-6 bg-current sm:w-7" />
              </span>
            </button>
          </div>

          {/* Tengah: wordmark teal */}
          <a
            href="#top"
            aria-label={`${site.name} — beranda`}
            className="shrink-0 text-center"
          >
            <span className="font-serif block text-[1.125rem] font-normal uppercase leading-none tracking-[0.2em] text-teal sm:text-[1.45rem] sm:tracking-[0.28em] md:text-[1.75rem] md:tracking-[0.34em]">
              {site.name}
            </span>
          </a>

          {/* Kanan: layanan bergaris bawah + pesan sekarang kotak */}
          <div className="flex flex-1 items-center justify-end gap-4 md:gap-7">
            <a
              href="#layanan"
              className="hidden whitespace-nowrap border-b border-teal/65 pb-1 text-[0.6875rem] font-normal uppercase tracking-[0.16em] text-teal transition-colors hover:border-teal hover:text-teal-deep md:inline-block"
            >
              Layanan
            </a>

            <a
              href={waDefault}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden whitespace-nowrap border border-teal/50 px-3.5 py-2 text-[0.625rem] font-normal uppercase tracking-[0.14em] text-teal transition-colors hover:bg-teal hover:text-white sm:inline-flex md:px-5 md:py-2.5 md:text-[0.6875rem] md:tracking-[0.16em]"
            >
              Pesan Sekarang
            </a>

            {/* WhatsApp versi kecil untuk layar HP */}
            <a
              href={waDefault}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi via WhatsApp"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-teal sm:hidden"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Panel menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] overflow-hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink/45 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />

        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-[min(88vw,400px)] flex-col bg-cream transition-transform duration-500",
            open ? "translate-x-0" : "-translate-x-full",
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
        >
          <div className="flex items-center justify-between border-b border-line px-7 py-6">
            <span className="font-serif text-lg uppercase tracking-[0.3em] text-teal">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup menu"
              className="p-1.5 text-ink-2 transition-colors hover:text-teal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-7 py-6" aria-label="Navigasi seluler">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line/70 py-4 font-serif text-2xl text-ink transition-colors hover:text-teal"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="space-y-3 border-t border-line px-7 py-7">
            <a
              href={waDefault}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-solid w-full"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pesan Sekarang
            </a>
            <a
              href={`mailto:${site.email}`}
              className="block text-center text-[0.6875rem] tracking-wide text-muted"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
