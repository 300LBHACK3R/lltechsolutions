import Link from "next/link";
import ProjectVideo from "@/components/projects/ProjectVideo";
import {
  projects,
  projectCategories,
  getProject,
  projectPath,
  type ProjectCategory,
} from "@/data/projects";
import PageIntro from "@/components/ui/PageIntro";
import ProjectCTA from "@/components/ui/ProjectCTA";
import ProjectCollection from "@/components/seo/ProjectCollection";
export default function ProjectCategoryPage({ category }: { category: ProjectCategory }) {
  const meta = projectCategories.find((item) => item.slug === category)!;
  const selected = projects.filter((project) => project.category === category);
  return (
    <>
      <PageIntro eyebrow={meta.label} title={meta.title} description={meta.description} />
      <div className="container">
        <nav className="category-nav" aria-label="Project categories">
          <Link href="/projects">Our clients & projects</Link>
          {projectCategories.map((item) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              aria-current={item.slug === category ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="case-studies">
          {selected.map((project) => (
            <article key={project.id} id={project.id} className="case-study">
              <div className="case-heading">
                <div>
                  <p className="eyebrow">{project.relationship}</p>
                  <h2>{project.title}</h2>
                </div>
                <span className="project-status">{project.status}</span>
              </div>
              <ProjectVideo video={project.video} projectId={project.id} />
              <div className="case-body">
                <div>
                  <p className="case-description">{project.description}</p>
                  <dl>
                    <dt>The brief</dt>
                    <dd>{project.challenge}</dd>
                    <dt>The work</dt>
                    <dd>{project.solution}</dd>
                    <dt>The delivery</dt>
                    <dd>{project.result}</dd>
                  </dl>
                </div>
                <aside className="case-sidebar">
                  <h3>Project scope</h3>
                  <ul className="capability-list">
                    {project.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                  <section
                    className="case-implementation"
                    aria-labelledby={`${project.id}-implementation`}
                  >
                    <h3 id={`${project.id}-implementation`}>{project.implementation.label}</h3>
                    <p className="case-tools">{project.implementation.tools.join(" / ")}</p>
                    <p>{project.implementation.summary}</p>
                    <h3>{project.implementation.operationsLabel}</h3>
                    <p>{project.implementation.operations}</p>
                  </section>
                  <div className="case-links">
                    {project.relatedWork && (
                      <Link
                        href={projectPath(getProject(project.relatedWork.projectId))}
                        className="text-link"
                      >
                        {project.relatedWork.label} ↗
                      </Link>
                    )}
                    {project.links?.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                </aside>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ProjectCollection title={meta.title} path={`/projects/${category}`} projects={selected} />
      <ProjectCTA />
    </>
  );
}
