/** Public entry points only. A client's signed scope determines their own price and deliverables. */
export const investments = [
  {
    id: "website",
    title: "Custom Business Website",
    label: "Starting at",
    amount: 399,
    period: "",
    description:
      "A focused business website with a clear scope. Page count, supplied content, original photography, integrations and custom features shape the final quote.",
    service: "Website Design & Development",
  },
  {
    id: "software",
    title: "Custom Software / Web App",
    label: "Quoted after discovery",
    amount: null,
    period: "",
    description:
      "Portals, dashboards, customer experiences and business tools. Workflows, users, integrations and ongoing needs define the investment.",
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

export const investmentDescription = `Custom business websites starting at $${investments[0].amount} CAD, scoped software development and social media management starting at $${investments[2].amount} CAD per month. Each engagement is quoted around its requirements.`;
