import Image from "next/image";
import Link from "next/link";
import { getProject, projectPath, showcaseProjects } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";

export default function HomeProjectsPreview() {
  return (
    <section id="home-work" className="home-work" aria-labelledby="home-work-title">
      <div className="container">
        <div className="home-work-heading">
          <h2 id="home-work-title">A closer look at our work.</h2>
          <Link className="text-link" href="/projects">
            Meet our clients <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="home-work-list">
          {showcaseProjects.map((project, index) => (
            <Reveal key={project.id}>
              <article className="home-work-card">
                <Link
                  href={projectPath(project)}
                  className="home-work-project"
                  aria-labelledby={`home-project-${project.id}`}
                >
                  <div className="home-work-visual">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.imageAlt ?? `${project.title} interface`}
                        fill
                        sizes="(min-width: 2560px) 864px, (min-width: 1900px) 744px, (min-width: 1440px) 624px, (min-width: 760px) calc((100vw - 112px) / 2), (min-width: 700px) calc(100vw - 80px), calc(100vw - 40px)"
                        preload={index === 0}
                      />
                    ) : (
                      <span className="home-work-image-fallback">{project.title}</span>
                    )}
                  </div>
                  <div className="home-work-caption">
                    <div>
                      <p className="home-work-kind">
                        {project.ownership === "client" ? "Client website" : "L&L software"}
                      </p>
                      <h3 id={`home-project-${project.id}`}>{project.title}</h3>
                      <p className="home-work-relationship">{project.relationship}</p>
                    </div>
                    <span className="home-work-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </Link>
                {project.relatedWork && (
                  <Link
                    href={projectPath(getProject(project.relatedWork.projectId))}
                    className="home-work-partnership"
                  >
                    {project.relatedWork.label} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
