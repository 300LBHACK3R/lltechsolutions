export type ProjectCategory = "web-builds" | "software-development" | "social-media-management";
export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  relationship?: string;
  status: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  services: string[];
  image?: string;
  imageAlt?: string;
  liveUrl?: string;
  links?: { label: string; href: string; kind?: string }[];
};

export const projects: Project[] = [
  {
    id: "tow-n-go",
    title: "Tow-N-Go Trailers",
    category: "web-builds",
    relationship: "Ongoing Digital Partner",
    status: "Live + Managed",
    description:
      "A custom rental website and ongoing digital partnership for a growing Okanagan trailer business.",
    challenge:
      "Tow-N-Go needed more than a brochure website. The business required a professional fleet presentation, clear rental pathways, local search structure, customer trust signals, and an online presence that could keep growing with the company.",
    solution:
      "Designed a custom fleet presentation, trailer details, rental inquiry flow and local-search foundations. Clear pathways distinguish self-towed rentals, trailer delivery and collection, and transport of customer-loaded cargo.",
    result:
      "Customers can explore the fleet, understand the available services and send a rental inquiry from one connected website.",
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
    image: "/images/projects/tow-n-go.webp",
    imageAlt: "Tow-N-Go Trailers custom rental website showcase",
    liveUrl: "https://www.towandgotrailers.ca/",
    links: [
      {
        label: "Live Website",
        href: "https://www.towandgotrailers.ca/",
        kind: "website",
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
  },
  {
    id: "crestline",
    title: "Crestline Painting",
    category: "web-builds",
    relationship: "Custom Business Website",
    status: "Live",
    description:
      "A professional service and portfolio website presenting commercial, strata, multi-family and custom-home painting.",
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
    image: "/images/projects/crestline.webp",
    imageAlt: "Crestline Painting custom business website showcase",
    liveUrl: "https://www.crestlinepainting.ca/",
    links: [
      {
        label: "Live Website",
        href: "https://www.crestlinepainting.ca/",
        kind: "website",
      },
    ],
  },
  {
    id: "mckenzie-house",
    title: "McKenzie House Massage",
    category: "web-builds",
    relationship: "Brand, Website & Launch System",
    status: "Live",
    description:
      "A boutique massage website connecting real photography, service information, local discovery and ClinicSense booking.",
    challenge:
      "The business needed a complete digital identity that felt professional and welcoming while clearly explaining its services, client-led approach, frequently asked questions, booking options, and local Calgary positioning.",
    solution:
      "Built the custom website, service and pricing pages, FAQ and ClinicSense booking journey. Original on-site photography and video, technical SEO and Google Business launch support complete the presentation.",
    result:
      "A cohesive wellness presence that connects the brand, website, booking platform, Google visibility, and future content into one professional client journey.",
    services: [
      "Custom website design & development",
      "ClinicSense booking integration",
      "On-site photography and video",
      "Service, pricing and FAQ content",
      "Technical SEO",
      "Google Business launch support",
    ],
    image: "/images/projects/mckenzie-house.webp",
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
  },
  {
    id: "tates-tv",
    title: "Tate's TV",
    category: "software-development",
    relationship: "Custom Web Application",
    status: "Live + Managed",
    description:
      "A custom media application with channel navigation, a live programme guide and interactive television controls.",
    challenge:
      "The project required far more than a normal website: scheduled media, persistent channel state, live progression, a television-style interface, remote controls, channel navigation, guide data, responsive layouts, and a platform that could keep expanding.",
    solution:
      "Developed channel architecture, guide and scheduling workflows, interactive remote controls and responsive media interfaces, with ongoing platform development.",
    result:
      "A distinctive entertainment product that demonstrates L&L's ability to architect and maintain complex, interactive software—not just standard brochure websites.",
    services: [
      "Custom web application",
      "Media interface design",
      "Programme guide and scheduling",
      "Interactive controls",
      "Responsive playback experience",
      "Ongoing development",
    ],
    image: "/images/projects/tates-tv.webp",
    imageAlt: "Tate's TV custom streaming web application showcase",
    liveUrl: "https://www.tatestv.ca/",
    links: [
      {
        label: "Open Tate's TV",
        href: "https://www.tatestv.ca/",
        kind: "website",
      },
    ],
  },
  {
    id: "tate-byers",
    title: "TateByers.ca",
    category: "web-builds",
    relationship: "Developer Portfolio Experience",
    status: "Live + Evolving",
    description:
      "A personal portfolio exploring custom interfaces, creative development and interactive navigation.",
    challenge:
      "A conventional portfolio would not accurately represent the developer behind the work. The project needed to feel interactive, memorable, technically ambitious, and completely different from a standard résumé website.",
    solution:
      "Developed custom interface states, project navigation and social-link integration, with an evolving creative direction.",
    result:
      "A distinctive portfolio product that demonstrates interface design, front-end architecture, animation, creative development, and the ability to turn an unusual concept into a functional web experience.",
    services: [
      "Creative website design",
      "Custom front-end development",
      "Interactive navigation",
      "Portfolio and social links",
    ],
    liveUrl: "https://www.tatebyers.ca/",
    links: [
      {
        label: "Open Portfolio",
        href: "https://www.tatebyers.ca/",
        kind: "website",
      },
    ],
  },
  {
    id: "tow-n-go-digital",
    title: "Tow-N-Go Digital Management",
    category: "social-media-management",
    relationship: "Ongoing Digital Partner",
    status: "Live + Managed",
    description:
      "Website, Google Business, Facebook and TikTok brought together through ongoing content and management.",
    challenge:
      "The business needed its website and social channels to communicate the same services consistently.",
    solution:
      "Coordinate website updates, Google Business content, Facebook campaigns and short-form video around the real fleet and available services.",
    result:
      "A consistent customer journey from social content and local discovery to the fleet and inquiry form.",
    services: [
      "Social media management",
      "Short-form video",
      "Google Business content",
      "Campaign creative",
      "Website maintenance",
    ],
    image: "/images/projects/tow-n-go.webp",
    imageAlt: "Tow-N-Go Trailers custom rental website showcase",
    liveUrl: "https://www.towandgotrailers.ca/",
    links: [
      {
        label: "Live Website",
        href: "https://www.towandgotrailers.ca/",
        kind: "website",
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
  },
  {
    id: "mckenzie-digital-launch",
    title: "McKenzie House Massage Digital Launch",
    category: "social-media-management",
    relationship: "Website, Content & Google Launch",
    status: "Live",
    description:
      "Original photography, service video and a coordinated digital launch for Heather’s massage practice.",
    challenge:
      "The digital presence needed to reflect the warmth and professionalism of the real treatment experience.",
    solution:
      "Produced on-site photos and service footage, integrated approved content into the website, connected the ClinicSense journey and supported the Google Business launch.",
    result: "A cohesive set of real brand assets and connected discovery and booking pathways.",
    services: [
      "On-site photography",
      "Videography and editing",
      "Website content",
      "Local SEO",
      "Google Business launch",
    ],
    image: "/images/projects/mckenzie-house.webp",
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
  },
];

export const projectCategories = [
  {
    slug: "web-builds",
    label: "Website Design",
    title: "Websites with a clear purpose.",
    description: "Custom business websites, considered customer journeys and real project work.",
  },
  {
    slug: "software-development",
    label: "Software Development",
    title: "Ideas turned into working software.",
    description:
      "Purpose-built applications that demonstrate interface design, architecture and ongoing development.",
  },
  {
    slug: "social-media-management",
    label: "Social Media & Content",
    title: "The presence beyond the website.",
    description: "Real client content, connected channels and ongoing digital partnerships.",
  },
] as const;
