/** Illustrative showroom content, not real listings, stock or client projects. */
export const propertyExamples = [
  {
    id: "hillside",
    name: "The Hillside",
    type: "House",
    setting: "Quiet retreat",
    bedrooms: 3,
    image: "/images/collection/property-real-estate.webp",
    alt: "Illustrative cedar house with mountain views at dusk",
    description: "Warm timber, generous glazing and an open living space connected to the garden.",
    features: ["3 sample bedrooms", "Open-plan living", "Garden connection"],
    detail:
      "A concept for a buyer looking for space, outlook and a quieter pace. The image and room details are illustrative; this is not a property offered for sale or rent.",
  },
  {
    id: "courtyard",
    name: "The Courtyard",
    type: "Apartment",
    setting: "Connected living",
    bedrooms: 2,
    image: "/images/collection/property-property-management.webp",
    alt: "Illustrative apartment courtyard with landscaped paths",
    description:
      "A planted courtyard and shared outdoor space at the heart of everyday residential life.",
    features: ["2 sample bedrooms", "Shared courtyard", "Low-rise setting"],
    detail:
      "A sample apartment profile showing how location, features and a clear enquiry route can sit together. Availability, pricing, access and amenities are not live information.",
  },
  {
    id: "garden",
    name: "The Garden House",
    type: "House",
    setting: "Quiet retreat",
    bedrooms: 4,
    image: "/images/collection/property-window-care.webp",
    alt: "Illustrative glass-fronted home looking onto a garden patio",
    description: "Bright living spaces with long garden views and room for an outdoor gathering.",
    features: ["4 sample bedrooms", "Garden outlook", "Covered patio"],
    detail:
      "An illustrative property card for a home with generous indoor-outdoor connections. Measurements, availability and property information would be supplied and approved for a live website.",
  },
] as const;

export const materialPalettes = [
  {
    id: "warm",
    name: "Warm & grounded",
    colours: ["#ad563d", "#ddd0b8", "#6c6c41"],
    materials: "Clay · Travertine · Olive",
    description:
      "Earthy colour, pale stone and a soft green accent. A welcoming direction for a room built around gathering.",
  },
  {
    id: "quiet",
    name: "Quiet & natural",
    colours: ["#ded9cc", "#a59b85", "#3d4a40"],
    materials: "Linen · Oak · Forest",
    description:
      "Tonal layers, warm wood and one deeper note. A calm direction that leaves room for texture and daylight.",
  },
  {
    id: "bold",
    name: "Bold & collected",
    colours: ["#722f42", "#d9ad4d", "#eee7dc"],
    materials: "Plum · Brass · Chalk",
    description:
      "A richer palette with a warm metallic accent and a light counterpoint. A starting point for a room with character.",
  },
] as const;
