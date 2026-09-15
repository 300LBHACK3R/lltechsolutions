import Link from "next/link";
import ContentBrief from "@/components/collection/ContentBrief";
import { pageMetadata } from "@/lib/metadata";
export const metadata = {
  ...pageMetadata(
    "Website Content Handover",
    "A simple, optional guide to preparing your business details and website content after booking with L&L.",
    "/website-collection/brief",
  ),
  robots: { index: false, follow: true },
};
export default function BriefPage() {
  return (
    <div className="website-collection container journey-page">
      <Link href="/website-collection" className="text-link">
        ← Website Templates
      </Link>
      <p className="eyebrow">After booking / Your content handover</p>
      <h1>A little at a time.</h1>
      <p>
        Once your project is agreed, use this optional guide to gather the details. Every field can
        wait. Nothing is submitted or uploaded from this page.
      </p>
      <ContentBrief />
    </div>
  );
}
