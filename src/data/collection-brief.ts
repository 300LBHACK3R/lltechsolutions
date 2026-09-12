/** Public business content only. No network submission or automatic local persistence. */
export const briefSections = [
  {
    id: "business",
    title: "Your business",
    intro: "A few basics help us get the right information onto your website.",
    fields: [
      { id: "businessName", label: "Business name", hint: "The name customers should see." },
      {
        id: "businessDetails",
        label: "What do you do, and who do you help?",
        hint: "A few sentences are plenty.",
      },
      {
        id: "serviceArea",
        label: "Location, service areas and hours",
        hint: "Only the details you want customers to see.",
      },
      {
        id: "publicContact",
        label: "Public contact details",
        hint: "The email, phone and booking link you want on the website.",
      },
    ],
  },
  {
    id: "brand",
    title: "Brand & content",
    intro: "You can describe what you have now. We’ll arrange the actual file handover with you.",
    fields: [
      {
        id: "identity",
        label: "Logo and brand colours",
        hint: "Tell us what is ready, or what you would like help creating.",
      },
      {
        id: "imagery",
        label: "Photos and videos",
        hint: "List the real imagery you can supply. File transfer is arranged separately.",
      },
      {
        id: "services",
        label: "Services and pricing",
        hint: "Outline the services and any approved prices you want displayed.",
      },
      {
        id: "story",
        label: "Your story and client proof",
        hint: "An introduction, project examples and reviews you have permission to use.",
      },
    ],
  },
  {
    id: "website",
    title: "Website & next steps",
    intro: "Tell us what matters most. It is fine to leave something undecided.",
    fields: [
      {
        id: "goal",
        label: "What should visitors do next?",
        hint: "Enquire, book, call, visit your shop, or something else?",
      },
      {
        id: "domain",
        label: "Existing website and domain provider",
        hint: "Names and public links only. Access is arranged separately; do not include passwords.",
      },
      {
        id: "features",
        label: "Booking, payments or other connections",
        hint: "Name any providers you already use. No account keys or login details.",
      },
      {
        id: "notes",
        label: "Anything else you want us to know?",
        hint: "Priorities, timing, accessibility needs or questions.",
      },
    ],
  },
] as const;

export type BriefFieldId = (typeof briefSections)[number]["fields"][number]["id"];
export type BriefDraft = {
  version: 1;
  values: Partial<Record<BriefFieldId, string>>;
  help: string[];
};
export const briefFieldLimit = 1200;
export function emptyBrief(): BriefDraft {
  return { version: 1, values: {}, help: [] };
}
export function parseBrief(value: unknown): BriefDraft | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (
    input.version !== 1 ||
    !input.values ||
    typeof input.values !== "object" ||
    Array.isArray(input.values)
  )
    return null;
  const result = emptyBrief();
  for (const section of briefSections)
    for (const field of section.fields) {
      const text = (input.values as Record<string, unknown>)[field.id];
      if (typeof text === "string") result.values[field.id] = text.slice(0, briefFieldLimit);
    }
  result.help = briefSections
    .filter((section) => Array.isArray(input.help) && input.help.includes(section.id))
    .map((section) => section.id);
  return result;
}
export function briefText(draft: BriefDraft) {
  const safe = parseBrief(draft) ?? emptyBrief();
  return [
    "L&L WEBSITE CONTENT BRIEF",
    "Prepared by the client; scope remains subject to the agreed proposal.",
    "",
    ...briefSections.flatMap((section) => [
      section.title.toUpperCase(),
      ...section.fields.map(
        (field) => `${field.label}\n${safe.values[field.id]?.trim() || "To discuss"}\n`,
      ),
      ...(safe.help.includes(section.id) ? ["I would like help with this section."] : []),
      "",
    ]),
  ].join("\n");
}
