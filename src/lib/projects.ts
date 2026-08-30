export type ProjectCategory =
  | "Website Design"
  | "Software Development"
  | "Social Media Management";

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
  services: readonly string[];
};

export type Project = {
  title: string;
  category: ProjectCategory;
  relationship: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  services: readonly string[];
  image: string;
  imageAlt: string;
  liveUrl?: string;
  links?: readonly ProjectLink[];
  management?: ProjectManagement;
  featured?: boolean;
  stats: readonly ProjectStat[];
};

export const projects: readonly Project[] = [
  {
    title: "Tow-N-Go Trailers Website",
    category: "Website Design",
    relationship: "Custom Website & Ongoing Digital Partner",
    description:
      "A custom trailer-rental platform that organizes the fleet, answers real customer questions, supports local discovery, and creates a direct path into rental inquiries.",
    challenge:
      "Tow-N-Go needed more than a brochure website. Customers had to understand the fleet, compare trailers, review pricing and add-ons, build trust, and submit a useful inquiry from any device.",
    solution:
      "L&L designed and developed a responsive rental website with fleet architecture, trailer-detail pages, pricing, add-ons, customer reviews, inquiry workflows, metadata, local-search foundations, and clear conversion paths.",
    result:
      "Tow-N-Go now has a professional digital destination that guides customers from search or social content to the right trailer and a clear rental inquiry.",
    services: [
      "Website strategy, UX, UI, and development",
      "Fleet and trailer-detail architecture",
      "Rental inquiry workflow",
      "Responsive mobile and desktop design",
      "Technical SEO and local-search structure",
      "Reviews, trust signals, and calls to action",
      "Website maintenance and continued improvement",
    ],
    image: "/images/projects/tow-n-go.webp",
    imageAlt: "Tow-N-Go Trailers custom rental website displayed in a browser",
    liveUrl: "https://www.towandgotrailers.ca/",
    links: [
      {
        label: "Live Website",
        href: "https://www.towandgotrailers.ca/",
        kind: "website",
      },
    ],
    featured: true,
    stats: [
      { label: "Scope", value: "Website + Fleet" },
      { label: "Focus", value: "Rentals + Local Search" },
      { label: "Status", value: "Live + Managed" },
    ],
  },
  {
    title: "Crestline Painting",
    category: "Website Design",
    relationship: "Corporate Contractor Website",
    description:
      "A professional contractor website created to present Crestline clearly across commercial, multi-family, strata, custom-home, and residential work.",
    challenge:
      "The company needed an online presence that reflected the scale and quality of its work while giving property managers, builders, strata clients, and homeowners the information required to move forward.",
    solution:
      "L&L built a custom service and portfolio website with dedicated industry pages, structured project galleries, quote pathways, responsive layouts, search-focused content, metadata, and clear contact flows.",
    result:
      "Crestline now has a clean, corporate digital presence that communicates capability and gives higher-value prospects a credible place to evaluate the business.",
    services: [
      "Website strategy and interface design",
      "Custom Next.js development",
      "Commercial and residential service architecture",
      "Project portfolio system",
      "Quote and contact pathways",
      "Responsive design and performance",
      "Technical SEO foundations",
      "Brand positioning",
    ],
    image: "/images/projects/crestline.webp",
    imageAlt: "Crestline Painting corporate website displayed in a browser",
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
      { label: "Focus", value: "Commercial Credibility" },
      { label: "Status", value: "Live" },
    ],
  },
  {
    title: "McKenzie House Massage",
    category: "Website Design",
    relationship: "Brand, Website & Booking Journey",
    description:
      "A calm, polished massage-therapy website built around trust, clear service information, local discovery, and an easy path into online booking.",
    challenge:
      "The business needed a complete digital identity that felt professional and welcoming while explaining the experience, services, pricing, frequently asked questions, and booking options without overwhelming the client.",
    solution:
      "L&L developed the visual direction and responsive website, organized the service and trust content, connected ClinicSense booking, established local-search foundations, and planned coordinated photo and video content.",
    result:
      "McKenzie House Massage now has a cohesive client journey connecting the brand, website, booking platform, Google presence, and future content.",
    services: [
      "Brand direction and visual system",
      "Custom website design and development",
      "ClinicSense booking connection",
      "Service, pricing, FAQ, and trust content",
      "Local SEO foundations",
      "Google Business connection",
      "Photo and video content planning",
    ],
    image: "/images/projects/mckenzie-house.webp",
    imageAlt: "McKenzie House Massage website displayed in a browser",
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
    featured: true,
    stats: [
      { label: "Scope", value: "Brand + Website" },
      { label: "Focus", value: "Bookings + Local Search" },
      { label: "Status", value: "Live" },
    ],
  },
  {
    title: "TateByers.ca",
    category: "Website Design",
    relationship: "Personal Brand & Portfolio Hub",
    description:
      "A polished personal website connecting owned brands, commissioned client work, professional positioning, and public social channels in one clear destination.",
    challenge:
      "The founder needed one credible place to present several businesses and projects without confusing visitors or mixing commissioned client work with personal brands and future concepts.",
    solution:
      "L&L designed and developed a responsive portfolio hub with clear content groups, brand and project cards, live links, professional profile information, social pathways, and a maintainable data-driven structure.",
    result:
      "TateByers.ca now gives clients, collaborators, and employers a concise overview of the work, the businesses behind it, and the live platforms available to explore.",
    services: [
      "Personal-brand strategy and information architecture",
      "Custom website design and development",
      "Owned-brand and client-project presentation",
      "Responsive portfolio card system",
      "Live-project and social-link integration",
      "SEO and social-sharing foundations",
      "Maintainable content architecture",
    ],
    image: "/images/projects/tate-byers.webp",
    imageAlt: "Tate Byers personal brand and client portfolio website preview",
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
      { label: "Scope", value: "Personal Brand Hub" },
      { label: "Focus", value: "Brands + Client Work" },
      { label: "Status", value: "Live + Evolving" },
    ],
  },
  {
    title: "Tate's TV",
    category: "Software Development",
    relationship: "Custom Streaming Web Application",
    description:
      "A custom live-TV simulation and media platform with 23 channels, scheduled programming, a live guide, interactive controls, and responsive playback experiences.",
    challenge:
      "The product required scheduled media, persistent channel state, live progression, channel navigation, guide data, remote controls, responsive layouts, and an architecture that could continue expanding.",
    solution:
      "L&L designed and developed the broadcast engine, channel architecture, live guide, quick tune, remote control, channel branding, media-library workflows, responsive views, and continued product-management foundation.",
    result:
      "Tate's TV demonstrates L&L's ability to architect and maintain a complex interactive product—not only a conventional business website.",
    services: [
      "Product strategy and interface design",
      "Custom web application development",
      "Streaming and media interface architecture",
      "23-channel platform system",
      "Live guide and scheduling",
      "Interactive remote controls",
      "Responsive television-style interface",
      "Media-library workflows",
      "Ongoing product development",
    ],
    image: "/images/projects/tates-tv.webp",
    imageAlt: "Tate's TV custom streaming application displayed in a browser",
    liveUrl: "https://www.tatestv.ca/",
    links: [
      {
        label: "Open Tate's TV",
        href: "https://www.tatestv.ca/",
        kind: "website",
      },
    ],
    management: {
      title: "Built, managed, and maintained by L&L",
      description:
        "L&L continues to develop the product, maintain the live experience, manage its media architecture, and expand the software over time.",
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
    title: "Tow-N-Go Digital Management",
    category: "Social Media Management",
    relationship: "Website, Google, Facebook & TikTok",
    description:
      "An ongoing digital partnership connecting Tow-N-Go's website, Google presence, Facebook page, TikTok content, promotional graphics, local messaging, and rental campaigns.",
    challenge:
      "A strong website alone would not keep the brand visible. Tow-N-Go needed consistent publishing, platform-specific content, connected calls to action, local-search support, and a partner who understood the rental business.",
    solution:
      "L&L established a connected management system across the website, Google Business Profile, Facebook, TikTok, promotional graphics, captions, content planning, local keyword structure, and recurring campaigns.",
    result:
      "The brand now maintains more consistent messaging across customer touchpoints and a clearer route from content discovery to trailer-rental inquiry.",
    services: [
      "Social-media strategy",
      "Facebook page management",
      "TikTok content and management",
      "Google Business Profile management",
      "Captions and publishing",
      "Promotional graphics",
      "Website updates",
      "Local SEO coordination",
      "Ongoing campaign support",
    ],
    image: "/images/projects/tow-n-go.webp",
    imageAlt: "Tow-N-Go Trailers digital management project preview",
    links: [
      {
        label: "Website",
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
      title: "Ongoing multi-platform management",
      description:
        "The website, Google presence, Facebook activity, TikTok content, campaign graphics, and local messaging are managed as one digital system.",
      services: [
        "Website",
        "Google Business",
        "Facebook",
        "TikTok",
        "SEO",
        "Content",
      ],
    },
    featured: true,
    stats: [
      { label: "Scope", value: "Multi-Platform" },
      { label: "Focus", value: "Content + Rentals" },
      { label: "Status", value: "Ongoing" },
    ],
  },
  {
    title: "McKenzie House Massage Digital Launch",
    category: "Social Media Management",
    relationship: "Brand Launch & Content System",
    description:
      "A coordinated launch bringing together the website, booking platform, Google presence, local messaging, visual brand, photography, and short-form content planning.",
    challenge:
      "The business needed every customer-facing channel to feel consistent, explain the experience clearly, build trust, and direct prospective clients toward booking.",
    solution:
      "L&L coordinated the website, ClinicSense connection, Google support, local-search foundations, brand messaging, photo and video planning, service content, promotional assets, and future social campaigns.",
    result:
      "McKenzie House Massage now has a professional foundation for local discovery and ongoing content, with the website, booking journey, and brand direction aligned from launch.",
    services: [
      "Digital launch strategy",
      "Brand messaging",
      "Google Business support",
      "Local SEO coordination",
      "Photo and video planning",
      "Short-form content planning",
      "Promotional assets",
      "Website and booking alignment",
    ],
    image: "/images/projects/mckenzie-house.webp",
    imageAlt: "McKenzie House Massage digital launch and content project preview",
    links: [
      {
        label: "Website",
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
      title: "Website, booking, local search, and content",
      description:
        "The project aligns the website, booking journey, Google presence, local discovery, brand content, and future production sessions.",
      services: [
        "Website",
        "ClinicSense",
        "Google Business",
        "Local SEO",
        "Photo & Video",
        "Content Strategy",
      ],
    },
    featured: true,
    stats: [
      { label: "Scope", value: "Launch System" },
      { label: "Focus", value: "Bookings + Trust" },
      { label: "Status", value: "Live + Growing" },
    ],
  },
] as const;

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
  "Website Design": {
    slug: "web-builds",
    eyebrow: "Website Design & Development",
    title: "Websites built to make the business easier to trust.",
    description:
      "Custom business websites, booking and inquiry systems, responsive interfaces, search foundations, brand presentation, and ongoing website partnerships.",
    emptyMessage: "Additional website case studies are being prepared.",
  },
  "Software Development": {
    slug: "software-development",
    eyebrow: "Software Design & Development",
    title: "Digital products built around real operational needs.",
    description:
      "Interactive applications, portals, workflows, dashboards, integrations, media platforms, and software products designed and developed by L&L.",
    emptyMessage: "Additional software case studies are being prepared.",
  },
  "Social Media Management": {
    slug: "social-media-management",
    eyebrow: "Social Media Management & Content",
    title: "Managed brands with one consistent digital direction.",
    description:
      "Social strategy, content systems, Google and platform management, photography, video, publishing, campaigns, and ongoing digital partnerships.",
    emptyMessage: "Additional social-management case studies are being prepared.",
  },
};

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((project) => project.category === category);
}
