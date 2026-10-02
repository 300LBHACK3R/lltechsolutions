import type { TrailerCategoryId } from "@/data/trailerCategories";

export type TrailerCategorySeoContent = {
  categoryId: TrailerCategoryId;
  heading: string;
  intro: string;
  bestUsesTitle: string;
  bestUses: string[];
  customerTypesTitle: string;
  customerTypes: string[];
  serviceNote: string;
  addOnsNote: string;
  faq: {
    question: string;
    answer: string;
  }[];
};

export const trailerCategorySeoContent: TrailerCategorySeoContent[] = [
  {
    categoryId: "enclosed-trailers",
    heading: "Enclosed trailer rentals for protected moving and hauling.",
    intro:
      "Enclosed trailers are a strong choice for customers who need to move or haul items that should stay covered, secure, and protected from weather, road debris, and open exposure. They are commonly used for household moves, furniture, boxes, tools, equipment, and cargo that needs a cleaner enclosed space during transport.",
    bestUsesTitle: "Best uses for enclosed trailers",
    bestUses: [
      "Moving furniture and household items",
      "Transporting boxes, totes, and storage items",
      "Hauling tools or equipment that should stay covered",
      "Protecting cargo from weather and road debris",
      "Small business, contractor, and weekend project hauling",
    ],
    customerTypesTitle: "Common enclosed trailer customers",
    customerTypes: [
      "Families planning a move",
      "Homeowners cleaning out storage spaces",
      "Contractors moving tools or supplies",
      "Small businesses transporting protected cargo",
      "Customers hauling weather-sensitive items",
    ],
    serviceNote:
      "Trail & Co Rentals serves Sampletown, Westfield, Southfield, Eastfield, Lake District, Northfield, the Sample Valley, the surrounding sample region depending on the rental need.",
    addOnsNote:
      "Available support items may include hitches, ratchet straps, cargo nets, boxes, moving blankets, and pickup or delivery options depending on the rental, scheduling, and location.",
    faq: [
      {
        question: "What is an enclosed trailer best for?",
        answer:
          "An enclosed trailer is best for moving furniture, boxes, tools, equipment, household items, and cargo that needs protection from weather, road debris, and open exposure.",
      },
      {
        question: "Can I use an enclosed trailer for moving day?",
        answer:
          "Yes. Enclosed trailers are commonly used for moving day because they keep furniture, boxes, and household items covered and protected during transport.",
      },
      {
        question: "Are pickup and delivery options available?",
        answer:
          "Pickup and delivery options may be available depending on scheduling and location. When available, they can be arranged for a fee as a convenience to renters.",
      },
    ],
  },
  {
    categoryId: "dump-trailers",
    heading: "Dump trailer rentals for cleanup jobs, debris, and heavy hauling.",
    intro:
      "Dump trailers are built for practical cleanup and hauling jobs where easy unloading matters. They are commonly used for dump runs, yard cleanups, branches, renovation debris, landscaping material, property cleanouts, and heavier loads that need a stronger trailer setup.",
    bestUsesTitle: "Best uses for dump trailers",
    bestUses: [
      "Dump runs and landfill trips",
      "Yard cleanup and branch removal",
      "Landscaping material and outdoor projects",
      "Renovation debris and property cleanouts",
      "Heavy cleanup jobs that need easier unloading",
    ],
    customerTypesTitle: "Common dump trailer customers",
    customerTypes: [
      "Homeowners handling yard cleanup",
      "Landscapers and outdoor contractors",
      "Renovation and cleanup crews",
      "Customers clearing garages or properties",
      "Anyone dealing with debris or bulky waste",
    ],
    serviceNote:
      "Trail & Co Rentals provides dump trailer rental options for customers across Sampletown, Westfield, Southfield, Eastfield, Lake District, Northfield, and surrounding Sample Valley communities.",
    addOnsNote:
      "Depending on the rental and job, support items such as hitches, ratchet straps, cargo nets, and pickup or delivery options may be available.",
    faq: [
      {
        question: "What is a dump trailer best for?",
        answer:
          "A dump trailer is best for dump runs, yard cleanups, branches, debris, renovation waste, landscaping material, property cleanouts, and jobs where easier unloading is helpful.",
      },
      {
        question: "Can a dump trailer be used for landscaping material?",
        answer:
          "Yes. Dump trailers are often useful for landscaping material, outdoor projects, and cleanup jobs that involve heavier or bulkier loads.",
      },
      {
        question: "Can pickup or delivery be arranged?",
        answer:
          "Pickup and delivery may be available depending on schedule and location. When available, it can be arranged for a fee as a convenience to the renter.",
      },
    ],
  },
  {
    categoryId: "flatdeck-equipment-trailers",
    heading: "Flatdeck and equipment trailer rentals for open-deck hauling.",
    intro:
      "Flatdeck, dovetail, and equipment trailers are useful for customers who need open-deck access for machines, equipment, materials, side-by-sides, contractor jobs, landscaping equipment, and larger loads that do not fit well in an enclosed or dump trailer.",
    bestUsesTitle: "Best uses for flatdeck and equipment trailers",
    bestUses: [
      "Equipment hauling and contractor jobs",
      "Machines, side-by-sides, and outdoor equipment",
      "Building materials and larger open-deck loads",
      "Landscaping equipment and project supplies",
      "Loads that require ramp or open-deck access",
    ],
    customerTypesTitle: "Common flatdeck and equipment trailer customers",
    customerTypes: [
      "Contractors and trades",
      "Landscapers and outdoor workers",
      "Customers moving machines or equipment",
      "Property owners handling larger projects",
      "Customers needing ramp or open-deck access",
    ],
    serviceNote:
      "Trail & Co Rentals supports equipment and open-deck hauling needs across Sampletown, Westfield, Southfield, Eastfield, Lake District, Northfield, the Sample Valley, the surrounding sample region depending on the rental.",
    addOnsNote:
      "Available support may include hitches, straps, cargo nets, and pickup or delivery options depending on scheduling, location, and the trailer being rented.",
    faq: [
      {
        question: "What is a flatdeck or equipment trailer best for?",
        answer:
          "Flatdeck and equipment trailers are best for machines, side-by-sides, contractor equipment, landscaping equipment, building materials, and larger open-deck loads.",
      },
      {
        question: "When should I choose a flatdeck instead of an enclosed trailer?",
        answer:
          "A flatdeck is usually better when the load is oversized, easier to load from the side or ramp, or does not need enclosed protection from weather and road exposure.",
      },
      {
        question: "Are add-ons available with equipment trailer rentals?",
        answer:
          "Support items such as hitches, straps, cargo nets, and pickup or delivery options may be available depending on the rental and job requirements.",
      },
    ],
  },
];

export function getTrailerCategorySeoContent(categoryId: TrailerCategoryId) {
  return trailerCategorySeoContent.find((content) => content.categoryId === categoryId);
}
