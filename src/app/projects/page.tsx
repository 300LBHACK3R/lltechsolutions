import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import ProjectCTA from "@/components/ui/ProjectCTA";
import ProjectPreview from "@/components/projects/ProjectPreview";
import { projects, projectCategories } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import ProjectCollection from "@/components/seo/ProjectCollection";
export const metadata = pageMetadata(
  "Selected Work & Client Projects",
  "Explore L&L’s custom websites, software applications and managed digital partnerships, including Tow-N-Go, Crestline and McKenzie House Massage.",
  "/projects",
);
export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Selected work"
        title="Real businesses. Considered work."
        description="Client websites, our own software products, and the content and management that connect them. Explore the work and the thinking behind it."
      />
      <div className="container">
        <nav className="category-nav" aria-label="Project categories">
          {projectCategories.map((category) => (
            <Link href={`/projects/${category.slug}`} key={category.slug}>
              {category.label} ↗
            </Link>
          ))}
        </nav>
        <div className="project-grid project-directory">
          {projects.map((project) => (
            <ProjectPreview key={project.id} project={project} />
          ))}
        </div>
      </div>
      <ProjectCollection
        title="Selected Work & Client Projects"
        path="/projects"
        projects={projects}
      />
      <ProjectCTA />
    </>
  );
}
