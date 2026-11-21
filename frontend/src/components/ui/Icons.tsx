import type { SVGProps } from "react";

/** Ikon WhatsApp resmi (lucide tidak lagi menyertakan ikon merek). */
export function WhatsAppIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.19-.32a8.16 8.16 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24Zm-2.52 3.4c-.2 0-.53.07-.79.36-.27.3-1 .94-1 2.34s.98 2.76 1.12 2.95c.15.2 2.14 3.26 5.19 4.58.73.31 1.29.5 1.74.64.73.23 1.39.2 1.92.12.59-.09 1.81-.74 2.06-1.46.26-.72.26-1.33.18-1.46-.07-.13-.26-.21-.56-.35-.29-.15-1.72-.86-1.99-.96-.26-.09-.45-.14-.65.15-.19.3-.73.95-.9 1.14-.16.2-.33.22-.62.08-.29-.15-1.23-.45-2.35-1.45-.87-.78-1.46-1.74-1.61-1.98-.15-.25-.02-.38.13-.52.13-.13.29-.35.44-.52.15-.17.2-.29.3-.49.1-.19.05-.36-.02-.51-.08-.14-.66-1.57-.9-2.16-.24-.57-.48-.49-.66-.5h-.48Z" />
    </svg>
  );
}

export function InstagramIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/** Ornamen bunga kecil pengganti emoji dekoratif. */
export function Bloom({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <path d="M12 2.6c1.3 0 2.3 1.5 2.3 3.2 0 .6-.1 1.2-.4 1.7 1.2-.6 2.7-.5 3.6.4.9.9 1 2.4.4 3.6.5-.3 1.1-.4 1.7-.4 1.7 0 3.2 1 3.2 2.3s-1.5 2.3-3.2 2.3c-.6 0-1.2-.1-1.7-.4.6 1.2.5 2.7-.4 3.6-.9.9-2.4 1-3.6.4.3.5.4 1.1.4 1.7 0 1.7-1 3.2-2.3 3.2s-2.3-1.5-2.3-3.2c0-.6.1-1.2.4-1.7-1.2.6-2.7.5-3.6-.4-.9-.9-1-2.4-.4-3.6-.5.3-1.1.4-1.7.4C3.5 15.9 2 14.9 2 13.6s1.5-2.3 3.2-2.3c.6 0 1.2.1 1.7.4-.6-1.2-.5-2.7.4-3.6.9-.9 2.4-1 3.6-.4-.3-.5-.4-1.1-.4-1.7 0-1.7 1-3.4 2.3-3.4Z" />
    </svg>
  );
}
