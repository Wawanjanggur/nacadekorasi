"use client";

import { waDefault } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Tombol bulat teal mengapung, mengikuti referensi. */
export function FloatingWhatsApp() {
  return (
    <a
      href={waDefault}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami via WhatsApp"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white shadow-[0_10px_28px_-10px_rgba(0,128,168,0.9)] transition-transform duration-300 hover:scale-105 hover:bg-teal-deep sm:bottom-7 sm:right-7 sm:h-[3.25rem] sm:w-[3.25rem]"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
