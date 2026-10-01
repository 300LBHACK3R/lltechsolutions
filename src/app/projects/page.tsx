import Link from "next/link";
import ProjectPreview from "@/components/projects/ProjectPreview";
import ProjectCollection from "@/components/seo/ProjectCollection";
import {
  projects,
  projectCategories,
  showcaseProjects,
  contentProjects,
  projectPath,
} from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Our Clients & Studio Projects",
  "Explore websites for Tow-N-Go Trailers, Crestline Painting and McKenzie House Massage, Tate’s TV software design and development, and social media and content partnerships.",
  "/projects",
);

export default function ProjectsPage() {
  return (
    <div className="client-directory">
      <header className="client-directory-header">
        <div className="container">
          <p className="eyebrow">Our clients & studio projects</p>
          <div className="client-directory-intro">
            <h1>
              Real businesses.
              <br />
              <span>Work with purpose.</span>
            </h1>
            <p>
              Custom websites, original content and software from our own studio. Explore the work,
              the brief and the thinking behind each project.
            </p>
          </div>
        </div>
      </header>
      <div className="container">
        <nav className="client-category-nav" aria-label="Project categories">
          {projectCategories.map((category) => (
            <Link href={`/projects/${category.slug}`} key={category.slug}>
              {category.label} <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <section className="client-showcase-section" aria-labelledby="showcase-title">
          <div className="client-section-heading">
            <h2 id="showcase-title">Websites & software</h2>
            <p>Three client websites. One L&L studio product.</p>
          </div>
          <div className="client-showcase-grid">
            {showcaseProjects.map((project) => (
              <ProjectPreview key={project.id} project={project} />
            ))}
          </div>
        </section>
        <section className="client-content-section" aria-labelledby="content-work-title">
          <div className="client-section-heading">
            <h2 id="content-work-title">Social media & content</h2>
            <p>Ongoing management and original launch content.</p>
          </div>
          <div className="client-partnerships">
            {contentProjects.map((project) => (
              <article key={project.id} className="client-partnership">
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
        </section>
        <section className="client-next-step" aria-labelledby="client-next-step-title">
          <div>
            <p className="eyebrow">Your next project</p>
            <h2 id="client-next-step-title">Let’s give your business a place here.</h2>
            <p>Tell us what you’re building and where you want to take it.</p>
          </div>
          <div className="client-next-actions">
            <Link href="/contact" className="button button-gold">
              Start a conversation <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/reviews" className="text-link">
              Read client reviews <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </div>
      <ProjectCollection
        title="Our Clients & Studio Projects"
        path="/projects"
        projects={projects}
      />
    </div>
  );
}
