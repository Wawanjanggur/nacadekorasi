import { processSteps, waLink } from "@/data/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WhatsAppIcon } from "@/components/ui/Icons";

export function Process() {
  return (
    <section id="alur" className="bg-cream py-14 sm:py-20">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <SectionTitle title="How It Works" />

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <li key={s.step} className="bg-panel p-6">
              <span className="tnum font-serif text-xl text-teal">{s.step}</span>
              <h3 className="font-serif mt-2.5 text-[0.9375rem] uppercase tracking-[0.04em] text-teal">
                {s.title}
              </h3>
              <p className="font-serif mt-2.5 text-[0.84375rem] leading-relaxed text-teal-ink">
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="panel mt-8 flex flex-col items-start justify-between gap-6 p-7 sm:p-9 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h3 className="font-serif text-lg uppercase tracking-[0.05em] text-teal">
              Kenapa kami tidak memasang harga paket di sini?
            </h3>
            <p className="font-serif mt-3 text-[0.875rem] leading-relaxed text-teal-ink">
              Dua acara dengan jumlah tamu sama bisa beda biaya karena ukuran panggung, tinggi
              plafon, dan akses lokasi. Kami lebih memilih menghitung setelah survei daripada
              memberi angka yang akhirnya berubah.
            </p>
          </div>
          <a
            href={waLink(
              "Halo NacaDecor, boleh dibantu perkiraan biaya untuk acara saya? Ini detailnya:",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid shrink-0"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Minta Penawaran
          </a>
        </div>
      </div>
    </section>
  );
}
