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

/** Industry and collection level are independent: a painting design can belong to any level. */
export const collectionIndustries = [
  { id: "construction", name: "Construction & Contracting" },
  { id: "painting", name: "Painting" },
  { id: "plumbing", name: "Plumbing" },
  { id: "electrical", name: "Electrical" },
  { id: "landscaping", name: "Landscaping & Outdoor Services" },
  { id: "massage-wellness", name: "Massage & Wellness" },
  { id: "dental", name: "Dental Practices" },
  { id: "legal", name: "Legal Services" },
  { id: "cleaning", name: "Cleaning" },
  { id: "automotive", name: "Automotive & Detailing" },
  { id: "food-hospitality", name: "Food & Hospitality" },
  { id: "beauty", name: "Beauty & Personal Care" },
  { id: "professional-services", name: "Professional Services" },
] as const;

export type CollectionIndustryId = (typeof collectionIndustries)[number]["id"];

export type TemplateCategory = {
  id: string;
  name: string;
  description: string;
  industries: readonly CollectionIndustryId[];
  /** Decorative industry illustration; never represents a client's actual premises. */
  image: string;
};

/** Business categories lead the browsing experience; tiers remain optional refinements. */
export const templateCategories: readonly TemplateCategory[] = [
  {
    id: "construction-trades",
    name: "Construction & Trades",
    description: "Construction companies, painters, plumbers and electricians.",
    industries: ["construction", "painting", "plumbing", "electrical"],
    image: "/images/template-categories/construction-trades.webp",
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    description: "Massage therapists, dental practices and personal care businesses.",
    industries: ["massage-wellness", "dental", "beauty"],
    image: "/images/template-categories/health-wellness.webp",
  },
  {
    id: "legal-professional",
    name: "Legal & Professional",
    description: "Law firms, consultants and professional service businesses.",
    industries: ["legal", "professional-services"],
    image: "/images/template-categories/legal-professional.webp",
  },
  {
    id: "home-property",
    name: "Home & Property",
    description: "Landscaping, cleaning and property care businesses.",
    industries: ["landscaping", "cleaning"],
    image: "/images/template-categories/home-property.webp",
  },
  {
    id: "retail-hospitality",
    name: "Retail & Hospitality",
    description: "Food businesses, hospitality and automotive services.",
    industries: ["food-hospitality", "automotive"],
    image: "/images/template-categories/retail-hospitality.webp",
  },
];

export function categoryHref(category: Pick<TemplateCategory, "id">) {
  return `/website-collection/category/${category.id}`;
}

export function categoryForIndustry(industry: unknown) {
  return templateCategories.find((category) => category.industries.some((id) => id === industry));
}

export function categoryDesigns(
  category: TemplateCategory,
  designs: readonly WebsiteDesign[] = websiteDesigns,
) {
  return availableDesigns(designs).filter((design) =>
    category.industries.some(
      (industry) => design.industry === industry || design.additionalIndustries?.includes(industry),
    ),
  );
}

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
  status: "draft" | "concept" | "published";
  name: string;
  tier: CollectionTierId;
  industry: CollectionIndustryId;
  description: string;
  startingPriceCad: number | null;
  pageCount: number;
  deliveryWindow: string;
  preview?: { src: string; alt: string; width: number; height: number };
  demoUrl: string;
  included: readonly string[];
  customization?: readonly string[];
  additionalIndustries?: readonly CollectionIndustryId[];
  concept?: {
    theme: "pigment" | "structure" | "still";
    brands: readonly [string, string];
    headlines: readonly [string, string];
    subcopy: string;
    services: readonly { name: string; description: string }[];
    approach: string;
  };
  walkthrough?: CollectionVideo;
  performance?: readonly PerformanceEvidence[];
};

export type CollectionVideo = {
  src: string;
  poster: string;
  captions: string;
  transcript: string;
};

export type PerformanceEvidence = {
  url: string;
  measuredAt: string;
  device: "Mobile" | "Desktop";
  conditions: string;
  lighthouseVersion: string;
  reportUrl: string;
  scores: { performance: number; accessibility: number; bestPractices: number; seo: number };
};

// Set only when Tate supplies a real, captioned recording. No substitute persona or stock clip.
export const developerIntroduction: CollectionVideo | null = null;

// These are original interactive concepts, not client sites or priced, finished products.
// Change a concept to published only after approving the full scope, price and demo checks.
export const websiteDesigns: readonly WebsiteDesign[] = [
  {
    id: "pigment",
    status: "concept",
    name: "Painting Company",
    tier: "signature",
    industry: "painting",
    description:
      "An expressive painting website with bold colour, clear services and room for the work to speak.",
    startingPriceCad: null,
    pageCount: 4,
    deliveryWindow: "Delivery is agreed after content and scope are confirmed.",
    demoUrl: "/website-collection/pigment#preview",
    included: [
      "Home, services, project showcase and contact page structures",
      "Your logo, colour palette, supplied photography and copy",
      "An estimate enquiry journey with service-area information",
      "Responsive implementation, metadata, form validation and launch checks",
    ],
    customization: [
      "Brand colours and type treatment",
      "Painting services and service areas",
      "Real project photos and descriptions",
      "Estimate enquiry wording and contact details",
    ],
    concept: {
      theme: "pigment",
      brands: ["PAINT STUDIO", "COLOUR HOUSE"],
      headlines: ["A fresh perspective. In every coat.", "Good colour. Beautifully applied."],
      subcopy:
        "A confident home for your painting business. Show the finish, explain the care, and make the next conversation easy.",
      services: [
        {
          name: "Interior painting",
          description:
            "Explain the rooms you work in, your preparation process and how you protect the space.",
        },
        {
          name: "Exterior painting",
          description:
            "Show the surfaces you handle, your approach to preparation and the locations you serve.",
        },
        {
          name: "Commercial spaces",
          description:
            "Describe how you coordinate a commercial project around the business and its schedule.",
        },
      ],
      approach:
        "From the first conversation to the final walkthrough: introduce your team, explain the preparation and show clients what to expect.",
    },
  },
  {
    id: "structure",
    status: "concept",
    name: "Construction & Plumbing",
    tier: "premier",
    industry: "construction",
    additionalIndustries: ["plumbing"],
    description:
      "A precise, architectural direction for contractors and plumbing businesses with substantial work to show.",
    startingPriceCad: null,
    pageCount: 4,
    deliveryWindow: "Delivery is agreed after content and scope are confirmed.",
    demoUrl: "/website-collection/structure#preview",
    included: [
      "Home, services, project showcase and contact page structures",
      "Your business identity, supplied project content and service areas",
      "A clear project enquiry journey",
      "Responsive implementation, metadata, form validation and launch checks",
    ],
    customization: [
      "Construction or plumbing service content",
      "Your brand palette and business identity",
      "Project stories and supplied photography",
      "Project enquiry fields within the agreed scope",
    ],
    concept: {
      theme: "structure",
      brands: ["BUILD STUDIO", "PLUMBING STUDIO"],
      headlines: ["Considered work. Solid foundations.", "Well planned. Expertly connected."],
      subcopy:
        "Give customers a clear view of your work, your process and the people responsible for getting the details right.",
      services: [
        {
          name: "Project planning",
          description:
            "Explain the kinds of projects you take on and how you turn an initial conversation into a clear scope.",
        },
        {
          name: "Installation & improvements",
          description:
            "Describe the services your team actually provides, supported by real project examples.",
        },
        {
          name: "Ongoing projects",
          description:
            "Help residential or commercial clients understand how you coordinate schedules and communicate progress.",
        },
      ],
      approach:
        "A clear brief, an agreed scope and useful updates. Explain the practical steps that help customers feel comfortable from the start.",
    },
  },
  {
    id: "still",
    status: "concept",
    name: "Massage Practice",
    tier: "essential",
    industry: "massage-wellness",
    description:
      "A warm, unhurried website for massage and wellness practices, with a clear path from services to booking.",
    startingPriceCad: null,
    pageCount: 3,
    deliveryWindow: "Delivery is agreed after content and scope are confirmed.",
    demoUrl: "/website-collection/still#preview",
    included: [
      "Home, services and contact page structures",
      "Your supplied practice information, branding and room photography",
      "A link to your existing booking provider",
      "Responsive implementation, metadata, form validation and launch checks",
    ],
    customization: [
      "Your practice name, palette and supplied photography",
      "Approved treatment descriptions and rates",
      "Your biography and approach",
      "Booking provider link and arrival information",
    ],
    concept: {
      theme: "still",
      brands: ["MASSAGE STUDIO", "WELLNESS PRACTICE"],
      headlines: ["A little space. Just for you.", "Care begins with feeling welcome."],
      subcopy:
        "A quieter introduction to your practice. Help visitors understand your services, meet the practitioner and find their way to an appointment.",
      services: [
        {
          name: "Your treatments",
          description:
            "Introduce your approved services in plain language, with clear duration and pricing information.",
        },
        {
          name: "Your approach",
          description:
            "Explain what matters to you as a practitioner and what a new visitor can expect.",
        },
        {
          name: "Planning a visit",
          description: "Make booking, arrival details and contact information easy to find.",
        },
      ],
      approach:
        "Introduce the real person behind the practice, with your own biography, qualifications and approach. Keep the first visit easy to understand.",
    },
  },
];

export const collectionDescription =
  "Browse custom-coded website templates by business type. Choose a design, then let L&L personalize your content, handle the launch and provide optional ongoing care across Canada.";

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
      "Priced designs show an approved starting price in CAD. Concepts awaiting a price are clearly marked “Quoted after a conversation”. We confirm the launch scope, revisions, timeline, applicable taxes and any separate costs before you pay a project deposit. Collection level describes the design’s scope; it is not a universal fixed-price package.",
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

export function availableDesigns(designs: readonly WebsiteDesign[] = websiteDesigns) {
  return designs.filter((design) => design.status !== "draft");
}

export function designHref(design: Pick<WebsiteDesign, "id">) {
  return `/website-collection/${design.id}`;
}

export function designPrice(design: Pick<WebsiteDesign, "startingPriceCad">) {
  return design.startingPriceCad === null
    ? "Quoted after a conversation"
    : `From $${design.startingPriceCad.toLocaleString("en-CA")} CAD`;
}

export function filterDesigns(designs: readonly WebsiteDesign[], query: CollectionQuery) {
  const tier = collectionTiers.find((item) => item.id === query.tier)?.id;
  const industry = collectionIndustries.find((item) => item.id === query.industry)?.id;
  const budgets = new Map([
    ["under-500", 500],
    ["under-1000", 1000],
    ["under-2000", 2000],
  ]);
  const budget = typeof query.budget === "string" ? budgets.get(query.budget) : undefined;
  const result = availableDesigns(designs).filter(
    (design) =>
      (!tier || design.tier === tier) &&
      (!industry ||
        design.industry === industry ||
        design.additionalIndustries?.includes(industry)) &&
      (!budget || (design.startingPriceCad !== null && design.startingPriceCad < budget)),
  );
  return [...result].sort((a, b) => {
    if (a.startingPriceCad === null) return b.startingPriceCad === null ? 0 : 1;
    if (b.startingPriceCad === null) return -1;
    return query.sort === "price-high"
      ? b.startingPriceCad - a.startingPriceCad
      : a.startingPriceCad - b.startingPriceCad;
  });
}

export function collectionInquiryHref(
  selection: {
    tier?: CollectionTierId;
    design?: string;
    care?: CollectionCareId;
    industry?: CollectionIndustryId;
    category?: string;
  } = {},
) {
  const query = new URLSearchParams({
    service: "Website Design & Development",
    collection: "website",
  });
  if (selection.tier) query.set("tier", selection.tier);
  if (selection.design) query.set("design", selection.design);
  if (selection.care) query.set("care", selection.care);
  if (selection.industry) query.set("industry", selection.industry);
  if (templateCategories.some((item) => item.id === selection.category))
    query.set("category", selection.category!);
  return `/contact?${query.toString()}`;
}

/** Only catalogue values can become a prefilled inquiry; arbitrary query text is never reflected. */
export function collectionInquiry(
  query: CollectionQuery,
  designs: readonly WebsiteDesign[] = websiteDesigns,
) {
  if (query.collection !== "website") return null;
  const design = availableDesigns(designs).find((item) => item.id === query.design);
  const tier = collectionTiers.find((item) => item.id === (design?.tier ?? query.tier));
  const industry = collectionIndustries.find(
    (item) => item.id === (design?.industry ?? query.industry),
  );
  const care = collectionCarePlans.find((item) => item.id === query.care);
  const category = templateCategories.find((item) => item.id === query.category);
  const details = [
    "I’m interested in the L&L Website Templates.",
    ...(design ? [`Design: ${design.name}`] : []),
    ...(industry
      ? [`Business type: ${industry.name}`]
      : category
        ? [`Business category: ${category.name}`]
        : []),
    ...(tier ? [`Collection: ${tier.name}`] : []),
    ...(care ? [`Optional monthly support: ${care.name}`] : []),
    "",
    "About my business and what I need:",
  ];
  return {
    service: "Website Design & Development",
    message: details.join("\n"),
    summary:
      [design?.name, industry?.name ?? category?.name, tier?.name, care?.name]
        .filter(Boolean)
        .join(" · ") || "Website Templates",
  };
}

export const collectionExtras = [
  {
    id: "copy",
    name: "Help with website wording",
    description: "Turn your business information into clear website copy.",
  },
  {
    id: "photos",
    name: "Photography or video",
    description: "Discuss the real images and footage your website needs.",
  },
  {
    id: "pages",
    name: "Additional pages",
    description: "Make room for more services, locations or project stories.",
  },
  {
    id: "booking",
    name: "Booking or payments",
    description: "Connect an appropriate provider, with fees explained in your proposal.",
  },
] as const;
export type CollectionExtraId = (typeof collectionExtras)[number]["id"];

export function selectedExtras(ids: readonly string[]) {
  return collectionExtras.filter((extra) => ids.includes(extra.id));
}

export function compareSelection(value: string | string[] | undefined) {
  const ids = [...new Set((Array.isArray(value) ? value : value ? [value] : []).slice(0, 20))];
  const designs = availableDesigns().filter((design) => ids.includes(design.id));
  return { designs: designs.slice(0, 3), tooMany: designs.length > 3 };
}

export function journeyInquiry(design: WebsiteDesign, extras: readonly string[], careId: string) {
  const care = collectionCarePlans.find((item) => item.id === careId);
  const base = collectionInquiry({ collection: "website", design: design.id, care: care?.id })!;
  const extraNames = selectedExtras(extras).map((item) => item.name);
  const price = designPrice(design);
  return {
    ...base,
    message: [
      base.message.replace("\n\nAbout my business and what I need:", ""),
      `Launch pricing: ${price}. Final scope and costs to be confirmed.`,
      `Additional help: ${extraNames.length ? extraNames.join("; ") : "None selected yet"}`,
      `Monthly support preference: ${care?.name ?? (careId === "none" ? "No monthly plan selected" : "Please help me decide")}`,
      "",
      "About my business and what I need:",
    ].join("\n"),
  };
}
