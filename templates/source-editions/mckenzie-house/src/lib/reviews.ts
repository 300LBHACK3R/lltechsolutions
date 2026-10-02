/**
 * Editable content slots for the fictional Cedar House Wellness template.
 * These instructions are not testimonials or statements from real clients.
 * Add only permission-approved feedback and remove unused cards before launch.
 */

export type ReviewSource = "Placeholder";
export type ReviewPublishedLabel = "Editable content slot";

export type ReviewEntry = Readonly<{
  id: string;
  reviewerName: string;
  firstName: string;
  initials: string;
  quote: string;
  reviewTitle?: string;
  profileUrl: string;
  publishedLabel: ReviewPublishedLabel;
  source: ReviewSource;
  rating: null;
  isExcerpt: boolean;
  featured: boolean;
  homepageFeatured: boolean;
  photoSources?: readonly [string, ...string[]];
  photoAlt?: string;
}>;

export type ReviewPhotoRequirement = Readonly<{
  reviewerName: string;
  acceptedPaths: readonly string[];
}>;

const contentSlots = [
  {
    title: "Add an approved review",
    instruction:
      "Replace this text with a real client review that you have permission to publish. Keep the wording accurate and confirm the preferred display name.",
    featured: true,
    image: "/images/massage-room.webp",
  },
  {
    title: "Add a client story",
    instruction:
      "Use this space for an approved client story. Confirm which details may be shared, and replace the illustrative room image only when you have permission to use a photograph.",
    featured: true,
    image: "/images/medical-spa-interior.webp",
  },
  {
    title: "Choose another highlight",
    instruction:
      "Add a separate, permission-approved review here. Remove this card if you do not have another review ready for publication.",
    featured: true,
    image: "/images/massage-room.webp",
  },
  {
    title: "Confirm the wording",
    instruction:
      "Paste the original approved review here. If you shorten it, make the excerpt clear and preserve its meaning.",
    featured: false,
  },
  {
    title: "Confirm the display name",
    instruction:
      "Replace this placeholder with the name or initials the reviewer has agreed to display publicly.",
    featured: false,
  },
  {
    title: "Add source details",
    instruction:
      "Replace this card with approved feedback and its verified source. Do not add a rating unless it belongs to that review.",
    featured: false,
  },
  {
    title: "Review image permission",
    instruction:
      "Use a client image only when permission covers public use on your website. A portrait is optional.",
    featured: false,
  },
  {
    title: "Keep feedback current",
    instruction:
      "Replace this text with another approved review, then keep its wording and attribution up to date.",
    featured: false,
  },
  {
    title: "Remove unused cards",
    instruction:
      "Delete this content slot if it is not needed. The grid will adapt to the remaining reviews.",
    featured: false,
  },
] as const;

export const clientReviews: readonly ReviewEntry[] = Object.freeze(
  contentSlots.map((slot, index): ReviewEntry => ({
    id: `placeholder-${index + 1}`,
    reviewerName: `Review placeholder ${index + 1}`,
    firstName: `Slot ${String(index + 1).padStart(2, "0")}`,
    initials: String(index + 1).padStart(2, "0"),
    quote: slot.instruction,
    reviewTitle: slot.title,
    profileUrl: "",
    publishedLabel: "Editable content slot",
    source: "Placeholder",
    rating: null,
    isExcerpt: false,
    featured: slot.featured,
    homepageFeatured: slot.featured,
    ...("image" in slot
      ? {
          photoSources: [slot.image] as const,
          photoAlt: "Illustrative wellness interior for an editable review card",
        }
      : {}),
  })),
);

export const featuredClientReviews = Object.freeze(
  clientReviews.filter((review) => review.featured),
);
export const homepageClientReviews = Object.freeze(
  clientReviews.filter((review) => review.homepageFeatured),
);
export const additionalClientReviews = Object.freeze(
  clientReviews.filter((review) => !review.featured),
);

// This download includes no client portraits or client photo requirements.
export const reviewPhotoRequirements: readonly ReviewPhotoRequirement[] = Object.freeze([]);
