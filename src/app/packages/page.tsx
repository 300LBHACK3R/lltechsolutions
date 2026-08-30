import Packages from "@/components/home/Packages";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Website, Software & Social Media Pricing",
  description:
    "Transparent starting prices for custom websites, purpose-built software, and social media management from L&L Tech Solutions.",
  path: "/packages",
  keywords: [
    "affordable Calgary web design pricing",
    "custom software development pricing Canada",
    "affordable social media management Calgary",
  ],
});

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing & Investment"
        title={
          <>
            Competitive starting prices.
            <span className="page-title-accent"> Custom scope where it matters.</span>
          </>
        }
        description="Three focused services, transparent entry pricing, and custom quotes where complexity demands it. You know the starting point before the project conversation begins."
        primary={{ label: "Request A Project Review", href: "/contact" }}
        secondary={{ label: "View Selected Work", href: "/projects" }}
        meta={["Custom scope", "Defined deliverables", "Ongoing options"]}
      />

      <Packages />

      <PageCTA
        title="The right investment starts"
        accent="with a well-defined opportunity."
        description="Tell us what the business needs to build, replace, launch, or manage. We will recommend the clearest engagement structure."
        secondaryLabel="Review Services"
        secondaryHref="/services"
      />
    </>
  );
}
