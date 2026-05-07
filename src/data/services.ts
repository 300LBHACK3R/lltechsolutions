export type ServicePillar = {
  eyebrow: string;
  title: string;
  description: string;
  highlight: string;
  services: string[];
  outcome: string;
};

export const servicePillars: ServicePillar[] = [
  {
    eyebrow: "Web & Growth Systems",
    title: "Custom Websites Built To Convert",
    description:
      "Premium websites built from scratch with modern React, Next.js, Tailwind, SEO structure, performance, and lead generation in mind.",
    highlight: "No templates. No drag-and-drop junk. Built properly.",
    outcome: "Stronger online presence, better trust, and cleaner lead flow.",
    services: [
      "Custom website design & development",
      "React / Next.js / Tailwind builds",
      "SEO structure, metadata & performance",
      "Google Business + Facebook setup",
      "Landing pages and service pages",
      "Ongoing website management & updates",
      "Payment systems and backend integrations",
    ],
  },
  {
    eyebrow: "IT Support & Business Systems",
    title: "Remote Tech Support That Keeps Businesses Moving",
    description:
      "Reliable remote support for businesses that need systems running clean, secure, organized, and professionally managed.",
    highlight: "One reliable partner instead of scattered tech help.",
    outcome: "Fewer tech issues, faster support, and better daily operation.",
    services: [
      "Remote troubleshooting and support",
      "Computer cleanup and optimization",
      "Email, accounts, and software setup",
      "Backup and security basics",
      "Small business tech support",
      "Ongoing maintenance plans",
      "System documentation and guidance",
    ],
  },
  {
    eyebrow: "Infrastructure & On-Site Systems",
    title: "Clean Technical Infrastructure",
    description:
      "Professional on-site technical services for networks, CCTV, racks, cabling, systems, and business environments.",
    highlight: "Clean installs. Organized systems. Proper documentation.",
    outcome:
      "Cleaner infrastructure, easier troubleshooting, and stronger control.",
    services: [
      "Network rack setup and cleanup",
      "Structured cabling and terminations",
      "Patch panels, switches, and routing",
      "CCTV setup and configuration",
      "Business network installations",
      "RJ11 to RJ45 conversions",
      "Clean cable routing and system installs",
    ],
  },
];
