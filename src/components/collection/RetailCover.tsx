import Image from "next/image";
import { retailTemplate, type WebsiteDesign } from "@/data/website-collection";

/** Inert art-directed preview. Actual page captures use the separate screenshot gallery. */
export default function RetailCover({
  design,
  expanded = false,
}: {
  design: WebsiteDesign;
  expanded?: boolean;
}) {
  const template = retailTemplate(design.id);
  if (!template) return null;
  return (
    <div
      className={`design-cover retail-cover retail-cover-${template.id}`}
      aria-hidden="true"
      data-retail-cover={template.id}
    >
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Design preview</span>
      </div>
      <div className="retail-cover-nav">
        <strong>{template.brand}</strong>
        <span>{template.subbrand}</span>
      </div>
      <div className="retail-cover-stage">
        <div className="retail-cover-copy">
          <span className="retail-cover-index">
            01 / {template.pages.length === 1 ? "A fresh perspective" : "Discover the collection"}
          </span>
          <p className="retail-cover-headline">
            {template.headline}
            <em>{template.emphasis}</em>
          </p>
          <span className="retail-cover-action">
            {template.cta} <b>↗</b>
          </span>
        </div>
        <figure>
          <Image
            src={template.image}
            alt=""
            fill
            sizes={
              expanded
                ? "(max-width: 699px) 90vw, 80vw"
                : "(max-width: 699px) 100vw, (max-width: 1100px) 50vw, 33vw"
            }
          />
        </figure>
        {template.id === "wheel-studio" ? (
          <span className="retail-cover-finish">
            FINISH / BRONZE <i />
            <i />
            <i />
          </span>
        ) : null}
        {template.id === "flower-shop" ? <span className="retail-cover-flower">✳</span> : null}
      </div>
      <div className="retail-cover-bottom">
        {template.services.slice(0, 3).map((service, i) => (
          <span key={service.name}>
            <b>0{i + 1}</b> {service.name}
          </span>
        ))}
      </div>
    </div>
  );
}
