import type { Metadata } from "next";
import Image from "next/image";
import { TrailerCategoryCard } from "@/components/rentals/TrailerCategoryCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import {
  getCategoryPreviewImage,
  getCategoryTrailerCount,
  getTrailersForCategory,
  trailerCategories,
} from "@/data/trailerCategories";
import { siteConfig, socialImage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trailer Rentals",
  description:
    "Browse Trail & Co Rentals by category, including enclosed trailers, dump trailers, flat deck trailers, dovetail trailers, and equipment hauling options across Sampletown and the Sample Valley.",
  alternates: {
    canonical: `${siteConfig.url}/rentals`,
  },
  openGraph: {
    title: "Trailer Rentals in Sampletown & the Sample Valley | Trail & Co Rentals",
    description:
      "Browse enclosed trailer rentals, dump trailer rentals, flat deck trailer rentals, and equipment trailer rentals from Trail & Co Rentals.",
    url: `${siteConfig.url}/rentals`,
    siteName: siteConfig.name,
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trailer Rentals in Sampletown & the Sample Valley | Trail & Co Rentals",
    description: "Browse trailer rentals by category from Trail & Co Rentals.",
    images: [socialImage.url],
  },
};

const rentalsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.url}/rentals#trailer-rentals`,
  name: "Trailer Rentals in Sampletown and the Sample Valley",
  serviceType: "Trailer Rental",
  url: `${siteConfig.url}/rentals`,
  provider: {
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: [
    "Sampletown",
    "Westfield",
    "Eastfield",
    "Southfield",
    "Lake District",
    "Northfield",
    "Sample Valley",
    "Sample Province",
  ],
  description:
    "Trail & Co Rentals provides premium trailer rentals across Sampletown and the Sample Valley, including enclosed trailers, dump trailers, flat deck trailers, dovetail trailers, and equipment hauling options.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Trail & Co Trailer Rental Categories",
    itemListElement: trailerCategories.map((category) => ({
      "@type": "Offer",
      name: category.title,
      url: `${siteConfig.url}/rentals/${category.id}`,
      itemOffered: {
        "@type": "Service",
        name: category.title,
        serviceType: "Trailer Rental",
      },
    })),
  },
};

export default function RentalsPage() {
  return (
    <main className="overflow-x-clip bg-[#050505]">
      <JsonLd data={rentalsJsonLd} />

      <section className="relative isolate overflow-hidden border-b border-white/10 bg-black">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/sample-rentals.webp"
            alt="Generated illustrative equipment-rental scene; not actual fleet photography"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/30" />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.64)_0%,rgba(0,0,0,0.24)_42%,rgba(0,0,0,0.76)_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(212,175,55,0.11),transparent_45%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-[#050505] to-transparent"
        />

        <Container className="relative">
          <div className="mx-auto flex min-h-[420px] max-w-5xl flex-col items-center justify-center py-16 text-center sm:min-h-[460px] sm:py-20 lg:min-h-[500px]">
            <p className="rounded-full border border-[#d4af37]/35 bg-black/40 px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#e4c456] shadow-[0_10px_40px_rgba(0,0,0,0.3)] backdrop-blur-md sm:text-xs sm:tracking-[0.35em]">
              Trailer Rentals
            </p>

            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,5.5vw,5rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white [text-wrap:balance]">
              Find the right trailer faster.
            </h1>

            <p className="mt-5 text-lg text-zinc-200 sm:text-xl">
              Pricing starting at{" "}
              <span className="font-semibold text-[#d4af37]">$115/day · sample rate</span>
            </p>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-zinc-200 [text-wrap:balance] sm:text-lg lg:text-xl lg:leading-9">
              Browse Trail & Co Rentals by category. Choose enclosed trailers, dump trailers, or
              flat deck and equipment trailer options built for real work across Sampletown and the
              Sample Valley.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.10),transparent_29%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_25%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.14),rgba(0,0,0,0.68))]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <Container className="max-w-[1500px]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
              Browse by Trailer Type
            </p>

            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.035em] text-white [text-wrap:balance]">
              Choose the right trailer for the job.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
              Select the trailer category that matches what you need to haul. Each rental type is
              organized by use case, making it easier to compare options for moving, cleanup jobs,
              equipment hauling, contractor work, and weekend projects.
            </p>
          </div>

          <div className="mt-10 grid items-stretch gap-6 md:mt-12 md:grid-cols-2 lg:gap-7 xl:grid-cols-3">
            {trailerCategories.map((category) => (
              <TrailerCategoryCard
                key={category.id}
                category={category}
                previewImage={getCategoryPreviewImage(category.id)}
                trailerCount={getCategoryTrailerCount(category.id)}
                trailer={getTrailersForCategory(category.id)[0]}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
