export type ProjectCategory = "Web Build" | "Tech Support" | "Infrastructure";

export type Project = {
  title: string;
  category: ProjectCategory;
  description: string;
  result: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "Tow-N-Go Trailers Website",
    category: "Web Build",
    description:
      "Custom website build with premium branding, trailer rental structure, mobile optimization, SEO setup, and lead-focused layout.",
    result:
      "Improved trust, clearer rental flow, and stronger online presence.",
    image: "/images/projects/tow-n-go.jpg",
  },
  {
    title: "Crestline Painting Website",
    category: "Web Build",
    description:
      "Modern service website with structured pages, gallery system, contact flow, and professional positioning.",
    result: "Built to present the company as more established and premium.",
    image: "/images/projects/crestline.jpg",
  },
  {
    title: "Business Computer & Network Support",
    category: "Tech Support",
    description:
      "Remote and on-site troubleshooting, system cleanup, account setup, device optimization, and business tech support.",
    result: "Cleaner systems, fewer issues, and faster day-to-day operation.",
    image: "/images/projects/tech-support.jpg",
  },
  {
    title: "Network Rack Cleanup",
    category: "Infrastructure",
    description:
      "Rack organization, cable cleanup, switch/patch panel planning, labeling, and network hardware organization.",
    result:
      "Cleaner infrastructure, easier troubleshooting, and more professional setup.",
    image: "/images/projects/rack-cleanup.jpg",
  },
  {
    title: "CCTV & Network System Setup",
    category: "Infrastructure",
    description:
      "CCTV setup, network configuration, structured cabling, and technical system installation for business environments.",
    result:
      "More reliable visibility, cleaner setup, and better technical control.",
    image: "/images/projects/cctv-network.jpg",
  },
  {
    title: "Website Optimization & SEO Cleanup",
    category: "Web Build",
    description:
      "Performance cleanup, SEO structure, metadata, Google-facing improvements, and conversion-focused refinements.",
    result: "Faster pages, better structure, and stronger search foundation.",
    image: "/images/projects/seo-cleanup.jpg",
  },
];
