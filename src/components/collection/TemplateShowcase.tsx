import DesignCover from "@/components/collection/DesignCover";
import TemplateScreenshotGallery from "@/components/collection/TemplateScreenshotGallery";
import type { WebsiteDesign } from "@/data/website-collection";
import type { TemplateShowcase as ShowcaseMedia } from "@/lib/template-showcase";

export default function TemplateShowcase({
  design,
  media,
}: {
  design: WebsiteDesign;
  media: ShowcaseMedia;
}) {
  return (
    <div className="template-showcase">
      {media.screenshots.length ? (
        <TemplateScreenshotGallery images={media.screenshots} />
      ) : (
        <figure className="template-design-overview">
          <DesignCover design={design} />
          <figcaption>
            Design preview — your own branding, imagery and content make it yours.
          </figcaption>
        </figure>
      )}
    </div>
  );
}
