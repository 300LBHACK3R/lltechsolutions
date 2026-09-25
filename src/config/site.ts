export const siteConfig = {
  name: "L&L Tech Solutions",
  shortName: "L&L Tech",
  url: "https://lltechsolutions.ca",
  email: "LandLTechSolutions@protonmail.com",
  phone: "778-215-8483",
  telephone: "tel:+17782158483",
  logo: "/brand/logo-mark.webp",
  description:
    "L&L Tech Solutions is a Calgary-based digital studio specializing in custom website design and development, purpose-built software, and social media management for businesses across Canada.",
  tagline: "Digital systems built to carry the weight of your business.",
  areaServed: ["Calgary", "Alberta", "British Columbia", "Canada"],
  address: { addressLocality: "Calgary", addressRegion: "AB", addressCountry: "CA" },
  socialLinks: [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61557129795810" },
    { label: "TikTok", href: "https://www.tiktok.com/@lltechsolutions" },
    { label: "YouTube", href: "https://youtube.com/@LLTechSolutions/videos" },
  ],
} as const;

export const liveDemoLabel = "View live demo";

export const navigation = [
  { label: "Website Templates", href: "/website-collection" },
  { label: "Services", href: "/services" },
  { label: "Our Clients", href: "/projects" },
  { label: "Pricing", href: "/packages" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
] as const;

export const publicRoutes = [
  "/",
  "/services",
  "/website-collection",
  "/projects",
  "/projects/web-builds",
  "/projects/software-development",
  "/projects/social-media-management",
  "/reviews",
  "/packages",
  "/contact",
  "/free-tech-audit",
  "/privacy",
  "/terms",
  "/security",
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
