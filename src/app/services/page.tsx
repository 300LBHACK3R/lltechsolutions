import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import ProjectCTA from "@/components/ui/ProjectCTA";
import JsonLd from "@/components/seo/JsonLd";
import { servicePillars } from "@/data/services";
import { absoluteUrl } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Website, Software & Social Media Services",
  "Custom website development, purpose-built software and managed social content from a Calgary digital studio serving businesses across Canada.",
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
