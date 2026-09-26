export const medicalSpaPages = [
  "Home",
  "Treatments",
  "Consultation",
  "The Clinic",
  "FAQs",
  "Contact",
] as const;

export type MedicalSpaPage = (typeof medicalSpaPages)[number];

export function medicalSpaPagePath(page: MedicalSpaPage) {
  if (page === "Home") return "/";
  if (page === "The Clinic") return "/clinic";
  return `/${page.toLowerCase()}`;
}

export function medicalSpaPageFromPath(segments: readonly string[] = []): MedicalSpaPage | null {
  if (!segments.length) return "Home";
  if (segments.length !== 1) return null;
  return medicalSpaPages.find((page) => medicalSpaPagePath(page) === `/${segments[0]}`) ?? null;
}
