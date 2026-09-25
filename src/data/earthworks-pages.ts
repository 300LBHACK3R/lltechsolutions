export const earthworksPages = [
  "Home",
  "Services",
  "Projects",
  "Materials",
  "Process",
  "FAQ",
  "Contact",
] as const;
export type EarthworksPage = (typeof earthworksPages)[number];

export function earthworksPagePath(page: EarthworksPage) {
  return page === "Home" ? "/" : `/${page.toLowerCase()}`;
}

export function earthworksPageFromPath(segments: readonly string[] = []): EarthworksPage | null {
  if (!segments.length) return "Home";
  if (segments.length !== 1) return null;
  return earthworksPages.find((page) => earthworksPagePath(page) === `/${segments[0]}`) ?? null;
}
