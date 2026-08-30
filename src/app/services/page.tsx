import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { servicePillars } from "@/data/services";
import { ServiceCatalogStructuredData } from "@/components/seo/StructuredData";
import { createMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Website Design, Software Development & Social Media Management",
  description:
    "Explore custom website design, purpose-built software, and social media management services from L&L Tech Solutions in Calgary and across Canada.",
  path: "/services",
  keywords: [
    "website design services Calgary",
    "software development services Canada",
    "social media management services Calgary",
  ],
});

const idealFor: Record<string, string[]> = {
  "website-design": [
    "Established businesses with an outdated website",
    "New businesses that need a credible launch",
    "Service companies that depend on inquiries or bookings",
    "Brands that need e-commerce, payments, or integrated forms",
  ],
  "software-development": [
    "Businesses replacing repetitive manual processes",
    "Teams that need portals, dashboards, or internal tools",
    "Founders developing a web application or digital product",
    "Companies that need custom integrations or workflows",
  ],
  "social-media": [
    "Businesses that need consistent publishing",
    "Brands that need original photography or short-form video",
    "Owners who want website, Google, and social channels aligned",
    "Companies looking for an ongoing digital partner",
  ],
};

export default function ServicesPage() {
  return (
    <>
      <ServiceCatalogStructuredData />

      <PageHero
        eyebrow="Premium Digital Services"
        title={
          <>
            Build a presence customers trust.
            <span className="page-title-accent"> Support it with the right system.</span>
          </>
        }
        description="Website design, custom software, and social media management delivered as one connected digital system—clear in strategy, polished in execution, and built for continued growth."
        primary={{ label: "Start A Project", href: "/contact" }}
        secondary={{ label: "View Selected Work", href: "/projects" }}
        meta={[
          "Custom-coded",
          "Original content",
          "Canada-wide delivery",
        ]}
      />

      <section className="section-ivory relative overflow-hidden py-20 md:py-28">
        <div className="ivory-blue-orb ivory-blue-orb-left" />
        <div className="ivory-gold-orb" />

        <div className="container-premium relative z-10">
          <div className="grid gap-10">
            {servicePillars.map((service, index) => (
              <Reveal key={service.id} delayMs={index * 90}>
                <article
                  id={service.id}
                  className="service-detail-card scroll-mt-32"
                >
                  <div className="service-detail-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="service-detail-intro">
                    <p className="text-[0.64rem] font-black uppercase tracking-[0.2em] text-[#9b762c]">
                      {service.eyebrow}
                    </p>

                    <h2 className="font-editorial mt-4 text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#10243a] md:text-6xl">
                      {service.title}
                    </h2>

                    <p className="mt-6 text-base leading-8 text-[#2e2b27]/66">
                      {service.description}
                    </p>

                    <div className="mt-7 border-l-4 border-[#2f6fbb] pl-5">
                      <p className="text-sm font-black leading-7 text-[#10243a]">
                        {service.highlight}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#31465e]/58">
                        {service.outcome}
                      </p>
                    </div>

                    <p className="mt-7 text-xs leading-6 text-[#10243a]/42">
                      {service.availability}
                    </p>

                    <Link href="/contact" className="btn-blue mt-8">
                      Discuss This Service
                    </Link>
                  </div>

                  <div className="service-detail-capabilities">
                    <div>
                      <p className="service-detail-label">
                        Capabilities & Deliverables
                      </p>

                      <ul className="mt-6 grid gap-3 md:grid-cols-2">
                        {service.services.map((item) => (
                          <li key={item} className="light-capability-card">
                            <span className="light-capability-marker" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 border-t border-black/10 pt-8">
                      <p className="service-detail-label">Ideal For</p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {idealFor[service.id]?.map((item) => (
                          <span key={item} className="ideal-chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white py-20 md:py-24">
        <div className="container-premium">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <div>
                <span className="section-eyebrow section-eyebrow-dark">
                  One Connected Partner
                </span>

                <h2 className="font-editorial mt-7 text-5xl font-semibold leading-[0.92] tracking-[-0.04em] text-[#10243a] md:text-7xl">
                  The website, software,
                  <span className="block italic text-[#17477f]">
                    and content should agree.
                  </span>
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "One visual direction across the website and social channels.",
                  "Custom functionality shaped around the actual customer journey.",
                  "Original photo and video content that matches the digital experience.",
                  "SEO, Google, publishing, and conversion paths planned together.",
                  "Ongoing improvements after launch instead of a one-time handoff.",
                  "One accountable partner instead of several disconnected vendors.",
                ].map((item) => (
                  <div key={item} className="corporate-benefit-card">
                    <span />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PageCTA
        title="Bring every customer-facing piece"
        accent="under one polished direction."
        description="Tell us what the business needs to launch, replace, automate, or manage. We will define the strongest scope and next step."
        secondaryLabel="View Projects"
        secondaryHref="/projects"
      />
    </>
  );
}
