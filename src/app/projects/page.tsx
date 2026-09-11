import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import ProjectCTA from "@/components/ui/ProjectCTA";
import ProjectPreview from "@/components/projects/ProjectPreview";
import Reveal from "@/components/ui/Reveal";
import {
  projects,
  projectCategories,
  showcaseProjects,
  contentProjects,
  projectPath,
} from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import ProjectCollection from "@/components/seo/ProjectCollection";

export const metadata = pageMetadata(
  "Our Clients & Studio Projects",
  "Explore websites for Tow-N-Go Trailers, Crestline Painting and McKenzie House Massage, Tate’s TV software design and development, and monthly social media partnerships.",
  "/projects",
);

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our clients"
        title="Real businesses. Work with purpose."
        description="Explore our client websites, content partnerships and the software we build in our own studio. Every project has a different brief—and a clear reason behind the work."
      />
      <div className="container">
        <nav className="category-nav" aria-label="Project categories">
          {projectCategories.map((category) => (
            <Link href={`/projects/${category.slug}`} key={category.slug}>
              {category.label} ↗
            </Link>
          ))}
        </nav>
        <section className="portfolio-section" aria-labelledby="showcase-title">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 / Websites & software</p>
                <h2 id="showcase-title">From business websites to custom software.</h2>
              </div>
              <p>
                Explore three client websites and Tate’s TV, our own software product. See the
                design, development and ongoing work behind each project.
              </p>
            </div>
          </Reveal>
          <div className="project-grid client-project-grid">
            {showcaseProjects.map((project) => (
              <ProjectPreview key={project.id} project={project} />
            ))}
          </div>
        </section>
        <section
          className="portfolio-section portfolio-partnerships"
          aria-labelledby="content-work-title"
        >
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / Social media & content</p>
                <h2 id="content-work-title">The presence around the website.</h2>
              </div>
              <p>
                Original content, coordinated launches and ongoing support—with the scope of each
                relationship made clear.
              </p>
            </div>
          </Reveal>
          <div className="partnership-list">
            {contentProjects.map((project) => (
              <article key={project.id} className="partnership-row">
                <div>
                  <p className="eyebrow">{project.relationship}</p>
                  <h3>
                    <Link href={projectPath(project)}>{project.title}</Link>
                  </h3>
                  <span className="partnership-status">{project.status}</span>
                </div>
                <div>
                  <p>{project.description}</p>
                  <Link href={projectPath(project)} className="text-link">
                    Watch the content & explore the partnership <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="portfolio-review-link">
          <p>The working relationship matters too.</p>
          <Link href="/reviews" className="text-link">
            Read client reviews <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <ProjectCollection
        title="Our Clients & Studio Projects"
        path="/projects"
        projects={projects}
      />
      <ProjectCTA />
    </>
  );
}
