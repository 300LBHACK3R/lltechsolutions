/* -------------------------------------------------------------------------- */
/* Core configuration                                                         */
/* -------------------------------------------------------------------------- */

const DEFAULT_SITE_DOMAIN = "https://example.com";

const BOOKING_URL = "/contact/#booking";

const PHONE_DISPLAY = "202-555-0100";

const PHONE_E164 = "+12025550100";

function normalizeSiteDomain(value: string | undefined): string {
  const candidate = value?.trim() || DEFAULT_SITE_DOMAIN;

  try {
    const parsedUrl = new URL(candidate);

    if (
      (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") ||
      parsedUrl.username.length > 0 ||
      parsedUrl.password.length > 0
    ) {
      return DEFAULT_SITE_DOMAIN;
    }

    return parsedUrl.origin;
  } catch {
    return DEFAULT_SITE_DOMAIN;
  }
}

const siteDomain = normalizeSiteDomain(process.env.NEXT_PUBLIC_SITE_URL);

/* -------------------------------------------------------------------------- */
/* Public configuration types                                                 */
/* -------------------------------------------------------------------------- */

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLinks = {
  facebook: string;
  instagram: string;
  google: string;
};

export type OpeningHoursEntry = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  opens: string | null;
  closes: string | null;
  isByRequest: boolean;
};

export type SiteAssetConfig = {
  logo: string;
  logoMark: string;
  openGraphImage: string;
  openGraphImageAlt: string;
  heroImage: string;
  heroImageAlt: string;
  detailImage: string;
  detailImageAlt: string;
};

export type DirectBillingConfig = {
  enabled: boolean;
  providerListStatus: "pending-client-confirmation" | "partially-confirmed" | "confirmed";
  providers: string[];
  heading: string;
  summary: string;
  disclaimer: string;
  placeholder: string;
};

export type TippingPolicyConfig = {
  acceptsTips: boolean;
  heading: string;
  statement: string;
};

export type PaymentMethod = {
  name: "Debit" | "E-transfer" | "Credit card";
  preferred: boolean;
  note?: string;
};

export type PaymentConfig = {
  heading: string;
  summary: string;
  methods: PaymentMethod[];
};

export type WaitlistConfig = {
  enabled: boolean;
  heading: string;
  description: string;
  buttonLabel: string;
  href: string;
  method: "text";
  requestPrompt: string;
};

export type SiteConfig = {
  demoMode: boolean;
  businessName: string;
  legalName: string;
  currentName: string;
  description: string;
  locale: "en-CA";
  currency: "CAD";
  location: string;
  primaryCity: string;
  secondaryCity: string;
  region: string;
  country: string;
  countryCode: "CA";
  phone: string;
  phoneE164: string;
  email: string;
  bookingProvider: string;
  bookingUrl: string;
  domain: string;
  hours: string[];
  openingHours: OpeningHoursEntry[];
  addressNote: string;
  futureLocationNote: string;
  directBilling: DirectBillingConfig;
  payment: PaymentConfig;
  tippingPolicy: TippingPolicyConfig;
  waitlist: WaitlistConfig;
  assets: SiteAssetConfig;
  social: SocialLinks;
};

export type ServiceStatus = "active" | "planned" | "paused";

export type Service = {
  slug: string;
  name: string;
  status: ServiceStatus;
  featured: boolean;
  displayOrder: number;
  isSignature: boolean;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  video: string;
  videoPoster: string;
  videoLabel: string;
  duration: string;
  price: string;
  bestFor: string[];
  pressure: string;
  what: string;
  who: string;
  style: string;
  includes: string[];
  notes: string[];
};

export type PricingItem = {
  duration: string;
  price: string;
};

export type PricingGroup = {
  name: string;
  serviceSlug?: string;
  note?: string;
  prices: PricingItem[];
};

export type FaqCategory =
  | "location"
  | "availability"
  | "experience"
  | "booking"
  | "services"
  | "pricing"
  | "billing"
  | "payments"
  | "policies";

export type FaqItem = {
  question: string;
  answer: string;
  category?: FaqCategory;
};

export type TrustSignal = {
  label: string;
  title: string;
  text: string;
};

export type BookingSupportItem = {
  id: "direct-billing" | "payment-methods" | "no-tipping" | "earlier-opening";
  eyebrow: string;
  title: string;
  text: string;
  buttonLabel?: string;
  href?: string;
};

export type PricingNotice = {
  id: string;
  title: string;
  text: string;
};

export type ClientReflection = {
  id: string;
  quote: string;
  label: string;
  attribution?: string;
  source: "Google" | "Direct";
  sourceUrl?: string;
  isApproved: boolean;
  approvedAt?: string;
};

export type PricingReview = {
  status: "not-required" | "pending-client-decision" | "approved";
  currentPricingSince: number;
  note: string;
};

export type AdditionalServicePlanning = {
  status: "awaiting-client-details" | "ready-for-review" | "approved";
  requestedInformation: string[];
  note: string;
};

/* -------------------------------------------------------------------------- */
/* Public business configuration                                              */
/* -------------------------------------------------------------------------- */

export const siteConfig: SiteConfig = {
  // Set false only after replacing all sample content and destinations.
  demoMode: true,
  businessName: "Cedar House Wellness",
  legalName: "Your practitioner",
  currentName: "Cedar House Wellness",
  description:
    "Personalized massage and body-care services in Your Neighbourhood, Your City, including customized massage, signature sensory care, Seasonal Body Renewal salt-scrub treatment, and recovery-focused cupping.",
  locale: "en-CA",
  currency: "CAD",
  location: "Your Neighbourhood, Your City, Your Region",
  primaryCity: "Your City",
  secondaryCity: "Nearby Town",
  region: "Your Region",
  country: "Canada",
  countryCode: "CA",
  phone: PHONE_DISPLAY,
  phoneE164: PHONE_E164,
  email: "hello@example.com",
  bookingProvider: "your booking provider",
  bookingUrl: BOOKING_URL,
  domain: siteDomain,
  hours: [
    "Tuesday 10:00 AM–4:30 PM",
    "Wednesday 10:00 AM–4:30 PM",
    "Thursday 10:00 AM–4:30 PM",
    "Friday 10:00 AM–4:30 PM",
    "Saturday, Sunday, and Monday may be available by request.",
  ],
  openingHours: [
    {
      day: "Monday",
      opens: null,
      closes: null,
      isByRequest: true,
    },
    {
      day: "Tuesday",
      opens: "10:00",
      closes: "16:30",
      isByRequest: false,
    },
    {
      day: "Wednesday",
      opens: "10:00",
      closes: "16:30",
      isByRequest: false,
    },
    {
      day: "Thursday",
      opens: "10:00",
      closes: "16:30",
      isByRequest: false,
    },
    {
      day: "Friday",
      opens: "10:00",
      closes: "16:30",
      isByRequest: false,
    },
    {
      day: "Saturday",
      opens: null,
      closes: null,
      isByRequest: true,
    },
    {
      day: "Sunday",
      opens: null,
      closes: null,
      isByRequest: true,
    },
  ],
  addressNote:
    "Located in Your Neighbourhood, Your City. Exact appointment details are shared privately through the booking process.",
  futureLocationNote: "Replace all sample location information before publication.",
  directBilling: {
    enabled: false,
    providerListStatus: "pending-client-confirmation",
    providers: ["Add your verified provider list here"],
    heading: "Insurance & Billing",
    summary:
      "Sample billing section: add the payment and coverage information that applies to your practice.",
    disclaimer: "No insurance acceptance or coverage is represented by this sample website.",
    placeholder: "Confirm and publish your provider list before launch.",
  },
  payment: {
    heading: "Payment Options",
    summary:
      "Debit and e-transfer are preferred. Credit-card payment can also be accepted when needed.",
    methods: [
      {
        name: "Debit",
        preferred: true,
      },
      {
        name: "E-transfer",
        preferred: true,
      },
      {
        name: "Credit card",
        preferred: false,
        note: "Contact your practitioner before your appointment if credit card is your preferred payment method.",
      },
    ],
  },
  tippingPolicy: {
    acceptsTips: false,
    heading: "No Tipping Expected",
    statement:
      "No tipping is expected or accepted. All listed treatment prices are before GST; applicable GST is added to the listed rate.",
  },
  waitlist: {
    enabled: true,
    heading: "Can’t find a time that works?",
    description:
      "Request an earlier opening and your practitioner can contact you if a cancellation becomes available or additional appointment times are opened.",
    buttonLabel: "Request an Earlier Opening",
    href: "/contact/#sample-contact",
    method: "text",
    requestPrompt:
      "Clients should include their preferred days, approximate times, appointment length, and best contact number.",
  },
  assets: {
    logo: "/brand/cedar-wordmark.svg",
    logoMark: "/brand/cedar-mark.svg",
    openGraphImage: "/images/massage-room.webp",
    openGraphImageAlt: "Illustrative wellness interior used in this sample website",
    heroImage: "/images/massage-room.webp",
    heroImageAlt: "Illustrative massage room; sample imagery",
    detailImage: "/images/medical-spa-interior.webp",
    detailImageAlt: "Illustrative spa interior; no client premises or practitioner pictured",
  },
  social: {
    facebook: "",
    instagram: "",
    google: "",
  },
};

/* -------------------------------------------------------------------------- */
/* Navigation and brand presentation                                          */
/* -------------------------------------------------------------------------- */

export const developerCredit = {
  label: "Fictional sample practice · Editable source edition",
  name: "Cedar House Wellness",
  url: "",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];
/**
 * These are visible premium trust signals, not generic keyword tags.
 * Replace these illustrative policies with your approved practice content.
 */

/* -------------------------------------------------------------------------- */
/* Service catalogue and media assignments                                    */
/* -------------------------------------------------------------------------- */

export const services: Service[] = [
  {
    slug: "massage",
    name: "Massage",
    status: "active",
    featured: true,
    displayOrder: 1,
    isSignature: false,
    description:
      "A customized, client-led massage that can be therapeutic, relaxation-focused, prenatal or postnatal, youth-friendly, general wellness-focused, or targeted to specific areas.",
    longDescription:
      "Massage is your practitioner’s main customizable treatment. Clients choose the appointment length, then the session is shaped around what they need that day. It can include focused therapeutic work, slower relaxation-focused care, pregnancy or postpartum positioning, youth appointments, sports or work-related tension, general maintenance, or a blend of approaches. your practitioner begins with a clear intake conversation and adjusts pressure, pace, positioning, and focus throughout the appointment.",
    image: "/images/massage-room.webp",
    imageAlt: "Illustrative wellness room; sample image",
    video: "",
    videoPoster: "/images/massage-room.webp",
    videoLabel: "Illustrative wellness space",
    duration: "30, 45, 60, 75, 90, or 120 minutes",
    price: "$60–$205 + GST",
    bestFor: [
      "Therapeutic or relaxation-focused care",
      "Customized pressure and focus areas",
      "Pregnancy-aware, youth, and general wellness needs",
    ],
    pressure:
      "Fully customizable. your practitioner’s natural style is firm, broad, flowing, and thorough, but pressure can be adjusted from very light and calming to stronger focused work.",
    what: "A flexible massage appointment that can include therapeutic work, relaxation-focused care, prenatal or postnatal adaptations, youth appointments, sports or work-related tension, general maintenance, or focused treatment for selected areas.",
    who: "Clients who want one flexible massage service that is adapted to their comfort, pressure preferences, treatment goals, and changing day-to-day needs.",
    style:
      "Client-led, adaptable, and flowing. Pressure, pace, positioning, and treatment focus are adjusted according to the client’s needs and feedback.",
    includes: [
      "A clear intake conversation before hands-on treatment begins",
      "Customized pressure, pacing, positioning, and focus areas",
      "Therapeutic or relaxation-focused treatment depending on the client",
      "Cupping and/or hot stones at no extra cost when appropriate and requested",
      "A talk-free environment when the client wants to fully unplug and relax",
      "Pregnancy and postpartum positioning when appropriate",
      "Youth appointments introduced gradually and respectfully",
      "Ongoing communication and adjustments throughout the appointment",
    ],
    notes: [
      "The booked treatment time begins when hands-on treatment starts.",
      "Clients are encouraged to communicate what they enjoy, dislike, need, or want adjusted.",
      "Clients wanting a slower, lighter, more relaxation-focused treatment can request that within Massage.",
      "Child and youth bookings should be discussed with your practitioner before booking so consent, comfort, timing, and expectations are clear.",
      siteConfig.tippingPolicy.statement,
    ],
  },
  {
    slug: "sensory-massage",
    name: "Sensory Massage",
    status: "active",
    featured: true,
    displayOrder: 2,
    isSignature: true,
    description:
      "your practitioner’s signature light-touch service with optional scalp massage, hair brushing or hair play, neck and shoulder care, arm work, gentle back scratches, tracing, and calming sensory touch.",
    longDescription:
      "Sensory Massage is your practitioner’s signature gentle-care service for clients who want a peaceful, light-touch experience rather than traditional deeper pressure. Its slow, repetitive sensory elements may also appeal to clients who enjoy ASMR-style relaxation.",
    image: "/images/massage-room.webp",
    imageAlt: "Illustrative wellness room; sample image",
    video: "",
    videoPoster: "/images/massage-room.webp",
    videoLabel: "Illustrative wellness space",
    duration: "45, 60, 75, 90, or 120 minutes",
    price: "$80–$205 + GST",
    bestFor: [
      "A quiet sensory reset",
      "Light-touch relaxation",
      "Scalp, hair, and upper-body care",
    ],
    pressure:
      "Very light to gentle pressure. Slow, calm, symmetrical, professional, and fully client-led.",
    what: "A professional sensory massage that may include scalp massage, hair brushing or hair play, gentle back scratches, symmetrical tracing, soft neck and shoulder work, arm care, and calming sensory tools.",
    who: "Clients who want a gentle, peaceful appointment with less traditional massage pressure and more light-touch, scalp, hair, back, neck, shoulder, or arm-focused care.",
    style:
      "Gentle, slow, supportive, quiet, and sensory-focused. Every technique can be included, adjusted, or omitted according to the client’s comfort.",
    includes: [
      "Gentle back, neck, shoulder, and arm work",
      "Slow scalp massage",
      "Optional hair brushing or hair play",
      "Optional gentle back scratches",
      "Optional symmetrical tracing or calming sensory tools",
      "Client-led customization throughout the appointment",
    ],
    notes: [
      "This is a professional wellness service with clear treatment boundaries.",
      "Clients can request more, less, or none of any sensory technique.",
      "The appointment can remain very quiet when that is what the client prefers.",
      siteConfig.tippingPolicy.statement,
    ],
  },
  {
    slug: "seasonal-body-renewal",
    name: "Seasonal Body Renewal",
    status: "active",
    featured: true,
    displayOrder: 3,
    isSignature: false,
    description:
      "A seasonal salt-or-sugar body scrub, private rinse, optional dry brushing, and moisturizing finish designed to leave the skin feeling refreshed and smooth.",
    longDescription:
      "Seasonal Body Renewal is a spa-inspired body-care treatment built around exfoliation, a private rinse, and a moisturizing finish. The treatment may include a seasonal sugar- or salt-style scrub and dry brushing before the client receives private time to rinse, followed by a soothing cocoa-butter application.",
    image: "/images/massage-room.webp",
    imageAlt: "Illustrative wellness room; sample image",
    video: "",
    videoPoster: "/images/massage-room.webp",
    videoLabel: "Illustrative wellness space",
    duration: "75 minutes",
    price: "Introductory price $105 + GST",
    bestFor: ["Seasonal body care", "Full-body exfoliation", "A refreshed, moisturized finish"],
    pressure:
      "Moderate exfoliating pressure, adjusted for comfort. The treatment may feel invigorating while remaining professional and client-led.",
    what: "A seasonal body-care treatment combining exfoliating scrub, optional dry brushing, private rinse time, and a soothing cocoa-butter application.",
    who: "Clients who enjoy spa-style exfoliation or want a refreshing seasonal body-care appointment with a smooth, moisturized finish.",
    style: "Rhythmic, exfoliating, refreshing, spa-inspired, and professionally paced.",
    includes: [
      "Seasonal full-body sugar- or salt-style scrub",
      "Dry brushing when appropriate",
      "Private time to rinse",
      "Soothing cocoa-butter application",
      "Seasonal product selections that may change throughout the year",
    ],
    notes: [
      "This is a cosmetic body-care service and is not a replacement for medical skin care.",
      "Clients with sensitive skin, irritation, allergies, or skin concerns should discuss them before booking.",
      siteConfig.tippingPolicy.statement,
    ],
  },
  {
    slug: "cup-and-buff",
    name: "Cup & Buff",
    status: "active",
    featured: true,
    displayOrder: 4,
    isSignature: false,
    description:
      "Massage, heated silicone cupping, and vibration work combined into a stronger, recovery-focused treatment.",
    longDescription:
      "Cup & Buff combines massage, heated silicone cups, moving or temporarily parked cups when appropriate, and broad vibration work across larger muscle groups and selected areas of tension. The treatment is designed for clients who enjoy a stronger, warmer, more active style of bodywork while remaining adjustable and client-led.",
    image: "/images/massage-room.webp",
    imageAlt: "Illustrative wellness room; sample image",
    video: "",
    videoPoster: "/images/massage-room.webp",
    videoLabel: "Illustrative wellness space",
    duration: "45, 60, 75, or 90 minutes",
    price: "$80–$155 + GST",
    bestFor: [
      "Active and high-tension clients",
      "Gym, sport, and physical-work recovery",
      "Clients who enjoy stronger treatment work",
    ],
    pressure:
      "Moderate to vigorous, adjusted to the client. Intended for clients who enjoy stronger, warmer, and more active treatment work.",
    what: "A targeted treatment blending massage, heated silicone cupping, moving cups, temporarily parked cups when appropriate, and broad vibration work.",
    who: "Active clients, gym-goers, athletes, labourers, tradespeople, and clients who prefer a stronger treatment experience.",
    style:
      "Active, strong, warm, rhythmic, and focused on high-tension areas while remaining adjustable and client-led.",
    includes: [
      "Massage warm-up",
      "Heated silicone cupping",
      "Moving cup work",
      "Temporarily parked cups when appropriate",
      "Broad vibration work",
      "Focused treatment for selected areas",
    ],
    notes: [
      "Cupping may leave temporary marks.",
      "This service may not suit every client. your practitioner can recommend a gentler option when appropriate.",
      "Clients should communicate discomfort or request adjustments at any time.",
      siteConfig.tippingPolicy.statement,
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Pricing                                                                    */
/* -------------------------------------------------------------------------- */

const standardMassagePrices: PricingItem[] = [
  { duration: "30 min", price: "$60 + GST" },
  { duration: "45 min", price: "$80 + GST" },
  { duration: "60 min", price: "$105 + GST" },
  { duration: "75 min", price: "$130 + GST" },
  { duration: "90 min", price: "$155 + GST" },
  { duration: "120 min", price: "$205 + GST" },
];

export const pricingGroups: PricingGroup[] = [
  {
    name: "Massage",
    serviceSlug: "massage",
    note: "Customized, client-led massage that can be therapeutic, relaxation-focused, prenatal or postnatal, youth-friendly, general wellness-focused, or targeted to specific areas.",
    prices: standardMassagePrices,
  },
  {
    name: "Sensory Massage",
    serviceSlug: "sensory-massage",
    note: "your practitioner’s signature professional light-touch service. Scalp care, hair brushing or hair play, gentle back scratches, tracing, and other sensory techniques remain optional and client-led.",
    prices: [
      { duration: "45 min", price: "$80 + GST" },
      { duration: "60 min", price: "$105 + GST" },
      { duration: "75 min", price: "$130 + GST" },
      { duration: "90 min", price: "$155 + GST" },
      { duration: "120 min", price: "$205 + GST" },
    ],
  },
  {
    name: "Seasonal Body Renewal",
    serviceSlug: "seasonal-body-renewal",
    note: "Seasonal scrub, private rinse, and moisturizing treatment with spa-inspired exfoliation and optional dry brushing. Introductory promotional pricing.",
    prices: [{ duration: "75 min", price: "$105 + GST" }],
  },
  {
    name: "Cup & Buff",
    serviceSlug: "cup-and-buff",
    note: "Massage, heated silicone cupping, and vibration work for active and high-tension bodies.",
    prices: [
      { duration: "45 min", price: "$80 + GST" },
      { duration: "60 min", price: "$105 + GST" },
      { duration: "75 min", price: "$130 + GST" },
      { duration: "90 min", price: "$155 + GST" },
    ],
  },
];

export const pricingPreview = pricingGroups.map((group) => ({
  duration: group.name,
  price: group.prices.map((item) => `${item.duration} ${item.price}`).join(" · "),
}));

export const pricingNotices: PricingNotice[] = [
  {
    id: "no-tipping",
    title: siteConfig.tippingPolicy.heading,
    text: siteConfig.tippingPolicy.statement,
  },
  {
    id: "payment-methods",
    title: siteConfig.payment.heading,
    text: getPaymentMethodsDisplayText(),
  },
  {
    id: "direct-billing",
    title: siteConfig.directBilling.heading,
    text: getDirectBillingDisplayText(),
  },
  {
    id: "gst",
    title: "GST",
    text: "All listed prices are shown before GST unless specifically stated otherwise.",
  },
];

/* -------------------------------------------------------------------------- */
/* Trust, booking, and FAQ content                                            */
/* -------------------------------------------------------------------------- */

export const trustSignals: TrustSignal[] = [
  {
    label: "Signature sensory massage",
    title: "A peaceful service built around slow, gentle, client-led touch.",
    text: "Sensory Massage is your practitioner’s signature light-touch treatment, with optional scalp work, hair play, back scratches, tracing, and calming upper-body techniques.",
  },
  {
    label: "Client-led",
    title: "Pressure, pace, positioning, and focus are adjusted.",
    text: "Your practitioner listens first and adapts the appointment instead of applying the same routine to every client.",
  },
  {
    label: "Clear pricing",
    title: "Listed treatment prices are before GST.",
    text: "No tipping is expected or accepted. Applicable GST is added to the listed treatment rate.",
  },
];

export const bookingSupportItems: BookingSupportItem[] = [
  {
    id: "direct-billing",
    eyebrow: "Insurance Support",
    title: siteConfig.directBilling.heading,
    text: getDirectBillingDisplayText(),
    buttonLabel: "View Insurance Providers",
    href: "/faq#insurance-providers",
  },
  {
    id: "payment-methods",
    eyebrow: "Payment",
    title: siteConfig.payment.heading,
    text: getPaymentMethodsDisplayText(),
  },
  {
    id: "no-tipping",
    eyebrow: "Simple Pricing",
    title: siteConfig.tippingPolicy.heading,
    text: siteConfig.tippingPolicy.statement,
  },
  {
    id: "earlier-opening",
    eyebrow: "Flexible Availability",
    title: siteConfig.waitlist.heading,
    text: siteConfig.waitlist.description,
    buttonLabel: siteConfig.waitlist.buttonLabel,
    href: siteConfig.waitlist.href,
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Where is Cedar House Wellness located?",
    answer:
      "Cedar House Wellness is currently located in Your Neighbourhood, Your City. Exact appointment details are shared privately through the booking process.",
    category: "location",
  },
  {
    question: "What are the current hours?",
    answer:
      "Regular hours are Tuesday to Friday from 10:00 AM to 4:30 PM. Saturday, Sunday, and Monday may occasionally be available by request, so clients may text your practitioner when they need a time outside the listed schedule.",
    category: "availability",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "This sample site has no live scheduler. Replace the booking URL with your chosen provider before publishing your practice website.",
    category: "booking",
  },
  {
    question: "What if I cannot find a time that works?",
    answer:
      "Check the regular your booking provider schedule first. If no available time works, text your practitioner and request an earlier opening. She may contact you if a cancellation becomes available or additional appointment times are opened.",
    category: "availability",
  },
  {
    question: "What happens before hands-on treatment begins?",
    answer:
      "Your practitioner starts with a clear conversation about what brings you in, your comfort, pressure preferences, previous massage experiences, focus areas, and what you want from the appointment. Hands-on care begins after that conversation is complete.",
    category: "experience",
  },
  {
    question: "Can I change the pressure, pace, positioning, or focus during my appointment?",
    answer:
      "Yes. Treatment remains client-led. You can ask for firmer or lighter pressure, a slower or more focused pace, different positioning, or a change in focus at any point.",
    category: "experience",
  },
  {
    question:
      "Can the appointment be adapted for pregnancy, postpartum changes, sports, physical work, stress, or youth needs?",
    answer:
      "Yes. Pregnancy, postpartum changes, sports, physical work, stress, youth appointments, comfort needs, and day-to-day changes can all shape how the appointment is approached. Some situations should be discussed with your practitioner before booking so the right service, timing, positioning, and expectations are clear.",
    category: "experience",
  },
  {
    question: "What if I feel uncomfortable or want something changed during treatment?",
    answer:
      "Tell your practitioner at any point. Clear communication and consent remain part of the appointment, and pressure, positioning, techniques, focus areas, or other parts of the treatment can be adjusted or stopped.",
    category: "experience",
  },
  {
    question: "What is the overall appointment experience like?",
    answer:
      "The goal is a professional, calm, thoughtful appointment focused on what you need that day. Your practitioner aims to create a clear, unhurried experience where clients feel heard, comfortable, and able to speak up.",
    category: "experience",
  },
  {
    question: "Can I have a talk-free appointment?",
    answer:
      "Yes. Your treatment time is respected by your therapist. If you want to arrive, settle onto the table, and enjoy your treatment without conversation, you are welcome to do that. Sometimes we simply need a place to completely unplug and melt; Cedar House Wellness is a safe, comfortable space to do so.",
    category: "experience",
  },
  {
    question: "Do you offer direct billing?",
    answer: getDirectBillingDisplayText(),
    category: "billing",
  },
  {
    question: "What payment methods are accepted?",
    answer: getPaymentMethodsDisplayText(),
    category: "payments",
  },
  {
    question: "Are tips expected or accepted?",
    answer: siteConfig.tippingPolicy.statement,
    category: "policies",
  },
  {
    question: "Do I book therapeutic, relaxation, prenatal, or another massage type separately?",
    answer:
      "No. Massage is the main customizable service. Clients choose the appointment length, and your practitioner adapts the treatment around pressure preference, focused areas, relaxation goals, pregnancy or postpartum needs, youth needs, comfort, and treatment goals.",
    category: "booking",
  },
  {
    question: "Can I ask for very light pressure?",
    answer:
      "Yes. Massage can be adjusted for very light, slow, flowing, or relaxation-focused care, and Sensory Massage is specifically designed around gentler light-touch techniques. Pressure, pacing, positioning, and techniques can always be adjusted according to the client’s comfort.",
    category: "services",
  },
  {
    question: "Can children or youth book massage?",
    answer:
      "Child and youth massage should be discussed with your practitioner before booking. Parent or guardian involvement and consent are required where appropriate. Shorter first appointments may be recommended so younger clients can become comfortable with the space, expectations, boundaries, and treatment style.",
    category: "services",
  },
  {
    question: "What is Sensory Massage?",
    answer:
      "Sensory Massage is your practitioner’s signature professional light-touch service. It may include slow scalp massage, hair brushing or hair play, gentle back scratches, symmetrical tracing, soft neck and shoulder work, arm care, and other calming sensory techniques. Every element is optional and adjusted according to the client’s preferences.",
    category: "services",
  },
  {
    question: "What is Seasonal Body Renewal?",
    answer:
      "Seasonal Body Renewal is a spa-inspired body-care appointment combining a seasonal scrub, optional dry brushing, private rinse time, and a moisturizing finish.",
    category: "services",
  },
  {
    question: "What is Cup & Buff?",
    answer:
      "Cup & Buff combines massage, heated silicone cupping, moving or temporarily parked cups when appropriate, and broad vibration work for clients who prefer a stronger, more active treatment style.",
    category: "services",
  },
];
/**
 * Keep this legacy reflection collection empty unless an exact excerpt
 * is explicitly approved for this surface. The main Reviews experience
 * is sourced from the dedicated reviews data module.
 */

export const clientReflections: ClientReflection[] = [];

export const pricingReview: PricingReview = {
  status: "approved",
  currentPricingSince: 2026,
  note: "Illustrative sample pricing only. Replace all rates, taxes and policies with your approved business information.",
};
/**
 * your practitioner mentioned possible additional services but has not supplied
 * enough information to publish them safely.
 */

export const additionalServicePlanning: AdditionalServicePlanning = {
  status: "awaiting-client-details",
  requestedInformation: [
    "Final service name",
    "What the service includes",
    "Who the service is intended for",
    "Available durations",
    "Final pricing",
    "Preparation instructions",
    "Important limitations or suitability notes",
  ],
  note: "Additional services should not be published until your practitioner confirms the complete details and final pricing.",
};

/* -------------------------------------------------------------------------- */
/* Search terms and service selectors                                         */
/* -------------------------------------------------------------------------- */

export const seoKeywords = [
  "Cedar House Wellness",
  "Your Neighbourhood massage",
  "massage in Your Neighbourhood",
  "Your City massage therapy",
  "customized massage Your City",
  "therapeutic massage Your City",
  "relaxation massage Your City",
  "sensory massage Your City",
  "ASMR-style sensory relaxation Your City",
  "light touch massage Your City",
  "scalp massage Your City",
  "hair play massage Your City",
  "gentle back scratch massage Your City",
  "prenatal massage Your City",
  "postnatal massage Your City",
  "youth massage Your City",
  "direct billing massage Your City",
  "massage appointment what to expect Your City",
  "client led massage Your City",
  "consent based massage Your City",
  "custom pressure massage Your Neighbourhood",
  "seasonal body renewal Your City",
  "salt scrub Your City",
  "salt scrub Your Neighbourhood",
  "body scrub Your City",
  "body exfoliation Your Neighbourhood",
  "full body exfoliation Your City",
  "heated cupping massage Your City",
  "Cup and Buff Your City",
];

const legacyServiceSlugAliases: Readonly<Record<string, string>> = {
  "relaxation-massage": "massage",

  "hair-play-back-scratches": "sensory-massage",

  "seasonal-body-scrub-rinse-moisturizing": "seasonal-body-renewal",

  "active-recovery-cupping": "cup-and-buff",
};

function normalizeServiceSlug(value: string): string {
  const normalizedValue = value.trim().toLowerCase();

  if (!normalizedValue) {
    return "";
  }

  try {
    return decodeURIComponent(normalizedValue);
  } catch {
    return normalizedValue;
  }
}

function compareServices(first: Service, second: Service): number {
  return (
    first.displayOrder - second.displayOrder ||
    first.name.localeCompare(second.name, siteConfig.locale)
  );
}

function getUniqueTrimmedValues(values: readonly string[]): string[] {
  const valuesByKey = new Map<string, string>();

  for (const value of values) {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      continue;
    }

    const comparisonKey = normalizedValue.toLocaleLowerCase(siteConfig.locale);

    if (!valuesByKey.has(comparisonKey)) {
      valuesByKey.set(comparisonKey, normalizedValue);
    }
  }

  return Array.from(valuesByKey.values());
}

export function getServiceBySlug(slug: string): Service | undefined {
  const normalizedSlug = normalizeServiceSlug(slug);

  if (!normalizedSlug) {
    return undefined;
  }

  const resolvedSlug = legacyServiceSlugAliases[normalizedSlug] ?? normalizedSlug;

  return services.find((service) => service.slug === resolvedSlug && service.status === "active");
}

export function getActiveServices(): Service[] {
  return services.filter((service) => service.status === "active").sort(compareServices);
}

export function getFeaturedServices(): Service[] {
  return services
    .filter((service) => service.status === "active" && service.featured)
    .sort(compareServices);
}

export function getSignatureService(): Service | undefined {
  return services.find((service) => service.status === "active" && service.isSignature);
}

export function getDirectBillingDisplayText(): string {
  return [
    siteConfig.directBilling.summary,
    siteConfig.directBilling.placeholder,
    siteConfig.directBilling.disclaimer,
  ]
    .map((value) => value.trim())
    .filter(Boolean)
    .join(" ");
}

export function getPaymentMethodsDisplayText(): string {
  const preferredMethods = getUniqueTrimmedValues(
    siteConfig.payment.methods.filter((method) => method.preferred).map((method) => method.name),
  );

  const creditCardMethod = siteConfig.payment.methods.find(
    (method) => method.name === "Credit card",
  );

  const preferredText =
    preferredMethods.length > 0
      ? `Preferred payment methods are ${preferredMethods.join(" and ")}.`
      : siteConfig.payment.summary.trim();

  const creditCardNote = creditCardMethod?.note?.trim() || "";

  const creditCardText = creditCardMethod
    ? ["Credit cards can also be accepted when needed.", creditCardNote].filter(Boolean).join(" ")
    : "";

  return [preferredText, creditCardText].filter(Boolean).join(" ");
}
