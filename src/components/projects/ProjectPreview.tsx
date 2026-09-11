import Image from "next/image";
import Link from "next/link";
import { getProject, projectPath, type Project } from "@/data/projects";
export default function ProjectPreview({ project }: { project: Project }) {
  return (
    <article className="project-preview">
      <div className="project-frame">
        <div className="project-frame-label" aria-hidden="true">
          <span>{project.ownership === "client" ? "Client project" : "Studio project"} / L&L</span>
          <span>↗</span>
        </div>
        <Link
          href={projectPath(project)}
          className="project-image"
          aria-label={`Explore ${project.title}`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? `${project.title} website interface`}
              width={1800}
              height={1013}
              sizes="(min-width: 2560px) 1120px, (min-width: 1900px) 950px, (min-width: 1440px) 780px, (min-width: 700px) 50vw, 94vw"
            />
          ) : (
            <div className="project-placeholder">
              <span>{project.title}</span>
              <small>Creative portfolio</small>
            </div>
          )}
        </Link>
      </div>
      <div className="project-preview-copy">
        <div className="project-preview-heading">
          <div>
            <p className="eyebrow">{project.relationship}</p>
            <h3>
              <Link href={projectPath(project)}>{project.title}</Link>
            </h3>
          </div>
          <span className="project-status">{project.status}</span>
        </div>
        <p className="muted">{project.description}</p>
        <Link href={projectPath(project)} className="text-link project-watch-link">
          Watch the project preview <span aria-hidden="true">↗</span>
        </Link>
        {project.relatedWork && (
          <Link
            href={projectPath(getProject(project.relatedWork.projectId))}
            className="text-link project-related-link"
          >
            {project.relatedWork.label} <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>
    </article>
  );
}
