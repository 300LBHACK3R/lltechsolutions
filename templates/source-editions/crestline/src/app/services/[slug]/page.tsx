import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import PageHero from "@/components/shared/page-hero";
import HomeCta from "@/components/home/home-cta";
import { services } from "@/data/services";

type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  bullets: string[];
  image: string;
  detailImage?: string;
  galleryImages?: string[];
};

type ServiceDetail = {
  slug: string;
  overview: string;
  highlights: string[];
  sidePanel: {
    label: string;
    value: string;
  }[];
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const typedServices = services as readonly ServiceItem[];

const serviceDetails: ServiceDetail[] = [
  {
    slug: "custom-homes",
    overview:
      "Summit Painting Studio works on custom home painting projects where preparation, detail, and presentation matter. These projects require a refined approach to surfaces, finishes, trim, architectural features, and the overall look of the home.",
    highlights: [
      "Interior and exterior painting for high-end custom homes",
      "Detailed preparation for trim, feature areas, walls, ceilings, and architectural surfaces",
      "Refined finish work suited to designer-led and custom residential spaces",
      "Professional presentation for premium homes and client-facing environments",
    ],
    sidePanel: [
      {
        label: "Best For",
        value:
          "Custom homes, luxury interiors, detailed repaints, and premium residential projects.",
      },
      {
        label: "Project Focus",
        value: "Craftsmanship, detail, surface preparation, and refined presentation.",
      },
      {
        label: "Delivery Standard",
        value: "Clean, careful, and built around a high-end finished result.",
      },
    ],
  },
  {
    slug: "multi-family",
    overview:
      "Summit Painting Studio supports multi-family painting projects with organized coordination, dependable scheduling, and consistent finish quality across units, common areas, corridors, exteriors, and shared residential environments.",
    highlights: [
      "Apartment, townhouse, condominium, and residential development painting",
      "Interior and exterior painting support for multi-unit environments",
      "Consistent presentation across units, corridors, lobbies, and shared spaces",
      "Workflow planning suited for larger-scale residential projects",
    ],
    sidePanel: [
      {
        label: "Best For",
        value: "Apartments, townhomes, condominiums, and multi-residential developments.",
      },
      {
        label: "Project Focus",
        value: "Coordination, production workflow, consistency, and finish quality.",
      },
      {
        label: "Delivery Standard",
        value: "Structured execution for active, occupied, or staged project environments.",
      },
    ],
  },
  {
    slug: "strata",
    overview:
      "Summit Painting Studio supports strata and building maintenance projects with a focus on long-term asset presentation, surface protection, and organized painting support for occupied buildings and shared properties.",
    highlights: [
      "Painting and maintenance support for strata properties and shared buildings",
      "Exterior and interior repainting for common areas, corridors, entries, and building surfaces",
      "Planning suited for occupied properties, residents, managers, and strata councils",
      "Long-term presentation, protection, and professional property upkeep",
    ],
    sidePanel: [
      {
        label: "Best For",
        value:
          "Strata properties, occupied buildings, shared spaces, and building maintenance projects.",
      },
      {
        label: "Project Focus",
        value:
          "Property presentation, surface protection, coordination, and resident-aware execution.",
      },
      {
        label: "Delivery Standard",
        value: "Professional, organized, and respectful of active building environments.",
      },
    ],
  },
  {
    slug: "commercial",
    overview:
      "Summit Painting Studio provides commercial painting services for offices, retail spaces, tenant improvements, institutions, and industrial environments. The work is built around practical coordination, durability, clean execution, and professional presentation.",
    highlights: [
      "Commercial interiors, exteriors, offices, retail, and tenant improvement spaces",
      "Durable painting solutions for high-traffic and operational environments",
      "Scheduling and coordination suited for business and active jobsite needs",
      "Professional presentation that supports the look and credibility of the space",
    ],
    sidePanel: [
      {
        label: "Best For",
        value:
          "Offices, retail spaces, tenant improvements, institutions, and commercial buildings.",
      },
      {
        label: "Project Focus",
        value: "Durability, scheduling, professional appearance, and clean execution.",
      },
      {
        label: "Delivery Standard",
        value: "Organized commercial workflow with dependable communication and finish quality.",
      },
    ],
  },
];

function getService(slug: string) {
  return typedServices.find((service) => service.slug === slug);
}

function getServiceDetail(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}

function getServiceImage(service: ServiceItem) {
  return service.detailImage ?? service.image;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return typedServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const image = getServiceImage(service);

  return {
    title: service.title,
    description: service.short,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Summit Painting Studio`,
      description: service.short,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const service = getService(slug);
  const detail = getServiceDetail(slug);

  if (!service || !detail) {
    notFound();
  }

  const heroImage = getServiceImage(service);

  return (
    <>
      <SiteHeader light />

      <main className="service-detail-page">
        <PageHero
          eyebrow="Service"
          title={service.title}
          copy={service.short}
          backgroundImage={heroImage}
          backgroundPosition="center center"
          darkOverlay
        />

        <section className="section">
          <div className="container">
            <div className="service-detail-shell">
              <div className="service-detail-hero">
                <div className="service-detail-hero__content">
                  <span className="section-intro__eyebrow">Summit Painting Studio</span>

                  <h1 className="section-intro__title">{service.title}</h1>

                  <p className="section-intro__copy">{detail.overview}</p>

                  <ul className="feature-list feature-list--service">
                    {detail.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="service-detail__actions">
                    <Link href="/contact" className="button button--primary">
                      Request a Quote
                    </Link>

                    <Link href="/services" className="text-link">
                      Back to Services →
                    </Link>
                  </div>
                </div>

                <div className="service-detail-hero__media">
                  <img
                    src={heroImage}
                    alt={`Generated illustrative image for ${service.title}; not client work`}
                    className="service-detail-hero__image"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="split-panel split-panel--service-detail">
                <div>
                  <div className="section-intro section-intro--services">
                    <span className="section-intro__eyebrow">Project Approach</span>

                    <h2 className="section-intro__title">
                      Built around preparation, coordination, and finish quality.
                    </h2>

                    <p className="section-intro__copy">
                      Every service area is approached with a practical workflow: understand the
                      project environment, prepare surfaces properly, protect surrounding areas,
                      communicate clearly, and deliver a clean professional finish.
                    </p>
                  </div>

                  <div className="service-proof-strip">
                    <div className="service-proof-strip__item">
                      <strong>Preparation</strong>
                      <span>
                        Surface review, protection, masking, repair, sanding, and setup before
                        finish work begins.
                      </span>
                    </div>

                    <div className="service-proof-strip__item">
                      <strong>Coordination</strong>
                      <span>
                        Organized scheduling and communication for active homes, commercial sites,
                        strata properties, and project teams.
                      </span>
                    </div>

                    <div className="service-proof-strip__item">
                      <strong>Finish Quality</strong>
                      <span>
                        Clean lines, consistent coverage, professional presentation, and reliable
                        completed results.
                      </span>
                    </div>
                  </div>
                </div>

                <aside
                  className="service-side-panel"
                  aria-label={`${service.title} service summary`}
                >
                  <div className="service-side-panel__body">
                    <span className="service-side-panel__eyebrow">Service Summary</span>

                    {detail.sidePanel.map((item) => (
                      <div key={item.label} className="service-side-panel__item">
                        <strong>{item.label}</strong>
                        <span>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <HomeCta />
      </main>

      <SiteFooter />
    </>
  );
}
