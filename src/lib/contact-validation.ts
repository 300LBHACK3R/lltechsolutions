export const serviceOptions = [
  "Website Design & Development",
  "Website Redesign / Upgrade",
  "E-commerce / Booking / Payments",
  "Custom Software / Web Application",
  "Portal / Dashboard / Business Tool",
  "Social Media Management",
  "Photo / Video / Short-Form Content",
  "SEO / Google Business / Digital Growth",
  "Ongoing Digital Partner",
  "Not Sure — Project Consultation",
  "Free Digital Audit",
] as const;
export const timelineOptions = [
  "As soon as possible",
  "Within 2 weeks",
  "This month",
  "Within 2–3 months",
  "Flexible / planning ahead",
] as const;
export const fieldLimits = {
  name: 100,
  business: 150,
  email: 254,
  phone: 40,
  website: 2048,
  service: 100,
  timeline: 60,
  message: 5000,
  companyWebsite: 200,
} as const;
export type ContactPayload = Record<keyof typeof fieldLimits, string>;
export type ValidationResult =
  { ok: true; value: ContactPayload; spam: boolean } | { ok: false; message: string };

export function validateContact(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { ok: false, message: "Please send a valid inquiry." };
  const raw = input as Record<string, unknown>;
  const value = {} as ContactPayload;
  for (const key of Object.keys(fieldLimits) as (keyof ContactPayload)[]) {
    if (raw[key] !== undefined && typeof raw[key] !== "string")
      return { ok: false, message: "Please check the form fields." };
    const text = ((raw[key] as string | undefined) ?? "").trim();
    if (text.length > fieldLimits[key])
      return {
        ok: false,
        message: `${key === "message" ? "Project details" : "A form field"} exceeds the allowed length.`,
      };
    value[key] = text;
  }
  if (value.companyWebsite) return { ok: true, value, spam: true };
  if (!value.name || !value.email || !value.message)
    return { ok: false, message: "Name, email and project details are required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))
    return { ok: false, message: "Please enter a valid email address." };
  if (
    !serviceOptions.some((option) => option === value.service) ||
    !timelineOptions.some((option) => option === value.timeline)
  )
    return { ok: false, message: "Please select a service and timeline from the list." };
  if (value.website) {
    try {
      const normalized = /^[a-z][a-z0-9+.-]*:/i.test(value.website)
        ? value.website
        : `https://${value.website}`;
      const url = new URL(normalized);
      if (
        !["https:", "http:"].includes(url.protocol) ||
        url.username ||
        url.password ||
        !url.hostname.includes(".")
      )
        throw new Error("Invalid URL");
      value.website = url.href;
    } catch {
      return { ok: false, message: "Please enter a valid website address, such as example.ca." };
    }
  }
  return { ok: true, value, spam: false };
}
