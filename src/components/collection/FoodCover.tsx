import Image from "next/image";
import { foodTemplate, type WebsiteDesign } from "@/data/website-collection";

/** An inert design illustration, never an interactive demo or fabricated screenshot. */
export default function FoodCover({
  design,
  expanded = false,
}: {
  design: WebsiteDesign;
  expanded?: boolean;
}) {
  const template = foodTemplate(design.id);
  if (!template) return null;
  const pizza = template.id === "pizzeria";
  return (
    <div
      className={`design-cover food-cover food-cover-${template.id}`}
      aria-hidden="true"
      data-food-cover={template.id}
    >
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Design preview</span>
      </div>
      <div className="food-cover-nav">
        <strong>{template.brand}</strong>
        <span>{template.subbrand}</span>
      </div>
      <div className="food-cover-stage">
        <div className="food-cover-copy">
          <span className="food-kicker">{template.subbrand}</span>
          <p className="food-cover-headline">
            {template.headline}
            <em>{template.emphasis}</em>
          </p>
          <span className="food-cover-action">{template.cta} ↗</span>
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
          {pizza ? (
            <span className="food-cover-wheel-label">
              A slice
              <br />
              of good times
            </span>
          ) : null}
        </figure>
      </div>
      <div className="food-cover-bottom">
        {template.menu.slice(0, 3).map((item) => (
          <span key={item.name}>{item.name}</span>
        ))}
      </div>
    </div>
  );
}
