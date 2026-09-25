/** Public entry points only. A client's signed scope determines their own price and deliverables. */
export const investments = [
  {
    id: "website",
    title: "Custom Business Website",
    label: "Starting at",
    amount: 150,
    period: "",
    description:
      "Start with one polished page from an L&L design, personalized with your supplied branding, wording and images. Direct contact or an external booking link is included. More pages, custom features, enquiry forms, original photography, video and ongoing care are quoted separately.",
    service: "Website Design & Development",
  },
  {
    id: "software",
    title: "Custom Software / Web App",
    label: "Quoted after discovery",
    amount: null,
    period: "",
    description:
      "Portals, dashboards, customer experiences and business tools. Workflows, users, integrations and ongoing needs define the price.",
    service: "Custom Software / Web Application",
  },
  {
    id: "social",
    title: "Social Management Partner",
    label: "Starting at",
    amount: 149,
    period: "/month",
    description:
      "A focused monthly presence with an agreed scope. Channels, posting cadence, supplied or original content, reporting and ongoing support shape your monthly plan.",
    service: "Social Media Management",
  },
] as const;

export const investmentDescription = `One-page business websites starting at $${investments[0].amount} CAD, scoped software development and social media management starting at $${investments[2].amount} CAD per month. Each engagement is quoted around its requirements.`;
