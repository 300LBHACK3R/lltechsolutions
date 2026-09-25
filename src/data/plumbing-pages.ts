export const plumbingPages = ["Home", "Services", "Projects", "Contact"] as const;
export type PlumbingPage = (typeof plumbingPages)[number];

export function plumbingPagePath(page: PlumbingPage) {
  return page === "Home" ? "/" : `/${page.toLowerCase()}`;
}

export function plumbingPageFromPath(segments: readonly string[] = []): PlumbingPage | null {
  if (!segments.length) return "Home";
  if (segments.length !== 1) return null;
  return plumbingPages.find((page) => plumbingPagePath(page) === `/${segments[0]}`) ?? null;
}
