import Link from "next/link";

import { getPreviewProjects, getProjectCategoryPath } from "@/data/projects";

export default function HomeProjectsPreview() {
  const previewProjects = getPreviewProjects(4);

  return (
    <section className="home-projects-preview">
      <div className="container">
        <div className="section-intro home-projects-preview__intro">
          <span className="section-intro__eyebrow">Illustrative Portfolio</span>

          <h2 className="section-intro__title">
            A portfolio layout for a range of painting environments.
          </h2>

          <p className="section-intro__copy">
            Explore fictional project studies with generated sample imagery across custom homes,
            multi-family properties, strata buildings, and commercial spaces.
          </p>
        </div>

        <div className="project-showcase-grid">
          {previewProjects.map((project) => (
            <Link
              key={project.slug}
              href={getProjectCategoryPath(project.category)}
              className="project-showcase-card"
              aria-label={`View ${project.title} in the ${project.categoryTitle} gallery`}
            >
              <div className="project-showcase-card__media">
                <div
                  className="project-showcase-card__image"
                  style={{
                    backgroundImage: `url("${project.coverImage}")`,
                  }}
                />

                <div className="project-showcase-card__overlay" />
              </div>

              <div className="project-showcase-card__body">
                <span className="card__eyebrow">{project.categoryTitle}</span>

                <h3 className="project-showcase-card__title">{project.title}</h3>

                <div className="project-showcase-card__meta">{project.location}</div>

                <p className="project-showcase-card__copy">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="home-projects-preview__actions">
          <Link href="/projects" className="button button--primary">
            View Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
