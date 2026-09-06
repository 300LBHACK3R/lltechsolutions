import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectPreview from "@/components/projects/ProjectPreview";
import Reveal from "@/components/ui/Reveal";
export default function HomeProjectsPreview() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>The work speaks.</h2>
            </div>
            <Link className="text-link" href="/projects">
              Explore all projects <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="project-grid home-project-grid">
            {projects
              .filter((project) => ["tow-n-go", "mckenzie-house"].includes(project.id))
              .map((project) => (
                <ProjectPreview key={project.id} project={project} />
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
