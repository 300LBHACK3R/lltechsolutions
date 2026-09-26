import { notFound } from "next/navigation";
import HairSalonTemplate from "@/components/collection/HairSalonTemplate";
import { collectionInquiryHref, websiteDesigns } from "@/data/website-collection";
import { hairSalonPageFromPath, hairSalonPagePath, hairSalonPages } from "@/data/hair-salon-pages";

type Props = { params: Promise<{ view?: string[] }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return hairSalonPages.map((page) => ({
    view: hairSalonPagePath(page).split("/").filter(Boolean),
  }));
}

export async function generateMetadata({ params }: Props) {
  const page = hairSalonPageFromPath((await params).view);
  if (!page) notFound();
  return { title: page === "Home" ? "Line & Form Hair" : page };
}

export default async function HairSalonDemoPage({ params }: Props) {
  const page = hairSalonPageFromPath((await params).view);
  if (!page) notFound();
  const design = websiteDesigns.find((item) => item.id === "hair-salon");
  if (!design) notFound();
  return (
    <HairSalonTemplate
      design={design}
      standalonePage={page}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}
    />
  );
}
