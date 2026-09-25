export const servicePillars = [
  {
    id: "website-development",
    name: "Website Design & Development",
    shortName: "Websites",
    title: "A digital presence worthy of the business behind it.",
    description:
      "Custom websites that make your business easy to understand, credible to choose, and simple to contact. Strategy, design, development and launch work together from day one.",
    preview:
      "A considered first impression. A clear customer journey. A website built around your business.",
    capabilities: [
      "Website strategy, UX and interface design",
      "Custom React, Next.js and TypeScript development",
      "E-commerce, booking and payment integrations",
      "Technical SEO, accessibility and performance",
      "Analytics, Google Business and launch support",
      "Optional photography, videography and media preparation for your website",
      "Website maintenance and continuous improvement",
    ],
    work: "/projects/web-builds",
    inquiry: "Website Design & Development",
  },
  {
    id: "software-development",
    name: "Software Design & Development",
    shortName: "Software",
    title: "Software shaped around the way your business actually works.",
    description:
      "Purpose-built applications for the work that spreadsheets and disconnected tools cannot handle well. We define the workflow, design the experience, and build a system your team can use.",
    preview: "Customer portals, business tools and web applications that make complex work easier.",
    capabilities: [
      "Discovery, requirements and application architecture",
      "Customer portals, dashboards and admin tools",
      "Booking, rental and scheduling workflows",
      "Authentication, roles and permissions",
      "Databases, APIs and third-party integrations",
      "Deployment, documentation and ongoing development",
    ],
    work: "/projects/software-development",
    inquiry: "Custom Software / Web Application",
  },
  {
    id: "social-media-management",
    name: "Social Media Management & Content",
    shortName: "Social & Content",
    title: "A consistent brand presence that stays active after launch.",
    description:
      "Your website, Google presence and social channels should feel like the same business. We connect planning, photography, video and publishing into a manageable content system.",
    preview:
      "Original content and consistent management that keep your brand visible beyond launch.",
    capabilities: [
      "Content strategy and monthly calendars",
      "Facebook, Instagram, TikTok, LinkedIn and YouTube",
      "Photography, videography and short-form editing",
      "Captions, publishing and campaign creative",
      "Google Business posts and profile updates",
      "Performance reporting and content refinement",
    ],
    work: "/projects/social-media-management",
    inquiry: "Social Media Management",
  },
] as const;

/** Content production supports our website and social work; it is not a fourth pillar. */
export const contentProduction = {
  id: "photography-videography",
  title: "Photography & videography",
  description:
    "Show the people, places and work behind your business. We plan and capture original photos and video, edit them for their intended use, and prepare the finished content for your website, social channels or promotional campaigns.",
  uses: [
    "Website hero imagery, service photos and video",
    "Team, workspace, product and completed-project photography",
    "Short-form video, social posts and promotional content",
    "Editing, web-ready exports and website implementation",
  ],
  scope:
    "Available with a website or as a separate content project. Shoot location, travel, timing, editing and deliverables are agreed in your quote. Ongoing content and maintenance are scoped separately.",
  inquiry: "Photo / Video / Short-Form Content",
  projectExample: {
    title: "A website. And the content that makes it yours.",
    priceLabel: "Approx. $1,000 CAD",
    description:
      "McKenzie House’s original project combined website development with on-site photography, videography, editing and implementing the finished media on the website.",
    note: "This is an example combined project cost, not a website-only template price. Your quote confirms the website scope, shoot, deliverables, applicable taxes and any travel costs. New production and ongoing care are agreed separately.",
  },
} as const;
