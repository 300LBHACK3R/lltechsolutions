import Reveal from "@/components/ui/Reveal";
import { projects, type Project } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

const selectedTitles = [
  "Tow-N-Go Trailers Website",
  "Tate's TV",
  "McKenzie House Massage",
];

const selectedProjects = selectedTitles
  .map((title) => projects.find((project) => project.title === title))
  .filter((project): project is Project => Boolean(project));

export default function HomeProjectsPreview() {
  const [leadProject, ...secondaryProjects] = selectedProjects;

  if (!leadProject) {
    return null;
  }

  return (
    <section className="section-navy relative overflow-hidden py-28 md:py-40">
      <div className="corporate-grid absolute inset-0 opacity-10" />
      <div className="projects-blue-glow" />
      <div className="projects-gold-glow" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-5xl">
              <span className="section-eyebrow">Selected Work</span>

              <h2 className="font-editorial mt-8 text-5xl font-semibold leading-[0.91] tracking-[-0.045em] text-[#f3f7fb] md:text-7xl">
                Selected work, built for
                <span className="block italic text-[#e4c77f]">
                  the businesses behind it.
                </span>
              </h2>
            </div>

            <div className="max-w-xl">
              <p className="text-base leading-8 text-[#dbe6f2]/54 md:text-lg">
                A focused preview of live websites, custom software, and managed
                digital systems. Open the complete portfolio for the challenge,
                solution, services delivered, and connected platforms.
              </p>

              <Link href="/projects" className="btn-blue-outline mt-7">
                Explore All Projects
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.44fr_0.56fr]">
          <Reveal delayMs={90}>
            <ProjectPreviewCard project={leadProject} lead />
          </Reveal>

          <div className="grid gap-6">
            {secondaryProjects.map((project, index) => (
              <Reveal key={project.title} delayMs={160 + index * 90}>
                <ProjectPreviewCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectPreviewCard({
  project,
  lead = false,
}: {
  project: Project;
  lead?: boolean;
}) {
  const href = project.liveUrl ?? "/projects";

  return (
    <a
      href={href}
      target={project.liveUrl ? "_blank" : undefined}
      rel={project.liveUrl ? "noopener noreferrer" : undefined}
      className={[
        "executive-project-card group",
        lead ? "min-h-[560px]" : "min-h-[268px]",
      ].join(" ")}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt ?? `${project.title} project`}
          fill
          sizes={
            lead
              ? "(min-width: 1024px) 68vw, 100vw"
              : "(min-width: 1024px) 32vw, 100vw"
          }
          className="object-cover object-top transition duration-700 group-hover:scale-[1.025]"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,111,187,0.2),transparent_42%),linear-gradient(135deg,#071522,#102944)]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#06111f]/92 via-[#06111f]/10 to-transparent" />
      <div className="absolute left-0 top-0 h-1 w-32 bg-[linear-gradient(90deg,#2f6fbb,#e4c77f)]" />

      <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-[#06111f]/66 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#e4c77f] backdrop-blur">
        {project.category}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#d9c388]">
          {project.relationship}
        </p>

        <h3
          className={[
            "font-editorial mt-3 font-semibold leading-[0.95] tracking-[-0.04em] text-[#f4f8fc]",
            lead ? "text-4xl md:text-6xl" : "text-3xl",
          ].join(" ")}
        >
          {project.title}
        </h3>

        {lead ? (
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#dbe6f2]/58 md:text-base">
            {project.description}
          </p>
        ) : null}

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/38 transition group-hover:text-[#e4c77f]">
          Open project ↗
        </p>
      </div>
    </a>
  );
}
