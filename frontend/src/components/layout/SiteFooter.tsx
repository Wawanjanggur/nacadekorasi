import { site, waDefault } from "@/data/site";
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from "@/components/ui/Icons";

export function SiteFooter() {
  return (
    <footer className="bg-panel text-teal-ink">
      <div className="mx-auto max-w-[1140px] px-5 py-14 sm:px-8 sm:py-16">
        {/* Wordmark besar */}
        <div className="border-b border-teal/15 pb-10 text-center">
          <span className="font-serif block text-[clamp(1.5rem,4vw,2.5rem)] font-normal uppercase leading-none tracking-[0.3em] text-teal">
            {site.name}
          </span>
          <p className="mt-3 text-[0.625rem] uppercase tracking-[0.22em] text-teal-ink/70">
            {site.tagline} · Lewat, Kecamatan Kuwus
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h3 className="label text-teal">Studio</h3>
            <p className="font-serif mt-3.5 text-sm leading-relaxed text-teal-ink">{site.address}</p>
            <p className="mt-3">
              <a
                href={`mailto:${site.email}`}
                className="font-serif text-sm text-teal-ink underline decoration-teal/35 underline-offset-4 transition-colors hover:text-teal"
              >
                {site.email}
              </a>
            </p>
            <p className="mt-3">
              <a
                href={waDefault}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-serif text-sm text-teal-ink transition-colors hover:text-teal"
              >
                <WhatsAppIcon className="h-4 w-4 text-teal" />
                {site.waDisplay}
              </a>
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="label text-teal">Halaman</h3>
            <ul className="mt-3.5 space-y-2 text-sm">
              {[
                { label: "Layanan", href: "#layanan" },
                { label: "Dekorasi", href: "#dekorasi" },
                { label: "Busana", href: "#busana" },
                { label: "Galeri", href: "#tata-rias" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-serif text-teal-ink transition-colors hover:text-teal">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="label text-teal">Jam Operasional</h3>
            <dl className="mt-3.5 space-y-2 font-serif text-sm text-teal-ink">
              {site.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <dt>{h.day}</dt>
                  <dd className="tnum">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-3">
            <h3 className="label text-teal">Ikuti</h3>
            <div className="mt-3.5 flex flex-col gap-2.5">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} ${s.handle}`}
                  className="inline-flex items-center gap-2.5 font-serif text-sm text-teal-ink transition-colors hover:text-teal"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-teal/40 text-teal transition-colors hover:bg-teal hover:text-white">
                    {s.label === "Facebook" ? (
                      <FacebookIcon className="h-4 w-4" />
                    ) : (
                      <InstagramIcon className="h-4 w-4" />
                    )}
                  </span>
                  <span>{s.handle}</span>
                </a>
              ))}
            </div>
            <p className="mt-4 text-[0.75rem] leading-relaxed text-teal-ink/75">
              Pasang ukuran terakhir disarankan H-7. Untuk luar kota, konsultasi minimal 2 bulan
              sebelum acara.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-teal/15 pt-7 text-[0.75rem] text-teal-ink/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Seluruh hak cipta dilindungi.
          </p>
          <p>Foto adalah dokumentasi asli acara klien.</p>
        </div>
      </div>
    </footer>
  );
}
