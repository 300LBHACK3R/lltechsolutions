export type ServiceId =
  | "website-design"
  | "software-development"
  | "social-media";

export type ServicePillar = {
  id: ServiceId;
  eyebrow: string;
  title: string;
  description: string;
  highlight: string;
  outcome: string;
  availability: string;
  href: string;
  cta: string;
  services: readonly string[];
};

export const servicePillars: readonly ServicePillar[] = [
  {
    id: "website-design",
    eyebrow: "Website Design & Development",
    title: "A digital presence worthy of the business behind it.",
    description:
      "We design and develop custom business websites around the way your customers evaluate, trust, and contact your company. Every build is responsive, accessible, search-ready, and structured to grow with the business.",
    highlight:
      "Strategy, interface design, development, content structure, technical SEO, launch, and long-term support are handled as one connected project.",
    outcome:
      "A polished, high-performance website that communicates value clearly and gives visitors a confident path to take action.",
    availability:
      "Available across Canada for new websites, strategic redesigns, e-commerce, booking experiences, landing pages, and ongoing website management.",
    href: "/services#website-design",
    cta: "Explore Website Services",
    services: [
      "Website strategy, user experience, and interface design",
      "Custom React, Next.js, and TypeScript development",
      "Business websites, landing pages, and service platforms",
      "E-commerce, booking, payments, forms, and integrations",
      "Responsive design for mobile, tablet, desktop, and large displays",
      "Accessibility, performance, and technical SEO foundations",
      "Analytics, Search Console, and Google Business connections",
      "Content structure, photography, video, and launch assets",
      "Maintenance, reporting, and continuous improvement",
    ],
  },
  {
    id: "software-development",
    eyebrow: "Software Design & Development",
    title: "Software shaped around the way your business actually works.",
    description:
      "We design and build web applications, customer portals, dashboards, internal tools, automation, and digital products that solve a specific operational or customer-experience problem.",
    highlight:
      "Discovery, product architecture, interface design, development, testing, deployment, and continued iteration remain connected from beginning to end.",
    outcome:
      "A focused digital system that reduces friction, improves consistency, and gives the business room to operate and scale on its own terms.",
    availability:
      "Available across Canada for custom web applications, progressive web apps, portals, workflow systems, product development, and software modernization.",
    href: "/services#software-development",
    cta: "Explore Software Services",
    services: [
      "Product discovery, requirements, and technical architecture",
      "Custom web applications and progressive web apps",
      "Customer portals, dashboards, and administrative systems",
      "Booking, rental, scheduling, intake, and workflow tools",
      "Authentication, user roles, permissions, and secure account flows",
      "Databases, structured content, APIs, and third-party integrations",
      "Automation, notifications, forms, and operational workflows",
      "Responsive interface design, testing, and deployment",
      "Ongoing development, maintenance, and product expansion",
    ],
  },
  {
    id: "social-media",
    eyebrow: "Social Media Management & Content",
    title: "A consistent brand presence that stays active after launch.",
    description:
      "We manage the planning, creation, editing, publishing, and refinement required to keep a business visible across the channels its customers use every day.",
    highlight:
      "Your website, Google presence, social profiles, photography, video, and campaigns are planned as one brand system instead of separate pieces.",
    outcome:
      "A clearer and more recognizable presence with consistent messaging, professional content, and stronger pathways from attention to inquiry.",
    availability:
      "Available Canada-wide for strategy, account management, editing, and publishing, with Calgary-area photography and video production available by scope.",
    href: "/services#social-media",
    cta: "Explore Social Management",
    services: [
      "Facebook, Instagram, TikTok, LinkedIn, and YouTube management",
      "Content strategy, monthly calendars, captions, and publishing",
      "Short-form video for Reels, TikTok, and YouTube Shorts",
      "Photography, videography, editing, graphics, and ad creative",
      "Google Business Profile posts and connected local content",
      "Campaign planning, promotions, launches, and seasonal offers",
      "Comment, message, and community-management workflows",
      "Performance reporting and content refinement",
      "Website, SEO, social, and content managed as one system",
    ],
  },
] as const;
