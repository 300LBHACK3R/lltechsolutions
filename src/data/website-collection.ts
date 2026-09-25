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
  /** Related completed client work; the template itself uses a separate sample business. */
  caseStudyProjectId?: string;
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
    theme: "pigment" | "structure" | "still" | "earthworks" | "lawncare" | "horizon" | "wellness";
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
  "New website offers from $299–$499 CAD include direct contact. Offers from $699 CAD include a standard protected enquiry form.";

export const contactScopeDetails = {
  direct: {
    label: "Direct contact included",
    priceLabel: "$299–$499 CAD",
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
    status: "concept",
    name: "Massage Practice",
    tier: "essential",
    industry: "massage-wellness",
    description:
      "A warm, unhurried website for massage and wellness practices, with a clear path from services to booking.",
    startingPriceCad: 299,
    pageCount: 3,
    contactMode: "direct",
    deliveryWindow: "Delivery is agreed after content and scope are confirmed.",
    demoUrl: "/website-collection/still#preview",
    included: [
      "Home, services and contact page structures",
      "Your supplied practice information, branding and room photography",
      contactScopeDetails.direct.description,
      "Responsive implementation, metadata and launch checks",
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
        "An unhurried welcome, a comfortable space and time to talk about what you need. Explore the treatments and find an appointment that fits your day.",
      kicker: "Massage & personal care",
      action: "Explore treatments",
      photo: {
        src: "/images/collection/massage-room.webp",
        alt: "Illustrative massage treatment room with sage walls and ivory linens",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "Relaxation massage",
          description:
            "Set aside some time to settle in. Talk through your comfort preferences and enjoy an unhurried treatment.",
        },
        {
          name: "Focused treatment",
          description:
            "Discuss the areas you would like attention to, with pressure and positioning adjusted to your comfort.",
        },
        {
          name: "Planning a visit",
          description:
            "New to the practice? Ask a question before booking and learn what to expect at your first appointment.",
        },
      ],
      approach:
        "Your comfort shapes the appointment. There is time to talk before treatment, ask questions and share your preferences throughout your visit.",
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
    // Keep the existing catalogue URL and saved enquiry selections valid.
    id: "mckenzie-house",
    status: "concept",
    caseStudyProjectId: "mckenzie-house",
    name: "Wellness & Massage",
    tier: "premier",
    industry: "massage-wellness",
    description:
      "A complete six-page wellness website in deep evergreen, warm cream and gold, with treatment details, transparent pricing, an approachable practice story, FAQs and a full enquiry and booking contact page.",
    startingPriceCad: 999,
    pageCount: 6,
    contactMode: "enquiry-form",
    deliveryWindow: "Content, provider requirements and launch timing are agreed before booking.",
    demoUrl: "/website-collection/mckenzie-house#preview",
    included: [
      "Six page structures: Home, Treatments, Pricing, About, FAQ and Contact",
      "Personalization with your approved logo, colours, supplied imagery, practitioner information, service descriptions and rates",
      contactScopeDetails["enquiry-form"].description,
      "Contact information and a booking button linked to your chosen scheduling provider; custom booking systems and integrations are extra",
      "Responsive implementation, core SEO, metadata, security headers and dependency checks",
      "Vercel deployment, domain connection and agreed launch checks; domain, hosting and provider fees are separate",
    ],
    customization: [
      "Your actual treatments, appointment lengths, rates and tax wording",
      "Practice information, service area, contact details and approved policies",
      "Standard enquiry fields and your existing external scheduling link",
      "Extra pages, new photography, video production, custom features and ongoing maintenance quoted separately",
    ],
    concept: {
      theme: "wellness",
      brands: ["EVERGREEN WELLNESS", "YOUR WELLNESS STUDIO"],
      headlines: ["A little space. To feel like you.", "Make room for yourself."],
      subcopy: "A considered space for massage and everyday wellbeing, shaped around your comfort.",
      kicker: "Massage & wellbeing",
      action: "Explore treatments",
      photo: {
        src: "/images/collection/massage-room.webp",
        alt: "Illustrative wellness treatment room with sage walls and cream linens",
        width: 1536,
        height: 1024,
      },
      services: [
        {
          name: "Relaxation massage",
          description: "Time to settle, with pressure and positioning guided by your comfort.",
        },
        {
          name: "Focused massage",
          description: "A conversation about the areas you would like attention to.",
        },
        {
          name: "Your first visit",
          description: "Clear practical information and time for your questions.",
        },
      ],
      approach:
        "A welcoming website with clear treatment information, sample enquiry and booking interactions, and room for your real practice story.",
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
    name: "Photography or video",
    description: "Discuss the real images and footage your website needs.",
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
