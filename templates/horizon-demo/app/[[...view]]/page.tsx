import { notFound } from "next/navigation";
import HorizonTemplate from "@/components/collection/HorizonTemplate";
import { collectionInquiryHref, websiteDesigns } from "@/data/website-collection";
import { horizonPageFromPath, horizonPagePath, horizonPages } from "@/data/horizon-pages";

type Props = { params: Promise<{ view?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return horizonPages.map((page) => ({ view: horizonPagePath(page).split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props) {
  const page = horizonPageFromPath((await params).view);
  if (!page) notFound();
  return { title: page === "Home" ? "Landscape Studio" : page };
}

export default async function HorizonDemoPage({ params }: Props) {
  const page = horizonPageFromPath((await params).view);
  if (!page) notFound();
  const design = websiteDesigns.find((item) => item.id === "horizon");
  if (!design) notFound();
  return (
    <HorizonTemplate
      design={design}
      standalonePage={page}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}
    />
  );
}
