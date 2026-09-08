export type ProjectCategory = "web-builds" | "software-development" | "social-media-management";
export type ProjectVideo = {
  src: string;
  poster: string;
  title: string;
  description: string;
  descriptionTrack: string;
  durationLabel: string;
  width: number;
  height: number;
  portrait?: boolean;
};
export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  ownership: "client" | "studio";
  relationship?: string;
  status: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  services: string[];
  video: ProjectVideo;
  image?: string;
  imageAlt?: string;
  liveUrl?: string;
  relatedWork?: { projectId: string; label: string };
  links?: { label: string; href: string; kind?: string }[];
};

export const projects: Project[] = [
  {
    id: "tow-n-go",
    ownership: "client",
    relatedWork: { projectId: "tow-n-go-digital", label: "Explore the monthly partnership" },
    title: "Tow-N-Go Trailers",
    category: "web-builds",
    relationship: "Website & Monthly Digital Partner",
    status: "Live + Managed",
    description:
      "A custom rental website with monthly social media management, original content and ongoing website support for an Okanagan trailer business.",
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
    video: {
      src: "/media/projects/tow-n-go-website.mp4",
      poster: "/media/projects/tow-n-go-website.webp",
      title: "Tow-N-Go website walkthrough",
      description:
        "A scroll preview of the homepage, fleet presentation, services and rental inquiry pathway, captured from the public website. Explore the monthly partnership below for an example of our social content.",
      descriptionTrack: "/media/projects/tow-n-go-website.vtt",
      durationLabel: "26 sec",
      width: 1280,
      height: 880,
    },
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
    ownership: "client",
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
    video: {
      src: "/media/projects/crestline-website.mp4",
      poster: "/media/projects/crestline-website.webp",
      title: "Crestline website walkthrough",
      description:
        "A scroll preview of Crestline’s service presentation, company introduction, real project gallery and quote pathway, captured from the public website.",
      descriptionTrack: "/media/projects/crestline-website.vtt",
      durationLabel: "26 sec",
      width: 1280,
      height: 880,
    },
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
    ownership: "client",
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
    video: {
      src: "/media/projects/mckenzie-website.mp4",
      poster: "/media/projects/mckenzie-website.webp",
      title: "McKenzie House website walkthrough",
      description:
        "A scroll preview of the treatment-space imagery, service presentation, client information and ClinicSense booking pathway, captured from the public website.",
      descriptionTrack: "/media/projects/mckenzie-website.vtt",
      durationLabel: "26 sec",
      width: 1280,
      height: 880,
    },
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
    ownership: "studio",
    title: "Tate's TV",
    category: "software-development",
    relationship: "Our Own Software Product",
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
    video: {
      src: "/media/projects/tates-tv-interface.mp4",
      poster: "/media/projects/tates-tv-interface.webp",
      title: "Tate’s TV guide & controls",
      description:
        "A visual tour of the programme guide and on-screen remote, using captured application screens. This preview focuses on interface design; programme availability changes on the live application.",
      descriptionTrack: "/media/projects/tates-tv-interface.vtt",
      durationLabel: "16 sec",
      width: 1280,
      height: 880,
    },
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
    id: "tow-n-go-digital",
    ownership: "client",
    title: "Tow-N-Go Digital Management",
    category: "social-media-management",
    relationship: "Monthly Social Media & Content Partner",
    status: "Live + Managed",
    description:
      "An ongoing monthly partnership connecting Facebook management, TikTok and short-form video, Google Business content and website maintenance.",
    challenge:
      "The business needed its website and social channels to communicate the same services consistently.",
    solution:
      "Plan and produce content around the real fleet and available services, manage Facebook and TikTok publishing, adapt campaigns for Google Business and keep the website current. Each month's work is coordinated as one brand presence.",
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
    video: {
      src: "/media/projects/tow-n-go-content.mp4",
      poster: "/media/projects/tow-n-go-content.webp",
      title: "Tow-N-Go social content",
      description:
        "A fleet education Reel from the monthly content partnership. On-screen labels introduce enclosed-trailer components before the branded booking message. Rental customers load their cargo; Tow-N-Go’s transport service hauls prepared loads.",
      descriptionTrack: "/media/projects/tow-n-go-content.vtt",
      durationLabel: "23 sec",
      width: 720,
      height: 1280,
      portrait: true,
    },
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
    ownership: "client",
    title: "McKenzie House Massage Digital Launch",
    category: "social-media-management",
    relationship: "Website, Content & Google Launch",
    status: "Launch Delivered",
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
    video: {
      src: "/media/projects/mckenzie-launch.mp4",
      poster: "/media/projects/mckenzie-launch.webp",
      title: "McKenzie House launch showcase",
      description:
        "A before-and-after showcase comparing the previous website with the custom green-and-cream design, treatment content and booking journey. This is a completed launch project.",
      descriptionTrack: "/media/projects/mckenzie-launch.vtt",
      durationLabel: "33 sec",
      width: 1280,
      height: 598,
    },
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

export const clientWebsiteProjects = projects.filter(
  (project) => project.ownership === "client" && project.category === "web-builds",
);

export const studioProjects = projects.filter((project) => project.ownership === "studio");

export const contentProjects = projects.filter(
  (project) => project.category === "social-media-management",
);

export function projectPath(project: Pick<Project, "category" | "id">) {
  return `/projects/${project.category}#${project.id}`;
}

export function getProject(id: string) {
  const project = projects.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown portfolio project: ${id}`);
  return project;
}

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
