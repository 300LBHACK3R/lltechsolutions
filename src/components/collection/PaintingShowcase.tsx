import Link from "next/link";
import PaintingCover from "@/components/collection/PaintingCover";
import DesignPreview from "@/components/collection/DesignPreview";
import TemplateScreenshotGallery from "@/components/collection/TemplateScreenshotGallery";
import { collectionInquiryHref, type WebsiteDesign } from "@/data/website-collection";
import type { TemplateShowcase } from "@/lib/template-showcase";

export default function PaintingShowcase({
  design,
  media,
}: {
  design: WebsiteDesign;
  media: TemplateShowcase;
}) {
  return (
    <>
      <div className="template-showcase-actions">
        <div>
          <span className="eyebrow">Painting Company / Signature</span>
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
          <PaintingCover design={design} />
          <figcaption>
            Design preview — explore the pages and brush navigation in the interactive demo.
          </figcaption>
        </figure>
      )}
      <details className="template-interactive-preview" id="interactive-preview" open={!media.url}>
        <summary>
          Try this design here <span aria-hidden="true">+</span>
        </summary>
        <div>
          <DesignPreview design={design} />
        </div>
      </details>
    </>
  );
}
