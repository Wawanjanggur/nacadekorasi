"use client";

import { useState } from "react";
import { faqs, waDefault } from "@/data/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream py-14 sm:py-20">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8">
        <SectionTitle title="FAQ" />

        <dl className="mt-10 border-t border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-line">
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "font-serif text-[1.0625rem] leading-snug transition-colors sm:text-lg",
                        isOpen ? "text-teal" : "text-teal-ink",
                      )}
                    >
                      {f.q}
                    </span>
                    <Plus
                      className={cn(
                        "mt-1 h-4 w-4 shrink-0 text-teal transition-transform duration-300",
                        isOpen && "rotate-45",
                      )}
                    />
                  </button>
                </dt>
                <dd
                  id={`faq-panel-${i}`}
                  hidden={!isOpen}
                  className="animate-fade pb-6 pr-10 font-serif text-[0.875rem] leading-relaxed text-teal-ink"
                >
                  {f.a}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-10 text-center">
          <a
            href={waDefault}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Tanya Langsung
          </a>
        </div>
      </div>
    </section>
  );
}
