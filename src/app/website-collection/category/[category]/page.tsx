import Link from "next/link";
import { notFound } from "next/navigation";
import CollectionCatalog from "@/components/collection/CollectionCatalog";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/config/site";
import {
  categoryDesigns,
  categoryHref,
  designHref,
  filterDesigns,
  templateCategories,
  type CollectionQuery,
} from "@/data/website-collection";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ category: string }>; searchParams: Promise<CollectionQuery> };

export function generateStaticParams() {
  return templateCategories.map(({ id }) => ({ category: id }));
}

export async function generateMetadata({ params }: Props) {
  const { category: id } = await params;
  const category = templateCategories.find((item) => item.id === id);
  if (!category) notFound();
  return {
    ...pageMetadata(
      `${category.name} Website Templates`,
      `Explore website templates for ${category.description.charAt(0).toLowerCase() + category.description.slice(1)} Personalization and launch handled by L&L.`,
      categoryHref(category),
    ),
    ...(!categoryDesigns(category).length ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function TemplateCategoryPage({ params, searchParams }: Props) {
  const [{ category: id }, query] = await Promise.all([params, searchParams]);
  const category = templateCategories.find((item) => item.id === id);
  if (!category) notFound();
  const designs = categoryDesigns(category);
  const listed = filterDesigns(designs, query);
  return (
    <div className="website-collection">
      <section className="template-gallery-hero">
        <div className="container">
          <Link className="text-link" href="/website-collection#designs">
            ← All business categories
          </Link>
          <p className="eyebrow">Website Templates</p>
          <h1>{category.name}</h1>
          <p>
            {category.description} Open a template to explore its pages and imagine it with your own
            branding.
          </p>
        </div>
      </section>
      <div className="container">
        <CollectionCatalog designs={designs} query={query} category={category} />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${category.name} Website Templates`,
          description: category.description,
          url: absoluteUrl(categoryHref(category)),
          inLanguage: "en-CA",
          isPartOf: { "@id": absoluteUrl("/website-collection") },
          ...(listed.length
            ? {
                mainEntity: {
                  "@type": "ItemList",
                  numberOfItems: listed.length,
                  itemListElement: listed.map((design, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: design.name,
                    url: absoluteUrl(designHref(design)),
                  })),
                },
              }
            : {}),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Website Templates",
              item: absoluteUrl("/website-collection"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: category.name,
              item: absoluteUrl(categoryHref(category)),
            },
          ],
        }}
      />
    </div>
  );
}
