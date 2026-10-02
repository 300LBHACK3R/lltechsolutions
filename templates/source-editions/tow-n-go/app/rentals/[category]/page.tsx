import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getTrailerCategoryById,
  getTrailersForCategory,
  trailerCategories,
  type TrailerCategoryId,
} from "@/data/trailerCategories";
import { siteConfig, socialImage } from "@/lib/site";
import { CategoryRentalsClient } from "./CategoryRentalsClient";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return trailerCategories.map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const category = getTrailerCategoryById(categoryParam);

  if (!category) {
    return {
      title: "Trailer Rentals",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const categoryUrl = `${siteConfig.url}/rentals/${category.id}`;
  const socialTitle = `${category.seoTitle} | Trail & Co Rentals`;

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title: socialTitle,
      description: category.seoDescription,
      url: categoryUrl,
      siteName: siteConfig.name,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: category.seoDescription,
      images: [socialImage.url],
    },
  };
}

export default async function TrailerCategoryPage({ params }: CategoryPageProps) {
  const { category: categoryParam } = await params;
  const category = getTrailerCategoryById(categoryParam);

  if (!category) {
    notFound();
  }

  const categoryUrl = `${siteConfig.url}/rentals/${category.id}`;

  const categoryTrailers = getTrailersForCategory(category.id as TrailerCategoryId);

  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": categoryUrl,
    name: `${category.title} | Trail & Co Rentals`,
    description: category.seoDescription,
    url: categoryUrl,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "Service",
      name: category.title,
      serviceType: "Trailer Rental",
      provider: {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      name: `${category.title} available from Trail & Co Rentals`,
      numberOfItems: categoryTrailers.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: categoryTrailers.map((trailer, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: trailer.name,
        url: `${categoryUrl}#${trailer.id}`,
      })),
    },
  };

  return (
    <>
      <JsonLd data={categoryJsonLd} />

      <CategoryRentalsClient category={category} trailers={categoryTrailers} />
    </>
  );
}
