export type ProjectCategorySlug = "custom-homes" | "multi-family" | "strata" | "commercial";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectItem = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategorySlug;
  categoryTitle: string;
  location: string;
  type: string;
  description: string;
  coverImage: string;
  images: ProjectImage[];
};

export type ProjectCategory = {
  slug: ProjectCategorySlug;
  title: string;
  short: string;
  description: string;
  image: string;
};

// Fictional content and generated media only. Replace with your own approved work.
export const projectCategories: ProjectCategory[] = [
  {
    slug: "custom-homes",
    title: "Custom Homes",
    short: "Detailed interiors and exterior finishes for custom residential spaces.",
    description:
      "Illustrative custom homes gallery for Summit Painting Studio. All project names and descriptions are sample content; images are generated placeholders, not completed client work.",
    image: "/images/painting-interior.webp",
  },
  {
    slug: "multi-family",
    title: "Multi-Family",
    short: "Apartments, townhomes and shared residential environments.",
    description:
      "Illustrative multi-family gallery for Summit Painting Studio. All project names and descriptions are sample content; images are generated placeholders, not completed client work.",
    image: "/images/construction-home.webp",
  },
  {
    slug: "strata",
    title: "Strata",
    short: "Common areas and exterior finishes for shared properties.",
    description:
      "Illustrative strata gallery for Summit Painting Studio. All project names and descriptions are sample content; images are generated placeholders, not completed client work.",
    image: "/images/construction-home.webp",
  },
  {
    slug: "commercial",
    title: "Commercial",
    short: "Offices, retail spaces and professional environments.",
    description:
      "Illustrative commercial gallery for Summit Painting Studio. All project names and descriptions are sample content; images are generated placeholders, not completed client work.",
    image: "/images/painting-interior.webp",
  },
];

export const projects: ProjectItem[] = [
  {
    id: "custom-homes-sample-1",
    slug: "custom-homes-sample-1",
    title: "Custom Homes Study 01",
    category: "custom-homes",
    categoryTitle: "Custom Homes",
    location: "Illustrative project",
    type: "Custom Homes",
    description:
      "A fictional custom homes project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/painting-interior.webp",
    images: [
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 1; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 2; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 3; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 4; not a completed project",
      },
    ],
  },
  {
    id: "custom-homes-sample-2",
    slug: "custom-homes-sample-2",
    title: "Custom Homes Study 02",
    category: "custom-homes",
    categoryTitle: "Custom Homes",
    location: "Illustrative project",
    type: "Custom Homes",
    description:
      "A fictional custom homes project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/painting-interior.webp",
    images: [
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 1; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 2; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 3; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 4; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 5; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 6; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 7; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 8; not a completed project",
      },
    ],
  },
  {
    id: "custom-homes-sample-3",
    slug: "custom-homes-sample-3",
    title: "Custom Homes Study 03",
    category: "custom-homes",
    categoryTitle: "Custom Homes",
    location: "Illustrative project",
    type: "Custom Homes",
    description:
      "A fictional custom homes project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/painting-interior.webp",
    images: [
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 1; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 2; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 3; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 4; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 5; not a completed project",
      },
    ],
  },
  {
    id: "custom-homes-sample-4",
    slug: "custom-homes-sample-4",
    title: "Custom Homes Study 04",
    category: "custom-homes",
    categoryTitle: "Custom Homes",
    location: "Illustrative project",
    type: "Custom Homes",
    description:
      "A fictional custom homes project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/painting-interior.webp",
    images: [
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 1; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 2; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 3; not a completed project",
      },
    ],
  },
  {
    id: "custom-homes-sample-5",
    slug: "custom-homes-sample-5",
    title: "Custom Homes Study 05",
    category: "custom-homes",
    categoryTitle: "Custom Homes",
    location: "Illustrative project",
    type: "Custom Homes",
    description:
      "A fictional custom homes project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/painting-interior.webp",
    images: [
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 1; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 2; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 3; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 4; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 5; not a completed project",
      },
    ],
  },
  {
    id: "custom-homes-sample-6",
    slug: "custom-homes-sample-6",
    title: "Custom Homes Study 06",
    category: "custom-homes",
    categoryTitle: "Custom Homes",
    location: "Illustrative project",
    type: "Custom Homes",
    description:
      "A fictional custom homes project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/painting-interior.webp",
    images: [
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 1; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 2; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative custom homes image 3; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative custom homes image 4; not a completed project",
      },
    ],
  },
  {
    id: "multi-family-sample-1",
    slug: "multi-family-sample-1",
    title: "Multi-Family Study 01",
    category: "multi-family",
    categoryTitle: "Multi-Family",
    location: "Illustrative project",
    type: "Multi-Family",
    description:
      "A fictional multi-family project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/construction-home.webp",
    images: [
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative multi-family image 1; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative multi-family image 2; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative multi-family image 3; not a completed project",
      },
    ],
  },
  {
    id: "multi-family-sample-2",
    slug: "multi-family-sample-2",
    title: "Multi-Family Study 02",
    category: "multi-family",
    categoryTitle: "Multi-Family",
    location: "Illustrative project",
    type: "Multi-Family",
    description:
      "A fictional multi-family project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/construction-home.webp",
    images: [
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative multi-family image 1; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative multi-family image 2; not a completed project",
      },
    ],
  },
  {
    id: "multi-family-sample-3",
    slug: "multi-family-sample-3",
    title: "Multi-Family Study 03",
    category: "multi-family",
    categoryTitle: "Multi-Family",
    location: "Illustrative project",
    type: "Multi-Family",
    description:
      "A fictional multi-family project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/construction-home.webp",
    images: [
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative multi-family image 1; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative multi-family image 2; not a completed project",
      },
    ],
  },
  {
    id: "multi-family-sample-4",
    slug: "multi-family-sample-4",
    title: "Multi-Family Study 04",
    category: "multi-family",
    categoryTitle: "Multi-Family",
    location: "Illustrative project",
    type: "Multi-Family",
    description:
      "A fictional multi-family project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/construction-home.webp",
    images: [
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative multi-family image 1; not a completed project",
      },
    ],
  },
  {
    id: "multi-family-sample-5",
    slug: "multi-family-sample-5",
    title: "Multi-Family Study 05",
    category: "multi-family",
    categoryTitle: "Multi-Family",
    location: "Illustrative project",
    type: "Multi-Family",
    description:
      "A fictional multi-family project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/construction-home.webp",
    images: [
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative multi-family image 1; not a completed project",
      },
    ],
  },
  {
    id: "multi-family-sample-6",
    slug: "multi-family-sample-6",
    title: "Multi-Family Study 06",
    category: "multi-family",
    categoryTitle: "Multi-Family",
    location: "Illustrative project",
    type: "Multi-Family",
    description:
      "A fictional multi-family project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/construction-home.webp",
    images: [
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative multi-family image 1; not a completed project",
      },
    ],
  },
  {
    id: "multi-family-sample-7",
    slug: "multi-family-sample-7",
    title: "Multi-Family Study 07",
    category: "multi-family",
    categoryTitle: "Multi-Family",
    location: "Illustrative project",
    type: "Multi-Family",
    description:
      "A fictional multi-family project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/construction-home.webp",
    images: [
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative multi-family image 1; not a completed project",
      },
    ],
  },
  {
    id: "multi-family-sample-8",
    slug: "multi-family-sample-8",
    title: "Multi-Family Study 08",
    category: "multi-family",
    categoryTitle: "Multi-Family",
    location: "Illustrative project",
    type: "Multi-Family",
    description:
      "A fictional multi-family project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/construction-home.webp",
    images: [
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative multi-family image 1; not a completed project",
      },
    ],
  },
  {
    id: "strata-sample-1",
    slug: "strata-sample-1",
    title: "Strata Study 01",
    category: "strata",
    categoryTitle: "Strata",
    location: "Illustrative project",
    type: "Strata",
    description:
      "A fictional strata project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/construction-home.webp",
    images: [
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative strata image 1; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative strata image 2; not a completed project",
      },
    ],
  },
  {
    id: "strata-sample-2",
    slug: "strata-sample-2",
    title: "Strata Study 02",
    category: "strata",
    categoryTitle: "Strata",
    location: "Illustrative project",
    type: "Strata",
    description:
      "A fictional strata project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/construction-home.webp",
    images: [
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative strata image 1; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative strata image 2; not a completed project",
      },
    ],
  },
  {
    id: "strata-sample-3",
    slug: "strata-sample-3",
    title: "Strata Study 03",
    category: "strata",
    categoryTitle: "Strata",
    location: "Illustrative project",
    type: "Strata",
    description:
      "A fictional strata project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/construction-home.webp",
    images: [
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative strata image 1; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative strata image 2; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative strata image 3; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative strata image 4; not a completed project",
      },
    ],
  },
  {
    id: "strata-sample-4",
    slug: "strata-sample-4",
    title: "Strata Study 04",
    category: "strata",
    categoryTitle: "Strata",
    location: "Illustrative project",
    type: "Strata",
    description:
      "A fictional strata project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/construction-home.webp",
    images: [
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative strata image 1; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative strata image 2; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative strata image 3; not a completed project",
      },
    ],
  },
  {
    id: "commercial-sample-1",
    slug: "commercial-sample-1",
    title: "Commercial Study 01",
    category: "commercial",
    categoryTitle: "Commercial",
    location: "Illustrative project",
    type: "Commercial",
    description:
      "A fictional commercial project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/painting-interior.webp",
    images: [
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative commercial image 1; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative commercial image 2; not a completed project",
      },
    ],
  },
  {
    id: "commercial-sample-2",
    slug: "commercial-sample-2",
    title: "Commercial Study 02",
    category: "commercial",
    categoryTitle: "Commercial",
    location: "Illustrative project",
    type: "Commercial",
    description:
      "A fictional commercial project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/painting-interior.webp",
    images: [
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative commercial image 1; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative commercial image 2; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative commercial image 3; not a completed project",
      },
    ],
  },
  {
    id: "commercial-sample-3",
    slug: "commercial-sample-3",
    title: "Commercial Study 03",
    category: "commercial",
    categoryTitle: "Commercial",
    location: "Illustrative project",
    type: "Commercial",
    description:
      "A fictional commercial project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/painting-interior.webp",
    images: [
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative commercial image 1; not a completed project",
      },
    ],
  },
  {
    id: "commercial-sample-4",
    slug: "commercial-sample-4",
    title: "Commercial Study 04",
    category: "commercial",
    categoryTitle: "Commercial",
    location: "Illustrative project",
    type: "Commercial",
    description:
      "A fictional commercial project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/painting-interior.webp",
    images: [
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative commercial image 1; not a completed project",
      },
      {
        src: "/images/construction-home.webp",
        alt: "Generated illustrative commercial image 2; not a completed project",
      },
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative commercial image 3; not a completed project",
      },
    ],
  },
  {
    id: "commercial-sample-5",
    slug: "commercial-sample-5",
    title: "Commercial Study 05",
    category: "commercial",
    categoryTitle: "Commercial",
    location: "Illustrative project",
    type: "Commercial",
    description:
      "A fictional commercial project entry demonstrating how to present scope, preparation and finish details. Replace this copy and the generated images with your own approved portfolio.",
    coverImage: "/images/painting-interior.webp",
    images: [
      {
        src: "/images/painting-interior.webp",
        alt: "Generated illustrative commercial image 1; not a completed project",
      },
    ],
  },
];

export function getProjectCategory(slug: string) {
  return projectCategories.find((category) => category.slug === slug);
}

export function getProjectCategoryPath(slug: ProjectCategorySlug | string) {
  return `/projects/${slug}`;
}

export function getProjectsByCategory(slug: string) {
  return projects.filter((project) => project.category === slug);
}

export function getPreviewProjects(limit = 4) {
  return projects.slice(0, limit);
}
