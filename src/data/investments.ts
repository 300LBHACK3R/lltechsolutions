/** Public entry points only. A client's signed scope determines their own price and deliverables. */
export const investments = [
  {
    id: "website",
    title: "Business websites",
    label: "Starting at",
    amount: 150,
    period: "",
    description: "Start with one polished page from an L&L design, personalized for your business.",
    scopeLabel: "Your starting scope",
    scope: [
      "Your supplied branding, wording and images",
      "Direct contact or an external booking link",
      "Personalization and launch within the agreed scope",
    ],
    note: "More pages, custom features, enquiry forms, original photography, video and ongoing care are quoted separately.",
    action: "Discuss your website",
    service: "Website Design & Development",
  },
  {
    id: "software",
    title: "Purpose-built software",
    label: "Quoted after discovery",
    amount: null,
    period: "",
    description: "Portals, dashboards and business tools shaped around the way you work.",
    scopeLabel: "What shapes your quote",
    scope: [
      "Workflows and user roles",
      "Features, data and integrations",
      "Launch scope and ongoing requirements",
    ],
    note: "Discovery defines the work before a project price is agreed. Your proposal sets out the deliverables and responsibilities.",
    action: "Discuss your software",
    service: "Custom Software / Web Application",
  },
  {
    id: "social",
    title: "Social & content",
    label: "Starting at",
    amount: 149,
    period: "/month",
    description: "A focused monthly presence, with a plan agreed around your business.",
    scopeLabel: "Your plan is shaped around",
    scope: [
      "Chosen channels and posting cadence",
      "Supplied or original content",
      "Reporting and ongoing support",
    ],
    note: "Your quote defines the content deliverables and monthly support. Advertising spend and platform fees are identified separately.",
    action: "Plan your social content",
    service: "Social Media Management",
  },
] as const;

export const investmentDescription = `One-page business websites starting at $${investments[0].amount} CAD, scoped software development and social media management starting at $${investments[2].amount} CAD per month. Each engagement is quoted around its requirements.`;

export const pricingQuestions = [
  {
    question: "Can I add more pages or features?",
    answer:
      "Yes. Extra pages, enquiry forms, booking or payment integrations and custom features can be added to a template or website project. We confirm the added work and price before proceeding.",
  },
  {
    question: "What about hosting, fees and ongoing care?",
    answer:
      "Your proposal identifies applicable taxes and any separate hosting, domain, platform, advertising or usage fees. Maintenance, updates and ongoing content are scoped separately, so you know which costs are one-time and which recur.",
  },
  {
    question: "Can you help with photography and video?",
    answer:
      "Yes, as part of a website project or as a standalone content project. The shoot location, travel, timing, editing and finished deliverables are agreed in your quote. Ongoing production is scoped separately.",
  },
] as const;
