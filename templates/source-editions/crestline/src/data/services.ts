export type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  bullets: string[];
  image: string;
  homeHeroImage: string;
  detailImage: string;
  galleryImages: string[];
};

export const services = [
  {
    slug: "multi-family",
    title: "Multi-Family",
    short:
      "Large-scale painting solutions for apartments, townhomes, condominiums, and residential developments.",
    intro:
      "Summit Painting Studio supports multi-family developments with organized production, consistent finishes, and the coordination required for larger project environments.",
    bullets: [
      "Interior and exterior multi-family painting",
      "Apartment, condominium, and townhouse developments",
      "Common areas, corridors, parkades, and shared spaces",
      "Spray finishes and production coating workflows",
      "Drywall repair, surface preparation, and touch-up planning",
    ],
    image: "/images/construction-home.webp",
    homeHeroImage: "/images/construction-home.webp",
    detailImage: "/images/construction-home.webp",
    galleryImages: ["/images/construction-home.webp", "/images/painting-interior.webp"],
  },

  {
    slug: "custom-homes",
    title: "Custom Homes",
    short:
      "Precision-focused painting for custom homes, detailed interiors, fine finishes, and designer-led spaces.",
    intro:
      "Custom homes require a higher level of care. Summit Painting Studio focuses on preparation, detail, and finish quality from the first surface through final walkthrough.",
    bullets: [
      "Fine finish spraying and hand-applied coatings",
      "Detailed trim, millwork, doors, and feature walls",
      "Specialty finishes and designer specifications",
      "Interior and exterior coatings for custom homes",
      "Meticulous preparation for refined final presentation",
    ],
    image: "/images/painting-interior.webp",
    homeHeroImage: "/images/painting-interior.webp",
    detailImage: "/images/painting-interior.webp",
    galleryImages: ["/images/painting-interior.webp"],
  },

  {
    slug: "strata",
    title: "Strata",
    short:
      "Painting and maintenance support for strata properties, occupied buildings, and long-term asset presentation.",
    intro:
      "Summit Painting Studio helps strata properties and existing buildings maintain strong presentation through repainting, surface restoration, and planned maintenance support.",
    bullets: [
      "Exterior repaints and full building refreshes",
      "Strata painting and maintenance programs",
      "Envelope touch-ups and surface restoration",
      "Wood, metal, concrete, and exterior coating systems",
      "Pressure washing, preparation, and repaint planning",
    ],
    image: "/images/painting-interior.webp",
    homeHeroImage: "/images/construction-home.webp",
    detailImage: "/images/painting-interior.webp",
    galleryImages: ["/images/painting-interior.webp"],
  },

  {
    slug: "commercial",
    title: "Commercial",
    short:
      "Professional painting for offices, retail spaces, tenant improvements, institutions, and industrial environments.",
    intro:
      "Summit Painting Studio provides commercial painting with reliable scheduling, clean execution, and finish standards suited for professional environments.",
    bullets: [
      "Offices, retail spaces, and tenant improvements",
      "Warehouses, industrial buildings, and operational spaces",
      "Schools, education facilities, and institutional projects",
      "Hospitals, clinics, and medical environments",
      "Interior and exterior commercial repaints",
    ],
    image: "/images/construction-home.webp",
    homeHeroImage: "/images/construction-home.webp",
    detailImage: "/images/construction-home.webp",
    galleryImages: ["/images/construction-home.webp"],
  },
] as const satisfies ServiceItem[];

export type ServiceSlug = (typeof services)[number]["slug"];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServicePath(slug: string) {
  return `/services/${slug}`;
}
