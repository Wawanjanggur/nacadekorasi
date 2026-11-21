import { services, waLink, type Service } from "@/data/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { ImageKey } from "@/lib/image-data";

/**
 * Empat blok layanan mengikuti referensi CANNA:
 * foto berbingkai putih rasio lanskap 16:10 sedikit lebih tinggi dan berada di depan
 * panel abu hangat yang bergeser sedikit ke bawah & masuk tipis di balik tepi foto.
 * Baris ganjil rata kiri, baris genap rata kanan mengarah ke foto.
 */

const imageFor: Record<string, { image: ImageKey; focus?: string; alt: string }> = {
  dekorasi: {
    image: "pelaminan-full-stage",
    focus: "center 45%",
    alt: "Panggung pelaminan dengan pilar putih dan rangkaian bunga segar",
  },
  wagal: {
    image: "attire-wagal-couple-portrait",
    focus: "center 22%",
    alt: "Pasangan pengantin memakai busana adat Wagal",
  },
  gaun: {
    image: "bride-ballgown-luxury",
    focus: "center 38%",
    alt: "Gaun pengantin ballgown putih berpayet",
  },
  rias: {
    image: "makeup-bride-warm-glow",
    focus: "center 20%",
    alt: "Hasil tata rias pengantin warm glow dengan tiara kristal",
  },
};

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const media = imageFor[service.id];
  const reversed = index % 2 === 1;

  return (
    <div className="relative">
      <div
        className={
          reversed
            ? "flex flex-col md:flex-row-reverse md:items-start"
            : "flex flex-col md:flex-row md:items-start"
        }
      >
        {/* Foto berbingkai putih — di depan (z-10), posisi sedikit lebih tinggi */}
        <div className="relative z-10 md:w-[46%] md:shrink-0 lg:w-[44%]">
          <div className="framed">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <SmartImage
                image={media.image}
                alt={media.alt}
                focus={media.focus}
                sizes="(max-width: 768px) 100vw, 45vw"
                imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>

        {/* Panel abu hangat — di belakang tepi foto, aktif mulai layar iPad (md) */}
        <div
          className={
            reversed
              ? "panel relative z-0 flex flex-col justify-center p-6 sm:p-8 md:-mr-[5%] md:mt-6 md:min-h-[235px] md:w-[59%] md:items-end md:py-8 md:pl-8 md:pr-[calc(5%+1.75rem)] md:text-right lg:mt-8 lg:min-h-[265px] lg:w-[61%] lg:py-10 lg:pl-12 lg:pr-[calc(5%+2.5rem)]"
              : "panel relative z-0 flex flex-col justify-center p-6 sm:p-8 md:-ml-[5%] md:mt-6 md:min-h-[235px] md:w-[59%] md:items-start md:py-8 md:pl-[calc(5%+1.75rem)] md:pr-8 md:text-left lg:mt-8 lg:min-h-[265px] lg:w-[61%] lg:py-10 lg:pl-[calc(5%+2.5rem)] lg:pr-12"
          }
        >
          <h3 className="font-serif text-[1.0625rem] uppercase tracking-[0.06em] text-teal sm:text-lg lg:text-[1.25rem]">
            {service.title}
          </h3>

          <p className="font-serif mt-3 max-w-lg text-[0.875rem] leading-[1.7] text-teal-ink lg:mt-3.5 lg:text-[0.9rem]">
            {service.description}
          </p>

          <a
            href={waLink(
              `Halo NacaDecor, saya ingin tanya tentang layanan "${service.title}". Mohon info ketersediaan dan rinciannya.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid mt-6 self-start md:self-auto lg:mt-7"
          >
            Pesan Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="layanan" className="bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Layanan Kami" />

        <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-14 md:space-y-16 lg:mt-16 lg:space-y-24">
          {services.map((s, i) => (
            <ServiceBlock key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
