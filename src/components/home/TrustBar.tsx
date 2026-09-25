import Link from "next/link";
import { clientWebsiteProjects, projectPath } from "@/data/projects";

export default function TrustBar() {
  return (
    <section
      className="trust-strip home-partnership-strip"
      aria-label="Selected client partnerships"
    >
      <div className="container trust-inner">
        <p>
          <span className="home-partnership-label">Behind the businesses</span>
          <strong>Built on real partnerships.</strong>
        </p>
        <nav className="client-links" aria-label="Our clients">
          {clientWebsiteProjects.map((project) => (
            <Link key={project.id} href={projectPath(project)}>
              {project.title}
              <span aria-hidden="true">↗</span>
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
