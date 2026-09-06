import Image from "next/image";
import Link from "next/link";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
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
          <Link href="/projects">All work</Link>
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
              {project.image && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-image"
                  aria-label={`Visit ${project.title} (opens in new tab)`}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? `${project.title} website interface`}
                    width={1800}
                    height={1013}
                    sizes="(min-width: 2560px) 2080px, (min-width: 1900px) 1760px, (min-width: 1520px) 1440px, 94vw"
                  />
                </a>
              )}
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
                <aside>
                  <h3>Project scope</h3>
                  <ul className="capability-list">
                    {project.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                  <div className="case-links">
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
