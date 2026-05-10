import Reveal from "@/components/ui/Reveal";
import { projects, type ProjectCategory } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

type Props = {
  category: ProjectCategory;
  eyebrow: string;
  title: string;
  description: string;
};

export default function ProjectCategoryPage({
  category,
  eyebrow,
  title,
  description,
}: Props) {
  const filteredProjects = projects.filter(
    (project) => project.category === category,
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-[rgba(212,175,55,0.12)] py-20 md:py-28">
        <div className="hero-glow" />

        <div className="container-premium relative z-10">
          <Reveal>
            <div className="mx-auto max-w-5xl text-center">
              <span className="section-eyebrow">{eyebrow}</span>

              <h1 className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.07em] md:text-7xl">
                {title}
              </h1>

              <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-muted md:text-xl md:leading-9">
                {description}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/projects" className="btn-ghost-gold">
                  Back To Projects
                </Link>

                <Link href="/contact" className="btn-gold">
                  Start Similar Project
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container-premium">
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.title} delayMs={index * 100}>
                <article className="card-premium edge-gold hover-lift overflow-hidden">
                  <div className="relative h-80 overflow-hidden bg-black">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-700 hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="badge-gold">{project.category}</span>

                      <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                        {project.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm leading-7 text-muted">
                      {project.description}
                    </p>

                    <div className="mt-6 grid gap-4">
                      <ProjectBlock
                        title="Challenge"
                        text={project.challenge}
                      />
                      <ProjectBlock title="Solution" text={project.solution} />
                      <ProjectBlock
                        title="Result"
                        text={project.result}
                        highlight
                      />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.services.map((service) => (
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

          {filteredProjects.length === 0 && (
            <div className="rounded-[2rem] border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.04)] p-8 text-center">
              <p className="text-muted">
                Projects for this category will be added soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProjectBlock({
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
          ? "rounded-2xl border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.06)] p-5"
          : "rounded-2xl border border-[rgba(212,175,55,0.12)] bg-[rgba(255,255,255,0.025)] p-5"
      }
    >
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#f5d77a]/85">
        {title}
      </p>
      <p className="mt-2 text-sm leading-7 text-white/78">{text}</p>
    </div>
  );
}
