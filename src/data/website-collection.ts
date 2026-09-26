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
  { id: "excavation", name: "Excavation & Landscaping" },
  { id: "painting", name: "Painting" },
  { id: "plumbing", name: "Plumbing" },
  { id: "electrical", name: "Electrical" },
  { id: "lawn-care", name: "Lawn Care" },
  { id: "landscaping", name: "Landscaping & Outdoor Services" },
  { id: "massage-wellness", name: "Massage & Wellness" },
  { id: "medical-spa", name: "Medical Spas & Aesthetics" },
  { id: "hair-salon", name: "Hair Salons & Hairdressers" },
  { id: "dental", name: "Dental Practices" },
  { id: "legal", name: "Legal Services" },
  { id: "cleaning", name: "Cleaning" },
  { id: "automotive", name: "Automotive & Detailing" },
  { id: "retail", name: "Retail & Shops" },
  { id: "transport-logistics", name: "Transport & Logistics" },
  { id: "trailer-rentals", name: "Trailer & Equipment Rentals" },
  { id: "food-hospitality", name: "Food & Restaurants" },
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
    description:
      "Construction, excavation, lawn care, painting, plumbing and electrical businesses.",
    industries: ["construction", "excavation", "painting", "plumbing", "electrical", "lawn-care"],
    image: "/images/template-categories/construction-trades.webp",
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    description: "Massage, medical spas, nail salons, hairdressers and personal care businesses.",
    industries: ["massage-wellness", "medical-spa", "hair-salon", "dental", "beauty"],
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
    id: "transport-logistics",
    name: "Transport & Logistics",
    description: "Hot shot operators, delivery companies, freight services and trailer rentals.",
    industries: ["transport-logistics", "trailer-rentals"],
    image: "/images/template-categories/transport-logistics.webp",
  },
  {
    id: "food-restaurants",
    name: "Food & Restaurants",
    description: "Restaurants, cafés, caterers, bakeries and food businesses.",
    industries: ["food-hospitality"],
    image: "/images/template-categories/food-restaurants.webp",
  },
  {
    id: "retail-automotive",
    name: "Retail & Automotive",
    description: "Independent shops, showrooms, automotive services and detailing businesses.",
    industries: ["retail", "automotive"],
    image: "/images/template-categories/retail-automotive.webp",
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
      "Agreed content changes, dependency and security updates, routine checks including agreed form-delivery checks when a form is configured, and a backup and recovery plan suited to your site.",
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

export type CollectionContactMode = "direct" | "enquiry-form";

export type WebsiteDesign = {
  id: string;
  status: "draft" | "concept" | "published" | "client-example";
  name: string;
  tier: CollectionTierId;
  industry: CollectionIndustryId;
  description: string;
  startingPriceCad: number | null;
  pageCount: number | null;
  /** Contact scope for a new build; never a claim about an original client website. */
  contactMode: CollectionContactMode;
  /** A real portfolio reference; its client-specific assets are not offered for reuse. */
  clientProjectId?: string;
  /** Use the matching website image instead of the canonical client walkthrough. */
  clientPreview?: "image";
  /** Explain original client production separately from a prospective website's price. */
  clientScopeNote?: string;
  /** An independent redesign reference, not a client project or an offer to reuse its identity. */
  independentConcept?: { businessName: string; note: string };
  deliveryWindow: string;
  preview?: { src: string; alt: string; width: number; height: number };
  /** Actual full-page capture of an external demo, kept separate from illustrative concepts. */
  pagePreview?: { src: string; alt: string; width: number; height: number };
  demoUrl: string;
  included: readonly string[];
  customization?: readonly string[];
  additionalIndustries?: readonly CollectionIndustryId[];
  concept?: {
    theme:
      | "pigment"
      | "structure"
      | "still"
      | "earthworks"
      | "lawncare"
      | "horizon"
      | "wellness"
      | "beauty"
      | "massage-one-page"
      | "medical-spa"
      | "artsy-nails"
      | "hair-salon"
      | "hair-one-page";
    brands: readonly [string, string];
    headlines: readonly [string, string];
    subcopy: string;
    kicker: string;
    action: string;
    photo: { src: string; alt: string; width: number; height: number };
    services: readonly { name: string; description: string }[];
    approach: string;
  };
  walkthrough?: CollectionVideo;
  performance?: readonly PerformanceEvidence[];
};

export const contactScopeSummary =
  "New website offers from $150–$499 CAD include direct contact. Offers from $699 CAD include a standard protected enquiry form.";

export const contactScopeDetails = {
  direct: {
    label: "Direct contact included",
    priceLabel: "$150–$499 CAD",
    description:
      "A contact page or section with click-to-call and click-to-email links, plus your chosen external booking link where relevant.",
  },
  "enquiry-form": {
    label: "Protected enquiry form included",
    priceLabel: "$699+ CAD",
    description:
      "A standard protected enquiry form to one business inbox, including Resend and sending-domain configuration, field validation, spam controls and an initial delivery test.",
  },
} as const;

export const contactScopeNotes = {
  upgrades:
    "An enquiry form can be added to any direct-contact offer, quoted by scope. Custom workflows, integrations and advanced forms are also quoted separately at any level.",
  care: "Ongoing form and website care is optional and separately scoped. Domain and provider fees are separate.",
  standards:
    "Every offer has the same core SEO and security standards. Form validation and spam controls apply when a form is included.",
  clientExamples:
    "These contact scopes describe a new build for your business; they do not describe or change an original client website.",
} as const;

export function designContactLabel(design: Pick<WebsiteDesign, "contactMode">) {
  return contactScopeDetails[design.contactMode].label;
}

export function designContactDescription(design: Pick<WebsiteDesign, "contactMode">) {
  return contactScopeDetails[design.contactMode].description;
}

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

// Starting prices cover a new personalization and launch within the agreed scope.
// Client examples demonstrate an approach; their identities and client-specific assets are not for resale.
export const websiteDesigns: readonly WebsiteDesign[] = [
  {
    id: "horizon",
    status: "concept",
    name: "Landscape Contracting",
    tier: "signature",
    industry: "construction",
    additionalIndustries: ["landscaping"],
    description:
      "A four-page landscape contracting website with a deep green and orange palette, visual services, an interactive project gallery, coverage information and a dedicated contact page.",
    startingPriceCad: 499,
    pageCount: 4,
    contactMode: "direct",
    independentConcept: {
      businessName: "Horizon Contracting Group",
      note: "Developed from L&L’s independent redesign direction for Horizon Contracting Group. The Landscape Studio demo uses a sample business and illustrative imagery. Your version uses your own approved branding and content; the business identity shown is not offered for resale.",
    },
    deliveryWindow: "Delivery is agreed after content and scope are confirmed.",
    demoUrl: "/website-collection/horizon#preview",
    included: [
      "Four page structures: home, services, projects and contact",
      "Your business identity, supplied photographs, service areas and approved copy",
      "Visual service details, a filterable project gallery and coverage information",
      contactScopeDetails.direct.description,
      "Responsive implementation, core SEO and security standards, metadata and launch checks",
    ],
    customization: [
      "Your business name, logo, brand colours and approved photography",
      "Your landscaping and contracting services, coverage areas and project information",
      "Call and email details, plus your chosen external booking link",
      "Additional pages, enquiry forms and custom features quoted separately",
    ],
    concept: {
      theme: "horizon",
      brands: ["LANDSCAPE STUDIO", "YOUR LANDSCAPE CO"],
      headlines: [
        "Outdoor work. Built to perform.",
        "Thoughtful landscapes. Practical foundations.",
      ],
      subcopy:
        "From landscape construction to ongoing property care, explore outdoor work shaped around the way a space is used.",
      kicker: "Landscape & outdoor services",
      action: "Discuss your project",
      photo: {
        src: "/images/collection/earthworks-landscape.webp",
        alt: "Illustrative landscaped garden and hardscaping, used as a sample project direction",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "Landscape construction",
          description: "Considered planting, hard surfaces and outdoor spaces.",
        },
        { name: "Property care", description: "Seasonal maintenance shaped around your property." },
        {
          name: "Site preparation",
          description: "Practical groundwork before the finishing details.",
        },
      ],
      approach:
        "Explore the services and design direction, then discuss the scope, property requirements and contact pathway for your own business.",
    },
  },
  {
    id: "earthworks",
    status: "concept",
    name: "Excavation & Landscaping",
    tier: "flagship",
    industry: "excavation",
    additionalIndustries: ["landscaping", "construction"],
    description:
      "An immersive seven-page excavation and landscaping website with cinematic site imagery, interactive service, project and material views, helpful answers and a practical project planner.",
    startingPriceCad: 1000,
    pageCount: 7,
    contactMode: "enquiry-form",
    deliveryWindow: "Delivery is agreed after content, page requirements and scope are confirmed.",
    demoUrl: "/website-collection/earthworks#preview",
    included: [
      "Seven page structures: home, services, projects, materials, process, FAQ and contact",
      "Your business identity, supplied photographs, project stories and service areas",
      "Interactive service and material exploration, project presentation and a project-planning journey",
      "A clear process page and client-approved FAQ content",
      contactScopeDetails["enquiry-form"].description,
      "Responsive layouts, motion controls, metadata and launch checks",
    ],
    customization: [
      "Your brand palette, logo, business name and approved copy",
      "Excavation, drainage, hardscape and landscaping service content",
      "Project photography, categories and accurate descriptions",
      "Your material choices and answers to common customer questions",
      "Your standard enquiry fields and service-area information within the agreed scope",
    ],
    concept: {
      theme: "earthworks",
      brands: ["RIDGELINE", "YOUR EARTHWORKS CO"],
      headlines: ["Good ground. Great possibilities.", "From the ground up. Built around you."],
      subcopy:
        "From the first cut of earth to the last stone in place. Shape a property that works beautifully, with the groundwork and finishing details considered together.",
      kicker: "Excavation & landscape construction",
      action: "Plan your project",
      photo: {
        src: "/images/collection/earthworks-site.webp",
        alt: "Illustrative excavation and landscaping site with a tracked excavator and foothill landscape",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "Excavation & site preparation",
          description:
            "Make a considered start: discuss access, existing conditions, excavation requirements and the groundwork your project needs.",
        },
        {
          name: "Grading & drainage",
          description:
            "Plan how the land and water work together, with levels, surface drainage and the finished use of the property in mind.",
        },
        {
          name: "Retaining walls & hardscaping",
          description:
            "Bring structure to the space with retaining walls, steps, pathways and patios that connect the different parts of your property.",
        },
        {
          name: "Landscape construction",
          description:
            "Build an outdoor space around everyday life, combining planted areas, practical surfaces and the details that make it feel complete.",
        },
      ],
      approach:
        "Understand the land before shaping it. We start with the space, the way you want to use it and the practical requirements, then plan the work from groundwork through to the finished landscape.",
    },
  },
  {
    id: "lawncare",
    status: "concept",
    name: "Lawn Care",
    tier: "signature",
    industry: "lawn-care",
    additionalIndustries: ["landscaping"],
    description:
      "A fresh four-page lawn care website with illustrative garden imagery, clear services, a work showcase and an easy path to a call, email or booking.",
    startingPriceCad: 499,
    pageCount: 4,
    contactMode: "direct",
    deliveryWindow: "Delivery is agreed after content and scope are confirmed.",
    demoUrl: "/website-collection/lawncare#preview",
    included: [
      "Home, services, our work and contact page structures",
      "Your business identity, supplied photography, service areas and approved copy",
      contactScopeDetails.direct.description,
      "Responsive implementation, metadata and launch checks",
    ],
    customization: [
      "Your lawn care services, service areas and seasonal availability",
      "Your business name, logo, brand colours and photography",
      "Your approach and approved service information",
      "Call and email details, plus your chosen external booking link",
    ],
    concept: {
      theme: "lawncare",
      brands: ["LAWN STUDIO", "YOUR LAWN CARE CO"],
      headlines: ["A well-kept lawn. A little more weekend.", "Fresh lawns. More time outdoors."],
      subcopy:
        "From a regular mow to a seasonal tidy-up, explore straightforward lawn care shaped around your outdoor space.",
      kicker: "Lawn care & outdoor maintenance",
      action: "Talk about your lawn",
      photo: {
        src: "/images/collection/lawn-hero.webp",
        alt: "Illustrative green lawn and garden for the Lawn Studio design; not a real project or before-and-after result",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "Regular mowing",
          description:
            "A regular cut and tidy edges, with the schedule and lawn requirements agreed around your property.",
        },
        {
          name: "Edging & trimming",
          description:
            "Define lawn borders and tidy hard-to-reach areas, with the trimming and finishing work agreed around your property.",
        },
        {
          name: "Seasonal cleanup",
          description:
            "Make space for the season ahead with leaf collection, outdoor tidying and agreed garden cleanup tasks.",
        },
      ],
      approach:
        "Start with a conversation about your lawn, the work you need and the way you use the space. Agree on the services and schedule before the first visit.",
    },
  },
  {
    id: "pigment",
    status: "concept",
    name: "Painting Company",
    tier: "signature",
    industry: "painting",
    description:
      "An editorial painting website with immersive room photography, brush-drawn navigation and a clear path from inspiration to an estimate.",
    startingPriceCad: 499,
    pageCount: 4,
    contactMode: "direct",
    deliveryWindow: "Delivery is agreed after content and scope are confirmed.",
    demoUrl: "/website-collection/pigment#preview",
    included: [
      "Home, services, project showcase and contact page structures",
      "Your logo, colour palette, supplied photography and copy",
      "Clear service-area information and direct contact for estimate requests",
      contactScopeDetails.direct.description,
      "Responsive implementation, metadata and launch checks",
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
        "Thoughtful colour, careful preparation and a finish that brings the room together. Let’s make your next space feel like yours.",
      kicker: "Interior & exterior painting",
      action: "Request an estimate",
      photo: {
        src: "/images/collection/painting-interior.webp",
        alt: "Illustrative living room with freshly painted cream and sage walls",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "Interior painting",
          description:
            "Walls, ceilings and trim, with surfaces prepared and furnishings protected before the first coat.",
        },
        {
          name: "Exterior painting",
          description:
            "A fresh look for siding, doors and exterior details, starting with the right preparation for each surface.",
        },
        {
          name: "Commercial spaces",
          description:
            "Welcoming shops and professional workspaces, with the schedule planned around the way your business runs.",
        },
      ],
      approach:
        "The finish starts long before the paint. We talk through your colours, prepare the surfaces, protect the room and walk through the details with you when the work is complete.",
    },
  },
  {
    id: "structure",
    status: "concept",
    name: "Plumbing Company",
    tier: "premier",
    industry: "plumbing",
    description:
      "An immersive plumbing website with copper pipe navigation, rich architectural imagery and a clear journey from services to a project enquiry.",
    startingPriceCad: 699,
    pageCount: 4,
    contactMode: "enquiry-form",
    deliveryWindow: "Delivery is agreed after content and scope are confirmed.",
    demoUrl: "/website-collection/structure#preview",
    included: [
      "Home, services, project showcase and contact page structures",
      "Your business identity, supplied project content and service areas",
      "Pipe-inspired navigation, interactive service selection and a clear enquiry journey",
      contactScopeDetails["enquiry-form"].description,
      "Responsive implementation, metadata and launch checks",
    ],
    customization: [
      "Your plumbing services and service-area content",
      "Your brand palette and business identity",
      "Project stories and supplied photography",
      "Project enquiry fields within the agreed scope",
    ],
    concept: {
      theme: "structure",
      brands: ["COPPERLINE", "YOUR PLUMBING CO"],
      headlines: ["Good plumbing. Beautifully considered.", "A better flow. A better home."],
      subcopy:
        "From a practical repair to a beautifully finished space. Thoughtful plumbing, clear conversations and details that make everyday life work better.",
      kicker: "Residential & commercial plumbing",
      action: "Plan your plumbing project",
      photo: {
        src: "/images/collection/plumbing-interior.webp",
        alt: "Illustrative bathroom with warm ivory stone, walnut cabinetry and brushed brass plumbing fixtures",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "Repairs & diagnostics",
          description:
            "Understand leaks, drainage concerns and everyday plumbing problems, then discuss the repair options and next steps.",
        },
        {
          name: "Fixture installations",
          description:
            "Thoughtfully selected taps, sinks and fixtures, installed around the way you use your space.",
        },
        {
          name: "Bathroom & kitchen plumbing",
          description:
            "Plumbing planned alongside your renovation, with the layout, connections and finishing details considered together.",
        },
      ],
      approach:
        "A good result starts with the connections you cannot see. Talk through the space, choose the right fixtures and plan the work with the practical details in mind.",
    },
  },
  {
    id: "still",
    status: "published",
    name: "Nail & Esthetics Studio",
    tier: "signature",
    industry: "beauty",
    description:
      "A polished three-page website for nail salons and esthetics studios, with an editorial welcome, a clear treatment menu and a dedicated booking and contact page.",
    startingPriceCad: 399,
    pageCount: 3,
    contactMode: "direct",
    deliveryWindow: "Delivery is agreed after content and scope are confirmed.",
    demoUrl: "/website-collection/still#preview",
    included: [
      "Three complete pages: home, services and contact",
      "Your supplied studio branding, approved wording and images added to this design",
      "A treatment menu with your service descriptions, appointment lengths and rates",
      contactScopeDetails.direct.description,
      "Your chosen external booking link, opening hours and arrival information",
      "Responsive implementation, core SEO, metadata, security headers and launch checks",
    ],
    customization: [
      "Your salon name, logo, colours and supplied photography",
      "Your nail and esthetics menu, pricing, policies and studio information",
      "Extra pages, enquiry forms and booking integrations quoted separately",
      "Original photography, filming, copywriting and ongoing care quoted separately",
    ],
    concept: {
      theme: "beauty",
      brands: ["FORMA", "YOUR BEAUTY STUDIO"],
      headlines: ["Considered care. Beautifully you.", "A little time, beautifully spent."],
      subcopy:
        "Nails, skin and the little details. Explore considered treatments, make time for yourself and find a visit that fits your day.",
      kicker: "Nails & esthetics",
      action: "Explore our services",
      photo: {
        src: "/images/collection/beauty-studio.webp",
        alt: "Illustrative boutique nail studio with ivory surfaces and muted plum manicure chairs",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "Nails & finishing",
          description:
            "From a clean natural finish to your next favourite shade, choose a manicure that suits your style.",
        },
        {
          name: "Skin & self-care",
          description:
            "Make time for a considered facial and a calm studio experience, with preferences discussed before treatment.",
        },
        {
          name: "Brows & details",
          description:
            "Shape and finishing options, with a consultation to agree the look before your appointment begins.",
        },
      ],
      approach:
        "A comfortable studio, a conversation about your preferences and thoughtful attention to the details. Your appointment starts with you.",
    },
  },
  {
    id: "massage-one-page",
    status: "published",
    name: "One-page Massage Website",
    tier: "essential",
    industry: "massage-wellness",
    description:
      "A calm, polished single-page website for an independent massage business. Introduce your practice, show up to three treatments and make booking or contacting you straightforward.",
    startingPriceCad: 150,
    pageCount: 1,
    contactMode: "direct",
    deliveryWindow: "One-page scope and delivery are agreed after your content is ready.",
    demoUrl: "/website-collection/massage-one-page#preview",
    included: [
      "One scrolling page: welcome, up to three treatments, a short about section and contact",
      "Your supplied logo, brand colours, approved wording and images placed into this design",
      "Treatment names, appointment lengths and rates supplied by your business",
      contactScopeDetails.direct.description,
      "Responsive layout, core SEO, metadata, security headers and agreed launch checks",
      "Personalization and launch within the agreed one-page scope; domain, hosting and provider fees are separate",
    ],
    customization: [
      "Your business name, supplied content, colours and contact details",
      "Your external booking URL, opening hours and location or service area",
      "Extra pages, layout changes, forms and custom integrations quoted separately",
      "New photography, videography, copywriting and ongoing care quoted separately",
    ],
    concept: {
      theme: "massage-one-page",
      brands: ["SOMA", "YOUR MASSAGE PRACTICE"],
      headlines: ["Room to exhale.", "A moment that belongs to you."],
      subcopy:
        "A quiet space, a conversation about your comfort and time set aside for you. Explore the treatments and plan your next visit.",
      kicker: "Massage & everyday wellbeing",
      action: "Plan your visit",
      photo: {
        src: "/images/collection/massage-room.webp",
        alt: "Illustrative massage studio with sage walls, soft daylight and ivory linens",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "Relaxation",
          description: "Unhurried time with pressure adjusted to your comfort.",
        },
        {
          name: "Focused care",
          description: "Discuss the areas you would like attention to before your visit.",
        },
        {
          name: "A longer pause",
          description: "More time to settle in and shape the appointment around you.",
        },
      ],
      approach:
        "Your comfort comes first. Ask questions and share your preferences before and throughout your visit.",
    },
  },
  {
    id: "medical-spa",
    status: "published",
    name: "Luxury Medical Spa",
    tier: "flagship",
    industry: "medical-spa",
    description:
      "A six-page medical spa website in dark marble and champagne gold, with an interactive treatment explorer, consultation guidance and a complete enquiry page.",
    startingPriceCad: 999,
    pageCount: 6,
    contactMode: "enquiry-form",
    deliveryWindow: "Delivery is agreed after clinic-approved content and scope are confirmed.",
    demoUrl: "/website-collection/medical-spa#preview",
    included: [
      "Six complete pages: home, treatments, consultation, the clinic, FAQs and contact",
      "Your supplied identity, photography and clinic-approved wording personalised within this design",
      "Treatment-category exploration, consultation information and accessible FAQ interactions",
      contactScopeDetails["enquiry-form"].description,
      "Clinic hours, location, direct contact details and your chosen external booking link",
      "Responsive implementation, core SEO, metadata, security headers and agreed launch checks",
    ],
    customization: [
      "Your clinic name, brand colours, supplied photography and clinician-approved treatment information",
      "Additional treatment pages, booking systems, payments and custom integrations quoted separately",
      "Photography, videography, clinical copy review and ongoing care have their own agreed scope",
      "The included enquiry form is for general enquiries, not patient records or medical intake; provider and domain fees are separate",
    ],
    concept: {
      theme: "medical-spa",
      brands: ["AUREL AESTHETICS", "YOUR AESTHETICS CLINIC"],
      headlines: ["Considered care. Distinctly you.", "An individual approach to aesthetics."],
      subcopy:
        "Space to ask. Time to consider. A thoughtful introduction to your clinic and its approach.",
      kicker: "Medical spa & aesthetics",
      action: "Explore treatments",
      photo: {
        src: "/images/collection/medical-spa-interior.webp",
        alt: "Illustrative aesthetics clinic with dark marble and champagne-gold architectural details",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "Skin & facials",
          description: "Introduce your approved skin services and invite a consultation.",
        },
        {
          name: "Injectable consultations",
          description: "Give visitors a clear starting point for their questions.",
        },
        {
          name: "Laser & light",
          description: "Explain your clinic's consultation process and available services.",
        },
      ],
      approach:
        "A refined clinic introduction with room for questions and clear next steps. Treatment suitability belongs in a consultation with an appropriately qualified clinician.",
    },
  },
  {
    id: "artsy-nails",
    status: "published",
    name: "Creative Nail Studio",
    tier: "premier",
    industry: "beauty",
    description:
      "A colourful four-page nail salon website with bold editorial layouts, an interactive polish palette, a clear service menu and a dedicated enquiry page.",
    startingPriceCad: 699,
    pageCount: 4,
    contactMode: "enquiry-form",
    deliveryWindow: "Delivery is agreed after your service menu, imagery and wording are ready.",
    demoUrl: "/website-collection/artsy-nails#preview",
    included: [
      "Four complete pages: home, nail menu, the studio and contact",
      "Your supplied branding, nail photography, service descriptions and approved wording",
      "An interactive polish palette and expressive layouts adapted to your studio's personality",
      contactScopeDetails["enquiry-form"].description,
      "Your appointment information, policies and external booking link where relevant",
      "Responsive implementation, reduced-motion support, core SEO, metadata, security headers and launch checks",
    ],
    customization: [
      "Your salon name, colours, supplied nail-art images and service menu",
      "Extra pages, live booking, payments and advanced galleries quoted separately",
      "Original photography, video, copywriting and ongoing care quoted separately",
      "Domain, hosting and provider fees are separate from the agreed website build",
    ],
    concept: {
      theme: "artsy-nails",
      brands: ["CHROMA NAIL CLUB", "YOUR NAIL STUDIO"],
      headlines: ["Small canvas. BIG ENERGY.", "Your colour. Your kind of statement."],
      subcopy:
        "Colour outside the lines. A nail studio for bold ideas, tiny details and whatever feels like you.",
      kicker: "Creative nails & colour",
      action: "Find your nail mood",
      photo: {
        src: "/images/collection/nail-art-hands.webp",
        alt: "Illustrative nail-art photograph with cobalt, tangerine and cream details",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "The clean set",
          description: "Introduce a considered shape and a finish that suits the customer.",
        },
        {
          name: "The art set",
          description: "Make space for colour, graphic lines and individual ideas.",
        },
        {
          name: "The reset",
          description: "Explain removal, reshaping and refresh appointments clearly.",
        },
      ],
      approach:
        "A small canvas with room for a big personality. Browse a palette, explore the services and start a conversation about the next set.",
    },
  },
  {
    id: "hair-salon",
    status: "published",
    name: "Professional Hair Salon",
    tier: "signature",
    industry: "hair-salon",
    description:
      "A polished four-page hair salon website in blue, white and grey, with a filterable service menu, a salon introduction and a clear booking and contact page.",
    startingPriceCad: 499,
    pageCount: 4,
    contactMode: "direct",
    deliveryWindow:
      "Delivery is agreed after your supplied content and service menu are confirmed.",
    demoUrl: "/website-collection/hair-salon#preview",
    included: [
      "Four complete pages: home, services, our salon and contact",
      "Your supplied logo, approved wording, salon photography and brand colours",
      "A filterable service menu using your supplied appointment lengths and prices",
      contactScopeDetails.direct.description,
      "Your salon hours, arrival information and chosen external booking link",
      "Responsive layout, core SEO, metadata, security headers and agreed launch checks",
    ],
    customization: [
      "Your salon name, blue or alternative brand palette, staff introduction and supplied images",
      "Your cut, colour and styling menu with approved rates and appointment information",
      "Enquiry forms, extra pages, booking integrations and custom features quoted separately",
      "Original photography, video, copywriting and ongoing care quoted separately; domain and provider fees are separate",
    ],
    concept: {
      theme: "hair-salon",
      brands: ["LINE & FORM HAIR", "YOUR HAIR SALON"],
      headlines: ["Good hair. Clear intention.", "A fresh perspective on everyday hair."],
      subcopy: "Thoughtful cuts, considered colour and a finish that feels like you.",
      kicker: "Cut. Colour. Confidence.",
      action: "Explore the services",
      photo: {
        src: "/images/collection/hair-salon-interior.webp",
        alt: "Illustrative professional hair salon with blue cabinetry, white walls and grey styling chairs",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "Cut & style",
          description: "A clean shape, a considered change or a fresh signature cut.",
        },
        {
          name: "Colour",
          description: "Clear options for tone and dimension, discussed before the appointment.",
        },
        {
          name: "Care & finish",
          description: "Introduce the finishing services that complete the experience.",
        },
      ],
      approach:
        "A straightforward service menu, a personal salon introduction and an easy way to plan a visit.",
    },
  },
  {
    id: "hair-one-page",
    status: "published",
    name: "One-page Hairdresser Website",
    tier: "essential",
    industry: "hair-salon",
    description:
      "A clean, premium one-page website for an independent hairdresser, with space for up to three services, a short introduction and direct booking or contact links.",
    startingPriceCad: 150,
    pageCount: 1,
    contactMode: "direct",
    deliveryWindow: "The one-page scope and delivery are agreed after your content is ready.",
    demoUrl: "/website-collection/hair-one-page#preview",
    included: [
      "One scrolling page: welcome, up to three services, a short about section and contact",
      "Your supplied logo, colours, approved wording and photography placed into this design",
      "Your supplied service descriptions and appointment information",
      contactScopeDetails.direct.description,
      "Responsive layout, core SEO, metadata, security headers and agreed launch checks",
      "Personalization and launch within the agreed one-page scope; domain, hosting and provider fees are separate",
    ],
    customization: [
      "Your business name, supplied images, wording, colours and contact information",
      "Your external booking link, opening hours and location or service area",
      "Extra pages, forms, layout changes and custom integrations quoted separately",
      "Photography, videography, copywriting and ongoing care quoted separately",
    ],
    concept: {
      theme: "hair-one-page",
      brands: ["JUNE HAIR", "YOUR HAIRDRESSING STUDIO"],
      headlines: ["Good hair. Good company.", "A fresh look. Still very much you."],
      subcopy:
        "A fresh shape, a little colour, a moment for yourself. Thoughtful hairdressing with a relaxed, personal touch.",
      kicker: "Your neighbourhood hair studio",
      action: "Plan your visit",
      photo: {
        src: "/images/collection/hair-salon-detail.webp",
        alt: "Illustrative hairdressing station with a chair, tools and warm natural light",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "Cut & finish",
          description: "A shape considered around your hair and everyday routine.",
        },
        {
          name: "Colour refresh",
          description: "A conversation about colour, tone and maintenance.",
        },
        {
          name: "Blow-dry & style",
          description: "A polished finish for a special plan or an ordinary day.",
        },
      ],
      approach:
        "An inviting single page that makes an independent hairdresser easy to understand and contact.",
    },
  },
  {
    id: "calgary-hot-shot",
    status: "concept",
    name: "Calgary Hot Shot",
    tier: "signature",
    industry: "transport-logistics",
    additionalIndustries: ["trailer-rentals"],
    description:
      "A corporate transport demo with a bold first impression, distinct rental and delivery pathways, and a clear route to a quote.",
    startingPriceCad: 399,
    pageCount: 1,
    contactMode: "direct",
    deliveryWindow:
      "Your service scope, integrations and launch schedule are agreed before booking.",
    preview: {
      src: "/images/collection/calgary-hot-shot-hero.webp",
      alt: "Calgary Hot Shot demo homepage with the headline Local logistics. Handled properly.",
      width: 1348,
      height: 926,
    },
    pagePreview: {
      src: "/images/collection/calgary-hot-shot-full.webp",
      alt: "Full Calgary Hot Shot concept page showing service pathways, the booking process, applications and quote layout",
      width: 1363,
      height: 6753,
    },
    demoUrl: "https://calgary-hot-shot-corporate-live.vercel.app/",
    included: [
      "One-page website structure with service, process and contact sections",
      "Distinct pathways for rentals, delivered rentals and transport, adapted to your actual services",
      "Your approved branding, fleet photography, service areas and contact information",
      contactScopeDetails.direct.description,
      "Responsive implementation, metadata and launch checks",
    ],
    customization: [
      "Transport services and equipment you actually offer",
      "Real operating areas, fleet details and service requirements",
      "Brand colours, photography and business identity",
      "Direct contact and external booking details within the agreed scope",
    ],
  },
  {
    id: "tow-n-go",
    status: "client-example",
    clientProjectId: "tow-n-go",
    name: "Tow-N-Go Trailers",
    tier: "premier",
    industry: "trailer-rentals",
    additionalIndustries: ["transport-logistics"],
    description:
      "A real black-and-gold client website with clear fleet categories, rental enquiries and delivery information, supported by an ongoing website and social content partnership.",
    startingPriceCad: 899,
    pageCount: null,
    contactMode: "enquiry-form",
    deliveryWindow: "We agree on your pages, features, content and launch schedule before booking.",
    preview: {
      src: "/images/projects/tow-n-go.webp",
      alt: "Tow-N-Go Trailers client website showing its black-and-gold homepage and enclosed trailer",
      width: 1348,
      height: 926,
    },
    demoUrl: "https://www.towandgotrailers.ca/",
    included: [
      "A similar visual direction shaped around your own brand and business",
      "Fleet or equipment categories using your approved photos, specifications and information",
      "Clear pathways for the rental, delivery or transport services you actually offer",
      contactScopeDetails["enquiry-form"].description,
      "Responsive implementation, metadata and launch checks",
    ],
    customization: [
      "Your business name, logo, colours and photography",
      "Your actual equipment, service areas and operating requirements",
      "Your pages and standard enquiry fields, with integrations quoted separately",
      "Optional monthly website care, social management and content, scoped separately",
    ],
  },
  {
    id: "crestline",
    status: "client-example",
    clientProjectId: "crestline",
    name: "Crestline Painting",
    tier: "premier",
    industry: "painting",
    additionalIndustries: ["construction"],
    description:
      "A real painting-company website with architectural imagery, dedicated services and project galleries for commercial, strata, multi-family and custom-home work.",
    startingPriceCad: 399,
    pageCount: null,
    contactMode: "direct",
    deliveryWindow: "We agree on your pages, features, content and launch schedule before booking.",
    preview: {
      src: "/images/projects/crestline.webp",
      alt: "Crestline Painting website with blue accents, architectural photography and commercial and residential painting services",
      width: 1800,
      height: 929,
    },
    demoUrl: "https://www.crestlinepainting.ca/",
    included: [
      "A similar visual direction shaped around your own painting or contracting business",
      "Dedicated service pages organized around the work and customers you serve",
      "Project categories and galleries using your approved photos and project descriptions",
      "Clear service-area information and direct contact for quote requests",
      contactScopeDetails.direct.description,
      "Responsive implementation, metadata and launch checks",
    ],
    customization: [
      "Your business name, logo, colours and photography",
      "Your residential, commercial or specialist services and service areas",
      "Project categories, descriptions and genuine client feedback supplied by you",
      "Optional photography, copywriting and ongoing website care, scoped separately",
    ],
  },
  {
    id: "mckenzie-house",
    status: "client-example",
    clientProjectId: "mckenzie-house",
    clientPreview: "image",
    name: "McKenzie House Massage",
    tier: "premier",
    industry: "massage-wellness",
    description:
      "A real massage practice website with a warm green-and-cream design, original treatment photography and video, clear service information and a straightforward path to ClinicSense booking.",
    startingPriceCad: null,
    pageCount: null,
    contactMode: "direct",
    clientScopeNote:
      "Your website is quoted for its own pages, supplied content and features. New photography, video production and ongoing care are priced separately.",
    deliveryWindow:
      "Your website scope and price are agreed before booking. Content production is quoted separately.",
    preview: {
      src: "/images/projects/mckenzie-house.webp",
      alt: "McKenzie House Massage website with deep green and warm gold details, treatment-room photography and a booking call to action",
      width: 1348,
      height: 926,
    },
    demoUrl: "https://mckenziehousemassage.ca/",
    included: [
      "A similar welcoming design personalized for your own practice, logo and colours",
      "Agreed pages for your treatments, rates, practitioner information and practical visitor details",
      "Your supplied and approved photos, video and written content prepared for the website",
      contactScopeDetails.direct.description,
      "A booking button linked to your chosen scheduling provider; provider fees and custom integrations are separate",
      "Responsive implementation, core SEO, metadata, security headers and agreed launch checks",
    ],
    customization: [
      "Your actual treatments, appointment lengths, rates and tax wording",
      "Practice information, service area, contact details and approved policies",
      "Extra pages, enquiry-form setup and custom booking features quoted to your requirements",
      "Optional on-site photography, filming, editing and new content production quoted separately",
      "Optional ongoing maintenance and content updates under an agreed care plan",
    ],
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
      "Every offer includes HTTPS, appropriate security headers, protected credentials and dependency checks. Field validation and spam controls apply when a form is included. Ongoing updates are optional and separately scoped.",
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
      "Yes. Every template can be personalized and expanded. The listed package defines the starting scope. Extra pages, layout changes, new features and integrations are quoted separately based on the content and complexity, with your approval before work begins. We can also discuss a fully bespoke build.",
  },
  {
    question: "How will pricing work?",
    answer:
      "Each design shows its starting price in CAD for personalization and launch, before applicable taxes. For a client example, this is the starting point for a similar new website with your own branding and content. Extra features, content production, monthly care and third-party fees are separate. We confirm the scope, revisions, timeline and full quote before a deposit. Unpriced additions are marked “Quoted after a conversation”.",
  },
  {
    question: "What contact setup is included?",
    answer: `${contactScopeSummary} ${contactScopeNotes.upgrades} ${contactScopeNotes.care} ${contactScopeNotes.standards}`,
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

export const collectionCustomization = {
  title: "A starting point. Room to make it yours.",
  summary:
    "Every template can be personalized and expanded. Your selected package covers its listed pages and customization; you can also request extra pages, layout changes or new features.",
  pricing:
    "Additional work is quoted separately based on the content, complexity and integrations involved. We agree on the scope and price with you before any extra work begins.",
  short:
    "Need more pages or a different feature? Every template can be adapted, with additional work quoted before we begin.",
} as const;

export const collectionPricingNote =
  "Starting prices are in CAD, before applicable taxes. Final scope is agreed before work begins. Optional extras, ongoing care, hosting, domains and provider fees are separate.";

export function designPriceContext(design: Pick<WebsiteDesign, "status">) {
  return design.status === "client-example"
    ? "Starting point for a similar new website"
    : "One-time personalization & launch";
}

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

export function designStatusLabel(
  design: Pick<WebsiteDesign, "status" | "pagePreview" | "independentConcept">,
) {
  if (design.independentConcept) return "Independent design concept";
  if (design.status === "client-example") return "Live client example";
  if (design.status === "concept") return design.pagePreview ? "Live design demo" : "Sample layout";
  return design.status === "published" ? "Available design" : "In development";
}

export function designInquiryLabel(design: Pick<WebsiteDesign, "status">) {
  return design.status === "client-example" ? "Build something like this" : "Make this my website";
}

export function designScopeLabel(design: Pick<WebsiteDesign, "pageCount">) {
  return design.pageCount === null
    ? "Pages scoped to your business"
    : `${design.pageCount} ${design.pageCount === 1 ? "page structure" : "page structures"}`;
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
    ...(design
      ? design.status === "client-example"
        ? [
            `Client example: ${design.name}`,
            "I’d like a similar website with my own branding, content and business details.",
          ]
        : [`Design: ${design.name}`]
      : []),
    ...(industry
      ? [`Business type: ${industry.name}`]
      : category
        ? [`Business category: ${category.name}`]
        : []),
    ...(tier ? [`Collection: ${tier.name}`] : []),
    ...(care ? [`Optional monthly support: ${care.name}`] : []),
    ...(design
      ? [
          `Launch pricing: ${designPrice(design)}. ${designPriceContext(design)}; final scope, taxes and separate costs to be confirmed.`,
          `New-build contact scope: ${designContactLabel(design)}. ${designContactDescription(design)}`,
        ]
      : []),
    "",
    "About my business and what I need:",
  ];
  return {
    service: "Website Design & Development",
    contactMode: design?.contactMode,
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
    name: "Photography & videography",
    description:
      "Plan original photos or footage, editing and website implementation. Shoot location and deliverables are quoted separately.",
  },
  {
    id: "pages",
    name: "Additional pages",
    description:
      "Add services, locations or project stories to any template. Quoted by content and complexity before work begins.",
  },
  {
    id: "customization",
    name: "Layout or feature changes",
    description:
      "Discuss changes to the design or functionality. Work beyond the listed package is quoted separately.",
  },
  {
    id: "contact-form",
    name: "Enquiry form or contact workflow",
    description:
      "Add a protected enquiry form to a direct-contact offer, or discuss custom workflows and advanced forms. Quoted by scope.",
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
  return {
    ...base,
    message: [
      base.message.replace("\n\nAbout my business and what I need:", ""),
      `Additional help: ${extraNames.length ? extraNames.join("; ") : "None selected yet"}`,
      `Monthly support preference: ${care?.name ?? (careId === "none" ? "No monthly plan selected" : "Please help me decide")}`,
      "",
      "About my business and what I need:",
    ].join("\n"),
  };
}
