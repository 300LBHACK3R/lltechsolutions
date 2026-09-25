import { notFound } from "next/navigation";
import MassageOnePage from "@/components/collection/MassageOnePage";
import { collectionInquiryHref, websiteDesigns } from "@/data/website-collection";

export default function MassageOnePageDemo() {
  const design = websiteDesigns.find((item) => item.id === "massage-one-page");
  if (!design) notFound();
  return (
    <MassageOnePage
      design={design}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}
    />
  );
}
