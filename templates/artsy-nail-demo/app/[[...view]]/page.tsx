import { notFound } from "next/navigation";
import ArtsyNailTemplate from "@/components/collection/ArtsyNailTemplate";
import { collectionInquiryHref, websiteDesigns } from "@/data/website-collection";
import { artsyNailPageFromPath, artsyNailPagePath, artsyNailPages } from "@/data/artsy-nail-pages";

type Props = { params: Promise<{ view?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return artsyNailPages.map((page) => ({
    view: artsyNailPagePath(page).split("/").filter(Boolean),
  }));
}

export async function generateMetadata({ params }: Props) {
  const page = artsyNailPageFromPath((await params).view);
  if (!page) notFound();
  return { title: page === "Home" ? "CHROMA NAIL CLUB" : page };
}

export default async function ArtsyNailDemoPage({ params }: Props) {
  const page = artsyNailPageFromPath((await params).view);
  if (!page) notFound();
  const design = websiteDesigns.find((item) => item.id === "artsy-nails");
  if (!design) notFound();
  return (
    <ArtsyNailTemplate
      design={design}
      standalonePage={page}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}
    />
  );
}
