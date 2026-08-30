import Process from "@/components/home/Process";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Our Website, Software & Content Process",
  description:
    "See how L&L Tech Solutions moves from discovery and interface design through development, quality assurance, launch, and continued digital support.",
  path: "/process",
  keywords: [
    "website design process Calgary",
    "software development process Canada",
    "digital project process",
  ],
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Process"
        title={
          <>
            Deliberate decisions.
            <span className="page-title-accent"> Polished execution.</span>
          </>
        }
        description="Strong digital work comes from clear discovery, disciplined design, clean development, representative-device testing, direct communication, and a defined plan for continued improvement."
        primary={{ label: "Start A Project", href: "/contact" }}
        secondary={{ label: "Review Services", href: "/services" }}
        meta={["Discovery", "Design", "Development", "Quality assurance", "Ongoing support"]}
      />

      <Process />

      <PageCTA
        title="A disciplined process creates"
        accent="a stronger finished product."
        description="Share the current situation, desired outcome, and timeline. We will identify the clearest route from first conversation to launch."
        secondaryLabel="View Selected Work"
        secondaryHref="/projects"
      />
    </>
  );
}
