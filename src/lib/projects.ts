export type ProjectCategory =
  | "Web Build"
  | "Tech Support"
  | "Infrastructure";

export type ProjectStat = {
  label: string;
  value: string;
};

export type ProjectLinkKind =
  | "website"
  | "google"
  | "facebook"
  | "tiktok"
  | "booking"
  | "other";

export type ProjectLink = {
  label: string;
  href: string;
  kind?: ProjectLinkKind;
};

export type ProjectManagement = {
  title: string;
  description: string;
  services: string[];
};

export type ProjectVisual = {
  eyebrow: string;
  title: string;
  subtitle: string;
  tone: "gold-red" | "neon" | "green";
};

export type Project = {
  title: string;
  category: ProjectCategory;
  relationship?: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  services: string[];
  image?: string;
  imageAlt?: string;
  visual?: ProjectVisual;
  liveUrl?: string;
  links?: ProjectLink[];
  management?: ProjectManagement;
  featured?: boolean;
  stats?: ProjectStat[];
};

export const projects: Project[] = [
  {
    title: "Tow-N-Go Trailers",
    category: "Web Build",
    relationship: "Ongoing Digital Partner",
    description:
      "A premium trailer-rental platform and ongoing digital-growth system built for Tow-N-Go Trailers across Kelowna and the Okanagan.",
    challenge:
      "Tow-N-Go needed more than a brochure website. The business required a professional fleet presentation, clear rental pathways, local search structure, customer trust signals, and an online presence that could keep growing with the company.",
    solution:
      "Designed and developed a custom rental website with fleet and trailer-detail pages, pricing, add-ons, customer reviews, inquiry workflows, mobile-first layouts, metadata, structured SEO foundations, and clear calls to action. L&L also supports the brand across Google Business, Facebook, TikTok, website updates, content, and ongoing digital management.",
    result:
      "A polished, high-performance rental platform that gives customers a clearer path from Google or social media to the right trailer, rental information, and inquiry form—while giving Tow-N-Go one connected system for its website and managed channels.",
    services: [
      "Custom website design & development",
      "Fleet and trailer-detail architecture",
      "Rental inquiry system",
      "Technical SEO and local-search structure",
      "Google Business Profile management",
      "Facebook management",
      "TikTok content and management",
      "Website maintenance and ongoing growth",
    ],
    image: "/images/projects/tow-n-go.jpg",
    imageAlt: "Tow-N-Go Trailers custom rental website showcase",
    liveUrl: "https://www.towandgotrailers.ca/",
    links: [
      {
        label: "Live Website",
        href: "https://www.towandgotrailers.ca/",
        kind: "website",
      },
      {
        label: "Google Reviews",
        href: "https://www.google.com/search?q=Tow-N-Go+Trailers+Kelowna+reviews",
        kind: "google",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61581311484780",
        kind: "facebook",
      },
      {
        label: "TikTok",
        href: "https://www.tiktok.com/@towngotrailers",
        kind: "tiktok",
      },
    ],
    management: {
      title: "Website + Google + Facebook + TikTok",
      description:
        "L&L continues to manage and improve Tow-N-Go's connected digital presence instead of treating the website as a one-time handoff.",
      services: [
        "Website Maintenance",
        "Google Business",
        "Facebook",
        "TikTok",
        "SEO & Content",
      ],
    },
    featured: true,
    stats: [
      { label: "Scope", value: "Web + Growth" },
      { label: "Focus", value: "Rentals + Local SEO" },
      { label: "Status", value: "Live + Managed" },
    ],
  },
  {
    title: "Crestline Painting",
    category: "Web Build",
    relationship: "Custom Business Website",
    description:
      "A professional painting-contractor website designed to position Crestline for commercial, multi-family, strata, custom-home, and high-value residential work across British Columbia.",
    challenge:
      "Crestline needed a more established online presence that could communicate its full service range, showcase real project environments, and build confidence with property managers, builders, strata clients, and homeowners.",
    solution:
      "Built a custom service and portfolio website with dedicated industry pages, structured project galleries, quote pathways, responsive layouts, professional visual hierarchy, search-focused content, metadata, and clear contact flows.",
    result:
      "A clean, corporate-grade website that presents Crestline as an organized, versatile painting contractor and gives higher-value prospects a professional destination to review services, projects, and next steps.",
    services: [
      "Custom website design & development",
      "Commercial and residential service architecture",
      "Project portfolio system",
      "Quote and contact pathways",
      "Mobile optimization",
      "Technical SEO foundations",
      "Brand positioning",
    ],
    image: "/images/projects/crestline.jpg",
    imageAlt: "Crestline Painting custom business website showcase",
    liveUrl: "https://www.crestlinepainting.ca/",
    links: [
      {
        label: "Live Website",
        href: "https://www.crestlinepainting.ca/",
        kind: "website",
      },
    ],
    featured: true,
    stats: [
      { label: "Scope", value: "Website + Portfolio" },
      { label: "Focus", value: "Commercial Trust" },
      { label: "Status", value: "Live" },
    ],
  },
  {
    title: "McKenzie House Massage",
    category: "Web Build",
    relationship: "Brand, Website & Launch System",
    description:
      "A calm, premium massage-therapy website and launch system built around trust, clear communication, local discovery, and an easy path into online booking.",
    challenge:
      "The business needed a complete digital identity that felt professional and welcoming while clearly explaining its services, client-led approach, frequently asked questions, booking options, and local Calgary positioning.",
    solution:
      "Created the brand direction and a custom responsive website with premium green-and-gold styling, service and experience sections, FAQs, trust content, ClinicSense booking connections, local SEO foundations, Google Business support, and a coordinated plan for original photo and video content.",
    result:
      "A cohesive wellness presence that connects the brand, website, booking platform, Google visibility, and future content into one professional client journey.",
    services: [
      "Brand direction and visual system",
      "Custom website design & development",
      "ClinicSense booking connection",
      "Service, pricing, FAQ, and trust content",
      "Local SEO foundations",
      "Google Business support",
      "Photo and video content planning",
      "Launch and ongoing growth support",
    ],
    image: "/images/projects/mckenzie-house.jpg",
    imageAlt: "McKenzie House Massage premium website showcase",
    liveUrl: "https://mckenziehousemassage.ca/",
    links: [
      {
        label: "Live Website",
        href: "https://mckenziehousemassage.ca/",
        kind: "website",
      },
      {
        label: "Online Booking",
        href: "https://mckenziehousemassage.clinicsense.com/",
        kind: "booking",
      },
    ],
    management: {
      title: "Website + Booking + Local Launch",
      description:
        "The project connects the website, ClinicSense booking, Google presence, local SEO, and original photo/video content into one launch and growth system.",
      services: [
        "Website",
        "ClinicSense",
        "Local SEO",
        "Google Business",
        "Photo & Video",
      ],
    },
    featured: true,
    stats: [
      { label: "Scope", value: "Brand + Website" },
      { label: "Focus", value: "Bookings + Local SEO" },
      { label: "Status", value: "Live" },
    ],
  },
  {
    title: "Tate's TV",
    category: "Web Build",
    relationship: "Custom Web Application",
    description:
      "A fully custom retro live-TV simulator and media platform with 23 channels, real-time programming, a premium channel guide, interactive remote controls, and responsive playback experiences.",
    challenge:
      "The project required far more than a normal website: scheduled media, persistent channel state, live progression, a television-style interface, remote controls, channel navigation, guide data, responsive layouts, and a platform that could keep expanding.",
    solution:
      "Designed and developed a custom web application with a retro broadcast engine, 23-channel architecture, live guide, quick tune, remote control, channel branding, media-library workflows, theme controls, responsive mobile views, and ongoing platform management.",
    result:
      "A distinctive entertainment product that demonstrates L&L's ability to architect and maintain complex, interactive software—not just standard brochure websites.",
    services: [
      "Custom web application development",
      "Streaming and media interface design",
      "23-channel platform architecture",
      "Live guide and scheduling system",
      "Interactive remote controls",
      "Responsive television-style UI",
      "Media-library workflows",
      "Ongoing platform management",
    ],
    image: "/images/projects/tates-tv.jpg",
    imageAlt: "Tate's TV custom streaming web application showcase",
    liveUrl: "https://www.tatestv.ca/",
    links: [
      {
        label: "Open Tate's TV",
        href: "https://www.tatestv.ca/",
        kind: "website",
      },
    ],
    management: {
      title: "Built, Managed & Maintained By L&L",
      description:
        "L&L continues to develop the platform, manage its media architecture, maintain the live experience, and expand the software over time.",
      services: [
        "Custom Software",
        "Media Platform",
        "Live Guide",
        "Channel Systems",
        "Ongoing Development",
      ],
    },
    featured: true,
    stats: [
      { label: "Scope", value: "Custom Web App" },
      { label: "Focus", value: "Streaming + Media" },
      { label: "Status", value: "Live + Managed" },
    ],
  },
  {
    title: "TateByers.ca",
    category: "Web Build",
    relationship: "Developer Portfolio Experience",
    description:
      "An experimental personal portfolio that combines a Matrix-inspired entry experience, terminal-style interaction, and a Windows XP-inspired desktop interface.",
    challenge:
      "A conventional portfolio would not accurately represent the developer behind the work. The project needed to feel interactive, memorable, technically ambitious, and completely different from a standard résumé website.",
    solution:
      "Designed a custom portfolio experience with themed entry states, terminal interaction, operating-system-inspired navigation, desktop windows, project access, social links, and a flexible foundation for future demos and personal work.",
    result:
      "A distinctive portfolio product that demonstrates interface design, front-end architecture, animation, creative development, and the ability to turn an unusual concept into a functional web experience.",
    services: [
      "Creative website design",
      "Custom front-end development",
      "Matrix and terminal-style interaction",
      "Windows XP-inspired interface",
      "Animation and interaction systems",
      "Responsive portfolio architecture",
      "Project and social-link integration",
    ],
    visual: {
      eyebrow: "Tate Byers",
      title: "Developer Portfolio",
      subtitle: "Matrix Entry • Terminal Interface • XP Desktop",
      tone: "gold-red",
    },
    liveUrl: "https://www.tatebyers.ca/",
    links: [
      {
        label: "Open Portfolio",
        href: "https://www.tatebyers.ca/",
        kind: "website",
      },
    ],
    featured: true,
    stats: [
      { label: "Scope", value: "Creative Portfolio" },
      { label: "Focus", value: "Interactive UX" },
      { label: "Status", value: "Live / Evolving" },
    ],
  },
  {
    title: "Business Tech Support Cleanup",
    category: "Tech Support",
    relationship: "Remote & On-Site Support",
    description:
      "Remote and on-site support for business systems, computer cleanup, account setup, troubleshooting, and practical optimization.",
    challenge:
      "The client had recurring system issues, scattered setup problems, and no clear technical direction.",
    solution:
      "Reviewed the environment, cleaned up systems, resolved priority issues, improved organization, and provided clear next steps.",
    result:
      "Cleaner systems, faster operation, fewer recurring issues, and better confidence in daily business technology.",
    services: [
      "Remote support",
      "System cleanup",
      "Troubleshooting",
      "Optimization",
    ],
    image: "/images/projects/tech-support.jpg",
    imageAlt: "Business tech support cleanup showcase",
    stats: [
      { label: "Scope", value: "Support" },
      { label: "Focus", value: "Cleanup" },
      { label: "Status", value: "Delivered" },
    ],
  },
  {
    title: "Network Rack Cleanup",
    category: "Infrastructure",
    relationship: "Network Infrastructure",
    description:
      "Rack organization, patch-panel planning, cable cleanup, switch layout, labelling, and technical infrastructure improvement.",
    challenge:
      "The network area was messy, difficult to troubleshoot, and lacked clean organization.",
    solution:
      "Cleaned the rack layout, organized cabling, improved patching structure, labelled key runs, and simplified future maintenance.",
    result:
      "Cleaner infrastructure, easier troubleshooting, better presentation, and more reliable technical organization.",
    services: [
      "Rack cleanup",
      "Patch-panel planning",
      "Cable organization",
      "Switch setup",
    ],
    image: "/images/projects/rack-cleanup.jpg",
    imageAlt: "Network rack cleanup showcase",
    stats: [
      { label: "Scope", value: "Infrastructure" },
      { label: "Focus", value: "Cable Cleanup" },
      { label: "Status", value: "Delivered" },
    ],
  },
  {
    title: "CCTV & Network System Setup",
    category: "Infrastructure",
    relationship: "Low-Voltage & Network Systems",
    description:
      "CCTV installation, network configuration, structured cabling, and technical system setup for business environments.",
    challenge:
      "The client needed a cleaner, more reliable camera and network setup with proper configuration.",
    solution:
      "Installed and configured CCTV and network components, organized connections, and improved system reliability.",
    result:
      "More reliable visibility, cleaner setup, and stronger control over the technical environment.",
    services: [
      "CCTV setup",
      "Network configuration",
      "Structured cabling",
      "System setup",
    ],
    image: "/images/projects/cctv-network.png",
    imageAlt: "CCTV and network system setup showcase",
    stats: [
      { label: "Scope", value: "Install" },
      { label: "Focus", value: "Security + Network" },
      { label: "Status", value: "Delivered" },
    ],
  },
];

export const projectCategoryMeta: Record<
  ProjectCategory,
  {
    slug: string;
    eyebrow: string;
    title: string;
    description: string;
    emptyMessage: string;
  }
> = {
  "Web Build": {
    slug: "web-builds",
    eyebrow: "Web, Software & Digital Growth",
    title: "Custom Websites, Web Applications & Managed Digital Growth.",
    description:
      "Explore real custom websites, interactive web applications, SEO foundations, booking and inquiry systems, Google Business support, social-media management, content production, and ongoing digital partnerships.",
    emptyMessage: "More website and software case studies are being prepared.",
  },
  "Tech Support": {
    slug: "tech-support",
    eyebrow: "Remote IT & Cybersecurity",
    title: "Business Technology Support That Cleans Up The Mess.",
    description:
      "Remote and on-site support for systems, accounts, devices, troubleshooting, optimization, security, and practical business technology problems.",
    emptyMessage: "More remote IT and support examples are being prepared.",
  },
  Infrastructure: {
    slug: "infrastructure",
    eyebrow: "Network Infrastructure & Low-Voltage",
    title: "Clean Networks, Cabling, Racks, CCTV & Connected Systems.",
    description:
      "Rack cleanup, Cat5e and Cat6 cabling, Ethernet activation, camera systems, network layout, testing, labelling, and on-site systems that look and operate better.",
    emptyMessage: "More network and low-voltage examples are being prepared.",
  },
};

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((project) => project.category === category);
}
