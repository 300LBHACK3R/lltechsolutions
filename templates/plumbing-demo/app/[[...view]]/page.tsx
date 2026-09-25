import { notFound } from "next/navigation";
import PlumbingTemplate from "@/components/collection/PlumbingTemplate";
import { collectionInquiryHref, websiteDesigns } from "@/data/website-collection";
import { plumbingPageFromPath, plumbingPages } from "@/data/plumbing-pages";

type Props = { params: Promise<{ view?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return plumbingPages.map((page) => ({ view: page === "Home" ? [] : [page.toLowerCase()] }));
}
export async function generateMetadata({ params }: Props) {
  const page = plumbingPageFromPath((await params).view);
  if (!page) notFound();
  return { title: page === "Home" ? "Plumbing Company" : page };
}
export default async function PlumbingDemoPage({ params }: Props) {
  const page = plumbingPageFromPath((await params).view);
  if (!page) notFound();
  const design = websiteDesigns.find((item) => item.id === "structure");
  if (!design) notFound();
  return (
    <PlumbingTemplate
      design={design}
      businessName=""
      standalonePage={page}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}
    />
  );
}
