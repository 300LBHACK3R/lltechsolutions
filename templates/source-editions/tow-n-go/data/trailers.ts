export type Trailer = {
  id: string;
  name: string;
  shortName: string;
  status: "Sample fleet" | "Coming Soon";
  image: string;
  images?: string[];
  startingPrice: string;
  summary: string;
  description: string;
  specs: string[];
  bestFor: string[];
  accessories: string[];
};

export const trailers: Trailer[] = [
  {
    id: "sample-enclosed",
    name: `Sample Enclosed 7'6" x 16' + V-Nose Enclosed Trailer`,
    shortName: "Enclosed Trailer",
    status: "Sample fleet",
    image: "/images/sample-rentals.webp",
    images: [
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
    ],
    startingPrice: "$115/day · sample rate",
    summary: "Secure enclosed hauling with a clean blacked-out look and protected cargo space.",
    description:
      "This Sample Enclosed 7'6\" x 16' + V-Nose enclosed trailer with dual 3500lb axles is a strong option for customers needing secure, weather-protected hauling. Ideal for moving, equipment transport, and enclosed cargo that needs to stay clean, dry, and protected on the road.",
    specs: [
      "Sample Enclosed",
      `7'6" x 16' + V-Nose`,
      "Dual 3500lb axles",
      "Enclosed cargo protection",
    ],
    bestFor: [
      "Moving boxes and furniture",
      "Transporting tools or equipment",
      "Protected enclosed hauling",
    ],
    accessories: ["Hitch", "Ratchet straps", "Cargo nets", "Boxes", "Moving blankets"],
  },

  {
    id: "sample-dump",
    name: "Sample Dump 6x10 Dump Trailer",
    shortName: "Dump Trailer",
    status: "Sample fleet",
    image: "/images/sample-rentals.webp",
    images: [
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
    ],
    startingPrice: "$115/day · sample rate",
    summary: "Heavy-duty dump trailer built for real cleanup, hauling, and job site work.",
    description:
      "This Sample Dump 6x10 dump trailer with dual 5000lb axles is built for real-world jobs. Whether you're handling landscaping cleanup, renovation debris, or hauling gravel and material, this trailer is designed to be reliable, simple to use, and capable under load. The hydraulic dump system makes unloading fast and efficient, saving time on every job.",
    specs: [
      "Sample Dump",
      "6x10 dump bed",
      "Dual 5000lb axles",
      "Hydraulic dump system",
      "Heavy-duty steel construction",
    ],
    bestFor: [
      "Landscaping cleanup",
      "Construction debris",
      "Gravel, soil, and material hauling",
      "General dump and haul jobs",
    ],
    accessories: ["Hitch", "Ratchet straps", "Tie-down support", "Additional hauling accessories"],
  },

  {
    id: "sample-flatdeck",
    name: "Sample Flatdeck 7x20 + Dovetail Trailer",
    shortName: "Dovetail Trailer",
    status: "Sample fleet",
    image: "/images/sample-rentals.webp",
    images: [
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
      "/images/sample-rentals.webp",
    ],
    startingPrice: "$115/day · sample rate",
    summary: "Heavy-duty flat deck built for equipment, vehicles, and serious hauling.",
    description:
      "This Sample Flatdeck 7x20 + dovetail trailer with dual 7000lb axles is built for serious hauling. Ideal for equipment, vehicles, and larger loads with the stability and strength needed for heavier jobs.",
    specs: ["Sample Flatdeck", "7x20 deck + dovetail", "Dual 7000lb axles", "Heavy-duty flat deck"],
    bestFor: ["Equipment hauling", "Vehicle transport", "Heavy-duty jobs"],
    accessories: ["Ramps", "Straps", "Tie-down support"],
  },
];
