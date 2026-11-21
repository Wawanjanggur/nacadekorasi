"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  label?: string;
  media: ReactNode;
  children: ReactNode;
}

/**
 * Dialog detail: fokus dipindah ke dalam, Escape menutup, klik latar menutup,
 * fokus terjebak, dan scroll halaman dikunci selama terbuka.
 */
export function Lightbox({ open, onClose, label, media, children }: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label ? `Detail ${label}` : "Detail"}
    >
      <div className="absolute inset-0 animate-fade bg-ink/70 backdrop-blur-[3px]" onClick={onClose} />

      <div
        ref={panelRef}
        className="animate-scale-in relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-sm bg-cream shadow-2xl sm:max-h-[86vh] sm:flex-row"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup detail"
          className="absolute right-2.5 top-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-cream/95 text-ink/75 shadow-xs transition-colors hover:bg-teal/10 hover:text-teal"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="w-full shrink-0 overflow-hidden bg-line sm:w-[48%] lg:w-[52%]">
          <div className="max-h-[36svh] overflow-hidden sm:h-full sm:max-h-none">{media}</div>
        </div>

        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-7 sm:pb-7 sm:pt-11 lg:px-8 lg:pb-8",
            "[&>div>a:last-child]:sticky [&>div>a:last-child]:bottom-0 [&>div>a:last-child]:z-10 [&>div>a:last-child]:shadow-[0_-14px_18px_-14px_rgba(42,58,63,0.35)]",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
