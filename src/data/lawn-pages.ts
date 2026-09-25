export const lawnPages = ["Home", "Services", "Our Work", "Contact"] as const;

export type LawnPage = (typeof lawnPages)[number];

export function lawnPagePath(page: LawnPage) {
  return page === "Home" ? "/" : `/${page.toLowerCase().replaceAll(" ", "-")}`;
}

export function lawnPageFromPath(segments: readonly string[] = []): LawnPage | null {
  if (!segments.length) return "Home";
  if (segments.length !== 1) return null;
  return lawnPages.find((page) => lawnPagePath(page) === `/${segments[0]}`) ?? null;
}
