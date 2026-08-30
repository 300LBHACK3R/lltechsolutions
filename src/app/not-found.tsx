import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Page Not Found",
  description:
    "The page you requested could not be found. Continue to L&L Tech Solutions services, selected work, or project inquiry.",
  path: "/404",
  noIndex: true,
});

export default function NotFoundPage() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title={
          <>
            This page is no longer here.
            <span className="page-title-accent"> The studio still is.</span>
          </>
        }
        description="The address may have changed, or the page may no longer exist. Continue to the work, services, or project inquiry."
        primary={{ label: "Return Home", href: "/" }}
        secondary={{ label: "View Selected Work", href: "/projects" }}
        meta={["Website design", "Software development", "Social management"]}
      />

      <PageCTA
        eyebrow="Need Direction?"
        title="Tell us what the business"
        accent="needs to build next."
        description="We will review the opportunity and recommend the clearest website, software, or social-management path."
        secondaryLabel="Review Services"
        secondaryHref="/services"
      />
    </>
  );
}
