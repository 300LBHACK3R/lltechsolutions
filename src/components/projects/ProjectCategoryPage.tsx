import Link from "next/link";
import ProjectPreview from "@/components/projects/ProjectPreview";
import ProjectCollection from "@/components/seo/ProjectCollection";
import { projects, projectCategories, projectPath, type ProjectCategory } from "@/data/projects";

export default function ProjectCategoryPage({ category }: { category: ProjectCategory }) {
  const meta = projectCategories.find((item) => item.slug === category)!;
  const selected = projects.filter((project) => project.category === category);
  const isContent = category === "social-media-management";

  return (
    <div className="client-directory client-category-directory">
      <header className="client-directory-header">
        <div className="container">
          <Link href="/projects" className="text-link client-back-link">
            <span aria-hidden="true">←</span> All clients & projects
          </Link>
          <p className="eyebrow">{meta.label}</p>
          <div className="client-directory-intro">
            <h1>{meta.title}</h1>
            <p>{meta.description}</p>
          </div>
        </div>
      </header>
      <div className="container">
        <nav className="client-category-nav" aria-label="Project categories">
          {projectCategories.map((item) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              aria-current={item.slug === category ? "page" : undefined}
            >
              {item.label} <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <section className="client-showcase-section" aria-label={`${meta.label} projects`}>
          <h2 className="sr-only">Explore the projects</h2>
          {isContent ? (
            <div className="client-partnerships">
              {selected.map((project) => (
                <article key={project.id} id={project.id} className="client-partnership">
                  <div>
                    <p className="eyebrow">Client project · {project.status}</p>
                    <h3>
                      <Link href={projectPath(project)}>{project.title}</Link>
                    </h3>
                    <p className="client-partnership-relationship">{project.relationship}</p>
                  </div>
                  <div>
                    <p>{project.description}</p>
                    <Link href={projectPath(project)} className="text-link">
                      Explore the content & partnership <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="client-showcase-grid">
              {selected.map((project) => (
                <ProjectPreview key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>
        <section className="client-next-step" aria-labelledby="category-next-title">
          <div>
            <p className="eyebrow">Have something in mind?</p>
            <h2 id="category-next-title">Tell us about your project.</h2>
          </div>
          <Link href="/contact" className="button button-gold">
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </div>
      <ProjectCollection title={meta.title} path={`/projects/${category}`} projects={selected} />
    </div>
  );
}
