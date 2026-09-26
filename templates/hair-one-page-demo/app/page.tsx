import { notFound } from "next/navigation";
import HairOnePage from "@/components/collection/HairOnePage";
import { collectionInquiryHref, websiteDesigns } from "@/data/website-collection";

export default function HairOnePageDemo() {
  const design = websiteDesigns.find((item) => item.id === "hair-one-page");
  if (!design) notFound();
  return (
    <HairOnePage
      design={design}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}
    />
  );
}
