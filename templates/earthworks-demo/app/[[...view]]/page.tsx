import { notFound } from "next/navigation";
import EarthworksTemplate from "@/components/collection/EarthworksTemplate";
import { collectionInquiryHref, websiteDesigns } from "@/data/website-collection";
import { earthworksPageFromPath, earthworksPages } from "@/data/earthworks-pages";

type Props = { params: Promise<{ view?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return earthworksPages.map((page) => ({ view: page === "Home" ? [] : [page.toLowerCase()] }));
}
export async function generateMetadata({ params }: Props) {
  const page = earthworksPageFromPath((await params).view);
  if (!page) notFound();
  return { title: page === "Home" ? "Excavation & Landscaping" : page };
}
export default async function EarthworksDemoPage({ params }: Props) {
  const page = earthworksPageFromPath((await params).view);
  if (!page) notFound();
  const design = websiteDesigns.find((item) => item.id === "earthworks");
  if (!design) notFound();
  return (
    <EarthworksTemplate
      design={design}
      businessName=""
      standalonePage={page}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}
    />
  );
}
