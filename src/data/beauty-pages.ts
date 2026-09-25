export const beautyPages = ["Home", "Services", "Contact"] as const;

export type BeautyPage = (typeof beautyPages)[number];

export function beautyPagePath(page: BeautyPage) {
  return page === "Home" ? "/" : `/${page.toLowerCase()}`;
}

export function beautyPageFromPath(segments: readonly string[] = []): BeautyPage | null {
  if (!segments.length) return "Home";
  if (segments.length !== 1) return null;
  return beautyPages.find((page) => beautyPagePath(page) === `/${segments[0]}`) ?? null;
}
