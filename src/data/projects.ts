export type ProjectCategory = "Web Build" | "Tech Support" | "Infrastructure";

export type Project = {
  title: string;
  category: ProjectCategory;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  services: string[];
  image: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Tow-N-Go Trailers Website",
    category: "Web Build",
    description:
      "Custom trailer rental website built with premium blacked-out branding, structured fleet content, mobile optimization, SEO foundations, and lead-focused layout.",
    challenge:
      "The business needed a stronger online presence that looked professional, organized rentals clearly, and made it easy for customers to inquire.",
    solution:
      "Built a custom website structure with strong service hierarchy, trailer cards, conversion-focused sections, performance optimization, and scalable content architecture.",
    result:
      "A sharper, more credible website that presents the company professionally and gives customers a clearer rental path.",
    services: [
      "Custom website build",
      "Mobile-first design",
      "SEO structure",
      "Performance optimization",
    ],
    image: "/images/projects/tow-n-go.jpg",
    featured: true,
  },
  {
    title: "Crestline Painting Website",
    category: "Web Build",
    description:
      "Modern painting contractor website with service pages, project gallery structure, quote flow, and commercial-grade positioning.",
    challenge:
      "The company needed to look more established online and better represent its commercial, strata, custom home, and multi-family work.",
    solution:
      "Designed a clean, professional service site with structured pages, stronger project presentation, contact flow, and premium visual hierarchy.",
    result:
      "A stronger digital presence built to inspire trust from higher-value clients and project decision-makers.",
    services: [
      "Service page structure",
      "Project gallery",
      "Contact flow",
      "Brand positioning",
    ],
    image: "/images/projects/crestline.jpg",
    featured: true,
  },
  {
    title: "Business Tech Support Cleanup",
    category: "Tech Support",
    description:
      "Remote and on-site support for business systems, computer cleanup, account setup, troubleshooting, and practical optimization.",
    challenge:
      "The client had recurring system issues, scattered setup problems, and no clear technical direction.",
    solution:
      "Reviewed the environment, cleaned up systems, resolved priority issues, improved organization, and provided clear next steps.",
    result:
      "Cleaner systems, faster operation, fewer recurring issues, and better confidence in daily business tech.",
    services: [
      "Remote support",
      "System cleanup",
      "Troubleshooting",
      "Optimization",
    ],
    image: "/images/projects/tech-support.jpg",
  },
  {
    title: "Network Rack Cleanup",
    category: "Infrastructure",
    description:
      "Rack organization, patch panel planning, cable cleanup, switch layout, labeling, and technical infrastructure improvement.",
    challenge:
      "The network area was messy, difficult to troubleshoot, and lacked clean organization.",
    solution:
      "Cleaned the rack layout, organized cabling, improved patching structure, labeled key runs, and simplified future maintenance.",
    result:
      "Cleaner infrastructure, easier troubleshooting, better presentation, and more reliable technical organization.",
    services: [
      "Rack cleanup",
      "Patch panel planning",
      "Cable organization",
      "Switch setup",
    ],
    image: "/images/projects/rack-cleanup.jpg",
  },
  {
    title: "CCTV & Network System Setup",
    category: "Infrastructure",
    description:
      "CCTV installation, network configuration, structured cabling, and technical system setup for business environments.",
    challenge:
      "The client needed a cleaner, more reliable camera and network setup with proper configuration.",
    solution:
      "Installed and configured CCTV/network components, organized connections, and improved system reliability.",
    result:
      "More reliable visibility, cleaner setup, and stronger control over the technical environment.",
    services: [
      "CCTV setup",
      "Network configuration",
      "Structured cabling",
      "System setup",
    ],
    image: "/images/projects/cctv-network.jpg",
  },
  {
    title: "Website Optimization & SEO Cleanup",
    category: "Web Build",
    description:
      "Performance cleanup, SEO metadata, Google-facing improvements, mobile refinement, and conversion-focused website updates.",
    challenge:
      "The website was underperforming visually and structurally, with weak SEO setup and unclear conversion flow.",
    solution:
      "Improved structure, metadata, performance, mobile experience, and page hierarchy to support better search visibility and trust.",
    result:
      "A cleaner, faster, more professional website foundation with stronger Google-facing structure.",
    services: ["SEO cleanup", "Metadata", "Performance", "Conversion flow"],
    image: "/images/projects/seo-cleanup.jpg",
  },
];
