import type { Metadata } from "next";
import { siteConfig, socialImage } from "@/lib/site";
import { CTASection } from "@/components/sections/CTASection";
import { RecentJobs } from "@/components/sections/RecentJobs";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { TrailerPreview } from "@/components/sections/TrailerPreview";

export const metadata: Metadata = {
  description: siteConfig.description,
  openGraph: {
    title: "Trail & Co Rentals | Trailer Rentals in Sampletown & the Sample Valley",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_CA",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trail & Co Rentals | Trailer Rentals in Sampletown & the Sample Valley",
    description: siteConfig.description,
    images: [socialImage.url],
  },
};

export default function HomePage() {
  return (
    <main className="overflow-x-clip bg-[#050505]">
      <Hero />
      <ServicesPreview />
      <TrailerPreview />
      <RecentJobs />
      <CTASection />
    </main>
  );
}
