import Image from "next/image";
import { horizonProjects } from "@/data/horizon-content";
import { HorizonArrow } from "@/components/collection/HorizonMarks";

/** Native radio filters and details work before hydration and with JavaScript disabled. */
export function HorizonProjectGallery() {
  return (
    <div className="horizon-project-explorer">
      <fieldset className="horizon-project-filters">
        <legend>Explore by focus</legend>
        {[
          { value: "all", label: "All scenes", count: "04" },
          { value: "hardscape", label: "Hardscape", count: "02" },
          { value: "planting", label: "Planting", count: "01" },
          { value: "sitework", label: "Sitework", count: "01" },
        ].map((filter) => (
          <label key={filter.value}>
            <input
              type="radio"
              name="horizon-project-focus"
              value={filter.value}
              defaultChecked={filter.value === "all"}
              aria-controls="horizon-project-grid"
            />
            <span>
              {filter.label}
              <small>{filter.count}</small>
            </span>
          </label>
        ))}
      </fieldset>
      <div id="horizon-project-grid" className="horizon-project-grid">
        {horizonProjects.map((project) => (
          <article
            className="horizon-project-card"
            data-category={project.category}
            key={project.id}
            id={project.id}
          >
            <div className="horizon-project-photo">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <span className="horizon-image-label">ILLUSTRATIVE SCENE / {project.number}</span>
            </div>
            <div className="horizon-project-caption">
              <p className="horizon-eyebrow">{project.categoryLabel}</p>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <details className="horizon-project-notes">
                <summary>
                  Explore the details
                  <HorizonArrow diagonal />
                </summary>
                <div>
                  <p>{project.considerations}</p>
                  <ul aria-label="Scene features">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <p className="horizon-small-note">
                    Concept imagery for this demo; not a completed client project.
                  </p>
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
