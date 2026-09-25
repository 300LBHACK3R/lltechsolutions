export const wellnessPages = ["Home", "Treatments", "Pricing", "About", "FAQ", "Contact"] as const;

export type WellnessPage = (typeof wellnessPages)[number];

export function wellnessPagePath(page: WellnessPage) {
  return page === "Home" ? "/" : `/${page.toLowerCase()}`;
}

export function wellnessPageFromPath(segments: readonly string[] = []): WellnessPage | null {
  if (!segments.length) return "Home";
  if (segments.length !== 1) return null;
  return wellnessPages.find((page) => wellnessPagePath(page) === `/${segments[0]}`) ?? null;
}
