import Link from "next/link";
import { clientWebsiteProjects, projectPath } from "@/data/projects";

export default function TrustBar() {
  return (
    <section className="trust-strip" aria-label="Selected client partnerships">
      <div className="container trust-inner">
        <p>
          Real businesses.
          <br />
          <span>Work you can explore.</span>
        </p>
        <nav className="client-links" aria-label="Our clients">
          {clientWebsiteProjects.map((project) => (
            <Link key={project.id} href={projectPath(project)}>
              {project.title}
            </Link>
          ))}
        </nav>
        <Link href="/reviews" className="trust-review-link">
          Client reviews <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
