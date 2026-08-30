import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Free Digital Presence Audit",
  description:
    "Request a focused review of your website, customer journey, search foundations, social channels, content quality, and highest-value digital opportunities.",
  path: "/free-tech-audit",
  keywords: [
    "free website audit Calgary",
    "digital presence audit Canada",
    "social media audit Calgary",
  ],
});

const auditItems = [
  {
    title: "Website Experience",
    text: "We review visual presentation, mobile experience, speed, trust signals, service structure, calls to action, forms, and the conversion path.",
  },
  {
    title: "SEO & Google Foundation",
    text: "We review metadata, search structure, local relevance, Google Business connections, service-area opportunities, and technical visibility.",
  },
  {
    title: "Social & Content Presence",
    text: "We review active platforms, profile consistency, content quality, publishing rhythm, visual branding, and opportunities for stronger short-form content.",
  },
  {
    title: "Clear Digital Priorities",
    text: "You receive a practical breakdown of what is working, what is weak, what should be improved first, and which service would create the strongest impact.",
  },
];

const whoItsFor = [
  "Established businesses with an outdated website",
  "Contractors and local service companies",
  "Startups preparing for a professional launch",
  "Brands struggling with inconsistent social content",
  "Businesses considering custom software",
  "Owners who need a clearer digital direction",
];

export default function FreeDigitalAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Digital Presence Audit"
        title={
          <>
            See what is working.
            <span className="page-title-accent"> Fix what is holding the business back.</span>
          </>
        }
        description="A focused review of the website, customer journey, search foundations, social presence, and content—organized into clear priorities rather than a generic sales report."
        primary={{ label: "Request My Audit", href: "/contact" }}
        secondary={{ label: "Review Services", href: "/services" }}
        meta={[
          "No-obligation review",
          "Practical priorities",
          "Clear next step",
        ]}
      />

      <section className="section-ivory relative overflow-hidden py-20 md:py-28">
        <div className="ivory-blue-orb ivory-blue-orb-left" />
        <div className="ivory-gold-orb" />

        <div className="container-premium relative z-10">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <span className="section-eyebrow section-eyebrow-dark">
                  What We Review
                </span>

                <h2 className="font-editorial mt-7 text-5xl font-semibold leading-[0.9] tracking-[-0.045em] text-[#10243a] md:text-7xl">
                  A focused look at
                  <span className="block italic text-[#17477f]">
                    the complete digital journey.
                  </span>
                </h2>
              </div>

              <p className="max-w-xl text-base leading-8 text-[#31465e]/62 md:text-lg lg:justify-self-end">
                No inflated report and no pressure. The goal is to identify the
                changes most likely to improve clarity, trust, and conversion.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {auditItems.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 70}>
                <article className="audit-corporate-card">
                  <div className="flex items-start gap-5">
                    <span className="font-editorial text-5xl font-semibold text-[#2f6fbb]/24">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="font-editorial text-3xl font-semibold tracking-[-0.035em] text-[#10243a]">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-[#31465e]/62">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <Reveal>
              <div className="rounded-[1.5rem] border border-black/10 bg-white p-7 shadow-[0_24px_70px_rgba(34,24,7,0.07)] md:p-9">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#9b762c]">
                  Who This Is For
                </p>

                <h3 className="font-editorial mt-4 text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#10243a]">
                  Businesses that need clarity before committing.
                </h3>

                <div className="mt-7 flex flex-wrap gap-2">
                  {whoItsFor.map((item) => (
                    <span key={item} className="ideal-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="management-panel h-full">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#ead39a]">
                  What You Receive
                </p>

                <h3 className="font-editorial mt-4 text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-white">
                  A practical action plan—not a generic sales report.
                </h3>

                <p className="mt-5 text-sm leading-7 text-white/56">
                  We identify what is already working, where trust or conversion
                  is being lost, which changes should happen first, and which
                  work can wait.
                </p>

                <a href="/contact" className="btn-gold mt-8">
                  Start The Audit
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PageCTA
        title="Clarity first."
        accent="Then the right investment."
        description="Send the current website or social profiles and explain what the business is trying to improve. We will begin with the strongest opportunities."
        secondaryLabel="View Selected Work"
        secondaryHref="/projects"
      />
    </>
  );
}
