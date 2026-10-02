// Edit these values before launch. No phone, email or social link is active in this demo.
const websiteUrl = "https://example.com";
export const socialImage = {
  url: `${websiteUrl}/images/sample-rentals.webp`,
  width: 1536,
  height: 1024,
  type: "image/webp",
  alt: "Generated illustrative equipment-rental scene; not actual fleet photography",
} as const;
export const siteConfig = {
  name: "Trail & Co Rentals",
  shortName: "Trail & Co Rentals",
  description:
    "Fictional trailer-rental website demonstration. Sample fleet, prices and service content only.",
  shortDescription: "A sample fleet for moving, hauling, cleanup and equipment projects.",
  phone: "Phone not configured (demo)",
  phoneHref: "/contact#sample-contact",
  email: "hello@example.com (placeholder)",
  emailHref: "/contact#sample-contact",
  domain: websiteUrl,
  url: websiteUrl,
  location: "Sampletown — fictional location",
  serviceArea: "Sample Valley and surrounding sample communities. Replace before launch.",
  facebookName: "Social link not configured",
  facebookUrl: "/contact#sample-contact",
  social: { facebook: "/contact#sample-contact", tiktok: "/contact#sample-contact" },
  openGraphImage: socialImage.url,
  twitterImage: socialImage.url,
  address: { locality: "Sampletown", region: "Sample Province", country: "CA" },
  keywords: ["sample trailer rentals"],
} as const;
export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Trailer Rentals", href: "/rentals" },
  { label: "Services / Add-Ons", href: "/services" },
  { label: "Gallery", href: "/recent-jobs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
export type NavigationLink = (typeof navigationLinks)[number];
