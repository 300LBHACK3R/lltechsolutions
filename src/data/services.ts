export type ServicePillar = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  highlight: string;
  services: string[];
  outcome: string;
  availability: string;
  href: string;
  cta: string;
};

export const servicePillars: ServicePillar[] = [
  {
    id: "web-software",
    eyebrow: "Web, Software & Digital Growth",
    title: "Custom Development Built Around Your Business",
    description:
      "Custom-coded websites, web applications, business systems, SEO, Google Business, social media, advertising, and original photo and video content.",
    highlight:
      "Design, development, launch, content, and ongoing growth under one partner.",
    outcome:
      "A stronger digital presence, cleaner customer journeys, better search visibility, and technology that can grow with the business.",
    availability:
      "Available across Canada for digital projects, remote collaboration, content editing, and ongoing management.",
    href: "/services#web-software",
    cta: "Explore Digital Solutions",
    services: [
      "Custom website design and development",
      "React, Next.js, TypeScript, JavaScript, and Tailwind CSS",
      "Web applications, portals, dashboards, and business tools",
      "E-commerce, booking, payments, forms, and API integrations",
      "Technical SEO, metadata, structured data, and performance",
      "Google Business Profile setup and management",
      "Facebook, Instagram, TikTok, and YouTube content",
      "Photography, video production, editing, and advertising creative",
      "Website maintenance, analytics, and monthly growth support",
    ],
  },
  {
    id: "remote-it",
    eyebrow: "Remote IT & Cybersecurity",
    title: "Secure Support That Keeps People Working",
    description:
      "Remote troubleshooting, Microsoft 365, business email, cloud services, backups, VPNs, password management, and practical cybersecurity support.",
    highlight:
      "Fast technical help without chasing random providers every time something breaks.",
    outcome:
      "Less downtime, safer accounts, cleaner systems, and a reliable support path for day-to-day technology.",
    availability:
      "Remote support is available across Canada. Priority business support plans are available by scope.",
    href: "/services#remote-it",
    cta: "Explore Remote IT",
    services: [
      "Remote computer and software troubleshooting",
      "Microsoft 365, business email, OneDrive, and cloud support",
      "User setup, permissions, onboarding, and offboarding",
      "Account recovery guidance and multi-factor authentication",
      "Password manager and secure-access setup",
      "VPN configuration and secure remote access",
      "Backup planning, file synchronization, and recovery guidance",
      "Device hardening, security reviews, and phishing awareness",
      "Ongoing small-business IT support and documentation",
    ],
  },
  {
    id: "network-infrastructure",
    eyebrow: "Network Infrastructure & Low-Voltage",
    title: "Connected Systems Installed, Tested & Documented",
    description:
      "Cat5e and Cat6 cabling, Ethernet activation, network racks, switches, Wi-Fi, CCTV, cable tracing, cleanups, testing, labelling, and documentation.",
    highlight:
      "Low-voltage work completed with a clear scope, clean installation, and proper verification.",
    outcome:
      "Reliable wired connections, organized infrastructure, easier troubleshooting, and stronger control over the network.",
    availability:
      "On-site infrastructure work is currently focused on Calgary and surrounding communities.",
    href: "/services#network-infrastructure",
    cta: "Explore Network Services",
    services: [
      "Cat5e and Cat6 cable testing, tracing, and identification",
      "RJ45 connectors, keystones, wall plates, and patch panels",
      "Ethernet wall-port activation",
      "RJ11-to-RJ45 conversion where suitable cabling is present",
      "New low-voltage cable runs and structured cabling",
      "Network switch, router, and wireless access-point setup",
      "Network rack cleanup, cable management, and port labelling",
      "IP camera, NVR, and network-connected CCTV setup",
      "Testing, documentation, and practical network-security improvements",
    ],
  },
];
