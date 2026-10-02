import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RecentJobs } from "@/components/sections/RecentJobs";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGalleryEntries } from "@/data/projectGallery";
import { getPublishedJobs } from "@/data/recentJobs";
import { siteConfig, socialImage } from "@/lib/site";

const publishedJobs = getPublishedJobs();
const galleryEntries = getGalleryEntries();
const hasJobs = publishedJobs.length > 0;
const hasExamples = galleryEntries.some((entry) => entry.kind === "example");
const pageTitle = hasJobs ? "Recent Jobs & Trailer Projects" : "Project Gallery & Hauling Ideas";
const socialTitle = hasJobs
  ? "Recent Jobs | Trail & Co Rentals"
  : "Hauling Ideas | Trail & Co Rentals";
const description = hasJobs
  ? "Explore Trail & Co trailer projects, with job photos and details about trailer rentals, delivery and load transport."
  : hasExamples
    ? "Picture your next haul with illustrative trailer scenes. These are project ideas, not completed customer jobs. Explore Trail & Co rentals, delivery and transport."
    : "The Trail & Co customer project gallery is coming soon. Explore trailer rentals, trailer delivery and load transport in Sampletown and the Sample Valley.";
const firstPhoto = galleryEntries[0]?.project.image;
const galleryImage = firstPhoto
  ? {
      url: new URL(firstPhoto.src, siteConfig.url).toString(),
      width: firstPhoto.width,
      height: firstPhoto.height,
      alt: firstPhoto.alt,
    }
  : socialImage;

export const metadata: Metadata = {
  title: pageTitle,
  description,
  alternates: { canonical: `${siteConfig.url}/recent-jobs` },
  // Illustrative examples never make this page indexable as completed work.
  robots: { index: hasJobs, follow: true },
  openGraph: {
    images: [galleryImage],
    title: socialTitle,
    description,
    url: `${siteConfig.url}/recent-jobs`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description,
    images: [{ url: galleryImage.url, alt: galleryImage.alt }],
  },
};

export default function RecentJobsPage() {
  const breadcrumbLabel = hasJobs ? "Recent jobs" : "Project gallery";

  return (
    <main className="overflow-x-clip bg-[#050505]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            {
              "@type": "ListItem",
              position: 2,
              name: breadcrumbLabel,
              item: `${siteConfig.url}/recent-jobs`,
            },
          ],
        }}
      />
      <section className="pb-8 pt-10 sm:pb-12 sm:pt-14">
        <Container className="max-w-[1500px]">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-3 text-sm text-zinc-400 sm:mb-14"
          >
            <Link
              href="/"
              className="rounded-sm hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            >
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-zinc-200">
              {breadcrumbLabel}
            </span>
          </nav>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
              Project gallery
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl">
              {hasJobs
                ? "Recent jobs. Real-world hauling."
                : hasExamples
                  ? "Ideas for your next haul."
                  : "Room for your next project."}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              {hasJobs
                ? "A closer look at the trailers and services behind our customer projects."
                : hasExamples
                  ? "From moving day to a weekend cleanup, find a setup that fits what you have in mind."
                  : "Our customer project gallery is on its way. Explore the fleet and find a trailer for the job ahead."}
            </p>
          </div>
        </Container>
      </section>
      <RecentJobs fullPage />
      <CTASection />
    </main>
  );
}
