import { notFound } from "next/navigation";
import BeautyTemplate from "@/components/collection/BeautyTemplate";
import { collectionInquiryHref, websiteDesigns } from "@/data/website-collection";
import { beautyPageFromPath, beautyPagePath, beautyPages } from "@/data/beauty-pages";

type Props = { params: Promise<{ view?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return beautyPages.map((page) => ({ view: beautyPagePath(page).split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props) {
  const page = beautyPageFromPath((await params).view);
  if (!page) notFound();
  return { title: page === "Home" ? "Forma Nail & Skin" : page };
}

export default async function BeautyDemoPage({ params }: Props) {
  const page = beautyPageFromPath((await params).view);
  if (!page) notFound();
  const design = websiteDesigns.find((item) => item.id === "still");
  if (!design) notFound();
  return (
    <BeautyTemplate
      design={design}
      standalonePage={page}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}
    />
  );
}
