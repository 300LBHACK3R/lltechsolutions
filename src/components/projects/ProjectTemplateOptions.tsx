import Link from "next/link";
import DesignCover from "@/components/collection/DesignCover";
import type { Project } from "@/data/projects";
import {
  availableDesigns,
  categoryHref,
  designHref,
  templateCategories,
} from "@/data/website-collection";

export default function ProjectTemplateOptions({ project }: { project: Project }) {
  const options = project.templateOptions;
  if (!options) return null;
  const category = templateCategories.find((item) => item.id === options.category);
  const designs = options.designIds.flatMap((id) => {
    const design = availableDesigns().find((item) => item.id === id);
    return design ? [design] : [];
  });
  if (!category || designs.length === 0) return null;

  return (
    <section className="client-template-options" aria-labelledby={`${project.id}-templates`}>
      <div className="client-section-heading">
        <div>
          <p className="eyebrow">Website Templates</p>
          <h2 id={`${project.id}-templates`}>Other design options</h2>
          <p>Explore other directions from our Website Templates collection.</p>
        </div>
        <Link href={categoryHref(category)} className="text-link">
          Browse {category.name} <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="client-template-grid">
        {designs.map((design) => (
          <article className="client-template-option" key={design.id}>
            <Link
              href={designHref(design)}
              className="client-template-image"
              tabIndex={-1}
              aria-hidden="true"
            >
              <DesignCover design={design} />
            </Link>
            <h3>
              <Link href={designHref(design)}>
                {design.name} <span aria-hidden="true">↗</span>
              </Link>
            </h3>
            <p>{design.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
