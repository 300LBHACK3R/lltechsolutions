import { homePropertyTemplate, type WebsiteDesign } from "@/data/website-collection";
import HomePropertyHero from "@/components/collection/HomePropertyHero";

export default function HomePropertyCover({ design }: { design: WebsiteDesign }) {
  const template = homePropertyTemplate(design.id);
  if (!template) return null;
  return (
    <div
      className={`design-cover hp-cover hp-theme-${template.theme}`}
      aria-hidden="true"
      data-home-property-cover={template.id}
    >
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="hp-cover-header">
        <strong>{template.brand}</strong>
        <span>
          {template.pages.length === 1
            ? "Services · About · Contact"
            : template.pages.slice(0, 4).join(" · ")}
        </span>
      </div>
      <HomePropertyHero template={template} preview />
    </div>
  );
}
