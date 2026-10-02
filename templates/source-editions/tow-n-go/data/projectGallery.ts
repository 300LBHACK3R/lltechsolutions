import { getPublishedJobs, type JobPhoto, type RecentJob } from "@/data/recentJobs";
import type { ServiceType } from "@/data/servicePathways";

/** Illustrative advertising scenes. Never present these as completed customer jobs. */
export type GalleryExample = {
  id: string;
  title: string;
  summary: string;
  trailer: string;
  service: ServiceType;
  image: JobPhoto;
};

export type GalleryEntry =
  { kind: "job"; project: RecentJob } | { kind: "example"; project: GalleryExample };

// Kept separate from the approved customer-job data, including its SEO controls.
export const galleryExamples: readonly GalleryExample[] = [
  {
    id: "enclosed-delivery-idea",
    title: "Space for your next move.",
    summary:
      "Have an enclosed trailer delivered to your place. You load and use it; collection is arranged with Trail & Co.",
    trailer: "Enclosed trailer",
    service: "delivery",
    image: {
      src: "/images/sample-rentals.webp",
      alt: "Generated illustrative equipment-rental scene; replace with your approved enclosed-trailer image.",
      width: 1536,
      height: 1024,
    },
  },
  {
    id: "landscaping-rental-idea",
    title: "Ready for a garden refresh.",
    summary:
      "Room for mulch, materials and the weekend’s to-do list. Ask about a dump-trailer rental for your next landscaping project.",
    trailer: "Dump trailer",
    service: "rental",
    image: {
      src: "/images/sample-rentals.webp",
      alt: "Generated illustrative equipment-rental scene; replace with your approved dump-trailer image.",
      width: 1536,
      height: 1024,
    },
  },
];

export function getGalleryEntries(): readonly GalleryEntry[] {
  const jobs = getPublishedJobs();
  if (jobs.length > 0) {
    return jobs.map((project) => ({ kind: "job", project }));
  }
  return galleryExamples.map((project) => ({ kind: "example", project }));
}
