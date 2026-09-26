export const artsyNailPages = ["Home", "Nail Menu", "The Studio", "Contact"] as const;

export type ArtsyNailPage = (typeof artsyNailPages)[number];

const paths: Record<ArtsyNailPage, string> = {
  Home: "/",
  "Nail Menu": "/services",
  "The Studio": "/studio",
  Contact: "/contact",
};

export function artsyNailPagePath(page: ArtsyNailPage) {
  return paths[page];
}

export function artsyNailPageFromPath(segments: readonly string[] = []): ArtsyNailPage | null {
  if (!segments.length) return "Home";
  if (segments.length !== 1) return null;
  return artsyNailPages.find((page) => paths[page] === `/${segments[0]}`) ?? null;
}
