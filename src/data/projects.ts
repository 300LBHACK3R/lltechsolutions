import { projectVideos, type ProjectVideo } from "@/data/project-videos";

export type ProjectCategory = "web-builds" | "software-development" | "social-media-management";
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
  implementation: {
    label: string;
    tools: string[];
    summary: string;
    operationsLabel: string;
    operations: string;
  };
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
    relatedWork: {
      projectId: "tow-n-go-digital",
      label: "Explore the monthly partnership",
    },
    title: "Tow-N-Go Trailers",
    category: "web-builds",
    relationship: "Website & Monthly Digital Partner",
    status: "Live + Managed",
    description:
      "A custom rental website with monthly social media management, original content and ongoing website support for an Okanagan trailer business.",
    challenge:
      "Tow-N-Go needed a website that could explain the fleet as clearly as a conversation with the owner. Visitors needed to compare enclosed, dump and flatdeck trailers, understand the difference between a rental and delivery or transport, and send enough information for a useful availability response. The presentation also needed to support a growing Okanagan business beyond its initial launch.",
    solution:
      "We designed and developed the black-and-gold website, organized the fleet into rental categories, and built trailer pages with photo galleries, specifications, common uses and relevant add-ons. Trailer-specific enquiry links carry the selected equipment into the contact journey. Dedicated service information, About, Reviews and a searchable FAQ help visitors answer practical questions before getting in touch. Metadata, page structure and local service wording support discovery.",
    result:
      "The delivered site connects browsing, comparison and enquiry in one customer journey. Customers can identify a suitable trailer and request availability; the owner confirms the booking and arrangements. Our monthly partnership continues with website updates, Google Business content and social publishing as the fleet and business develop.",
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
    video: projectVideos["tow-n-go"],
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
    implementation: {
      label: "Built with",
      tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      summary:
        "Reusable page and interface components keep fleet information consistent and make new trailer additions easier to maintain. The enquiry endpoint uses Resend for email delivery.",
      operationsLabel: "Hosting & ongoing care",
      operations:
        "Hosted on Vercel with source code managed in GitHub. Ongoing work covers fleet, service and content updates, website maintenance and the connected monthly digital partnership.",
    },
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
      "Crestline’s website needed to speak to builders, property managers, strata clients and homeowners with different project requirements. The brief was to present the company’s experience with the care expected on larger commercial and residential jobs, while making its custom-home work easy to find and assess.",
    solution:
      "We built a custom website with dedicated service pages and a portfolio organized around Custom Homes, Multi-Family, Strata and Commercial projects. Project descriptions, locations and supporting galleries give visitors context for the real work. Clear navigation connects those examples to the relevant service and quote pathways. Responsive layouts, image presentation, metadata and search-focused page content complete the public-facing build.",
    result:
      "Crestline has a structured digital portfolio that prospects can review before a call or quotation. A visitor can choose the type of project, explore relevant examples and reach the business with a clearer understanding of its work. The reusable service and project structure supports future additions without rebuilding each page from scratch.",
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
    video: projectVideos["crestline"],
    imageAlt: "Crestline Painting custom business website showcase",
    liveUrl: "https://www.crestlinepainting.ca/",
    links: [
      {
        label: "Live Website",
        href: "https://www.crestlinepainting.ca/",
        kind: "website",
      },
    ],
    implementation: {
      label: "Built with",
      tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      summary:
        "Shared service and gallery components create a consistent experience across the portfolio. Structured project data keeps titles, categories, descriptions and imagery organized.",
      operationsLabel: "Hosting & delivery",
      operations:
        "The website is hosted on Vercel, with its source maintained in GitHub. Its component-based structure provides a clear foundation for later project, photography and service updates.",
    },
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
      "Heather needed the website to communicate the warmth and professionalism of her practice before someone booked. Visitors needed clear treatment explanations, appointment lengths, pricing before GST, direct-billing information and reassurance about the experience. The design also needed to feel personal through real treatment-space imagery and client stories.",
    solution:
      "We built the custom green-and-cream website around dedicated treatment pages for Massage, Sensory Massage, Seasonal Body Renewal and Cup & Buff. Each connects service information, pricing and treatment previews to ClinicSense booking. The work also includes Pricing, About, Reviews, Contact and FAQ pages, client-submitted photo stories, and original on-site photography and video. Local-search content, metadata and Google Business launch support connect the website with discovery.",
    result:
      "The completed launch gives visitors a connected path from learning about a treatment to reviewing prices, reading client experiences and opening booking. ClinicSense continues to handle availability, intake and appointment scheduling. Heather received a website and set of real visual assets that present the same practice consistently across its digital presence.",
    services: [
      "Custom website design & development",
      "ClinicSense booking integration",
      "On-site photography and video",
      "Service, pricing and FAQ content",
      "Technical SEO",
      "Google Business launch support",
    ],
    image: "/images/projects/mckenzie-house.webp",
    video: projectVideos["mckenzie-house"],
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
    implementation: {
      label: "Built with",
      tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "ClinicSense"],
      summary:
        "Reusable treatment-page components keep services and pricing consistent. Optimized imagery and native treatment video support the design; booking links connect visitors to Heather’s existing ClinicSense platform.",
      operationsLabel: "Hosting & booking",
      operations:
        "The website is hosted on Vercel, with source code managed in GitHub. Appointment scheduling and client intake stay within ClinicSense, separate from the public marketing website.",
    },
  },
  {
    id: "tates-tv",
    ownership: "studio",
    title: "Tate's TV",
    category: "software-development",
    relationship: "Software Design & Development",
    status: "Live + Managed",
    description:
      "Designed, developed and managed by L&L. Our own media application brings together a custom interface, channel navigation, programme scheduling and interactive television controls.",
    challenge:
      "Our own software project explores a television-style experience in the browser: viewers choose channels and see what is on now and next, rather than browse a conventional video catalogue. That requires the guide, channel selection, programme timing and controls to work from a shared model while leaving room for continued product development.",
    solution:
      "We developed the custom React interface, channel navigation, programme guide, on-screen remote and scheduling workflows. The architecture separates the viewer interface, programming data and media storage so each part can evolve independently. Reusable controls and state management support channel changes and presentation preferences across the application.",
    result:
      "Tate’s TV is an ongoing studio product demonstrating application architecture, interface design and connected data workflows. The portfolio preview focuses on the guide and controls. Media compatibility, programming and interface improvements remain ongoing product work.",
    services: [
      "Custom web application",
      "Media interface design",
      "Programme guide and scheduling",
      "Interactive controls",
      "Responsive playback experience",
      "Ongoing development",
    ],
    image: "/images/projects/tates-tv.webp",
    video: projectVideos["tates-tv"],
    imageAlt: "Tate's TV custom streaming web application showcase",
    liveUrl: "https://www.tatestv.ca/",
    links: [
      {
        label: "Open Tate's TV",
        href: "https://www.tatestv.ca/",
        kind: "website",
      },
    ],
    implementation: {
      label: "Built with",
      tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand"],
      summary:
        "Zustand manages interactive interface state. Supabase supports programming data, while Cloudflare R2 stores media separately from the application code.",
      operationsLabel: "Hosting & product development",
      operations:
        "The application is hosted on Vercel with GitHub-managed source. Programming data and media have dedicated services, allowing the interface, schedule workflows and content library to develop separately.",
    },
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
      "Tow-N-Go needed a consistent presence between rental enquiries, not just a website at launch. Customers discovering the business through a Reel, a Facebook post or Google needed to see the same fleet, service options and contact information. Content also needed to explain practical uses for the equipment in a recognizable local voice.",
    solution:
      "Our monthly work connects content planning, captions, branded creative, short-form video and publishing across Facebook, TikTok and Google Business. Campaigns draw on the real fleet, equipment features, seasonal jobs and rental questions, with the core idea adapted for each channel. Website updates keep the destination behind those posts aligned with current services and enquiries. Delivery and transport copy clearly distinguishes hauling from customer loading.",
    result:
      "Tow-N-Go has a continuing content and website partnership rather than a one-off batch of launch assets. Prospects can move from an educational or promotional post to the relevant fleet information and enquiry pathway. Publishing and site updates remain connected as the owner adds equipment, changes services or plans the next campaign.",
    services: [
      "Social media management",
      "Short-form video",
      "Google Business content",
      "Campaign creative",
      "Website maintenance",
    ],
    image: "/images/projects/tow-n-go.webp",
    video: projectVideos["tow-n-go-digital"],
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
    implementation: {
      label: "Channels & content",
      tools: ["Facebook", "TikTok", "Google Business Profile", "Short-form video"],
      summary:
        "A shared campaign plan connects platform-specific captions, vertical video, branded graphics and website updates. Core creative is adapted for each channel rather than treated as unrelated campaigns.",
      operationsLabel: "Website & monthly management",
      operations:
        "The partnership supports the Next.js website hosted on Vercel alongside ongoing social and Google Business publishing. Website source is managed in GitHub; the work is coordinated around the business’s approved services and current fleet.",
    },
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
      "Heather’s launch needed recognizable, real content that matched the experience inside her practice. A new website alone would not communicate the treatment space, individual services and personal approach. The brief connected on-site production with website content, local discovery and a clear route to existing online booking.",
    solution:
      "We photographed the treatment environment and produced service footage on location, then edited and prepared the material for the website and launch creative. Real imagery supports the treatment pages, while the before-and-after showcase explains the website transformation. The launch work also connected Google Business information, service content and ClinicSense booking so visitors encountered a consistent practice across those touchpoints.",
    result:
      "This completed project delivered an integrated website launch and a reusable set of photography, service video and promotional content. Heather’s digital presence reflects her actual space and approved services, with clear paths to learn more and book. This project covers the completed launch and original content production.",
    services: [
      "On-site photography",
      "Videography and editing",
      "Website content",
      "Local SEO",
      "Google Business launch",
    ],
    image: "/images/projects/mckenzie-house.webp",
    video: projectVideos["mckenzie-digital-launch"],
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
    implementation: {
      label: "Content & connected platforms",
      tools: ["On-site photography", "Service video", "Google Business Profile", "ClinicSense"],
      summary:
        "Original photography and edited footage were prepared for the custom Next.js website and launch content. Google Business information and booking links connect discovery with the treatment pages.",
      operationsLabel: "Website & launch delivery",
      operations:
        "The accompanying website runs on Vercel with GitHub-managed source. ClinicSense remains the booking platform. This scope covers the delivered launch and its content assets.",
    },
  },
];

export const clientWebsiteProjects = projects.filter(
  (project) => project.ownership === "client" && project.category === "web-builds",
);

/** Website and software examples share the main showcase; ownership stays explicit on each preview. */
export const showcaseProjects = projects.filter(
  (project) => project.category === "web-builds" || project.category === "software-development",
);

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
