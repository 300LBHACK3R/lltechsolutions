import Link from "next/link";
import { clientWebsiteProjects } from "@/data/projects";
import ProjectPreview from "@/components/projects/ProjectPreview";
import Reveal from "@/components/ui/Reveal";
export default function HomeProjectsPreview() {
  return (
    <section className="section home-work" aria-labelledby="home-work-title">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Client work</p>
              <h2 id="home-work-title">Built for real businesses.</h2>
            </div>
            <Link className="text-link" href="/projects">
              Explore all projects <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="project-grid home-project-grid">
            {clientWebsiteProjects.map((project, index) => (
              <ProjectPreview key={project.id} project={project} featured={index === 0} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
