import { notFound } from "next/navigation";
import MedicalSpaTemplate from "@/components/collection/MedicalSpaTemplate";
import { collectionInquiryHref, websiteDesigns } from "@/data/website-collection";
import {
  medicalSpaPageFromPath,
  medicalSpaPagePath,
  medicalSpaPages,
} from "@/data/medical-spa-pages";

type Props = { params: Promise<{ view?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return medicalSpaPages.map((page) => ({
    view: medicalSpaPagePath(page).split("/").filter(Boolean),
  }));
}

export async function generateMetadata({ params }: Props) {
  const page = medicalSpaPageFromPath((await params).view);
  if (!page) notFound();
  return { title: page === "Home" ? "Aurel Aesthetics" : page };
}

export default async function MedicalSpaDemoPage({ params }: Props) {
  const page = medicalSpaPageFromPath((await params).view);
  if (!page) notFound();
  const design = websiteDesigns.find((item) => item.id === "medical-spa");
  if (!design) notFound();
  return (
    <MedicalSpaTemplate
      design={design}
      standalonePage={page}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}
    />
  );
}
