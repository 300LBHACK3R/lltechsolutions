/** Shared purchase copy: service inclusions never change the selected template's scope. */
export const templateManagedOffer = {
  label: "Personalization & launch included",
  summary:
    "L&L adds your supplied business details, text, photos, video and branding to the agreed pages. Your template price includes personalization, page-speed optimization, technical SEO and metadata setup, responsive and security checks, and launch.",
  compact:
    "We add your supplied content and branding, optimize page speed, set up technical SEO and check your website before launch.",
} as const;

export const templateMediaOffer = {
  summary:
    "Need original photos or video? We offer photography, videography, editing and website integration, quoted separately.",
  href: "/services#photography-videography",
} as const;

export function managedPurchaseHref(designId: string) {
  return `/website-collection/${encodeURIComponent(designId)}/purchase`;
}
