import Link from "next/link";
import { navItems, waDefault } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

export const metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col justify-center bg-cream">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-28 sm:px-8">
        <div className="max-w-xl">
          <span className="label text-teal-soft">Error 404</span>

          <p className="tnum font-serif mt-5 text-[clamp(3.5rem,12vw,7rem)] leading-none text-teal">
            404
          </p>

          <h1 className="font-script script-lg mt-3 text-teal">Halaman ini tidak ada</h1>

          <p className="lede mt-4">
            Alamat yang Anda buka mungkin salah ketik, atau halamannya sudah dipindahkan. Semua
            yang Anda butuhkan ada di beranda — dekorasi, busana, tata rias, dan alur pemesanan.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-solid">
              Kembali ke beranda
            </Link>
            <a
              href={waDefault}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Tanya via WhatsApp
            </a>
          </div>

          <div className="mt-12 border-t border-line pt-6">
            <p className="label text-muted">Atau langsung ke</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${item.href}`}
                    className="text-[0.8125rem] text-ink-2 underline decoration-line underline-offset-4 transition-colors hover:text-teal hover:decoration-teal"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
