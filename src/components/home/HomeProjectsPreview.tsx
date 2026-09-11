import Link from "next/link";
import { showcaseProjects } from "@/data/projects";
import ProjectPreview from "@/components/projects/ProjectPreview";
import Reveal from "@/components/ui/Reveal";
export default function HomeProjectsPreview() {
  return (
    <section className="section home-work" aria-labelledby="home-work-title">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Websites & software</p>
              <h2 id="home-work-title">See what we build.</h2>
            </div>
            <Link className="text-link" href="/projects">
              Meet our clients <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="project-grid home-project-grid">
            {showcaseProjects.map((project) => (
              <ProjectPreview key={project.id} project={project} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
