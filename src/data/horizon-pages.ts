export const horizonPages = ["Home", "Services", "Projects", "Contact"] as const;

export type HorizonPage = (typeof horizonPages)[number];

export function horizonPagePath(page: HorizonPage) {
  return page === "Home" ? "/" : `/${page.toLowerCase()}`;
}

export function horizonPageFromPath(segments: readonly string[] = []): HorizonPage | null {
  if (!segments.length) return "Home";
  if (segments.length !== 1) return null;
  return horizonPages.find((page) => horizonPagePath(page) === `/${segments[0]}`) ?? null;
}
