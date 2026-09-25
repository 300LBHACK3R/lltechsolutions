import { notFound } from "next/navigation";
import WellnessTemplate from "@/components/collection/WellnessTemplate";
import { collectionInquiryHref, websiteDesigns } from "@/data/website-collection";
import { wellnessPageFromPath, wellnessPagePath, wellnessPages } from "@/data/wellness-pages";

type Props = { params: Promise<{ view?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return wellnessPages.map((page) => ({ view: wellnessPagePath(page).split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props) {
  const page = wellnessPageFromPath((await params).view);
  if (!page) notFound();
  return { title: page === "Home" ? "A little room to unwind" : page };
}

export default async function WellnessDemoPage({ params }: Props) {
  const page = wellnessPageFromPath((await params).view);
  if (!page) notFound();
  const design = websiteDesigns.find((item) => item.id === "mckenzie-house");
  if (!design) notFound();
  return (
    <WellnessTemplate
      design={design}
      standalonePage={page}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}
    />
  );
}
