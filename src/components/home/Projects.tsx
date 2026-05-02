import Reveal from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

const categoryStyles = {
  "Web Build": "Web Build",
  "Tech Support": "Tech Support",
  Infrastructure: "Infrastructure",
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="container-premium">
        <Reveal>
          <span className="section-eyebrow">Recent Work</span>
          <h2 className="section-title mt-5">
            Real Projects. Real Systems. Real Results.
          </h2>
          <p className="section-subtitle mt-5">
            A look at the kind of web builds, support work, and technical
            infrastructure L&amp;L Tech Solutions handles.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delayMs={index * 80}>
              <article className="card-premium edge-gold hover-lift h-full overflow-hidden">
                <div className="relative h-56 overflow-hidden border-b border-[rgba(212,175,55,0.12)] bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover opacity-75 transition duration-500 hover:scale-105 hover:opacity-90"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <span className="badge-gold absolute left-4 top-4">
                    {categoryStyles[project.category]}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {project.description}
                  </p>

                  <div className="mt-5 rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.05)] p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f5d77a]/80">
                      Result
                    </div>
                    <p className="mt-2 text-sm text-white/82">
                      {project.result}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={250}>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[1.5rem] border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.04)] p-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-semibold">
                Want your project featured next?
              </h3>
              <p className="mt-1 text-sm text-muted">
                Whether it is a website, support issue, rack cleanup, CCTV
                setup, or business system improvement, start with a clear
                request.
              </p>
            </div>

            <a href="#contact" className="btn-gold">
              Start A Project
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
