import { notFound } from "next/navigation";
import PaintingTemplate from "@/components/collection/PaintingTemplate";
import { collectionInquiryHref, websiteDesigns } from "@/data/website-collection";
import { paintingPageFromPath, paintingPages } from "@/data/painting-pages";

type Props = { params: Promise<{ view?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return paintingPages.map((page) => ({ view: page === "Home" ? [] : [page.toLowerCase()] }));
}
export async function generateMetadata({ params }: Props) {
  const page = paintingPageFromPath((await params).view);
  if (!page) notFound();
  return { title: page === "Home" ? "Paint Studio" : page };
}
export default async function PaintingDemoPage({ params }: Props) {
  const page = paintingPageFromPath((await params).view);
  if (!page) notFound();
  const design = websiteDesigns.find((item) => item.id === "pigment");
  if (!design) notFound();
  return (
    <PaintingTemplate
      design={design}
      businessName=""
      standalonePage={page}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}
    />
  );
}
