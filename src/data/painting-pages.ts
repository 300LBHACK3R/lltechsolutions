export const paintingPages = ["Home", "Services", "Projects", "Contact"] as const;
export type PaintingPage = (typeof paintingPages)[number];

export function paintingPagePath(page: PaintingPage) {
  return page === "Home" ? "/" : `/${page.toLowerCase()}`;
}

export function paintingPageFromPath(segments: readonly string[] = []): PaintingPage | null {
  if (!segments.length) return "Home";
  if (segments.length !== 1) return null;
  return paintingPages.find((page) => paintingPagePath(page) === `/${segments[0]}`) ?? null;
}
