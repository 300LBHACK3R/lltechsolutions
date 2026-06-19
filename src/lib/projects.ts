export type ProjectCategory = "Web Build" | "Tech Support" | "Infrastructure";

export type ProjectMediaImage = {
  title: string;
  src?: string;
  alt: string;
};

export type ProjectMediaVideo = {
  title: string;
  src?: string;
  poster?: string;
};

export type ProjectStat = {
  label: string;
  value: string;
};

export type Project = {
  title: string;
  category: ProjectCategory;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  services: string[];
  image: string;
  imageAlt: string;
  liveUrl?: string;
  featured?: boolean;
  stats?: ProjectStat[];
  media?: {
    images: ProjectMediaImage[];
    video?: ProjectMediaVideo;
  };
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
    imageAlt: "Tow-N-Go Trailers website showcase",
    liveUrl: "https://towandgotrailers.ca",
    featured: true,
    stats: [
      { label: "Scope", value: "Website Build" },
      { label: "Focus", value: "Rental Leads" },
      { label: "Status", value: "Live" },
    ],
    media: {
      images: [
        {
          title: "Homepage / Quote Flow",
          src: "",
          alt: "Tow-N-Go homepage and quote flow screenshot",
        },
        {
          title: "Mobile / Fleet Layout",
          src: "",
          alt: "Tow-N-Go mobile and trailer fleet layout screenshot",
        },
      ],
      video: {
        title: "Website Walkthrough",
        src: "",
        poster: "",
      },
    },
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
    imageAlt: "Crestline Painting website showcase",
    liveUrl: "https://crestline-painting-six.vercel.app",
    featured: true,
    stats: [
      { label: "Scope", value: "Website Build" },
      { label: "Focus", value: "Commercial Trust" },
      { label: "Status", value: "Live" },
    ],
    media: {
      images: [
        {
          title: "Service Page System",
          src: "",
          alt: "Crestline Painting service page screenshot",
        },
        {
          title: "Quote / Project Flow",
          src: "",
          alt: "Crestline Painting quote flow screenshot",
        },
      ],
      video: {
        title: "Website Walkthrough",
        src: "",
        poster: "",
      },
    },
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
    imageAlt: "Website optimization and SEO cleanup showcase",
    stats: [
      { label: "Scope", value: "Cleanup" },
      { label: "Focus", value: "SEO + Speed" },
      { label: "Status", value: "Delivered" },
    ],
    media: {
      images: [
        {
          title: "Before / After Structure",
          src: "",
          alt: "Website cleanup before and after screenshot",
        },
        {
          title: "Google / Metadata Setup",
          src: "",
          alt: "Website SEO metadata setup screenshot",
        },
      ],
      video: {
        title: "Optimization Walkthrough",
        src: "",
        poster: "",
      },
    },
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
    imageAlt: "Business tech support cleanup showcase",
    stats: [
      { label: "Scope", value: "Support" },
      { label: "Focus", value: "Cleanup" },
      { label: "Status", value: "Delivered" },
    ],
    media: {
      images: [
        {
          title: "System Cleanup",
          src: "",
          alt: "Business computer cleanup screenshot",
        },
        {
          title: "Account / Setup Work",
          src: "",
          alt: "Business account and setup work screenshot",
        },
      ],
      video: {
        title: "Support Walkthrough",
        src: "",
        poster: "",
      },
    },
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
    imageAlt: "Network rack cleanup showcase",
    stats: [
      { label: "Scope", value: "Infrastructure" },
      { label: "Focus", value: "Cable Cleanup" },
      { label: "Status", value: "Delivered" },
    ],
    media: {
      images: [
        {
          title: "Before Cleanup",
          src: "",
          alt: "Network rack before cleanup photo",
        },
        {
          title: "After Cleanup",
          src: "",
          alt: "Network rack after cleanup photo",
        },
      ],
      video: {
        title: "Rack Walkthrough",
        src: "",
        poster: "",
      },
    },
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
    image: "/images/projects/cctv-network.png",
    imageAlt: "CCTV and network system setup showcase",
    stats: [
      { label: "Scope", value: "Install" },
      { label: "Focus", value: "Security + Network" },
      { label: "Status", value: "Delivered" },
    ],
    media: {
      images: [
        {
          title: "Camera Setup",
          src: "",
          alt: "CCTV camera setup photo",
        },
        {
          title: "Network Configuration",
          src: "",
          alt: "Network configuration setup photo",
        },
      ],
      video: {
        title: "System Walkthrough",
        src: "",
        poster: "",
      },
    },
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
    eyebrow: "Web Builds",
    title: "Websites Built To Look Premium, Load Fast, And Convert.",
    description:
      "Custom websites, SEO foundations, mobile-first layouts, conversion flow, and stronger digital presentation for real businesses.",
    emptyMessage: "More web build case studies are being prepared.",
  },
  "Tech Support": {
    slug: "tech-support",
    eyebrow: "Tech Support",
    title: "Business Tech Support That Cleans Up The Mess.",
    description:
      "Remote and on-site support for systems, accounts, devices, troubleshooting, optimization, and practical business technology problems.",
    emptyMessage: "More tech support examples are being prepared.",
  },
  Infrastructure: {
    slug: "infrastructure",
    eyebrow: "Infrastructure",
    title: "Clean Infrastructure, Networks, CCTV, And Field Systems.",
    description:
      "Rack cleanup, cabling, camera systems, network layout, technical organization, and on-site systems that look and operate better.",
    emptyMessage: "More infrastructure examples are being prepared.",
  },
};

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((project) => project.category === category);
}
