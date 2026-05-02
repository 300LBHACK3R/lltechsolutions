import Reveal from "@/components/ui/Reveal";
import { projects, type ProjectCategory } from "@/data/projects";
import Image from "next/image";

const categoryLabels: Record<ProjectCategory, string> = {
  "Web Build": "Web Build",
  "Tech Support": "Tech Support",
  Infrastructure: "Infrastructure",
};

const categoryAccent: Record<ProjectCategory, string> = {
  "Web Build": "Custom Digital Build",
  "Tech Support": "Business Systems",
  Infrastructure: "On-Site Infrastructure",
};

export default function Projects() {
  const featuredProjects = projects.filter((project) => project.featured);
  const standardProjects = projects.filter((project) => !project.featured);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="hero-glow" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <span className="section-eyebrow">Selected Work</span>

              <h2 className="section-title mt-5">
                Case Studies That Show The Work Behind The Results.
              </h2>

              <p className="section-subtitle mt-5">
                Web builds, support work, and technical infrastructure projects
                presented with the problem, solution, and business outcome.
              </p>
            </div>

            <a href="#contact" className="btn-ghost-gold">
              Start Your Project
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.title} delayMs={index * 100}>
              <article className="card-premium edge-gold hover-lift overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="relative min-h-[340px] overflow-hidden bg-black lg:min-h-[520px]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover opacity-80 transition duration-700 hover:scale-105 hover:opacity-95"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.20),transparent_42%)]" />

                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      <span className="badge-gold">
                        {categoryLabels[project.category]}
                      </span>
                      <span className="badge-dark">
                        {categoryAccent[project.category]}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f5d77a]/80">
                        Featured Case Study
                      </p>
                      <h3 className="mt-2 max-w-2xl text-3xl font-black tracking-[-0.04em] md:text-4xl">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 md:p-8">
                    <div>
                      <p className="text-sm leading-7 text-muted">
                        {project.description}
                      </p>

                      <div className="mt-6 grid gap-4">
                        <CaseStudyBlock
                          title="Challenge"
                          text={project.challenge}
                        />
                        <CaseStudyBlock
                          title="Solution"
                          text={project.solution}
                        />
                        <CaseStudyBlock
                          title="Result"
                          text={project.result}
                          highlight
                        />
                      </div>
                    </div>

                    <div className="mt-7">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f5d77a]/80">
                        Services Used
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.services.map((service) => (
                          <span key={service} className="badge-dark">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {standardProjects.map((project, index) => (
            <Reveal key={project.title} delayMs={index * 80}>
              <article className="card-premium edge-gold hover-lift flex h-full flex-col overflow-hidden">
                <div className="relative h-56 overflow-hidden bg-black">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover opacity-75 transition duration-700 hover:scale-105 hover:opacity-95"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <span className="badge-gold absolute left-4 top-4">
                    {categoryLabels[project.category]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f5d77a]/80">
                    {categoryAccent[project.category]}
                  </p>

                  <h3 className="mt-2 text-xl font-bold tracking-tight">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {project.description}
                  </p>

                  <div className="mt-5 rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.05)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f5d77a]/80">
                      Result
                    </p>
                    <p className="mt-2 text-sm text-white/82">
                      {project.result}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.services.slice(0, 3).map((service) => (
                      <span key={service} className="badge-dark">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={280}>
          <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.04)] p-6 md:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f5d77a]/80">
                  Your project next
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                  Need a website, support cleanup, or infrastructure project
                  handled properly?
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
                  Send the details and we’ll map out the best next step, whether
                  that is a fresh build, tech support, CCTV setup, network rack
                  cleanup, or ongoing technology support.
                </p>
              </div>

              <a href="#contact" className="btn-gold shrink-0">
                Start A Project
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseStudyBlock({
  title,
  text,
  highlight = false,
}: {
  title: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "rounded-2xl border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.06)] p-4"
          : "rounded-2xl border border-white/8 bg-white/[0.025] p-4"
      }
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f5d77a]/80">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-white/78">{text}</p>
    </div>
  );
}
