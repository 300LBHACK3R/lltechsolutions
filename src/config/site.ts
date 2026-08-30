export const siteConfig = {
  name: "L&L Tech Solutions",
  shortName: "L&L Tech",
  legalName: "L&L Tech Solutions",
  domain: "lltechsolutions.ca",
  url: "https://lltechsolutions.ca",
  locale: "en_CA",
  language: "en-CA",
  location: "Calgary, Alberta, Canada",
  phone: {
    display: "778-215-8483",
    international: "+1 778-215-8483",
    href: "tel:+17782158483",
    sms: "sms:+17782158483",
  },
  email: "LandLTechSolutions@protonmail.com",
  logo: "/brand/logo-mark.webp",
  openGraphImage: "/opengraph-image.jpg",
  tagline: "Digital systems built to carry the weight of your business.",
  description:
    "L&L Tech Solutions is a Calgary-based digital studio specializing in custom website design and development, purpose-built software, and social media management for businesses across Canada.",
  areaServed: ["Calgary", "Alberta", "British Columbia", "Canada"],
  keywords: [
    "Calgary web design",
    "Calgary website development",
    "custom website development Canada",
    "Next.js developer Canada",
    "custom software development Canada",
    "web application development",
    "social media management Calgary",
    "social media management Canada",
    "content creation Calgary",
    "technical SEO services",
    "Google Business Profile management",
  ],
  services: [
    "Website Design & Development",
    "Software Design & Development",
    "Social Media Management",
  ],
  socialLinks: [
    "https://youtube.com/@LLTechSolutions/videos",
    "https://www.tiktok.com/@lltechsolutions",
    "https://www.facebook.com/profile.php?id=61557129795810",
  ],
} as const;

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Selected Work", href: "/projects" },
  { label: "Process", href: "/process" },
  { label: "Investment", href: "/packages" },
  { label: "Contact", href: "/contact" },
] as const;

export const serviceNavigation = [
  { label: "Website Design & Development", href: "/services#website-design" },
  {
    label: "Software Design & Development",
    href: "/services#software-development",
  },
  { label: "Social Media Management", href: "/services#social-media" },
] as const;

export const studioNavigation = [
  { label: "Selected Work", href: "/projects" },
  { label: "Our Process", href: "/process" },
  { label: "Investment", href: "/packages" },
  { label: "Free Digital Audit", href: "/free-tech-audit" },
] as const;

export const socialNavigation = [
  {
    label: "YouTube",
    href: "https://youtube.com/@LLTechSolutions/videos",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@lltechsolutions" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61557129795810",
  },
] as const;

export const legalNavigation = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Security", href: "/security" },
] as const;

export function absoluteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
}
