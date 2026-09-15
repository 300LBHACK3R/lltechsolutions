import Link from "next/link";
import CollectionJourney from "@/components/collection/CollectionJourney";
import { availableDesigns, type CollectionQuery } from "@/data/website-collection";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata(
    "Plan Your Collection Website",
    "Choose your preferences and review the scope before enquiring with L&L.",
    "/website-collection/start",
  ),
  robots: { index: false, follow: true },
};
export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<CollectionQuery>;
}) {
  const query = await searchParams;
  const design = availableDesigns().find((item) => item.id === query.design);
  return (
    <div className="website-collection container journey-page">
      <p className="eyebrow">Website Templates / Your next step</p>
      <h1>Let’s make this easy.</h1>
      {design ? (
        <CollectionJourney design={design} />
      ) : (
        <div className="collection-no-results">
          <h2>Start with a design you like.</h2>
          <p>Explore the collection, then choose a starting point. We’ll help with the rest.</p>
          <Link href="/website-collection#designs" className="button button-gold">
            Browse the designs ↗
          </Link>
        </div>
      )}
    </div>
  );
}
