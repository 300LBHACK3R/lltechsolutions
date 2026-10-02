import { trailers, type Trailer } from "@/data/trailers";

export type TrailerCategoryId =
  "enclosed-trailers" | "dump-trailers" | "flatdeck-equipment-trailers";

export type TrailerCategory = {
  id: TrailerCategoryId;
  title: string;
  eyebrow: string;
  description: string;
  shortDescription: string;
  bestFor: string[];
  seoTitle: string;
  seoDescription: string;
};

export const trailerCategories: TrailerCategory[] = [
  {
    id: "enclosed-trailers",
    title: "Enclosed Trailers",
    eyebrow: "Secure Hauling",
    description:
      "Enclosed trailers are ideal for moves, furniture, boxes, tools, equipment, and cargo that needs protection from weather, road debris, and open exposure.",
    shortDescription:
      "Protected hauling for moves, furniture, boxes, tools, and cargo that needs to stay secure and covered.",
    bestFor: ["Moves", "Furniture", "Boxes", "Protected Cargo"],
    seoTitle: "Enclosed Trailer Rentals",
    seoDescription:
      "Browse enclosed trailer rentals from Trail & Co Rentals for moving, furniture, boxes, tools, equipment, and protected cargo across Sampletown and the Sample Valley.",
  },
  {
    id: "dump-trailers",
    title: "Dump Trailers",
    eyebrow: "Cleanup & Heavy Loads",
    description:
      "Dump trailers are built for yard cleanups, dump runs, branches, debris, landscaping material, renovation waste, property cleanouts, and heavier jobs that need practical unloading.",
    shortDescription:
      "Built for dump runs, yard cleanups, debris, renovation waste, landscaping material, and heavy cleanup jobs.",
    bestFor: ["Dump Runs", "Yard Cleanup", "Debris", "Landscaping"],
    seoTitle: "Dump Trailer Rentals",
    seoDescription:
      "Browse dump trailer rentals from Trail & Co Rentals for dump runs, yard cleanups, debris, landscaping material, renovation waste, and property cleanouts across the Sample Valley.",
  },
  {
    id: "flatdeck-equipment-trailers",
    title: "Flatdeck & Equipment Trailers",
    eyebrow: "Equipment Hauling",
    description:
      "Flat deck and equipment trailers are made for machines, side-by-sides, landscaping equipment, building materials, contractor jobs, and loads that need easy ramp or open-deck access.",
    shortDescription:
      "Open-deck hauling for equipment, machines, building materials, contractor work, and larger loads.",
    bestFor: ["Equipment", "Contractors", "Machines", "Materials"],
    seoTitle: "Flatdeck & Equipment Trailer Rentals",
    seoDescription:
      "Browse flat deck, dovetail, and equipment trailer rentals from Trail & Co Rentals for machines, materials, contractor work, and equipment hauling across Sampletown and the Sample Valley.",
  },
];

function getTrailerSearchText(trailer: Trailer) {
  return [
    trailer.id,
    trailer.name,
    trailer.shortName,
    trailer.description,
    ...trailer.specs,
    ...trailer.bestFor,
    ...trailer.accessories,
  ]
    .join(" ")
    .toLowerCase();
}

export function getTrailerCategoryId(trailer: Trailer): TrailerCategoryId {
  const text = getTrailerSearchText(trailer);

  if (
    text.includes("enclosed") ||
    text.includes("cargo") ||
    text.includes("secure") ||
    text.includes("box") ||
    text.includes("v-nose") ||
    text.includes("nose")
  ) {
    return "enclosed-trailers";
  }

  if (
    text.includes("dump") ||
    text.includes("debris") ||
    text.includes("cleanup") ||
    text.includes("cleanout") ||
    text.includes("branches") ||
    text.includes("landscaping")
  ) {
    return "dump-trailers";
  }

  return "flatdeck-equipment-trailers";
}

export function getTrailerCategoryById(categoryId: string) {
  return trailerCategories.find((category) => category.id === categoryId);
}

export function getTrailersForCategory(categoryId: TrailerCategoryId) {
  return trailers.filter((trailer) => getTrailerCategoryId(trailer) === categoryId);
}

export function getTrailerDetailHref(trailer: Trailer) {
  const categoryId = getTrailerCategoryId(trailer);
  return `/rentals/${categoryId}#${trailer.id}`;
}

export function getCategoryPreviewImage(categoryId: TrailerCategoryId) {
  const categoryTrailers = getTrailersForCategory(categoryId);
  const firstTrailer = categoryTrailers[0];

  return firstTrailer?.image ?? "/images/sample-rentals.webp";
}

export function getCategoryTrailerCount(categoryId: TrailerCategoryId) {
  return getTrailersForCategory(categoryId).length;
}
