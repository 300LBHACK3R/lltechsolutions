import type { Metadata } from "next";
import Link from "next/link";

import { FaqDirectory } from "@/components/faq/FaqDirectory";
import { Container } from "@/components/ui/Container";
import { allFaqItems } from "@/data/faqDirectory";
import { socialImage } from "@/lib/site";

const SITE_URL = "https://example.com";

const PAGE_PATH = "/faq";

const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`;

const PAGE_TITLE = "Trailer Rental FAQ | Trail & Co Rentals Sampletown & Sample Valley";

const PAGE_DESCRIPTION =
  "Get clear answers about Trail & Co trailer rentals, towing requirements, delivery and collection, pickup and transport, loading, pricing, returns, and service throughout Sampletown and the Sample Valley.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  applicationName: "Trail & Co Rentals",

  alternates: {
    canonical: CANONICAL_URL,
  },

  openGraph: {
    images: [socialImage],
    type: "website",
    locale: "en_CA",
    url: CANONICAL_URL,
    siteName: "Trail & Co Rentals",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },

  twitter: {
    images: [socialImage.url],
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },

  robots: {
    index: false,
    follow: true,
    nocache: false,

    googleBot: {
      index: false,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "Trailer Rentals",
};

const faqStructuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL_URL}#faq`,
      url: CANONICAL_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "en-CA",

      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      about: {
        "@id": `${SITE_URL}/#business`,
      },

      mainEntity: allFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,

        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },

    {
      "@type": "BreadcrumbList",

      "@id": `${CANONICAL_URL}#breadcrumb`,

      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },

        {
          "@type": "ListItem",
          position: 2,
          name: "Frequently Asked Questions",
          item: CANONICAL_URL,
        },
      ],
    },
  ],
};

function serializeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

const servicePaths = [
  {
    number: "01",
    title: "Rent the trailer",
    description:
      "Choose the appropriate enclosed, dump, or flatdeck and dovetail trailer and tow it with an approved vehicle and setup.",
  },

  {
    number: "02",
    title: "Have it delivered",
    description:
      "Trail & Co may deliver the empty rental trailer to the agreed location and collect it afterward.",
  },

  {
    number: "03",
    title: "Have the load hauled",
    description:
      "For suitable customer-prepared loads, Trail & Co may provide pickup, transport, and delivery between locations.",
  },
];

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(faqStructuredData),
        }}
      />

      <main id="main-content" className="overflow-hidden bg-black text-white">
        <section
          className="relative isolate overflow-hidden border-b border-white/10 bg-black pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36"
          aria-labelledby="faq-page-heading"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(135deg,#020202_0%,#0d0a02_50%,#000_100%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(212,175,55,0.18),transparent_32%),radial-gradient(circle_at_88%_14%,rgba(212,175,55,0.08),transparent_28%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-[84vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent"
          />

          <Container className="max-w-[1500px]">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500"
            >
              <Link
                href="/"
                className="transition-colors hover:text-[#d4af37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70"
              >
                Home
              </Link>

              <span aria-hidden="true">/</span>

              <span aria-current="page" className="text-[#d4af37]">
                FAQ
              </span>
            </nav>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.45fr)] lg:items-end lg:gap-16">
              <div className="max-w-5xl">
                <p className="text-xs font-bold uppercase tracking-[0.31em] text-[#d4af37]">
                  Trail & Co Support
                </p>

                <h1
                  id="faq-page-heading"
                  className="mt-5 text-[clamp(3rem,7vw,6.6rem)] font-black leading-[0.91] tracking-[-0.058em] text-white [text-wrap:balance]"
                >
                  Trailer questions,
                  <span className="block text-[#d4af37]">answered properly.</span>
                </h1>

                <p className="mt-7 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
                  Clear information about choosing a trailer, booking, towing requirements,
                  delivery, hauling, loading, safe use, returns, and service throughout Sampletown
                  and the Sample Valley.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#faq-directory"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d4af37] px-6 py-3.5 text-sm font-black uppercase tracking-wide text-black shadow-[0_16px_45px_rgba(212,175,55,0.18)] transition hover:-translate-y-0.5 hover:bg-[#edca52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d36e] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                  >
                    Search Questions
                  </a>

                  <Link
                    href="/contact"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:border-[#d4af37]/45 hover:bg-[#d4af37]/10 hover:text-[#e4c455] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>

              <aside className="rounded-[1.7rem] border border-[#d4af37]/25 bg-[#d4af37]/[0.07] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.38)] sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                  Fastest answer
                </p>

                <p className="mt-4 text-xl font-black leading-8 text-white">
                  Send a photo, the locations, approximate dimensions and weight, and the preferred
                  date.
                </p>

                <p className="mt-4 text-sm leading-7 text-zinc-300">
                  Those details help Trail & Co identify the likely trailer and service path before
                  confirming availability.
                </p>

                <a
                  href="/contact#sample-contact"
                  className="mt-6 inline-flex text-base font-black text-[#d4af37] underline decoration-[#d4af37]/35 underline-offset-4 transition hover:text-[#f0d36e]"
                >
                  Phone not configured (demo)
                </a>
              </aside>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {servicePaths.map((path) => (
                <article
                  key={path.number}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_18px_65px_rgba(0,0,0,0.28)]"
                >
                  <p className="text-xs font-black tracking-[0.20em] text-[#d4af37]">
                    {path.number}
                  </p>

                  <h2 className="mt-3 text-xl font-black text-white">{path.title}</h2>

                  <p className="mt-3 text-sm leading-7 text-zinc-400">{path.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <FaqDirectory />
      </main>
    </>
  );
}
