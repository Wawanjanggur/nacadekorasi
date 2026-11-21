import { waDefault, site } from "@/data/site";
import { SmartImageFill } from "@/components/ui/SmartImage";
import { WhatsAppIcon } from "@/components/ui/Icons";

export function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <SmartImageFill
        image="decor-champagne-gold-arch"
        alt="Dekorasi lengkung emas sampanye dengan rangkaian bunga segar"
        sizes="100vw"
        focus="center 45%"
        imgClassName="opacity-55"
      />
      <div className="absolute inset-0 bg-ink/55" />

      <div className="relative mx-auto max-w-[1280px] px-5 py-24 text-center sm:px-8 sm:py-32">
        <span className="label text-white/70">Kunci tanggal Anda</span>

        <h2 className="font-script script-xl mt-4 text-white">
          Let&apos;s Plan Your Day
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-white/80">
          Kirim tanggal dan lokasi acara, kami balas dengan ketersediaan tim plus perkiraan biaya.
          Konsultasi awal tidak dipungut biaya dan tanpa kewajiban memesan.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={waDefault} target="_blank" rel="noopener noreferrer" className="btn btn-solid-light">
            <WhatsAppIcon className="h-4 w-4" />
            Book Now
          </a>
          <a href={`mailto:${site.email}`} className="btn btn-ghost-light">
            Kirim Email
          </a>
        </div>

        <p className="mt-7 text-[0.6875rem] uppercase tracking-[0.18em] text-white/45">
          {site.waDisplay} · {site.hours[0].day}, {site.hours[0].time}
        </p>
      </div>
    </section>
  );
}
