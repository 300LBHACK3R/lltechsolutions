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
  { id: "bookkeeping", name: "Bookkeeping" },
  { id: "accounting", name: "Accounting & Advisory" },
  { id: "cleaning", name: "Home Cleaning" },
  { id: "window-cleaning", name: "Window Cleaning" },
  { id: "home-organizing", name: "Home Organization" },
  { id: "interior-design", name: "Interior Design" },
  { id: "property-management", name: "Property Management" },
  { id: "real-estate", name: "Real Estate" },
  { id: "automotive", name: "Automotive & Detailing" },
  { id: "retail", name: "Retail & Shops" },
  { id: "mobile-detailing", name: "Mobile Detailing" },
  { id: "flower-shop", name: "Flower Shops" },
  { id: "auto-repair", name: "Auto Repair Workshops" },
  { id: "streetwear-store", name: "Streetwear Stores" },
  { id: "wheel-studio", name: "Wheel & Tire Studios" },
  { id: "jewellery-atelier", name: "Jewellery Ateliers" },
  { id: "transport-logistics", name: "Transport & Logistics" },
  { id: "trailer-rentals", name: "Trailer & Equipment Rentals" },
  { id: "courier", name: "Courier & Local Delivery" },
  { id: "moving", name: "Moving Companies" },
  { id: "vehicle-transport", name: "Vehicle Transport" },
  { id: "equipment-rentals", name: "Equipment Rentals" },
  { id: "cold-chain", name: "Cold-chain Transport" },
  { id: "freight", name: "Freight & Logistics" },
  { id: "food-hospitality", name: "Food & Restaurants" },
  { id: "food-truck", name: "Food Truck" },
  { id: "neighbourhood-cafe", name: "Neighbourhood Café" },
  { id: "artisan-bakery", name: "Artisan Bakery" },
  { id: "pizzeria", name: "Pizzeria" },
  { id: "catering-events", name: "Catering & Events" },
  { id: "fine-dining", name: "Fine Dining" },
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
    description: "Law firms, bookkeepers, accountants and independent consultancies.",
    industries: ["legal", "bookkeeping", "accounting", "professional-services"],
    image: "/images/template-categories/legal-professional.webp",
  },
  {
    id: "home-property",
    name: "Home & Property",
    description:
      "Cleaning, organizing, interior design, property management, real estate and outdoor care.",
    industries: [
      "landscaping",
      "cleaning",
      "window-cleaning",
      "home-organizing",
      "interior-design",
      "property-management",
      "real-estate",
    ],
    image: "/images/template-categories/home-property.webp",
  },
  {
    id: "transport-logistics",
    name: "Transport & Logistics",
    description:
      "Couriers, movers, vehicle transport, equipment rentals, cold-chain and freight services.",
    industries: [
      "transport-logistics",
      "trailer-rentals",
      "courier",
      "moving",
      "vehicle-transport",
      "equipment-rentals",
      "cold-chain",
      "freight",
    ],
    image: "/images/template-categories/transport-logistics.webp",
  },
  {
    id: "food-restaurants",
    name: "Food & Restaurants",
    description: "Restaurants, cafés, caterers, bakeries and food businesses.",
    industries: [
      "food-hospitality",
      "food-truck",
      "neighbourhood-cafe",
      "artisan-bakery",
      "pizzeria",
      "catering-events",
      "fine-dining",
    ],
    image: "/images/template-categories/food-restaurants.webp",
  },
  {
    id: "retail-automotive",
    name: "Retail & Automotive",
    description: "Independent shops, showrooms, automotive services and detailing businesses.",
    industries: [
      "retail",
      "automotive",
      "mobile-detailing",
      "flower-shop",
      "auto-repair",
      "streetwear-store",
      "wheel-studio",
      "jewellery-atelier",
    ],
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
      | "hair-one-page"
      | "professional"
      | "home-property"
      | "transport"
      | "food"
      | "retail";
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
/** Fictional demo content and offer scope; the only source for the professional range. */
/** Fictional Home & Property demos; content, price and launch scope share this source. */
export const homePropertyTemplates = [
  {
    id: "home-cleaning",
    name: "One-page Home Cleaning",
    brand: "GOOD DAY",
    subbrand: "HOME CLEANING",
    price: 150,
    tier: "essential",
    industry: "cleaning",
    pages: ["Home"],
    theme: "sunny",
    headline: "A clean home.",
    emphasis: "A good day.",
    intro:
      "Less time on the housework. More time for the good stuff. A friendly clean, built around your home and your routine.",
    about:
      "A small cleaning team with a simple approach: listen to what matters, agree the details and leave the space ready for everyday life.",
    imageAlt: "Illustrative sunlit yellow kitchen with lemons and cleaning supplies",
    form: false,
    description:
      "A cheerful one-page cleaning website with butter yellow, cobalt type, a scalloped photo frame and a simple direct-contact journey.",
    services: [
      {
        name: "The regular reset",
        description: "For the everyday rhythm.",
        detail:
          "A recurring clean with an agreed checklist for kitchens, bathrooms and living areas.",
      },
      {
        name: "The deeper clean",
        description: "A little extra attention.",
        detail:
          "More time for the corners and surfaces that need it. We confirm priorities and access before booking.",
      },
      {
        name: "The moving clean",
        description: "A fresh start, on either side.",
        detail:
          "An agreed move-in or move-out clean for an empty space. Final scope depends on the property.",
      },
    ],
    cta: "Let’s talk cleaning",
    note: "A clear list, a thoughtful clean, a little more breathing room.",
    image: "/images/collection/property-home-cleaning.webp",
  },
  {
    id: "window-care",
    name: "Window Cleaning",
    brand: "CLEARLINE",
    subbrand: "WINDOW & GLASS CARE",
    price: 399,
    tier: "signature",
    industry: "window-cleaning",
    pages: ["Home", "Services", "Contact"],
    theme: "glass",
    headline: "Let the light",
    emphasis: "back in.",
    intro:
      "Windows, frames and the details around them. Clear, careful service for homes and street-facing spaces.",
    about:
      "We keep the job straightforward: understand the glass, plan safe access and agree what is included before work begins.",
    imageAlt: "Illustrative modern home with blue glass windows and a sunlit patio",
    form: false,
    description:
      "An aqua-and-white window care site with a glass-inspired split layout, a playful squeegee reveal and three focused pages.",
    services: [
      {
        name: "Residential windows",
        description: "A clearer view from home.",
        detail:
          "Interior and exterior glass cleaning where access is suitable, with frames and sills scoped before booking.",
      },
      {
        name: "Storefront glass",
        description: "Keep the front of house clear.",
        detail:
          "One-time and recurring visits for accessible retail glass, scheduled around your business.",
      },
      {
        name: "Screens & details",
        description: "The finishing touches.",
        detail:
          "Screen cleaning and selected frame detailing can be added after we assess condition and access.",
      },
    ],
    cta: "Discuss your windows",
    note: "Inside. Outside. The details in between.",
    image: "/images/collection/property-window-care.webp",
  },
  {
    id: "home-organizing",
    name: "Home Organization",
    brand: "ROOM TO BREATHE",
    subbrand: "HOME ORGANIZING",
    price: 499,
    tier: "signature",
    industry: "home-organizing",
    pages: ["Home", "Spaces", "Our approach", "Contact"],
    theme: "linen",
    headline: "Make room",
    emphasis: "for real life.",
    intro:
      "Thoughtful organizing for the spaces you use every day. Less searching, more living, and a home that makes sense to you.",
    about:
      "Your home is not a showroom. We work with your habits, your belongings and your pace to create systems that feel natural to keep using.",
    imageAlt: "Illustrative warm oak entryway with baskets, shoes and a green bench cushion",
    form: false,
    description:
      "A warm peach-and-olive editorial layout with layered image notes, a room selector and practical organizing stories across four pages.",
    services: [
      {
        name: "Entryways",
        description: "A softer landing.",
        detail:
          "Give keys, bags, shoes and everyday essentials a practical home right where you need them.",
      },
      {
        name: "Kitchens",
        description: "Find your everyday rhythm.",
        detail:
          "Group what you use, simplify the layout and make space for cooking, packing and gathering.",
      },
      {
        name: "Wardrobes",
        description: "An easier start.",
        detail:
          "Sort by your routine, make the most of existing storage and agree a system you can maintain.",
      },
    ],
    cta: "Start with one space",
    note: "Small shifts. More breathing room.",
    image: "/images/collection/property-home-organizing.webp",
  },
  {
    id: "interior-studio",
    name: "Interior Design Studio",
    brand: "FORME",
    subbrand: "INTERIORS & SPACES",
    price: 699,
    tier: "premier",
    industry: "interior-design",
    pages: ["Home", "Projects", "Services", "Studio", "Contact"],
    theme: "clay",
    headline: "Rooms with",
    emphasis: "a point of view.",
    intro:
      "Warm materials. Considered proportions. Interiors that feel personal, useful and quietly expressive.",
    about:
      "We work from the way you live: the light, the daily rituals and the pieces you want to keep. Every material and layout decision has a reason.",
    imageAlt:
      "Illustrative sculptural living room with a rust sofa, travertine table and plaster arch",
    form: true,
    description:
      "A terracotta-and-cream design journal with an oversized wordmark, art-directed project spreads, a material palette interaction and a full enquiry page.",
    services: [
      {
        name: "Design direction",
        description: "Find the thread.",
        detail:
          "A focused brief, visual direction and material palette to guide the next decisions.",
      },
      {
        name: "Room planning",
        description: "Make the space work.",
        detail:
          "Furniture layouts, proportions and practical recommendations developed around your room and your routines.",
      },
      {
        name: "Finishing layers",
        description: "Bring it together.",
        detail:
          "A considered selection of colour, lighting, textiles and objects. Sourcing and implementation are agreed separately.",
      },
    ],
    cta: "Tell us about your space",
    note: "Material matters. So does the everyday.",
    image: "/images/collection/property-interior-studio.webp",
  },
  {
    id: "property-management",
    name: "Property Management",
    brand: "COMMON GROUND",
    subbrand: "RESIDENTIAL PROPERTY CARE",
    price: 699,
    tier: "premier",
    industry: "property-management",
    pages: ["Home", "Owners", "Residents", "Properties", "Contact"],
    theme: "teal",
    headline: "Good places.",
    emphasis: "Well looked after.",
    intro:
      "Clear communication for owners. A useful point of contact for residents. Thoughtful care for the places people call home.",
    about:
      "A property needs more than a list of tasks. We connect the everyday details, the people and the longer-term plan, with responsibilities agreed from the start.",
    imageAlt: "Illustrative landscaped apartment courtyard with brick buildings and benches",
    form: true,
    description:
      "A teal-and-citrus property site with a structured dashboard-inspired layout, owner/resident pathways, a filterable sample property collection and a complete contact page.",
    services: [
      {
        name: "Owner support",
        description: "A clear view of the property.",
        detail:
          "Agree the service scope, reporting rhythm and responsibilities before bringing a property into care.",
      },
      {
        name: "Resident communication",
        description: "An easier next step.",
        detail:
          "Make routine questions and maintenance contacts easy to find, with clear guidance on who to reach.",
      },
      {
        name: "Property coordination",
        description: "Keep the details moving.",
        detail:
          "Coordinate agreed inspections, routine work and service partners within an approved management scope.",
      },
    ],
    cta: "Find your next step",
    note: "Care for the place. Respect for the people.",
    image: "/images/collection/property-property-management.webp",
  },
  {
    id: "real-estate",
    name: "Boutique Real Estate",
    brand: "ADDRESS",
    subbrand: "HOMES WITH CHARACTER",
    price: 999,
    tier: "flagship",
    industry: "real-estate",
    pages: ["Home", "Homes", "Neighbourhoods", "Services", "About", "FAQs", "Contact"],
    theme: "estate",
    headline: "Some places",
    emphasis: "just feel different.",
    intro:
      "Explore the space, the setting and the way you want to live. A considered approach to your next move.",
    about:
      "A home search is personal. We begin with how you want to live, then help you understand the options and prepare for the next conversation.",
    imageAlt: "Illustrative contemporary cedar and stone house at dusk with a mountain backdrop",
    form: true,
    description:
      "A cinematic plum-and-ivory real estate experience with a full-bleed photographic hero, searchable sample homes, expandable property details and seven complete pages.",
    services: [
      {
        name: "Buying",
        description: "Start with how you live.",
        detail:
          "Discuss location, space and priorities, then build a considered search brief with your representative.",
      },
      {
        name: "Selling",
        description: "Tell the property’s story.",
        detail:
          "Plan the presentation, content and marketing approach around the property and the agreed scope.",
      },
      {
        name: "Your next chapter",
        description: "Connect the decisions.",
        detail: "Bring your timing and questions together before deciding what to do next.",
      },
    ],
    cta: "Explore the homes",
    note: "A different view of home.",
    image: "/images/collection/property-real-estate.webp",
  },
] as const;
export type HomePropertyTemplate = (typeof homePropertyTemplates)[number];
export type HomePropertyTemplateId = HomePropertyTemplate["id"];
export function homePropertyTemplate(id: string) {
  return homePropertyTemplates.find((template) => template.id === id);
}
export function homePropertyPagePath(page: string) {
  return page === "Home" ? "/" : `/${page.toLowerCase().replaceAll(" ", "-")}`;
}

/** Fictional Retail & Automotive designs; supplied items are illustrative static content. */
export const retailTemplates = [
  {
    id: "mobile-detailing",
    name: "One-page Mobile Detailing",
    brand: "CURBSIDE",
    subbrand: "MOBILE DETAILING / SAMPLE STUDIO",
    price: 150,
    tier: "essential",
    pages: ["Home"],
    headline: "A fresh start.",
    emphasis: "Parked right here.",
    intro:
      "A considered clean for the car that carries your everyday. Start with the spaces you use most, then give the rest a little attention.",
    about:
      "Daily commutes. Weekend trips. A life lived between the seats. We start with your priorities, talk through the condition of your car and agree on the work before getting started.",
    imageAlt:
      "Illustrative unbranded dark-blue sedan viewed from the front three-quarter angle with aqua reflections in a clean concrete studio",
    form: false,
    description:
      "An ink-and-icy-aqua one-page detailing design built around a service ticket, sample package selector and direct contact.",
    cta: "Explore the service ticket",
    services: [
      {
        name: "Interior reset",
        description: "Focus on the spaces you use most.",
        detail:
          "The dashboard, the floor mats, the places that collect the everyday. Tell us what needs attention so we can shape the service around your car.",
      },
      {
        name: "Exterior care",
        description: "Give the outside some attention.",
        detail:
          "A fresh exterior begins with a conversation about the paint, its condition and the finish you want to care for.",
      },
      {
        name: "Complete refresh",
        description: "Bring the inside and outside together.",
        detail:
          "Inside and outside, considered together. A clear scope built around your vehicle, your priorities and the time available.",
      },
    ],
    items: [
      {
        name: "Cabin reset",
        description: "Sample interior surface and mat care.",
        price: "$95",
        category: "Interior",
      },
      {
        name: "Outside refresh",
        description: "Sample exterior wash and finish.",
        price: "$75",
        category: "Exterior",
      },
      {
        name: "Inside + out",
        description: "An illustrative combined care package.",
        price: "$155",
        category: "Complete",
      },
    ],
    industry: "mobile-detailing",
    theme: "mobile-detailing",
    image: "/images/collection/retail-mobile-detailing.webp",
  },
  {
    id: "flower-shop",
    name: "Flower Shop",
    brand: "STEM HOUSE",
    subbrand: "FLOWERS FOR THE EVERYDAY",
    price: 399,
    tier: "signature",
    pages: ["Home", "Flowers", "Visit"],
    headline: "A little wild.",
    emphasis: "Entirely lovely.",
    intro:
      "Stems with movement, unexpected colour and a place in your day. For the big occasions, the small gestures and the just-because moments.",
    about:
      "Some stems lean. Some colours surprise you. We like flowers that feel gathered, with room for a little wildness and a personality of their own.",
    imageAlt:
      "Illustrative cream yellow and mauve bouquet wrapped in paper against an aubergine backdrop",
    form: false,
    description:
      "An aubergine-and-butter flower shop with a paper bouquet mood board, colour selector and three editorial pages.",
    cta: "Find your flower mood",
    services: [
      {
        name: "Everyday flowers",
        description: "A small gesture with its own personality.",
        detail:
          "Hand-tied shapes for the kitchen table, a thank-you or no particular occasion. A little colour can change the feel of a whole room.",
      },
      {
        name: "Gatherings",
        description: "Flowers that belong to the occasion.",
        detail:
          "A dinner with friends, a long table, a day to remember. Bring the feeling of your occasion and let the flowers find their place.",
      },
      {
        name: "Shop notes",
        description: "A little context for every stem.",
        detail:
          "Seasonal favourites, a closer look at the stems and a few notes from the shop. Ask us about the flowers that are right for your occasion.",
      },
    ],
    items: [
      {
        name: "Sunroom",
        description: "An illustrative mix of yellow stems and leafy movement.",
        price: "$55",
        category: "Bright",
      },
      {
        name: "Plum paper",
        description: "A sample arrangement of deep colour and sculptural stems.",
        price: "$75",
        category: "Moody",
      },
      {
        name: "Soft morning",
        description: "A gentle example in pale pink and cream.",
        price: "$60",
        category: "Soft",
      },
      {
        name: "Wild gesture",
        description: "An illustrative loose bouquet with unexpected texture.",
        price: "$85",
        category: "Wild",
      },
    ],
    industry: "flower-shop",
    theme: "flower-shop",
    image: "/images/collection/retail-flower-shop.webp",
  },
  {
    id: "auto-repair",
    name: "Auto Repair Workshop",
    brand: "BAY 03",
    subbrand: "THE WORKSHOP / SAMPLE CONCEPT",
    price: 499,
    tier: "signature",
    pages: ["Home", "Services", "Workshop", "Contact"],
    headline: "Know the next step.",
    emphasis: "Keep the conversation clear.",
    intro:
      "Clear service information. Useful questions. A direct conversation with the people looking after your vehicle.",
    about:
      "Good workshop conversations start with what you have noticed. We make room for your questions, explain the proposed next step and agree on the work before it begins.",
    imageAlt:
      "Illustrative tidy automotive workshop with a vehicle lift tools and steel-blue details",
    form: false,
    description:
      "A technical steel-blue-and-white workshop manual with an interactive service explorer and four clear pages.",
    cta: "Open the service guide",
    services: [
      {
        name: "Brake care",
        description: "Start with the concern you have noticed.",
        detail:
          "Describe the concern and when it happens. A hands-on workshop assessment comes before a recommendation for your vehicle.",
      },
      {
        name: "Routine maintenance",
        description: "Make room for the everyday essentials.",
        detail:
          "Talk through your vehicle, its service history and the maintenance work you are considering. The right scope starts with the right information.",
      },
      {
        name: "Diagnostics",
        description: "Describe the symptom and the context.",
        detail:
          "Share the symptom, when it appears and anything that has changed. Give the workshop a clear starting point for its assessment.",
      },
    ],
    items: [
      {
        name: "Brake conversation",
        description: "A sample starting point for describing a brake concern.",
        price: "By enquiry",
        category: "Brakes",
      },
      {
        name: "Maintenance conversation",
        description: "A sample outline for discussing routine care.",
        price: "By enquiry",
        category: "Maintenance",
      },
      {
        name: "Diagnostic assessment",
        description: "An illustrative starting point for a professional assessment.",
        price: "By enquiry",
        category: "Diagnostics",
      },
    ],
    industry: "auto-repair",
    theme: "auto-repair",
    image: "/images/collection/retail-auto-repair.webp",
  },
  {
    id: "streetwear-store",
    name: "Streetwear Store",
    brand: "OFF/GRID",
    subbrand: "INDEPENDENT FORM / SAMPLE COLLECTION",
    price: 699,
    tier: "premier",
    pages: ["Home", "Collection", "Lookbook", "Our story", "Contact"],
    headline: "Wear your own",
    emphasis: "frequency.",
    intro:
      "Everyday pieces with a point of view. Expressive silhouettes, deliberate proportions and room to make them your own.",
    about:
      "OFF/GRID explores shape, repetition and everyday movement. Familiar pieces, seen from a different angle. We are interested in how you wear them, not a rulebook for getting dressed.",
    imageAlt:
      "Illustrative streetwear editorial with sculptural garments coral accents and a monochrome studio backdrop",
    form: true,
    description:
      "An electric-coral-and-monochrome streetwear lookbook with oversized type, a filterable sample collection and local product shortlist.",
    cta: "Explore the collection",
    services: [
      {
        name: "The collection",
        description: "Build a visual point of view.",
        detail:
          "Easy layers, expressive shapes and pieces that work in their own way. Explore the collection and bring your favourites together.",
      },
      {
        name: "Lookbook",
        description: "A different way to see the pieces.",
        detail:
          "Proportions, textures and the spaces between. Step into the studio for a different view of the collection.",
      },
      {
        name: "The studio",
        description: "Give the label its own voice.",
        detail:
          "Ideas become silhouettes, and silhouettes become part of the everyday. Get to know the point of view behind the label.",
      },
    ],
    items: [
      {
        name: "Volume tee",
        description: "A sample boxy cotton tee with a considered dropped shoulder.",
        price: "$68",
        category: "Tops",
      },
      {
        name: "Signal overshirt",
        description: "An illustrative layered shirt with oversized pockets.",
        price: "$148",
        category: "Layers",
      },
      {
        name: "Wide utility pant",
        description: "A sample relaxed trouser with practical pocket details.",
        price: "$128",
        category: "Bottoms",
      },
      {
        name: "Grid cap",
        description: "An illustrative six-panel cap with a minimal stitched mark.",
        price: "$42",
        category: "Accessories",
      },
      {
        name: "Studio hoodie",
        description: "A sample structured hooded layer with clean proportions.",
        price: "$138",
        category: "Layers",
      },
      {
        name: "Frame long sleeve",
        description: "An illustrative long-sleeve tee with a quiet graphic detail.",
        price: "$82",
        category: "Tops",
      },
    ],
    industry: "streetwear-store",
    theme: "streetwear-store",
    image: "/images/collection/retail-streetwear-store.webp",
  },
  {
    id: "wheel-studio",
    name: "Wheel & Tire Studio",
    brand: "AXIS WORKS",
    subbrand: "FORM / FINISH / PROPORTION",
    price: 699,
    tier: "premier",
    pages: ["Home", "Wheels", "Services", "Fitment", "Contact"],
    headline: "Precision in",
    emphasis: "the details.",
    intro:
      "For people who notice the finish, the shape and the way every detail works together. Find a visual direction, then start the conversation.",
    about:
      "A wheel changes the character of a car. We look at the relationship between form, finish and proportion, then bring the practical requirements into the conversation.",
    imageAlt: "Illustrative bronze alloy wheel and tire in a dark studio",
    form: true,
    description:
      "A charcoal-and-copper wheel studio with a finish selector, sample collection and clearly labelled fitment enquiry guide.",
    cta: "Explore the finishes",
    services: [
      {
        name: "Wheel collections",
        description: "A closer look at shape and finish.",
        detail:
          "Clean spokes, sculptural lines, a considered finish. Explore the visual directions and bring your shortlist to the studio.",
      },
      {
        name: "Studio services",
        description: "Show the work your business offers.",
        detail:
          "From a first conversation to the details of wheel and tire care, start with the service you need and the vehicle you drive.",
      },
      {
        name: "Fitment conversation",
        description: "Gather context for a professional review.",
        detail:
          "Bring your vehicle details and what you have in mind. Compatibility, load suitability and installation requirements need professional verification before choosing a wheel or tire.",
      },
    ],
    items: [
      {
        name: "Arc 01",
        description: "A sample open-spoke form in a satin silver finish.",
        price: "By enquiry",
        category: "Satin silver",
      },
      {
        name: "Contour 02",
        description: "An illustrative sculpted multi-spoke form in graphite.",
        price: "By enquiry",
        category: "Graphite",
      },
      {
        name: "Line 03",
        description: "A sample clean spoke profile in warm brushed bronze.",
        price: "By enquiry",
        category: "Brushed bronze",
      },
      {
        name: "Form 04",
        description: "An illustrative deep-profile wheel in polished silver.",
        price: "By enquiry",
        category: "Polished silver",
      },
    ],
    industry: "wheel-studio",
    theme: "wheel-studio",
    image: "/images/collection/retail-wheel-studio.webp",
  },
  {
    id: "jewellery-atelier",
    name: "Jewellery Atelier",
    brand: "FORME",
    subbrand: "OBJECTS TO KEEP / SAMPLE ATELIER",
    price: 999,
    tier: "flagship",
    pages: ["Home", "Collections", "The atelier", "Bespoke", "Materials", "Journal", "Contact"],
    headline: "Small forms.",
    emphasis: "Lasting presence.",
    intro:
      "Quiet objects, considered proportions and the pleasure of looking a little closer. Pieces that make room for your own meaning.",
    about:
      "A curve. A surface. The space between. FORME begins with simple gestures and the way an object meets the light. What it means is something you bring to it.",
    imageAlt: "Illustrative gold ring and open cuff displayed on ivory stone in soft gallery light",
    form: true,
    description:
      "An ivory-and-champagne jewellery gallery with an interactive exhibit, material swatches and seven editorial pages.",
    cta: "Enter the collection",
    services: [
      {
        name: "Collections",
        description: "Objects arranged around a shared idea.",
        detail:
          "Rings, cuffs and pendants arranged around a shared idea. Small objects with their own presence, made to be looked at slowly.",
      },
      {
        name: "Bespoke conversations",
        description: "Begin with the shape of an idea.",
        detail:
          "A shape you keep returning to. An occasion, a gesture or a thought. Begin with an idea and a conversation about where it could lead.",
      },
      {
        name: "Material studies",
        description: "Look closely at surface and tone.",
        detail:
          "Warmth, reflection, texture and tone. Explore the visual character of a finish, then ask about composition and care for the actual piece.",
      },
    ],
    items: [
      {
        name: "Orbit ring",
        description: "A sample rounded band with a sculptural open curve.",
        price: "$240",
        category: "Rings",
      },
      {
        name: "Fold earrings",
        description: "An illustrative folded silhouette in a warm metal tone.",
        price: "$320",
        category: "Earrings",
      },
      {
        name: "Line pendant",
        description: "A sample quiet vertical form on a fine chain.",
        price: "$280",
        category: "Pendants",
      },
      {
        name: "Still ring",
        description: "An illustrative flat-profile band with a brushed surface.",
        price: "$210",
        category: "Rings",
      },
      {
        name: "Arc earrings",
        description: "A sample small curved form with a polished finish.",
        price: "$260",
        category: "Earrings",
      },
      {
        name: "Trace pendant",
        description: "An illustrative oval pendant with a soft-edged outline.",
        price: "$295",
        category: "Pendants",
      },
    ],
    industry: "jewellery-atelier",
    theme: "jewellery-atelier",
    image: "/images/collection/retail-jewellery-atelier.webp",
  },
] as const;
export type RetailTemplate = (typeof retailTemplates)[number];
export type RetailTemplateId = RetailTemplate["id"];
export function retailTemplate(id: string) {
  return retailTemplates.find((template) => template.id === id);
}
export function retailPagePath(page: string) {
  return page === "Home" ? "/" : `/${page.toLowerCase().replaceAll(" ", "-")}`;
}

/** Fictional food-business designs. Menu entries are illustrative supplied-content examples. */
export const foodTemplates = [
  {
    id: "food-truck",
    name: "One-page Food Truck",
    brand: "SIDE STREET",
    subbrand: "STREET FOOD & GOOD COMPANY",
    price: 150,
    tier: "essential",
    pages: ["Home"],
    headline: "Big bites.",
    emphasis: "Good times.",
    intro: "Street-food favourites, a changing view, and a very good reason to step outside.",
    about:
      "A short menu, a lively corner and something good in hand. Pull up to the window, pick a favourite and make a little time for lunch.",
    imageAlt: "Illustrative crispy chicken bun and fries on a blue-and-yellow street-food setting",
    form: false,
    description:
      "A punchy cobalt-and-acid-yellow one-page food-truck design with oversized type, a concise sample menu and direct-contact sections.",
    cta: "Find the next stop",
    services: [
      {
        name: "Street favourites",
        description: "A small menu with plenty of character.",
        detail:
          "A few good handhelds, a side for sharing and plenty of flavour between the first bite and the last.",
      },
      {
        name: "Find the truck",
        description: "Bring the next stop into view.",
        detail:
          "A new corner can make an ordinary lunch feel like a small adventure. Confirm the current stop and serving times before heading over.",
      },
      {
        name: "Private events",
        description: "Take the conversation off the street.",
        detail:
          "Share the occasion and proposed location directly with the business to discuss event options.",
      },
    ],
    menu: [
      {
        name: "Crispy chicken bun",
        description: "Crisp chicken, crunchy slaw, pickles and house sauce.",
        price: "$14",
        category: "Handhelds",
      },
      {
        name: "Crisp chickpea wrap",
        description: "Crisp chickpeas, crunchy slaw and lemon dressing.",
        price: "$13",
        category: "Handhelds",
      },
      {
        name: "Street fries",
        description: "Golden fries with seasoning and a house dip.",
        price: "$7",
        category: "Sides",
      },
    ],
    industry: "food-truck",
    theme: "food-truck",
    image: "/images/collection/food-food-truck.webp",
  },
  {
    id: "neighbourhood-cafe",
    name: "Neighbourhood Café",
    brand: "SUNDAY CLUB",
    subbrand: "COFFEE & EVERYDAY PLEASURES",
    price: 399,
    tier: "signature",
    pages: ["Home", "Menu", "Visit"],
    headline: "A little pause.",
    emphasis: "A lovely part of your day.",
    intro: "Coffee, something from the kitchen, and a seat worth staying in.",
    about:
      "A café for the in-between moments: a first coffee, a quiet catch-up or a long lunch. A warm, unhurried place to make part of your day.",
    imageAlt:
      "Illustrative warm neighbourhood café with terracotta seating, a timber counter and afternoon window light",
    form: false,
    description:
      "A warm terracotta-and-cream café design with editorial photography, a filterable sample menu and three welcoming pages.",
    cta: "Plan a visit",
    services: [
      {
        name: "Coffee",
        description: "Your everyday ritual.",
        detail:
          "Something rich, something milky or something over ice. Find the coffee that fits the moment.",
      },
      {
        name: "From the kitchen",
        description: "A reason to stay a while.",
        detail:
          "Toast at a window seat, a breakfast bun on the way through or a pastry beside your coffee.",
      },
      {
        name: "Come by",
        description: "A place in the neighbourhood.",
        detail:
          "Find the practical details for your next visit, then make a little time to settle in.",
      },
    ],
    menu: [
      {
        name: "Flat white",
        description: "Espresso with silky steamed milk.",
        price: "$5",
        category: "Coffee",
      },
      {
        name: "Long black",
        description: "Espresso poured over hot water.",
        price: "$4",
        category: "Coffee",
      },
      {
        name: "Iced oat latte",
        description: "Espresso, oat drink and ice.",
        price: "$6",
        category: "Coffee",
      },
      {
        name: "Butter croissant",
        description: "Flaky pastry with cultured butter.",
        price: "$5",
        category: "Kitchen",
      },
      {
        name: "Soft scramble toast",
        description: "Soft scrambled eggs, fresh herbs and toasted sourdough.",
        price: "$14",
        category: "Kitchen",
      },
      {
        name: "Breakfast bun",
        description: "A soft bun with egg, greens and relish.",
        price: "$12",
        category: "Kitchen",
      },
    ],
    industry: "neighbourhood-cafe",
    theme: "neighbourhood-cafe",
    image: "/images/collection/food-neighbourhood-cafe.webp",
  },
  {
    id: "artisan-bakery",
    name: "Artisan Bakery",
    brand: "BUTTER & CRUMB",
    subbrand: "BREAD, PASTRY & SMALL PLEASURES",
    price: 499,
    tier: "signature",
    pages: ["Home", "Bakes", "Our kitchen", "Visit"],
    headline: "Good things",
    emphasis: "take their time.",
    intro: "Flaky edges, a flour-dusted table and the simple pleasure of something from the oven.",
    about:
      "The rhythm of the kitchen shapes the day: mixing, folding, resting and baking. Bread for the table, pastry for the walk home and a few sweet things along the way.",
    imageAlt:
      "Illustrative bakery still life with a rustic loaf, flaky croissants and flour on a warm timber worktop",
    form: false,
    description:
      "An expressive butter-cream and berry-red bakery design with a striped awning, editorial bake ledger, kitchen story and four complete pages.",
    cta: "Explore the bakes",
    services: [
      {
        name: "Bread",
        description: "A place at the everyday table.",
        detail:
          "A loaf to slice at breakfast, bring to dinner or keep beside a bowl of something warm.",
      },
      {
        name: "Pastry",
        description: "Flaky, golden, worth a pause.",
        detail:
          "Butter croissants, morning buns and the sweet things that make a coffee break last a little longer.",
      },
      {
        name: "The kitchen",
        description: "The story behind the counter.",
        detail:
          "Follow the rhythm of dough, flour and heat, from the first fold to the cooling rack.",
      },
    ],
    menu: [
      {
        name: "Butter croissant",
        description: "A layered butter pastry with a golden, crisp shell.",
        price: "$5.50",
        category: "Breakfast",
      },
      {
        name: "Morning bun",
        description: "Rolled pastry with citrus sugar and a soft centre.",
        price: "$5.75",
        category: "Breakfast",
      },
      {
        name: "Country sourdough",
        description: "A rustic loaf with a deeply coloured crust.",
        price: "$9.50",
        category: "Bread",
      },
      {
        name: "Olive & rosemary loaf",
        description: "A savoury loaf with olives and rosemary.",
        price: "$11",
        category: "Bread",
      },
      {
        name: "Berry galette",
        description: "Seasonal berry filling in a folded pastry shell.",
        price: "$7",
        category: "Sweets",
      },
      {
        name: "Brown butter cookie",
        description: "A golden cookie with brown-butter notes.",
        price: "$4.50",
        category: "Sweets",
      },
    ],
    industry: "artisan-bakery",
    theme: "artisan-bakery",
    image: "/images/collection/food-artisan-bakery.webp",
  },
  {
    id: "pizzeria",
    name: "Pizzeria",
    brand: "SLICE SOCIAL",
    subbrand: "PIZZA & A FULL TABLE",
    price: 699,
    tier: "premier",
    pages: ["Home", "Menu", "Our place", "Group tables", "Contact"],
    headline: "For the table.",
    emphasis: "For the good times.",
    intro: "A pizza in the middle, another chair pulled up and a night that finds its own pace.",
    about:
      "Pizza gives people a reason to gather. A casual plan becomes a table full of friends, a few favourite slices and a conversation that carries on.",
    imageAlt:
      "Illustrative pizza with basil and tomato on a red-check tablecloth in a warm casual pizzeria",
    form: true,
    description:
      "A spirited tomato-red and cobalt pizzeria design with oversized typography, an interactive pizza wheel, a filterable menu and a five-page gathering journey.",
    cta: "Gather your people",
    services: [
      {
        name: "The pizza",
        description: "Something for the middle.",
        detail:
          "The familiar favourites, a few vegetable-led combinations and something to pass around the table.",
      },
      {
        name: "Our place",
        description: "Set the scene for the evening.",
        detail:
          "A little colour, a lively table and room for another chair. Come for the pizza; settle into the evening.",
      },
      {
        name: "Group tables",
        description: "Make room for your people.",
        detail:
          "Bring the occasion, your preferred date and a rough guest count. Table arrangements are confirmed directly with the business.",
      },
    ],
    menu: [
      {
        name: "Margherita",
        description: "Tomato, mozzarella, basil and olive oil.",
        price: "$19",
        category: "Classic",
      },
      {
        name: "Pepperoni",
        description: "Tomato, mozzarella and pepperoni.",
        price: "$23",
        category: "Classic",
      },
      {
        name: "Hot honey salami",
        description: "Salami, mozzarella, chilli and hot honey.",
        price: "$25",
        category: "Classic",
      },
      {
        name: "Mushroom bianca",
        description: "Roasted mushrooms, mozzarella and a white base.",
        price: "$24",
        category: "Vegetable",
      },
      {
        name: "Garden party",
        description: "Seasonal vegetables, tomato and herbs.",
        price: "$23",
        category: "Vegetable",
      },
      {
        name: "Roasted pepper",
        description: "Sweet peppers, olives, mozzarella and basil.",
        price: "$22",
        category: "Vegetable",
      },
    ],
    industry: "pizzeria",
    theme: "pizzeria",
    image: "/images/collection/food-pizzeria.webp",
  },
  {
    id: "catering-events",
    name: "Catering & Events",
    brand: "TABLE & FIELD",
    subbrand: "FOOD FOR GATHERING",
    price: 699,
    tier: "premier",
    pages: ["Home", "Menus", "Events", "Our approach", "Contact"],
    headline: "The table is",
    emphasis: "only the beginning.",
    intro:
      "Considered food, thoughtful details and room for the people who make an occasion yours.",
    about:
      "A gathering starts with its people. The menu, setting and service style come together around the kind of occasion you want to create.",
    imageAlt:
      "Illustrative long event table with linen, flowers and colourful sharing platters in a garden setting",
    form: true,
    description:
      "An elegant olive-and-parchment catering design with generous editorial spacing, sample menus and five thoughtful pages.",
    cta: "Tell us about your event",
    services: [
      {
        name: "Celebrations",
        description: "Food at the heart of the occasion.",
        detail:
          "Mark the day with food that brings people together, from a small reception to a long-table supper.",
      },
      {
        name: "Work gatherings",
        description: "A considered table for the team.",
        detail:
          "A team lunch, a shared milestone or an evening for the people you work with. Start with the occasion.",
      },
      {
        name: "Shared tables",
        description: "Let the conversation unfold.",
        detail:
          "Generous plates in the middle and a little space for conversation. Guest needs and service arrangements are agreed together.",
      },
    ],
    menu: [
      {
        name: "Market table",
        description: "Seasonal vegetables, whipped white bean, sourdough",
        price: "$28 per guest",
        category: "Sharing",
      },
      {
        name: "Gathered supper",
        description: "Roast chicken or mushroom main, shared seasonal sides",
        price: "$54 per guest",
        category: "Seated",
      },
      {
        name: "A sweet finish",
        description: "Lemon olive-oil cake, berries, cultured cream",
        price: "$12 per guest",
        category: "Dessert",
      },
    ],
    industry: "catering-events",
    theme: "catering-events",
    image: "/images/collection/food-catering-events.webp",
  },
  {
    id: "fine-dining",
    name: "Fine Dining",
    brand: "VESPER",
    subbrand: "AN EVENING, CONSIDERED",
    price: 999,
    tier: "flagship",
    pages: ["Home", "The menu", "The room", "Private dining", "Our story", "Journal", "Contact"],
    headline: "An evening",
    emphasis: "to settle into.",
    intro: "A considered menu. A room with its own rhythm. Time to enjoy what is in front of you.",
    about:
      "The experience lives in the details: the shape of a plate, the feel of the room and the pace of the evening. An invitation to slow down and give each course its moment.",
    imageAlt:
      "Illustrative refined restaurant plate with seasonal vegetables and a softly lit intimate dining room",
    form: true,
    description:
      "A cinematic ink-and-champagne restaurant design with refined typography, a sample tasting menu and an expansive seven-page editorial journey.",
    cta: "Begin an evening",
    services: [
      {
        name: "The menu",
        description: "A sequence of considered plates.",
        detail:
          "A beginning, a centre and a quiet finish. Explore the plates that give an evening its shape.",
      },
      {
        name: "The room",
        description: "Space for the evening to unfold.",
        detail: "Soft light, considered textures and a place to settle in as the evening unfolds.",
      },
      {
        name: "Private dining",
        description: "An occasion with its own setting.",
        detail:
          "A gathering with its own rhythm. Discuss the occasion, guest numbers and the details that make it yours.",
      },
    ],
    menu: [
      {
        name: "First light",
        description: "Tomato, peach, basil oil",
        price: "$24",
        category: "To begin",
      },
      {
        name: "Wood & earth",
        description: "Mushrooms, barley, aged cheese",
        price: "$34",
        category: "From the kitchen",
      },
      {
        name: "Coastline",
        description: "Roasted fish, leeks, herb broth",
        price: "$42",
        category: "From the kitchen",
      },
      {
        name: "Last light",
        description: "Dark chocolate, cherry, cream",
        price: "$16",
        category: "To finish",
      },
    ],
    industry: "fine-dining",
    theme: "fine-dining",
    image: "/images/collection/food-fine-dining.webp",
  },
] as const;
export type FoodTemplate = (typeof foodTemplates)[number];
export type FoodTemplateId = FoodTemplate["id"];
export function foodTemplate(id: string) {
  return foodTemplates.find((template) => template.id === id);
}
export function foodPagePath(page: string) {
  return page === "Home" ? "/" : `/${page.toLowerCase().replaceAll(" ", "-")}`;
}

/** Fictional Transport & Logistics demos; the canonical content, price and launch scope. */
export const transportTemplates = [
  {
    id: "courier-one-page",
    name: "One-page Courier",
    brand: "ZIP",
    subbrand: "LOCAL COURIER",
    price: 150,
    tier: "essential",
    industry: "courier",
    pages: ["Home"],
    theme: "courier-one-page",
    headline: "Small parcel.",
    emphasis: "Big momentum.",
    intro:
      "The documents, shop orders and everyday essentials that need to get across town. Start with the pickup, the destination and the details.",
    about:
      "Local delivery starts with a clear conversation. We confirm the item, access and timing before agreeing a collection and delivery plan.",
    imageAlt:
      "Illustrative yellow courier van on a sunlit residential street beside a hand truck and parcel",
    image: "/images/collection/transport-courier-one-page.webp",
    form: false,
    description:
      "An energetic yellow-and-ink one-page courier website with oversized typography, a parcel-inspired layout and a direct-contact journey.",
    services: [
      {
        name: "Local parcels",
        description: "From your door to theirs.",
        detail:
          "Share the parcel size, collection address and destination so the delivery requirements can be reviewed.",
      },
      {
        name: "Business runs",
        description: "Keep the working day moving.",
        detail:
          "Discuss documents, supplies and regular business deliveries with an agreed route and handover process.",
      },
      {
        name: "Shop to doorstep",
        description: "The last leg, considered.",
        detail:
          "Local retail delivery options are planned around item suitability, access and the recipient’s details.",
      },
    ],
    cta: "Talk delivery",
  },
  {
    id: "moving-company",
    name: "Moving Company",
    brand: "GOOD MOVE",
    subbrand: "MOVING & PACKING",
    price: 399,
    tier: "signature",
    industry: "moving",
    pages: ["Home", "Services", "Contact"],
    theme: "moving-company",
    headline: "Your next chapter.",
    emphasis: "A good move.",
    intro:
      "The boxes, the big pieces and the details between two front doors. A thoughtful moving plan begins with the way you live.",
    about:
      "Every move has its own shape. We talk through the spaces, the access and the things that need particular attention before agreeing the scope.",
    imageAlt:
      "Illustrative blue-and-cream moving truck outside a house with moving boxes at the entrance",
    image: "/images/collection/transport-moving-company.webp",
    form: false,
    description:
      "A warm coral-and-cream moving website with friendly boxed compositions, a packing checklist and three focused pages.",
    services: [
      {
        name: "Home moves",
        description: "From one home to the next.",
        detail:
          "Plan household items, building access and the sequence of the day around an agreed moving scope.",
      },
      {
        name: "Packing support",
        description: "A little order before the move.",
        detail:
          "Discuss which rooms and belongings need packing support, suitable materials and any special handling requirements.",
      },
      {
        name: "Small office moves",
        description: "Make room for what comes next.",
        detail:
          "Coordinate furniture, labelled equipment and access for a small workplace move; specialist items are assessed separately.",
      },
    ],
    cta: "Plan your move",
  },
  {
    id: "auto-transport",
    name: "Auto Transport",
    brand: "OVERLAND",
    subbrand: "VEHICLE TRANSPORT",
    price: 499,
    tier: "signature",
    industry: "vehicle-transport",
    pages: ["Home", "Transport", "How it works", "Contact"],
    theme: "auto-transport",
    headline: "The next mile.",
    emphasis: "Handled with intent.",
    intro:
      "A clear route from first conversation to vehicle handover. Tell us what is moving, where it needs to go and the dates you have in mind.",
    about:
      "Good vehicle transport planning makes the practical details visible: vehicle condition, collection access, route options and the handover process.",
    imageAlt: "Illustrative dark enclosed vehicle transporter in a modern industrial yard",
    image: "/images/collection/transport-auto-transport.webp",
    form: false,
    description:
      "A cinematic graphite, silver and ice-blue vehicle transport design with a route-led process, clear transport options and four complete pages.",
    services: [
      {
        name: "Personal vehicles",
        description: "A move beyond the driveway.",
        detail:
          "Share vehicle dimensions, condition and route details to discuss a suitable collection and transport plan.",
      },
      {
        name: "Dealer movements",
        description: "Connect the handovers.",
        detail:
          "Plan vehicle transfers between agreed locations with clear contacts, access instructions and handover requirements.",
      },
      {
        name: "Specialist requests",
        description: "Start with the vehicle.",
        detail:
          "Non-running, modified or unusual vehicles need an individual discussion of equipment, access and handling before a service is agreed.",
      },
    ],
    cta: "Discuss your vehicle",
  },
  {
    id: "equipment-rentals",
    name: "Equipment Rentals",
    brand: "YARD",
    subbrand: "EQUIPMENT RENTALS",
    price: 699,
    tier: "premier",
    industry: "equipment-rentals",
    pages: ["Home", "Equipment", "Rental guide", "About", "Contact"],
    theme: "equipment-rentals",
    headline: "Get the right kit.",
    emphasis: "Get to work.",
    intro:
      "A practical starting point for the tools and equipment your job needs. Explore the range, understand the rental steps and ask about suitability.",
    about:
      "The job comes first. We discuss the task, the site and operator requirements so equipment choices and rental conditions can be reviewed together.",
    imageAlt:
      "Illustrative orange compact excavator and construction equipment in an organized outdoor rental yard",
    image: "/images/collection/transport-equipment-rentals.webp",
    form: true,
    description:
      "A bold cream, olive and orange equipment website with a filterable illustrative catalogue, rental guidance and five complete pages.",
    services: [
      {
        name: "Groundwork equipment",
        description: "Start from the ground up.",
        detail:
          "Explore illustrative compact equipment categories and discuss the site, access and operator requirements for your task.",
      },
      {
        name: "Site essentials",
        description: "The supporting kit matters.",
        detail:
          "Consider compaction, power and other supporting equipment as part of the job’s overall rental requirements.",
      },
      {
        name: "Rental planning",
        description: "Make the details clear.",
        detail:
          "Confirm dates, availability, collection or delivery, operator requirements and rental terms directly before making arrangements.",
      },
    ],
    cta: "Discuss your equipment",
  },
  {
    id: "cold-chain",
    name: "Cold-chain Transport",
    brand: "POLARLINE",
    subbrand: "TEMPERATURE-CONTROLLED TRANSPORT",
    price: 699,
    tier: "premier",
    industry: "cold-chain",
    pages: ["Home", "Services", "Handling", "Coverage", "Contact"],
    theme: "cold-chain",
    headline: "Every degree.",
    emphasis: "Every detail.",
    intro:
      "Temperature-sensitive freight starts with a precise brief. Connect the product, handling instructions and delivery plan before the journey begins.",
    about:
      "We bring the shipment requirements into one conversation: the goods, the packaging, the agreed temperature range and the receiving arrangements.",
    imageAlt: "Illustrative white refrigerated truck at a clean blue-toned warehouse loading bay",
    image: "/images/collection/transport-cold-chain.webp",
    form: true,
    description:
      "A crisp ice-blue transport website with technical editorial layouts, an illustrative handling selector and five focused pages.",
    services: [
      {
        name: "Chilled freight",
        description: "Begin with the product brief.",
        detail:
          "Discuss the shipper’s specified range, packaging, loading conditions and receiving process before agreeing transport requirements.",
      },
      {
        name: "Frozen freight",
        description: "Plan the complete handover.",
        detail:
          "Confirm the product instructions, packaging and loading arrangements with the teams responsible for each stage.",
      },
      {
        name: "Planned distribution",
        description: "Connect each stop.",
        detail:
          "Review collection windows, delivery order and site access as part of a clearly scoped distribution plan.",
      },
    ],
    cta: "Discuss your shipment",
  },
  {
    id: "freight-logistics",
    name: "Freight & Logistics",
    brand: "MERIDIAN",
    subbrand: "FREIGHT & LOGISTICS",
    price: 999,
    tier: "flagship",
    industry: "freight",
    pages: ["Home", "Services", "Industries", "Network", "Shipment guide", "About", "Contact"],
    theme: "freight-logistics",
    headline: "A wider view.",
    emphasis: "A clearer way forward.",
    intro:
      "Connect the cargo, the route and the people behind every handover. Thoughtful freight planning for businesses with more moving parts.",
    about:
      "Freight is a chain of decisions. We start with the shipment brief and make space for the commercial priorities, access details and coordination each movement needs.",
    imageAlt:
      "Illustrative container truck at a harbour terminal with cranes and a cargo ship at dusk",
    image: "/images/collection/transport-freight-logistics.webp",
    form: true,
    description:
      "An expansive burgundy-and-copper logistics design with editorial service pages, an illustrative network explorer and a seven-page shipment journey.",
    services: [
      {
        name: "Road freight",
        description: "Build the movement around the load.",
        detail:
          "Review dimensions, weight, route and site access to discuss appropriate road transport options.",
      },
      {
        name: "Freight coordination",
        description: "Connect the next handover.",
        detail:
          "Bring the shipment brief, relevant contacts and agreed responsibilities together before confirming a movement.",
      },
      {
        name: "Distribution planning",
        description: "See the whole journey.",
        detail:
          "Plan recurring movements and multiple destinations around product requirements, receiving arrangements and the agreed service scope.",
      },
    ],
    cta: "Start a freight conversation",
  },
] as const;
export type TransportTemplate = (typeof transportTemplates)[number];
export type TransportTemplateId = TransportTemplate["id"];
export function transportTemplate(id: string) {
  return transportTemplates.find((template) => template.id === id);
}
export function transportPagePath(page: string) {
  return page === "Home" ? "/" : `/${page.toLowerCase().replaceAll(" ", "-")}`;
}

export const professionalTemplates = [
  {
    id: "consultant-one-page",
    name: "Independent Consultant",
    brand: "AVERY",
    subbrand: "INDEPENDENT CONSULTING",
    price: 150,
    tier: "essential",
    industry: "professional-services",
    pages: ["Home"],
    theme: "avery",
    headline: "A clearer view.",
    emphasis: "A practical next step.",
    intro:
      "For independent businesses ready to step back, untangle the moving parts and decide what comes next.",
    about:
      "A small, focused practice for owners who want a thoughtful sounding board. We start with your priorities, work through the detail and leave you with a plan you can actually use.",
    services: [
      {
        name: "Direction",
        description: "Turn competing ideas into a clear priority.",
        detail:
          "A focused conversation to identify your immediate priorities and decide what deserves attention first.",
      },
      {
        name: "Operations",
        description: "Make the everyday work feel more manageable.",
        detail: "Map the handoffs, routines and recurring problems that slow your team down.",
      },
      {
        name: "Next steps",
        description: "Give a good idea a practical place to start.",
        detail:
          "Bring actions, responsibilities and review points together in a concise working plan.",
      },
    ],
    principles: ["Listen carefully", "Make it clear", "Keep it practical"],
    image: "/images/collection/professional-boardroom.webp",
    imageAlt: "Illustrative daylight meeting space with blue-grey chairs and city views",
    form: false,
    description:
      "A focused one-page consultant website in soft lilac and ink, with an editorial introduction, expandable service notes and direct contact.",
  },
  {
    id: "bookkeeping",
    name: "Bookkeeping Studio",
    brand: "TALLY & CO.",
    subbrand: "BOOKKEEPING FOR SMALL BUSINESS",
    price: 399,
    tier: "signature",
    industry: "bookkeeping",
    pages: ["Home", "Services", "Contact"],
    theme: "tally",
    headline: "Less loose paper.",
    emphasis: "More peace of mind.",
    intro:
      "A considered approach to everyday bookkeeping. Clear records, a steady routine and a little more room to run your business.",
    about:
      "We like things organised, explained and easy to hand over. Our sample studio is built around a consistent monthly rhythm, with support shaped around your existing tools.",
    services: [
      {
        name: "Monthly bookkeeping",
        description: "A regular rhythm for your business records.",
        detail:
          "Transaction organisation, reconciliations and an agreed reporting handoff, based on the records you provide.",
      },
      {
        name: "Catch-up support",
        description: "Find a way through the backlog.",
        detail:
          "Start with a review of the records, agree a manageable scope and work through the outstanding periods.",
      },
      {
        name: "Year-end preparation",
        description: "A clearer handoff to your accountant.",
        detail:
          "Organise the agreed records and supporting files for your accountant. Tax filing and assurance services are not implied.",
      },
    ],
    principles: ["Collect", "Reconcile", "Review"],
    image: "/images/collection/professional-boardroom.webp",
    imageAlt: "Illustrative daylight meeting space with blue-grey chairs and city views",
    form: false,
    description:
      "A warm three-page bookkeeping website in sage, cream and coral, with a month-end checklist, clear services and direct contact.",
  },
  {
    id: "accounting",
    name: "Corporate Accounting",
    brand: "NORTHLINE",
    subbrand: "ACCOUNTING & ADVISORY",
    price: 499,
    tier: "signature",
    industry: "accounting",
    pages: ["Home", "Services", "About", "Contact"],
    theme: "northline",
    headline: "Know where you stand.",
    emphasis: "Plan your next move.",
    intro:
      "Accounting support with a clear view of your business. Thoughtful communication, organised information and a straightforward way forward.",
    about:
      "A professional practice with space for your real qualifications, people and service scope. This demonstration focuses on the client journey rather than invented credentials or financial results.",
    services: [
      {
        name: "Business accounting",
        description: "Bring structure to the financial picture.",
        detail:
          "Ongoing accounting and reporting needs are reviewed with the client and matched to an agreed engagement.",
      },
      {
        name: "Planning conversations",
        description: "Put your next decision in context.",
        detail:
          "A place to discuss upcoming changes, reporting priorities and what information your business needs.",
      },
      {
        name: "Owner support",
        description: "Make the detail easier to navigate.",
        detail:
          "A clear point of contact for owners, with a practical plan for documents, deadlines and follow-up.",
      },
    ],
    principles: ["Understand the business", "Agree the scope", "Keep the conversation open"],
    image: "/images/collection/professional-boardroom.webp",
    imageAlt: "Illustrative daylight meeting space with blue-grey chairs and city views",
    form: false,
    description:
      "A four-page accounting website in corporate blue, white and slate, with a service selector, practice story and direct contact.",
  },
  {
    id: "creative-consultancy",
    name: "Creative Business Consultancy",
    brand: "OFFSCRIPT",
    subbrand: "STRATEGY / POSITIONING / DIRECTION",
    price: 699,
    tier: "premier",
    industry: "professional-services",
    pages: ["Home", "Services", "Approach", "Contact"],
    theme: "offscript",
    headline: "Good ideas need",
    emphasis: "somewhere to go.",
    intro:
      "For businesses with a lot of possibility and one question: what next? Let’s turn the big thinking into something you can put to work.",
    about:
      "We connect the way your business thinks with the way it shows up. A working session becomes a point of view, a clearer offer and a plan with somewhere to begin.",
    services: [
      {
        name: "Find your focus",
        description: "A sharper point of view.",
        detail:
          "Explore your audience, your offer and the reasons someone should choose your business. Leave with a focused direction.",
      },
      {
        name: "Shape the story",
        description: "A message that sounds like you.",
        detail:
          "Connect your positioning to the language, customer journey and creative brief that guide the next stage.",
      },
      {
        name: "Make a plan",
        description: "From possibility to priorities.",
        detail:
          "Build an achievable sequence of decisions and actions, with owners and review points agreed together.",
      },
    ],
    principles: ["Question the obvious", "Connect the pieces", "Make the next move"],
    image: "/images/collection/professional-boardroom.webp",
    imageAlt: "Illustrative daylight meeting space with blue-grey chairs and city views",
    form: true,
    description:
      "An expressive four-page consultancy website with oversized typography, acid yellow accents, a priority selector and enquiry-form setup.",
  },
  {
    id: "boutique-law",
    name: "Boutique Law Firm",
    brand: "VALE & ROWE",
    subbrand: "A CONSIDERED LEGAL PRACTICE",
    price: 699,
    tier: "premier",
    industry: "legal",
    pages: ["Home", "Practice", "Firm", "FAQs", "Contact"],
    theme: "vale",
    headline: "Clarity for the",
    emphasis: "decisions that matter.",
    intro:
      "A calm, considered introduction to legal support for individuals and businesses. Start with a conversation about the right next step.",
    about:
      "A more personal presentation for an independent practice. Clear service information, an approachable introduction and a discreet enquiry journey help visitors understand how to begin.",
    services: [
      {
        name: "Business matters",
        description: "Support for the business you are building.",
        detail:
          "A space to explain the business services your licensed practice actually offers, and how an initial scope discussion works.",
      },
      {
        name: "Property matters",
        description: "A clear starting point for your next move.",
        detail:
          "Introduce the property services within your practice, the information needed to assess an enquiry and the next steps.",
      },
      {
        name: "Personal planning",
        description: "Room for a thoughtful conversation.",
        detail:
          "Explain relevant planning services in approachable terms, with the scope and professional requirements reviewed before publication.",
      },
    ],
    principles: [
      "An initial conversation",
      "A clearly agreed engagement",
      "Considered communication",
    ],
    image: "/images/collection/professional-law-office.webp",
    imageAlt: "Illustrative stone and walnut reception for a fictional law practice",
    form: true,
    description:
      "A five-page boutique law website in oxblood, parchment and bronze, with architectural imagery, practice information, FAQs and enquiry-form setup.",
  },
  {
    id: "corporate-law",
    name: "Full-service Law Firm",
    brand: "AXIOM",
    subbrand: "LEGAL / BUSINESS / PERSPECTIVE",
    price: 999,
    tier: "flagship",
    industry: "legal",
    pages: ["Home", "Practice", "Firm", "Approach", "Resources", "FAQs", "Contact"],
    theme: "axiom",
    headline: "Perspective for",
    emphasis: "what comes next.",
    intro:
      "Clear thinking for complex business moments. Explore a practice built around careful understanding, practical communication and the right next conversation.",
    about:
      "An expansive design for a firm with several practice areas and a distinct point of view. Structured service information, a firm story and a useful resource library make the depth of the practice easy to explore.",
    services: [
      {
        name: "Corporate & commercial",
        description: "The business behind the decision.",
        detail:
          "Describe your commercial practice, the kinds of matters you handle and the process for an initial discussion.",
      },
      {
        name: "Property & projects",
        description: "A broader view of what is at stake.",
        detail:
          "Introduce the property and project work within your firm’s actual practice and jurisdiction.",
      },
      {
        name: "Workplace matters",
        description: "People, responsibilities and change.",
        detail:
          "Explain your workplace practice in plain language, without turning general site information into individual legal advice.",
      },
      {
        name: "Dispute resolution",
        description: "A considered way forward.",
        detail:
          "Present your approach to evaluating a matter, communication and next steps, without promising a particular result.",
      },
    ],
    principles: ["Understand the context", "Define the engagement", "Work with perspective"],
    image: "/images/collection/professional-law-office.webp",
    imageAlt: "Illustrative stone and walnut reception for a fictional law practice",
    form: true,
    description:
      "A seven-page law firm website in midnight blue and copper, with a practice explorer, resource library, firm story, approach, FAQs and enquiry-form setup.",
  },
] as const;
export type ProfessionalTemplate = (typeof professionalTemplates)[number];
export type ProfessionalTemplateId = ProfessionalTemplate["id"];
export function professionalTemplate(id: string) {
  return professionalTemplates.find((template) => template.id === id);
}
export function professionalPagePath(page: string) {
  return page === "Home" ? "/" : `/${page.toLowerCase()}`;
}

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
  ...professionalTemplates.map((template): WebsiteDesign => ({
    id: template.id,
    status: "concept",
    name: template.name,
    tier: template.tier,
    industry: template.industry,
    description: template.description,
    startingPriceCad: template.price,
    pageCount: template.pages.length,
    contactMode: template.form ? "enquiry-form" : "direct",
    deliveryWindow: "Timing agreed after your content and scope are confirmed.",
    demoUrl: `/website-collection/${template.id}#preview`,
    included: [
      template.pages.length === 1
        ? "One page: introduction, up to three services, about and direct-contact sections"
        : `${template.pages.length} pages: ${template.pages.join(", ")}`,
      "Your supplied logo, colours, business information and images implemented in the code",
      "Responsive layout, keyboard navigation and reduced-motion support",
      "Page titles, descriptions, social metadata and launch security configuration",
      ...(template.form
        ? [
            "Standard enquiry form setup: one inbox, Resend, sending-domain configuration, spam controls and an initial delivery test",
          ]
        : ["Direct phone and email contact; an existing external scheduling link can be added"]),
      "Personalization and launch within this template’s agreed scope",
    ],
    customization: [
      "Additional pages, custom functionality and third-party integrations quoted separately",
      "Original copywriting, photography, videography and ongoing care scoped separately",
      ...(template.industry === "legal" || template.industry === "accounting"
        ? [
            "Professional credentials, service descriptions and required practice disclosures supplied and approved by your business",
          ]
        : []),
    ],
    concept: {
      theme: "professional",
      brands: [template.brand, template.brand],
      headlines: [`${template.headline} ${template.emphasis}`, template.headline],
      subcopy: template.intro,
      kicker: template.subbrand,
      action: "Start a conversation",
      photo: { src: template.image, alt: template.imageAlt, width: 1536, height: 1024 },
      services: template.services,
      approach: template.about,
    },
  })),
  ...retailTemplates.map((template): WebsiteDesign => ({
    id: template.id,
    status: "concept",
    name: template.name,
    tier: template.tier,
    industry: template.industry,
    additionalIndustries: [
      ["mobile-detailing", "auto-repair", "wheel-studio"].includes(template.id)
        ? "automotive"
        : "retail",
    ],
    description: template.description,
    startingPriceCad: template.price,
    pageCount: template.pages.length,
    contactMode: template.form ? "enquiry-form" : "direct",
    deliveryWindow: "Timing agreed after your content and scope are confirmed.",
    demoUrl: `/website-collection/${template.id}#preview`,
    included: [
      template.pages.length === 1
        ? "One page: introduction, up to three services, about and direct-contact sections"
        : `${template.pages.length} pages: ${template.pages.join(", ")}`,
      "Your supplied logo, colours, business information and images implemented in the code",
      "Your supplied products, services, descriptions and prices as static initial content within the agreed page scope",
      "Responsive layout, keyboard navigation and reduced-motion support",
      "Page titles, descriptions, social metadata and launch security configuration",
      ...(template.form
        ? [
            "Standard enquiry form setup: one inbox, Resend, sending-domain configuration, field validation, spam controls and an initial delivery test",
          ]
        : [
            "Direct phone and email contact; an existing external booking or store link can be added",
          ]),
      "Personalization and launch within this template’s agreed scope",
    ],
    customization: [
      "Additional pages, original copywriting, photography, videography and ongoing care scoped separately",
      "E-commerce checkout, stock systems, bookings, payments, POS, vehicle fitment databases and other connected workflows are separately scoped",
      "Your business supplies and approves product and service information, prices, materials, care guidance, credentials, availability and content usage rights",
      "Sample items, prices, locations and enquiry interactions are illustrative; these static demos do not accept orders, bookings or payments, confirm stock or provide vehicle fitment advice",
    ],
    concept: {
      theme: "retail",
      brands: [template.brand, template.brand],
      headlines: [`${template.headline} ${template.emphasis}`, template.headline],
      subcopy: template.intro,
      kicker: template.subbrand,
      action: "Start a conversation",
      photo: { src: template.image, alt: template.imageAlt, width: 1536, height: 1024 },
      services: template.services,
      approach: template.about,
    },
  })),
  ...foodTemplates.map((template): WebsiteDesign => ({
    id: template.id,
    status: "concept",
    name: template.name,
    tier: template.tier,
    industry: template.industry,
    description: template.description,
    startingPriceCad: template.price,
    pageCount: template.pages.length,
    contactMode: template.form ? "enquiry-form" : "direct",
    deliveryWindow: "Timing agreed after your content and scope are confirmed.",
    demoUrl: `/website-collection/${template.id}#preview`,
    included: [
      template.pages.length === 1
        ? "One page: introduction, up to three menu items, about and direct-contact sections"
        : `${template.pages.length} pages: ${template.pages.join(", ")}`,
      "Your supplied logo, colours, business information and images implemented in the code",
      "Your supplied menu and prices as static initial content within the agreed page scope",
      "Responsive layout, keyboard navigation and reduced-motion support",
      "Page titles, descriptions, social metadata and launch security configuration",
      ...(template.form
        ? [
            "Standard enquiry form setup: one inbox, Resend, sending-domain configuration, field validation, spam controls and an initial delivery test",
          ]
        : [
            "Direct phone and email contact; an existing external booking or ordering link can be added",
          ]),
      "Personalization and launch within this template’s agreed scope",
    ],
    customization: [
      "Additional pages, original copywriting, photography, videography and ongoing care scoped separately",
      "Online ordering, payments, reservations, POS, delivery integrations and other connected workflows are separately scoped",
      "Your business supplies and approves menus, prices, ingredient and allergen information, dietary descriptions, opening details and content usage rights",
      "Sample menus, prices, hours, locations and enquiry interactions are illustrative; these static demos do not accept orders, bookings, payments or reservations",
    ],
    concept: {
      theme: "food",
      brands: [template.brand, template.brand],
      headlines: [`${template.headline} ${template.emphasis}`, template.headline],
      subcopy: template.intro,
      kicker: template.subbrand,
      action: "Start a conversation",
      photo: { src: template.image, alt: template.imageAlt, width: 1536, height: 1024 },
      services: template.services,
      approach: template.about,
    },
  })),
  ...transportTemplates.map((template): WebsiteDesign => ({
    id: template.id,
    status: "concept",
    name: template.name,
    tier: template.tier,
    industry: template.industry,
    description: template.description,
    startingPriceCad: template.price,
    pageCount: template.pages.length,
    contactMode: template.form ? "enquiry-form" : "direct",
    deliveryWindow: "Timing agreed after your content and scope are confirmed.",
    demoUrl: `/website-collection/${template.id}#preview`,
    included: [
      template.pages.length === 1
        ? "One page: introduction, up to three services, about and direct-contact sections"
        : `${template.pages.length} pages: ${template.pages.join(", ")}`,
      "Your supplied logo, colours, business information and images implemented in the code",
      "Responsive layout, keyboard navigation and reduced-motion support",
      "Page titles, descriptions, social metadata and launch security configuration",
      ...(template.form
        ? [
            "Standard enquiry form setup: one inbox, Resend, sending-domain configuration, field validation, spam controls and an initial delivery test",
          ]
        : ["Direct phone and email contact; an existing external booking link can be added"]),
      "Personalization and launch within this template’s agreed scope",
    ],
    customization: [
      "Additional pages, original copywriting, photography, videography and ongoing care scoped separately",
      "Shipment tracking, live rates, booking, payments, fleet systems, rental inventory and customer portals are separately scoped integrations",
      "Your business supplies and approves coverage, service claims, credentials, operating requirements and usage rights for all content",
      "Sample routes, equipment, handling information and shipment interactions are illustrative; the static demo provides no live tracking, availability, booking or temperature data",
    ],
    concept: {
      theme: "transport",
      brands: [template.brand, template.brand],
      headlines: [`${template.headline} ${template.emphasis}`, template.headline],
      subcopy: template.intro,
      kicker: template.subbrand,
      action: "Start a conversation",
      photo: { src: template.image, alt: template.imageAlt, width: 1536, height: 1024 },
      services: template.services,
      approach: template.about,
    },
  })),
  ...homePropertyTemplates.map((template): WebsiteDesign => ({
    id: template.id,
    status: "concept",
    name: template.name,
    tier: template.tier,
    industry: template.industry,
    description: template.description,
    startingPriceCad: template.price,
    pageCount: template.pages.length,
    contactMode: template.form ? "enquiry-form" : "direct",
    deliveryWindow: "Timing agreed after your content and scope are confirmed.",
    demoUrl: `/website-collection/${template.id}#preview`,
    included: [
      template.pages.length === 1
        ? "One page: introduction, up to three services, about and direct-contact sections"
        : `${template.pages.length} pages: ${template.pages.join(", ")}`,
      "Your supplied logo, colours, business information and images implemented in the code",
      "Responsive layout, keyboard navigation and reduced-motion support",
      "Page titles, descriptions, social metadata and launch security configuration",
      ...(template.form
        ? [
            "Standard enquiry form setup: one inbox, Resend, sending-domain configuration, spam controls and an initial delivery test",
          ]
        : ["Direct phone and email contact; an existing external scheduling link can be added"]),
      "Personalization and launch within this template’s agreed scope",
    ],
    customization: [
      "Additional pages, custom functionality and third-party integrations quoted separately",
      "Original copywriting, photography, videography and ongoing care scoped separately",
      "Your business supplies and approves its service claims, credentials and usage rights for all content",
      ...(template.id === "property-management" || template.id === "real-estate"
        ? [
            "Static property content within the agreed initial scope; live listing feeds, MLS/IDX, resident portals, applications, payments and custom workflows are separate projects",
          ]
        : []),
    ],
    concept: {
      theme: "home-property",
      brands: [template.brand, template.brand],
      headlines: [`${template.headline} ${template.emphasis}`, template.headline],
      subcopy: template.intro,
      kicker: template.subbrand,
      action: "Start a conversation",
      photo: { src: template.image, alt: template.imageAlt, width: 1536, height: 1024 },
      services: template.services,
      approach: template.about,
    },
  })),
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
