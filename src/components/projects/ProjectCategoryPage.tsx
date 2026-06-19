import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectCategory } from "@/lib/projects";
import { getProjectsByCategory, projectCategoryMeta } from "@/lib/projects";

type ProjectCategoryPageProps = {
  category: ProjectCategory;
};

export default function ProjectCategoryPage({
  category,
}: ProjectCategoryPageProps) {
  const meta = projectCategoryMeta[category];
  const categoryProjects = getProjectsByCategory(category);

  return (
    <main className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[rgba(212,175,55,0.07)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_34%)]" />
      </div>

      <section className="container-premium">
        <div className="mx-auto max-w-5xl text-center">
          <span className="section-eyebrow">{meta.eyebrow}</span>
          <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            {meta.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
            {meta.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/projects" className="btn-ghost-gold">
              All Project Categories
            </Link>
            <Link href="/contact" className="btn-gold">
              Request A Quote
            </Link>
          </div>
        </div>

        {categoryProjects.length > 0 ? (
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {categoryProjects.map((project) => (
              <ProjectShowcaseCard key={project.title} project={project} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-14 max-w-2xl rounded-3xl border border-[rgba(212,175,55,0.16)] bg-white/[0.035] p-8 text-center">
            <p className="text-lg font-black tracking-[-0.03em]">
              {meta.emptyMessage}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">
              New work can be added here as more projects are completed.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function ProjectShowcaseCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-[rgba(212,175,55,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] shadow-[0_28px_90px_rgba(0,0,0,0.55)]">
      <ProjectHero project={project} />

      <div className="p-6 md:p-8">
        <p className="text-sm leading-7 text-white/78 md:text-base md:leading-8">
          {project.description}
        </p>

        {project.stats && project.stats.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {project.stats.map((stat) => (
              <div
                key={`${project.title}-${stat.label}`}
                className="rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.045)] p-4"
              >
                <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#f5d77a]/80">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm font-black tracking-[-0.025em] text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 grid gap-4">
          <ProjectTextBlock title="Challenge" text={project.challenge} />
          <ProjectTextBlock title="Solution" text={project.solution} />
          <ProjectTextBlock title="Result" text={project.result} strong />
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.services.map((service) => (
            <span
              key={`${project.title}-${service}`}
              className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-semibold text-white/78"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
            >
              View Live Website
            </a>
          ) : null}

          <Link href="/contact" className="btn-ghost-gold">
            Start A Similar Project
          </Link>
        </div>
      </div>
    </article>
  );
}

function ProjectHero({ project }: { project: Project }) {
  const imageContent = (
    <>
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover opacity-78 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-95"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

      <div className="absolute left-5 top-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-[rgba(245,215,122,0.3)] bg-black/60 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#f5d77a] backdrop-blur">
          {project.category}
        </span>

        {project.liveUrl ? (
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white/88 backdrop-blur transition group-hover:border-[#f5d77a]/50 group-hover:text-[#f5d77a]">
            Live Site ↗
          </span>
        ) : null}
      </div>

      <div className="absolute bottom-5 left-5 right-5">
        <h2 className="max-w-xl text-3xl font-black leading-none tracking-[-0.045em] md:text-4xl">
          {project.title}
        </h2>
      </div>
    </>
  );

  if (project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`View live website for ${project.title}`}
        className="relative block aspect-[16/9] overflow-hidden border-b border-[rgba(212,175,55,0.12)] bg-black"
      >
        {imageContent}
      </a>
    );
  }

  return (
    <div className="relative aspect-[16/9] overflow-hidden border-b border-[rgba(212,175,55,0.12)] bg-black">
      {imageContent}
    </div>
  );
}

function ProjectTextBlock({
  title,
  text,
  strong = false,
}: {
  title: string;
  text: string;
  strong?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-5",
        strong
          ? "border-[rgba(212,175,55,0.24)] bg-[rgba(212,175,55,0.06)]"
          : "border-white/10 bg-black/24",
      ].join(" ")}
    >
      <p className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-[#f5d77a]">
        {title}
      </p>
      <p className="mt-3 text-sm leading-7 text-white/78">{text}</p>
    </div>
  );
}
