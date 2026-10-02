import SignalArtwork from "@/components/ui/SignalArtwork";
import Link from "next/link";
import TemplateScreenshotGallery from "@/components/collection/TemplateScreenshotGallery";
import ProjectDesignOptions from "@/components/projects/ProjectDesignOptions";
import ProjectPageSpeed from "@/components/projects/ProjectPageSpeed";
import ProjectTemplateOptions from "@/components/projects/ProjectTemplateOptions";
import ProjectVideo from "@/components/projects/ProjectVideo";
import ProjectVideoGallery from "@/components/projects/ProjectVideoGallery";
import { liveSiteLabel } from "@/config/site";
import { getProject, projectCategories, projectPath, type Project } from "@/data/projects";

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const category = projectCategories.find((item) => item.slug === project.category)!;
  const isContent = project.category === "social-media-management";
  const contentVideos = isContent ? project.contentVideos : undefined;
  const hasContentGallery = Boolean(contentVideos?.length);
  const isSoftware = project.category === "software-development";
  const screenshots = project.gallery?.length
    ? project.gallery
    : project.image
      ? [
          {
            src: project.image,
            alt: project.imageAlt ?? project.title,
            caption: project.title,
            width: 1800,
            height: 1013,
          },
        ]
      : [];
  const liveLink = project.links?.find((link) => link.kind === "website");
  const otherLinks = project.links?.filter((link) => link.kind !== "website") ?? [];
  const relatedProject = project.relatedWork ? getProject(project.relatedWork.projectId) : null;
  const nextTitle = isContent
    ? "Bring your website and content together."
    : isSoftware
      ? "Have an idea for your own application?"
      : "A website built around your business.";
  const nextDescription = isContent
    ? "Let’s talk about the content, channels and support your business needs."
    : isSoftware
      ? "Tell us what it needs to do. We’ll help define the next step."
      : "Start with your services, your customers and what the website needs to do.";

  return (
    <article className="client-case-study case-page">
      <header className="client-case-header signal-surface">
        <SignalArtwork className="surface-signals" />
        <div className="container">
          <nav className="client-case-breadcrumb" aria-label="Breadcrumb">
            <Link href="/projects">Our clients & projects</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/projects/${category.slug}`}>{category.label}</Link>
          </nav>
          <div className="client-case-heading">
            <div>
              <p className="eyebrow">{project.relationship ?? category.label}</p>
              <h1>{project.title}</h1>
            </div>
            <div className="client-case-status">
              <span>
                {project.ownership === "client" ? "Client project" : "L&L studio project"}
              </span>
              <span className="project-status">{project.status}</span>
            </div>
          </div>
          <p className="client-case-description">{project.description}</p>
          <div className="client-case-actions">
            {(liveLink || project.liveUrl) && (
              <a
                href={liveLink?.href ?? project.liveUrl}
                className="button button-gold"
                target="_blank"
                rel="noopener noreferrer"
              >
                {liveSiteLabel} <span aria-hidden="true">↗</span>
                <span className="sr-only">for {project.title}, in a new tab</span>
              </a>
            )}
            {otherLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label} <span aria-hidden="true">↗</span>
                <span className="sr-only">for {project.title}, in a new tab</span>
              </a>
            ))}
            {relatedProject && project.relatedWork && (
              <Link href={projectPath(relatedProject)} className="text-link client-case-related">
                {project.relatedWork.label} <span aria-hidden="true">↗</span>
              </Link>
            )}
          </div>
        </div>
      </header>
      <div className="container">
        <section className="client-case-preview" aria-labelledby="project-preview-title">
          <div className="client-section-heading">
            <h2 id="project-preview-title">
              {hasContentGallery
                ? "Campaigns & creative"
                : isContent
                  ? "The content"
                  : isSoftware
                    ? "The application"
                    : "The website"}
            </h2>
            <p>
              {hasContentGallery
                ? "Original short-form content for seasonal promotions and fleet education."
                : isContent
                  ? "An example from the project."
                  : "Explore the screenshots, then visit the live site."}
            </p>
          </div>
          {hasContentGallery && contentVideos ? (
            <ProjectVideoGallery videos={contentVideos} projectId={project.id} />
          ) : isContent ? (
            <ProjectVideo video={project.video} projectId={project.id} />
          ) : (
            <TemplateScreenshotGallery images={screenshots} />
          )}
        </section>
        <div className="client-case-details">
          <div className="client-case-story">
            <section aria-labelledby="project-brief-title">
              <h2 id="project-brief-title">The brief</h2>
              <p>{project.challenge}</p>
            </section>
            <section aria-labelledby="project-work-title">
              <h2 id="project-work-title">The work</h2>
              <p>{project.solution}</p>
            </section>
            <section aria-labelledby="project-delivery-title">
              <h2 id="project-delivery-title">The delivery</h2>
              <p>{project.result}</p>
            </section>
          </div>
          <aside
            className="client-case-specifications case-implementation"
            aria-label="Project scope and implementation"
          >
            <section aria-labelledby="project-scope-title">
              <h2 id="project-scope-title">Project scope</h2>
              <ul>
                {project.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="project-implementation-title">
              <h2 id="project-implementation-title">{project.implementation.label}</h2>
              <p className="client-case-tools">{project.implementation.tools.join(" / ")}</p>
              <p>{project.implementation.summary}</p>
            </section>
            <section aria-labelledby="project-operations-title">
              <h2 id="project-operations-title">{project.implementation.operationsLabel}</h2>
              <p>{project.implementation.operations}</p>
            </section>
          </aside>
        </div>
        <ProjectPageSpeed project={project} />
        {project.designOptions && (
          <ProjectDesignOptions projectId={project.id} options={project.designOptions} />
        )}
        {project.templateOptions && <ProjectTemplateOptions project={project} />}
        <section
          className="client-next-step signal-surface signal-surface-quiet"
          aria-labelledby="project-next-title"
        >
          <SignalArtwork className="surface-signals" />
          <div>
            <p className="eyebrow">Your next project</p>
            <h2 id="project-next-title">{nextTitle}</h2>
            <p>{nextDescription}</p>
          </div>
          <div className="client-next-actions">
            <Link href="/contact" className="button button-gold">
              Start a conversation <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/projects" className="text-link">
              Explore more projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
