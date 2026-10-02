import { websiteDesigns } from "./website-collection.ts";

/** Purchasable catalogue. Reference editions are separately prepared customer source packages. */
const eligibleIds = [
  "horizon",
  "crestline",
  "tow-n-go",
  "mckenzie-house",
  "calgary-hot-shot",
  "pigment",
  "structure",
  "earthworks",
  "lawncare",
  "still",
  "massage-one-page",
  "medical-spa",
  "artsy-nails",
  "hair-salon",
  "hair-one-page",
  "consultant-one-page",
  "bookkeeping",
  "accounting",
  "creative-consultancy",
  "boutique-law",
  "corporate-law",
  "home-cleaning",
  "window-care",
  "home-organizing",
  "interior-studio",
  "property-management",
  "real-estate",
  "courier-one-page",
  "moving-company",
  "auto-transport",
  "equipment-rentals",
  "cold-chain",
  "freight-logistics",
  "food-truck",
  "neighbourhood-cafe",
  "artisan-bakery",
  "pizzeria",
  "catering-events",
  "fine-dining",
  "mobile-detailing",
  "flower-shop",
  "auto-repair",
  "streetwear-store",
  "wheel-studio",
  "jewellery-atelier",
] as const;

/** Separate regular code-only prices. Managed-launch promotions never modify these amounts. */
const codePriceByLaunchPrice: Readonly<Record<number, number>> = {
  150: 49,
  299: 79,
  399: 99,
  499: 149,
  549: 179,
  600: 199,
};

const referenceIds = new Set([
  "horizon",
  "crestline",
  "tow-n-go",
  "mckenzie-house",
  "calgary-hot-shot",
]);

const referencePageCounts: Readonly<Record<string, number>> = {
  "tow-n-go": 11,
  crestline: 13,
  "mckenzie-house": 10,
};

export type SourceProduct = {
  designId: string;
  name: string;
  priceCad: number;
  kind: "template" | "reference-edition";
  pageCount?: number;
  editionNote?: string;
};
export const sourceProducts: readonly SourceProduct[] = eligibleIds.map((designId) => {
  const design = websiteDesigns.find((item) => item.id === designId);
  if (!design || design.status === "draft" || design.startingPriceCad === null)
    throw new Error(`Invalid source-code offer: ${designId}`);
  const priceCad = codePriceByLaunchPrice[design.startingPriceCad];
  if (!priceCad) throw new Error(`Set an explicit code-only price for ${designId}`);
  const reference = referenceIds.has(designId);
  return {
    designId,
    name: design.name,
    priceCad,
    kind: reference ? "reference-edition" : "template",
    ...((referencePageCounts[designId] ?? design.pageCount) !== null
      ? { pageCount: referencePageCounts[designId] ?? design.pageCount! }
      : {}),
    ...(reference
      ? {
          editionNote:
            "An editable edition of this design, prepared with sample business content and illustrative images. The reference business’s identity, original photos/video, testimonials and connected services are not included.",
        }
      : {}),
  };
});

export function sourceProduct(designId: string): SourceProduct | null {
  return sourceProducts.find((product) => product.designId === designId) ?? null;
}

export function sourceHref(designId: string) {
  return `/website-collection/${encodeURIComponent(designId)}/source`;
}

export { sourceLicense, sourceLicenseVersion } from "./source-license.ts";

export function sourceInquiryHref(designId: string) {
  return `/contact?source=${encodeURIComponent(designId)}`;
}

/** A clean reusable version can be discussed without selling a reference website's files. */
export function sourceVersionRequest(designId: string) {
  const design = websiteDesigns.find((item) => item.id === designId && item.status !== "draft");
  if (!design || !referenceIds.has(designId)) return null;
  return {
    designId: design.id,
    name: design.name,
    href: `/contact?source-version=${encodeURIComponent(design.id)}`,
    service: "Website Design & Development",
    summary: `${design.name} — request a reusable code-only version; quoted separately.`,
    message: `I’m interested in a reusable code-only version inspired by ${design.name}, with editable source and editing/setup instructions. I will handle personalization, testing, hosting and launch. Please confirm availability, scope and price. I understand the original business identity, client content and private files are not included.`,
  };
}
