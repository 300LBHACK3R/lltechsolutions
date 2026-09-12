/** The single source for collection levels, published designs and inquiry selections. */
export const collectionTiers = [
  {
    id: "essential",
    name: "Essential",
    position: "An accessible beginning",
    description:
      "A focused presence that makes your business easy to find, understand and contact.",
    fit: "Independent professionals, new businesses and focused service offers.",
    features: [
      "Concise page structures",
      "Clear services and contact journeys",
      "A streamlined launch scope",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    position: "More room for your business",
    description:
      "A fuller business website with space for your services, your story and the work that earns trust.",
    fit: "Established service businesses with more to show and explain.",
    features: [
      "Broader page collections",
      "Service and project showcases",
      "More content and brand detail",
    ],
  },
  {
    id: "premier",
    name: "Premier",
    position: "A richer brand experience",
    description:
      "More expressive layouts and considered interactions for businesses that want their work to take centre stage.",
    fit: "Visually led brands, detailed portfolios and larger service offerings.",
    features: [
      "More elaborate visual compositions",
      "Rich media and portfolio layouts",
      "More involved customer journeys",
    ],
  },
  {
    id: "flagship",
    name: "Flagship",
    position: "Our most expansive collection",
    description:
      "The broadest design foundations, with more room for content, features and an individually scoped implementation.",
    fit: "Businesses with a larger site and more involved launch requirements.",
    features: [
      "Expansive site structures",
      "Advanced presentation options",
      "A tailored implementation scope",
    ],
  },
] as const;

export type CollectionTierId = (typeof collectionTiers)[number]["id"];

export const collectionCarePlans = [
  {
    id: "care",
    name: "Website Care",
    description: "Keep the website looked after as your business moves forward.",
    scope:
      "Agreed content changes, dependency and security updates, routine checks, and a backup and recovery plan suited to your site.",
  },
  {
    id: "growth",
    name: "Website Growth",
    description: "Keep improving the experience and the information customers find.",
    scope:
      "Website care with an agreed programme of page improvements, search-focused content, Google Business support and reporting.",
  },
  {
    id: "social",
    name: "Website + Social",
    description: "Bring your website and your ongoing brand presence together.",
    scope:
      "Website support alongside a defined social media schedule, content production and reporting, with channels and deliverables agreed up front.",
  },
] as const;

export type CollectionCareId = (typeof collectionCarePlans)[number]["id"];

export type WebsiteDesign = {
  id: string;
  status: "draft" | "published";
  name: string;
  tier: CollectionTierId;
  industry: string;
  description: string;
  startingPriceCad: number;
  pageCount: number;
  deliveryWindow: string;
  preview: { src: string; alt: string; width: number; height: number };
  demoUrl: string;
  included: readonly string[];
};

// Add original, tested designs here as they become available. No sample products are sold.
export const websiteDesigns: readonly WebsiteDesign[] = [];

export const collectionDescription =
  "Explore L&L’s custom-coded Website Collection: four design levels, business personalization, technical SEO, launch support and optional monthly website care across Canada.";

export const collectionBenefits = [
  {
    title: "Your business stays your focus.",
    description:
      "Look after your customers, your team and your next opportunity. We handle the website work, so you do not need to learn a site builder, hosting setup or integrations to get started.",
  },
  {
    title: "A considered starting point.",
    description:
      "Choose a design direction you can see. Reusing an existing L&L codebase reduces the design and development work needed to reach a personalized launch.",
  },
  {
    title: "A real person behind the work.",
    description:
      "Work directly with Tate at L&L. You have someone to ask, someone to implement the details and a clear route to ongoing support.",
  },
] as const;

export const collectionStandards = [
  {
    title: "Personalized in the code",
    description:
      "Your branding, supplied content, services and contact details are integrated into the chosen design. Extra copywriting, photography and features are scoped separately.",
  },
  {
    title: "Search-ready foundations",
    description:
      "Page titles, descriptions, canonical URLs, sitemap, social sharing metadata and relevant structured data are configured around the business and its real content.",
  },
  {
    title: "Security considered at launch",
    description:
      "HTTPS, appropriate security headers, validated forms, protected credentials and dependency checks are part of the launch work. Ongoing updates are covered by the agreed care plan.",
  },
  {
    title: "Performance checked",
    description:
      "We optimize images, loading behaviour and code, then check representative pages. Performance measurements describe the tested page and conditions; they are never a blanket score guarantee.",
  },
  {
    title: "Built for everyday devices",
    description:
      "Responsive layouts, keyboard access, touch controls and reduced-motion behaviour are checked across representative screen sizes and supported browsers.",
  },
  {
    title: "Launch handled for you",
    description:
      "L&L coordinates deployment through Vercel, domain connection and launch checks. Hosting, domain and third-party charges are identified in your proposal.",
  },
] as const;

export const collectionQuestions = [
  {
    question: "What am I purchasing?",
    answer:
      "A service that personalizes and launches an existing L&L website design for your business. The design foundation can be reused for other businesses; your supplied brand assets and content remain yours. Your proposal explains the scope, code handover and usage terms.",
  },
  {
    question: "How is this different from setting up Shopify or an AI website builder myself?",
    answer:
      "With L&L, a developer takes responsibility for the agreed customization, configuration, testing and launch. You can also choose an ongoing care plan. You do not need to learn the tools to manage the build. Platform tools can be useful; the difference here is the personal service and implementation included with your website.",
  },
  {
    question: "Can I change the layout or add features?",
    answer:
      "Yes. Each design will list its included customization. Additional pages, larger layout changes, booking, payments and integrations are quoted before work begins. If your requirements call for an entirely individual design, we can discuss a bespoke build.",
  },
  {
    question: "How will pricing work?",
    answer:
      "Each published design will show its own starting price in CAD and what it includes. We confirm the launch scope, revisions, timeline, applicable taxes and any separate costs before you pay a project deposit. Collection level describes the design’s scope; it is not a universal fixed-price package.",
  },
  {
    question: "Do I need a monthly plan?",
    answer:
      "Monthly care is optional unless your agreed proposal states otherwise. We explain the services, fees and cancellation or handover arrangements before you commit. Without a care plan, ongoing updates and changes remain your responsibility or can be quoted separately.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Your business details, logo, service information, contact information and any photos or copy you want to use. We guide you through the checklist. If you need help creating content, we can include that in the scope.",
  },
] as const;

export type CollectionQuery = Record<string, string | string[] | undefined>;

export function publishedDesigns(designs: readonly WebsiteDesign[] = websiteDesigns) {
  return designs.filter((design) => design.status === "published");
}

export function filterDesigns(designs: readonly WebsiteDesign[], query: CollectionQuery) {
  const tier = collectionTiers.find((item) => item.id === query.tier)?.id;
  const industry = typeof query.industry === "string" ? query.industry : "";
  const budgets = new Map([
    ["under-500", 500],
    ["under-1000", 1000],
    ["under-2000", 2000],
  ]);
  const budget = typeof query.budget === "string" ? budgets.get(query.budget) : undefined;
  const result = publishedDesigns(designs).filter(
    (design) =>
      (!tier || design.tier === tier) &&
      (!industry || design.industry === industry) &&
      (!budget || design.startingPriceCad < budget),
  );
  return [...result].sort((a, b) =>
    query.sort === "price-high"
      ? b.startingPriceCad - a.startingPriceCad
      : a.startingPriceCad - b.startingPriceCad,
  );
}

export function collectionInquiryHref(
  selection: { tier?: CollectionTierId; design?: string; care?: CollectionCareId } = {},
) {
  const query = new URLSearchParams({
    service: "Website Design & Development",
    collection: "website",
  });
  if (selection.tier) query.set("tier", selection.tier);
  if (selection.design) query.set("design", selection.design);
  if (selection.care) query.set("care", selection.care);
  return `/contact?${query.toString()}`;
}

/** Only catalogue values can become a prefilled inquiry; arbitrary query text is never reflected. */
export function collectionInquiry(
  query: CollectionQuery,
  designs: readonly WebsiteDesign[] = websiteDesigns,
) {
  if (query.collection !== "website") return null;
  const design = publishedDesigns(designs).find((item) => item.id === query.design);
  const tier = collectionTiers.find((item) => item.id === (design?.tier ?? query.tier));
  const care = collectionCarePlans.find((item) => item.id === query.care);
  const details = [
    "I’m interested in the L&L Website Collection.",
    ...(design ? [`Design: ${design.name}`] : []),
    ...(tier ? [`Collection: ${tier.name}`] : []),
    ...(care ? [`Optional monthly support: ${care.name}`] : []),
    "",
    "About my business and what I need:",
  ];
  return {
    service: "Website Design & Development",
    message: details.join("\n"),
    summary:
      [design?.name, tier?.name, care?.name].filter(Boolean).join(" · ") || "Website Collection",
  };
}
