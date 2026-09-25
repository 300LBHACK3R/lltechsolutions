import Image from "next/image";
import Link from "next/link";
import { getProject, projectPath, showcaseProjects } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";

export default function HomeProjectsPreview() {
  return (
    <section className="home-work home-work-editorial" aria-labelledby="home-work-title">
      <div className="container">
        <Reveal>
          <div className="home-work-heading">
            <div>
              <p className="eyebrow">Our work / Websites & software</p>
              <h2 id="home-work-title">
                Different businesses.
                <br />
                <em>Distinctly their own.</em>
              </h2>
            </div>
            <div className="home-work-introduction">
              <p>
                Explore the websites, ongoing partnerships and software we’ve brought to life. See
                the work, then the thinking behind it.
              </p>
              <Link className="text-link" href="/projects">
                Meet our clients <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </Reveal>
        <div className="home-work-list">
          {showcaseProjects.map((project, index) => (
            <Reveal key={project.id}>
              <article className="home-work-row">
                <Link
                  href={projectPath(project)}
                  className="home-work-visual"
                  aria-label={`Explore ${project.title}`}
                >
                  <div className="home-work-browser" aria-hidden="true">
                    <span className="home-work-browser-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>
                      {project.ownership === "client" ? "Client website" : "Studio software"}
                    </span>
                    <span>↗</span>
                  </div>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? `${project.title} interface`}
                      width={1800}
                      height={1013}
                      sizes="(min-width: 2200px) 1040px, (min-width: 1100px) 55vw, (min-width: 750px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="home-work-image-fallback">{project.title}</div>
                  )}
                </Link>
                <div className="home-work-copy">
                  <div className="home-work-index">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.status}</span>
                  </div>
                  <p className="eyebrow">{project.relationship}</p>
                  <h3>
                    <Link href={projectPath(project)}>{project.title}</Link>
                  </h3>
                  <p className="home-work-description">{project.description}</p>
                  <div className="home-work-links">
                    <Link href={projectPath(project)} className="home-work-case-link">
                      Explore the project <span aria-hidden="true">↗</span>
                    </Link>
                    {project.relatedWork && (
                      <Link
                        href={projectPath(getProject(project.relatedWork.projectId))}
                        className="home-work-partnership"
                      >
                        {project.relatedWork.label} <span aria-hidden="true">↗</span>
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
