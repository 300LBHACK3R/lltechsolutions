import { professionalTemplate, type WebsiteDesign } from "@/data/website-collection";
import ProfessionalHero from "@/components/collection/ProfessionalHero";

export default function ProfessionalCover({ design }: { design: WebsiteDesign }) {
  const template = professionalTemplate(design.id);
  if (!template) return null;
  return (
    <div
      className={`design-cover professional-cover pro-theme-${template.theme}`}
      aria-hidden="true"
      data-professional-cover={design.id}
    >
      <div className="template-browser-bar">
        <i />
        <i />
        <i />
        <span>Website preview</span>
      </div>
      <div className="pro-cover-header">
        <strong>{template.brand}</strong>
        <span>
          {template.pages.length === 1
            ? "Services · About · Contact"
            : template.pages.slice(0, 4).join(" · ")}
        </span>
      </div>
      <ProfessionalHero template={template} preview />
    </div>
  );
}
