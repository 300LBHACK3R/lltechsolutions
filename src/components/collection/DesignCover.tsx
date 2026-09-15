import type { WebsiteDesign } from "@/data/website-collection";

/** A compact HTML view of the template's real sample identity, headline and service content. */
export default function DesignCover({ design }: { design: WebsiteDesign }) {
  const concept = design.concept;
  return (
    <div className={`design-cover design-theme-${concept?.theme ?? "pigment"}`} aria-hidden="true">
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="template-mini-header">
        <strong>{concept?.brands[0] ?? design.name}</strong>
        <span>Home · Services · Contact</span>
      </div>
      <div className="template-mini-hero">
        <div>
          <span className="template-mini-kicker">Your business. Your website.</span>
          <strong>{concept?.headlines[0] ?? design.name}</strong>
          <span className="template-mini-copy">{concept?.subcopy ?? design.description}</span>
          <span className="template-mini-button">Explore our services ↗</span>
        </div>
        <div className="design-art">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="template-mini-services">
        {concept?.services.slice(0, 3).map((service, index) => (
          <div key={service.name}>
            <span>0{index + 1}</span>
            <strong>{service.name}</strong>
            <i />
            <i />
          </div>
        ))}
      </div>
    </div>
  );
}
