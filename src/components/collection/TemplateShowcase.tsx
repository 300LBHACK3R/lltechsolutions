import Link from "next/link";
import DesignCover from "@/components/collection/DesignCover";
import InteractiveDesignPreview from "@/components/collection/InteractiveDesignPreview";
import TemplateScreenshotGallery from "@/components/collection/TemplateScreenshotGallery";
import {
  collectionInquiryHref,
  collectionTiers,
  type WebsiteDesign,
} from "@/data/website-collection";
import type { TemplateShowcase as ShowcaseMedia } from "@/lib/template-showcase";

export default function TemplateShowcase({
  design,
  media,
}: {
  design: WebsiteDesign;
  media: ShowcaseMedia;
}) {
  return (
    <>
      <div className="template-showcase-actions">
        <div>
          <span className="eyebrow">
            {design.name} / {collectionTiers.find((tier) => tier.id === design.tier)?.name}
          </span>
          <p>Explore the look. Picture your business here.</p>
        </div>
        <div className="button-row">
          {media.url ? (
            <a
              className="button button-gold"
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View live demo <span className="sr-only">in a new tab</span>↗
            </a>
          ) : (
            <a className="button button-gold" href="#interactive-preview">
              Explore interactive preview ↓
            </a>
          )}
          <Link className="text-link" href={collectionInquiryHref({ design: design.id })}>
            Make this my website ↗
          </Link>
        </div>
      </div>
      {media.screenshots.length ? (
        <TemplateScreenshotGallery images={media.screenshots} />
      ) : (
        <figure className="template-design-overview">
          <DesignCover design={design} />
          <figcaption>
            Design preview — explore the pages and interactive navigation in the demo.
          </figcaption>
        </figure>
      )}
      <InteractiveDesignPreview design={design} liveDemoUrl={media.url ?? undefined} />
    </>
  );
}
