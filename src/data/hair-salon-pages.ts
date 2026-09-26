export const hairSalonPages = ["Home", "Services", "Our Salon", "Contact"] as const;

export type HairSalonPage = (typeof hairSalonPages)[number];

export function hairSalonPagePath(page: HairSalonPage) {
  if (page === "Home") return "/";
  if (page === "Our Salon") return "/salon";
  return `/${page.toLowerCase()}`;
}

export function hairSalonPageFromPath(segments: readonly string[] = []): HairSalonPage | null {
  if (!segments.length) return "Home";
  if (segments.length !== 1) return null;
  return hairSalonPages.find((page) => hairSalonPagePath(page) === `/${segments[0]}`) ?? null;
}
