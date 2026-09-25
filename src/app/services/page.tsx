import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import ProjectCTA from "@/components/ui/ProjectCTA";
import JsonLd from "@/components/seo/JsonLd";
import { contentProduction, servicePillars } from "@/data/services";
import { absoluteUrl } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Website, Software & Social Media Services",
  "Website development, custom software and social media, plus photography and videography for websites and business content. Calgary-based L&L Tech Solutions.",
  "/services",
);
export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our services"
        title="Built around your business."
        description="Three connected disciplines. A clear scope for each. Bring us the business goal, and we’ll help define the right work."
      />
      <div className="container service-directory">
        {servicePillars.map((service, index) => (
          <section className="service-detail" id={service.id} key={service.id}>
            <div>
              <p className="eyebrow">
                0{index + 1} / {service.name}
              </p>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <div className="button-row">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.inquiry)}`}
                  className="button button-outline"
                >
                  Discuss your project <span aria-hidden="true">↗</span>
                </Link>
                <Link href={service.work} className="text-link">
                  Related work →
                </Link>
              </div>
              {service.id === "website-development" && (
                <div className="collection-discovery-link">
                  <p>
                    Prefer an existing design direction? Explore our custom-coded Website
                    Collection, with personalization, launch and optional monthly care.
                  </p>
                  <Link href="/website-collection" className="text-link">
                    Explore the Website Templates ↗
                  </Link>
                </div>
              )}
              {service.id === "social-media-management" && (
                <section className="content-production" id={contentProduction.id}>
                  <h3>{contentProduction.title}</h3>
                  <p>{contentProduction.description}</p>
                  <ul className="content-production-uses">
                    {contentProduction.uses.map((use) => (
                      <li key={use}>{use}</li>
                    ))}
                  </ul>
                  <p className="content-production-scope">{contentProduction.scope}</p>
                  <Link
                    href={`/contact?service=${encodeURIComponent(contentProduction.inquiry)}`}
                    className="text-link"
                  >
                    Plan your photo & video project ↗
                  </Link>
                </section>
              )}
            </div>
            <div>
              <h3>What we can help with</h3>
              <ul className="capability-list">
                {service.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": servicePillars.map((service) => ({
            "@type": "Service",
            name: service.name,
            description: service.description,
            url: absoluteUrl(`/services#${service.id}`),
            provider: { "@id": absoluteUrl("/#organization") },
            areaServed: "Canada",
          })),
        }}
      />
      <ProjectCTA />
    </>
  );
}
