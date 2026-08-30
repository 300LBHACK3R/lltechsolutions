import { absoluteUrl, siteConfig } from "@/config/site";
import { servicePillars } from "@/data/services";
import { projects } from "@/lib/projects";

type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

function JsonLd({ data }: { data: JsonLdValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function BusinessStructuredData() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.logo),
      },
      image: absoluteUrl(siteConfig.openGraphImage),
      description: siteConfig.description,
      email: siteConfig.email,
      telephone: siteConfig.phone.international,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: siteConfig.phone.international,
        email: siteConfig.email,
        areaServed: "CA",
        availableLanguage: ["English"],
      },
      ...(siteConfig.socialLinks.length > 0
        ? { sameAs: siteConfig.socialLinks }
        : {}),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: absoluteUrl(siteConfig.openGraphImage),
      logo: absoluteUrl(siteConfig.logo),
      description: siteConfig.description,
      email: siteConfig.email,
      telephone: siteConfig.phone.international,
      areaServed: siteConfig.areaServed.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      parentOrganization: {
        "@id": `${siteConfig.url}/#organization`,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Services",
        itemListElement: servicePillars.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.eyebrow,
            description: service.description,
            url: absoluteUrl(service.href),
            provider: {
              "@id": `${siteConfig.url}/#business`,
            },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      inLanguage: siteConfig.language,
    },
  ];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": graph,
      }}
    />
  );
}

export function ServiceCatalogStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "L&L Tech Solutions Services",
        itemListElement: servicePillars.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.eyebrow,
            description: service.description,
            url: absoluteUrl(service.href),
            provider: {
              "@id": `${siteConfig.url}/#business`,
            },
            areaServed: {
              "@type": "Country",
              name: "Canada",
            },
          },
        })),
      }}
    />
  );
}

export function ProjectCollectionStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "L&L Tech Solutions Projects",
        description:
          "Selected website, software, and social media management case studies.",
        url: absoluteUrl("/projects"),
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: project.title,
              description: project.description,
              image: absoluteUrl(project.image),
              url: project.liveUrl ?? absoluteUrl("/projects"),
              genre: project.category,
              creator: {
                "@id": `${siteConfig.url}/#organization`,
              },
            },
          })),
        },
      }}
    />
  );
}
