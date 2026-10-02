import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { socialImage } from "@/lib/site";

const SITE_URL = "https://example.com";
const PAGE_PATH = "/reviews";
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`;

const PAGE_TITLE = "Customer Reviews | Trail & Co Rentals Sampletown & Sample Valley";

const PAGE_DESCRIPTION = "Review layout with empty placeholders for a fictional sample business.";

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

const reviewsPageStructuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL_URL}#webpage`,
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

      breadcrumb: {
        "@id": `${CANONICAL_URL}#breadcrumb`,
      },
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
          name: "Customer Reviews",
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

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(reviewsPageStructuredData),
        }}
      />

      <main id="main-content" className="bg-black text-white">
        <section
          className="relative isolate overflow-hidden border-b border-white/10 bg-black pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36"
          aria-labelledby="reviews-page-heading"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(135deg,#020202_0%,#0d0a02_50%,#000_100%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_22%,rgba(212,175,55,0.17),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(212,175,55,0.08),transparent_30%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-[80vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent"
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
                Reviews
              </span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.42fr)] lg:items-end lg:gap-16">
              <div className="max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d4af37]">
                  Customer Reviews
                </p>

                <h1
                  id="reviews-page-heading"
                  className="mt-5 text-[clamp(2.8rem,7vw,6.4rem)] font-black leading-[0.92] tracking-[-0.055em] text-white [text-wrap:balance]"
                >
                  Your customer feedback.
                  <span className="block text-[#d4af37]">Ready for approved reviews.</span>
                </h1>

                <p className="mt-7 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">
                  The cards below are empty editorial placeholders. Add genuine reviews only when
                  the customer has approved their publication.
                </p>
              </div>

              <aside className="rounded-[1.6rem] border border-[#d4af37]/25 bg-[#d4af37]/[0.07] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.35)] sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d4af37]">
                  Editable review layout
                </p>

                <p className="mt-4 text-lg font-bold leading-7 text-white">
                  Clean trailers, straightforward communication, and practical support from inquiry
                  to return.
                </p>

                <p className="mt-4 text-sm leading-7 text-zinc-300">
                  Serving Sampletown, Westfield, Lake District, Southfield, Eastfield, Northfield,
                  and surrounding Sample Valley communities.
                </p>
              </aside>
            </div>
          </Container>
        </section>

        <ReviewsSection />

        <section
          className="relative overflow-hidden border-t border-white/10 bg-[#050505] py-16 sm:py-20"
          aria-labelledby="reviews-cta-heading"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(212,175,55,0.11),transparent_40%)]"
          />

          <Container className="relative max-w-[1200px]">
            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.4)] sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d4af37]">
                    Ready for the next job?
                  </p>

                  <h2
                    id="reviews-cta-heading"
                    className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl"
                  >
                    Find the right trailer and keep the job moving.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-zinc-300">
                    Browse Trail & Co’s current trailer categories or send us the details of what
                    you need to move. Rental, delivery, pickup, and transport options may be
                    available depending on the job, location, and schedule.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <Link
                    href="/rentals"
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#d4af37] px-6 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-black shadow-[0_16px_45px_rgba(212,175,55,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#edca52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d36e] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                  >
                    Browse Trailers
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#d4af37]/45 hover:bg-[#d4af37]/10 hover:text-[#e4c455] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                  >
                    Request a Rental
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
