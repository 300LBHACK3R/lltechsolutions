import { notFound } from "next/navigation";
import LawnTemplate from "@/components/collection/LawnTemplate";
import { collectionInquiryHref, websiteDesigns } from "@/data/website-collection";
import { lawnPageFromPath, lawnPagePath, lawnPages } from "@/data/lawn-pages";

type Props = { params: Promise<{ view?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return lawnPages.map((page) => ({ view: lawnPagePath(page).split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props) {
  const page = lawnPageFromPath((await params).view);
  if (!page) notFound();
  return { title: page === "Home" ? "Lawn Care" : page };
}

export default async function LawncareDemoPage({ params }: Props) {
  const page = lawnPageFromPath((await params).view);
  if (!page) notFound();
  const design = websiteDesigns.find((item) => item.id === "lawncare");
  if (!design) notFound();
  return (
    <LawnTemplate
      design={design}
      standalonePage={page}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}
    />
  );
}
