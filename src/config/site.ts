export const siteConfig = {
  name: "L&L Tech Solutions",
  shortName: "L&L Tech",
  legalName: "L&L Tech Solutions",
  domain: "lltechsolutions.ca",
  url: "https://lltechsolutions.ca",
  email: "LandLTechSolutions@protonmail.com",
  logo: "/brand/logo.jpg",
  description:
    "L&L Tech Solutions helps small businesses, contractors, and local service companies with custom websites, SEO foundations, remote tech support, and clean on-site infrastructure.",
  areaServed: [
    "Calgary",
    "Airdrie",
    "Chestermere",
    "Cochrane",
    "Okotoks",
    "Alberta",
    "Canada",
  ],
  services: [
    "Custom Websites",
    "SEO Foundations",
    "Google Business Profile Setup",
    "Facebook Business Setup",
    "Remote Tech Support",
    "Network Cleanup",
    "CCTV Setup",
    "Business Technology Support",
  ],
  socialLinks: [] as string[],
};

export function absoluteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
}
