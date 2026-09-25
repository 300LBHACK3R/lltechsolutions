import Link from "next/link";
import { collectionCustomization, collectionInquiryHref } from "@/data/website-collection";

export default function CollectionCustomization({ designId }: { designId?: string }) {
  return (
    <aside className="collection-customization" aria-label="Template customization and extra pages">
      <div>
        <p className="eyebrow">Flexible by design</p>
        <h3>{collectionCustomization.title}</h3>
      </div>
      <div>
        <p>{collectionCustomization.summary}</p>
        <p>{collectionCustomization.pricing}</p>
        <Link className="text-link" href={collectionInquiryHref({ design: designId })}>
          Tell us what you have in mind <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </aside>
  );
}
