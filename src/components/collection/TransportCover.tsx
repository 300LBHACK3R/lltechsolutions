import Image from "next/image";
import { transportTemplate, type WebsiteDesign } from "@/data/website-collection";

export default function TransportCover({
  design,
  expanded = false,
}: {
  design: WebsiteDesign;
  expanded?: boolean;
}) {
  const template = transportTemplate(design.id);
  if (!template) return null;
  return (
    <div
      className={`design-cover tl-cover tl-theme-${template.id}`}
      aria-hidden="true"
      data-transport-cover={template.id}
    >
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="tl-cover-nav">
        <strong>{template.brand}</strong>
        <span>{template.subbrand}</span>
      </div>
      <div className="tl-cover-body">
        <div className="tl-cover-copy">
          <span className="tl-kicker">{template.subbrand}</span>
          <p className="tl-cover-headline">
            {template.headline}
            <em>{template.emphasis}</em>
          </p>
          <span className="tl-cover-action">{template.cta} ↗</span>
        </div>
        <figure>
          <Image
            src={template.image}
            alt=""
            fill
            sizes={
              expanded
                ? "(max-width: 699px) 50vw, 45vw"
                : "(max-width: 699px) 50vw, (max-width: 1100px) 25vw, 17vw"
            }
          />
        </figure>
      </div>
      <div className="tl-cover-bottom">
        <span>{template.services[0].name}</span>
        <span>{template.services[1].name}</span>
        <span>{template.services[2].name}</span>
      </div>
    </div>
  );
}
