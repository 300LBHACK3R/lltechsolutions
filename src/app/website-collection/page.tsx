import SignalArtwork from "@/components/ui/SignalArtwork";
import TemplateSaleNotice from "@/components/collection/TemplateSaleNotice";
import { isTemplateSaleActive } from "@/data/template-promotion";
import { redirect } from "next/navigation";
import TemplateCategories from "@/components/collection/TemplateCategories";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/config/site";
import {
  categoryForIndustry,
  categoryHref,
  templateCategories,
  collectionDescription,
  collectionPriceRange,
  type CollectionQuery,
} from "@/data/website-collection";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Website Templates & Managed Launch",
  collectionDescription,
  "/website-collection",
);
export default async function WebsiteCollectionPage({
  searchParams,
}: {
  searchParams: Promise<CollectionQuery>;
}) {
  const query = await searchParams;
  const category = categoryForIndustry(query.industry);
  if (category) {
    const filters = new URLSearchParams();
    for (const key of ["industry", "tier", "budget", "sort"]) {
      const value = query[key];
      if (typeof value === "string" && value.length < 80) filters.set(key, value);
    }
    redirect(`${categoryHref(category)}?${filters.toString()}#designs`);
  }
  return (
    <div className="website-collection">
      <section className="collection-intro signal-surface" aria-labelledby="collection-title">
        <SignalArtwork className="surface-signals" />
        <div className="container">
          <p className="eyebrow">L&L / Website Templates</p>
          <h1 id="collection-title">
            A design you love. <em>The details, handled.</em>
          </h1>
          <p className="collection-intro-copy">
            Start with a design that feels right for your business. We tailor the code, bring your
            brand into it, and handle the launch.
          </p>
          <TemplateSaleNotice initialSaleActive={isTemplateSaleActive()} />
          <p className="collection-intro-note">
            Custom-coded. Personally handled.
            <span>Regular starting prices {collectionPriceRange}.</span>
          </p>
        </div>
      </section>
      <div className="container">
        <TemplateCategories />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "L&L Website Templates",
          description: collectionDescription,
          url: absoluteUrl("/website-collection"),
          inLanguage: "en-CA",
          isPartOf: { "@id": absoluteUrl("/#website") },
          about: {
            "@type": "Service",
            name: "Website design personalization and launch",
            provider: { "@id": absoluteUrl("/#organization") },
            areaServed: "Canada",
          },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: templateCategories.length,
            itemListElement: templateCategories.map((category, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: category.name,
              url: absoluteUrl(categoryHref(category)),
            })),
          },
        }}
      />
    </div>
  );
}
