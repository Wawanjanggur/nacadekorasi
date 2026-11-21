import { waLink } from "@/data/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowUpRight } from "lucide-react";

/**
 * Blok editorial: satu foto besar + penjelasan cara kerja.
 * Menjembatani hero (janji) dan galeri (bukti).
 */
export function Approach() {
  return (
    <section className="bg-cream-2 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionTitle
          title="Our Approach"
          subtitle="Dekorasi yang bagus dimulai dari pengukuran, bukan dari moodboard"
          align="left"
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="framed">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <SmartImage
                  image="decor-grand-stage-egen-agnes"
                  alt="Panggung pelaminan dengan pilar putih, sofa, dan lorong kaca"
                  focus="center 42%"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="lede">
              Kami lebih dulu mengukur lokasi, menghitung beban panggung, dan mencatat titik
              listrik. Setelah itu baru bunga dipilih — supaya yang Anda lihat di hari acara sama
              dengan yang Anda setujui di proposal.
            </p>

            <dl className="mt-8 space-y-6 border-t border-line pt-7">
              <div>
                <dt className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-teal">
                  Dihitung per baris
                </dt>
                <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-2">
                  Proposal memecah panggung, backdrop, bunga, lampu, dan tenaga instalasi. Anda
                  bisa mencoret item yang tidak dibutuhkan.
                </dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-teal">
                  Busana dan rias ikut dihitung
                </dt>
                <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-2">
                  Karena satu tim, warna kain dan tone rias disamakan dengan pencahayaan panggung
                  — bukan diputuskan terpisah di hari-H.
                </dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-teal">
                  Satu nomor untuk dihubungi
                </dt>
                <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-2">
                  Selama acara berlangsung, koordinator yang sama yang Anda temui saat konsultasi
                  ada di lokasi.
                </dd>
              </div>
            </dl>

            <a
              href={waLink("Halo NacaDecor, boleh saya lihat contoh proposal dan rincian per item?")}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-teal transition-colors hover:text-teal-deep"
            >
              Minta contoh proposal
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
