import { contentProduction } from "@/data/services";

/** The original combined project cost must never become a template's base price. */
export default function ProductionExample() {
  const example = contentProduction.projectExample;
  return (
    <aside className="production-example" aria-label="Website and original content project example">
      <div className="production-example-price">
        <p className="eyebrow">Website + original photo & video</p>
        <p>{example.priceLabel}</p>
        <span>Original combined project</span>
      </div>
      <div className="production-example-copy">
        <h2>{example.title}</h2>
        <p>{example.description}</p>
        <p className="production-example-note">{example.note}</p>
      </div>
    </aside>
  );
}
