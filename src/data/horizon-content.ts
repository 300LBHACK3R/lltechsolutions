/** Illustrative template content. These scenes are not completed client projects. */
export const horizonServices = [
  {
    id: "landscape-construction",
    name: "Landscape construction",
    shortName: "Build.",
    image: "/images/collection/earthworks-landscape.webp",
    alt: "Illustrative stone terrace and steps with layered planting beside a mountain home",
    intro: "Make more of the space you have.",
    description:
      "Bring structure to an outdoor space with considered pathways, terraces, retaining features and planting. A practical layout that feels at home in its surroundings.",
    scope: [
      "Patios, paths and outdoor gathering spaces",
      "Retaining features and changes in level",
      "Garden beds, soil preparation and planting",
    ],
    discuss: "How you use the space, preferred materials, access and any existing plans.",
  },
  {
    id: "site-preparation",
    name: "Site preparation",
    shortName: "Prepare.",
    image: "/images/collection/earthworks-site.webp",
    alt: "Illustrative excavator on a prepared residential landscape site",
    intro: "A good finish starts below the surface.",
    description:
      "Plan the groundwork before the visible details. Discuss site access, existing conditions, grading and the preparation needed for the next stage of your landscape.",
    scope: [
      "Site access and preparation planning",
      "Excavation and landscape grading",
      "Base preparation and material coordination",
    ],
    discuss:
      "Site levels, access limits, drainage concerns and any engineering or permit requirements.",
  },
  {
    id: "planting-irrigation",
    name: "Planting & irrigation",
    shortName: "Grow.",
    image: "/images/collection/lawn-detail.webp",
    alt: "Illustrative planted garden with a curved stone path and established lawn",
    intro: "The right balance of green and growing.",
    description:
      "Connect a planting plan with the way a garden is watered and maintained. Consider sun, soil, seasonal interest and the everyday care your property needs.",
    scope: [
      "Plant selection and garden bed layout",
      "Watering zones and irrigation planning",
      "Seasonal adjustments and establishment care",
    ],
    discuss: "Sun exposure, water access, existing plants and the level of upkeep you prefer.",
  },
  {
    id: "property-care",
    name: "Property care",
    shortName: "Care.",
    image: "/images/collection/lawn-hero.webp",
    alt: "Illustrative cared-for front garden with a striped lawn and planted borders",
    intro: "Keep a good thing growing.",
    description:
      "Give your landscape a routine that follows the seasons, from lawn and garden care to tidying paths and refreshing the details that frame your property.",
    scope: [
      "Lawn care and garden bed maintenance",
      "Seasonal cleanup and green-waste planning",
      "A visit schedule suited to the property",
    ],
    discuss:
      "Property size, the areas to include, your preferred schedule and seasonal priorities.",
  },
] as const;

export const horizonProjects = [
  {
    id: "terraced-living",
    number: "01",
    name: "A landscape with perspective.",
    category: "hardscape",
    categoryLabel: "Stonework & structure",
    image: "/images/collection/earthworks-landscape.webp",
    alt: "Illustrative terraced stone steps and naturalistic planting overlooking mountains",
    description:
      "Generous steps, textured stone and layered planting connect a home to its setting.",
    considerations:
      "Level changes, comfortable access, material selection and planting suited to the site.",
    tags: ["Terraces", "Stone steps", "Planting"],
  },
  {
    id: "detail-in-stone",
    number: "02",
    name: "A little order. A natural finish.",
    category: "hardscape",
    categoryLabel: "Materials & detail",
    image: "/images/collection/earthworks-detail.webp",
    alt: "Illustrative close view of a stone retaining edge beside a paved path and grasses",
    description:
      "A low stone edge brings definition to a garden without taking attention away from the planting.",
    considerations:
      "Wall height, drainage, base preparation and a palette that complements existing surfaces.",
    tags: ["Retaining edges", "Paving", "Texture"],
  },
  {
    id: "garden-path",
    number: "03",
    name: "Room to take the long way.",
    category: "planting",
    categoryLabel: "Gardens & planting",
    image: "/images/collection/lawn-detail.webp",
    alt: "Illustrative gently curving garden path bordered by a lawn and flowering plants",
    description:
      "A soft curve turns a simple garden path into an invitation to spend more time outside.",
    considerations:
      "Path width, seasonal growth, sun exposure and the ongoing care of adjoining beds.",
    tags: ["Garden paths", "Borders", "Seasonal colour"],
  },
  {
    id: "groundwork",
    number: "04",
    name: "Good ground. Better possibilities.",
    category: "sitework",
    categoryLabel: "Groundwork & preparation",
    image: "/images/collection/earthworks-site.webp",
    alt: "Illustrative excavator and prepared ground within a residential mountain landscape",
    description:
      "The early stages give a project its shape, with access, levels and material placement considered together.",
    considerations:
      "Equipment access, existing utilities, grading needs and the sequence of the planned work.",
    tags: ["Site access", "Grading", "Preparation"],
  },
] as const;

export const horizonQuestions = [
  {
    question: "What should I have ready for an initial conversation?",
    answer:
      "A few photos, your general location, the areas you want to change and a rough idea of timing are a useful start. Existing plans, dimensions and a budget range can help shape the discussion, but a finished design is not needed to begin.",
  },
  {
    question: "Can a project be completed in stages?",
    answer:
      "Staging can be worth discussing when access, budget or seasonal work affects the plan. Groundwork, drainage, finished surfaces and planting should be considered together so an early stage supports what comes next.",
  },
  {
    question: "How is the scope of work agreed?",
    answer:
      "The proposed work, materials, access, exclusions and timing should be outlined before work begins. Site-specific engineering, approvals and specialist services are identified separately where they are needed.",
  },
  {
    question: "Can I request landscaping through this website?",
    answer:
      "This is an illustrative website demo, so it does not accept landscape bookings or contractor enquiries. If you would like a website like this for your business, use the L&L enquiry link on the Contact page.",
  },
] as const;
