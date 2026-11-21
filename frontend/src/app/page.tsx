import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { AttireCatalog } from "@/components/sections/AttireCatalog";
import { DecorPortfolio } from "@/components/sections/DecorPortfolio";
import { MakeupPortfolio } from "@/components/sections/MakeupPortfolio";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline} di Lewat, Kecamatan Kuwus`,
  description: site.description,
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  description: site.description,
  url: site.url,
  telephone: `+${site.waNumber}`,
  email: site.email,
  image: `${site.url}/images/real/pelaminan-full-stage.jpg`,
  priceRange: "Rp 350.000 – Rp 21.000.000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lewat",
    addressRegion: "Kecamatan Kuwus",
    addressCountry: "ID",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "17:00",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Services />
      <DecorPortfolio />
      <AttireCatalog />
      <MakeupPortfolio />
    </>
  );
}
