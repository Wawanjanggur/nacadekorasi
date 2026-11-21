import { site } from "@/data/site";
import { SmartImageFill } from "@/components/ui/SmartImage";

/**
 * Hero mengikuti referensi CANNA: foto penuh lebar tepat di bawah header,
 * proporsi panoramik agar judul "Our Wedding Services" ikut tampak di layar awal,
 * polos tanpa teks atau overlay gelap.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate h-[250px] w-full overflow-hidden bg-panel sm:h-[380px] md:h-[460px] lg:h-[64vh] lg:min-h-[480px] lg:max-h-[560px]"
    >
      <h1 className="sr-only">
        {site.name} — {site.tagline} di Lewat, Kecamatan Kuwus
      </h1>

      <SmartImageFill
        image="hero-wedding-stage-bg"
        alt="Panggung pelaminan pernikahan dengan tirai elegan, pilar putih, dan rangkaian bunga segar"
        priority
        sizes="100vw"
        focus="center 48%"
      />
    </section>
  );
}
