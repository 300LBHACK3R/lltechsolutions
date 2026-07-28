import Image from "next/image";
import Link from "next/link";
import type {
  Project,
  ProjectCategory,
  ProjectLinkKind,
  ProjectVisual,
} from "@/lib/projects";
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
              Start A Project
            </Link>
          </div>
        </div>

        {categoryProjects.length > 0 ? (
          <div className="mt-14 grid gap-8 xl:grid-cols-2">
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
        {project.relationship ? (
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f5d77a]/82">
            {project.relationship}
          </p>
        ) : null}

        <p className="mt-4 text-sm leading-7 text-white/78 md:text-base md:leading-8">
          {project.description}
        </p>

        {project.stats && project.stats.length > 0 ? (
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
        ) : null}

        {project.management ? (
          <div className="mt-6 rounded-2xl border border-[rgba(245,215,122,0.25)] bg-[linear-gradient(135deg,rgba(212,175,55,0.11),rgba(255,255,255,0.025))] p-5">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#f5d77a]">
              Ongoing Management
            </p>
            <h3 className="mt-3 text-xl font-black tracking-[-0.03em]">
              {project.management.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/68">
              {project.management.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.management.services.map((service) => (
                <span
                  key={`${project.title}-management-${service}`}
                  className="rounded-full border border-[rgba(245,215,122,0.2)] bg-black/35 px-3 py-1.5 text-xs font-bold text-[#f5d77a]/90"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        ) : null}

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

        {project.links && project.links.length > 0 ? (
          <div className="mt-7 rounded-2xl border border-white/10 bg-black/25 p-5">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#f5d77a]">
              Live Presence & Connected Channels
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <a
                  key={`${project.title}-${link.label}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={projectLinkClass(link.kind)}
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
            >
              View Live Project
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
  const heroContent = (
    <>
      {project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt ?? `${project.title} project showcase`}
          fill
          sizes="(min-width: 1280px) 50vw, 100vw"
          className="object-cover opacity-78 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-95"
        />
      ) : project.visual ? (
        <ProjectVisualFallback visual={project.visual} />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.22),transparent_44%),linear-gradient(135deg,#050505,#111111)]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

      <div className="absolute left-5 top-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-[rgba(245,215,122,0.3)] bg-black/60 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#f5d77a] backdrop-blur">
          {project.category}
        </span>

        {project.relationship ? (
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white/88 backdrop-blur">
            {project.relationship}
          </span>
        ) : null}

        {project.liveUrl ? (
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white/88 backdrop-blur transition group-hover:border-[#f5d77a]/50 group-hover:text-[#f5d77a]">
            Live Project ↗
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
        aria-label={`View live project for ${project.title}`}
        className="relative block aspect-[16/9] overflow-hidden border-b border-[rgba(212,175,55,0.12)] bg-black"
      >
        {heroContent}
      </a>
    );
  }

  return (
    <div className="relative aspect-[16/9] overflow-hidden border-b border-[rgba(212,175,55,0.12)] bg-black">
      {heroContent}
    </div>
  );
}

function ProjectVisualFallback({ visual }: { visual: ProjectVisual }) {
  const tone = projectVisualTone(visual.tone);

  return (
    <div className={`absolute inset-0 overflow-hidden ${tone.background}`}>
      <div className={`absolute inset-0 opacity-65 ${tone.glow}`} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.05)_50%,transparent_51%),linear-gradient(transparent_49%,rgba(255,255,255,0.035)_50%,transparent_51%)] bg-[length:56px_56px]" />
      <div className="absolute -left-16 top-1/3 h-40 w-80 rotate-[-12deg] border border-red-500/30 bg-red-500/5 blur-[1px]" />
      <div className="absolute -right-16 bottom-1/4 h-40 w-80 rotate-[12deg] border border-[#f5d77a]/30 bg-[#f5d77a]/5 blur-[1px]" />

      <div className="relative z-10 flex h-full items-center justify-center px-8 pb-10 pt-20 text-center">
        <div>
          <p className={`text-xs font-black uppercase tracking-[0.34em] ${tone.eyebrow}`}>
            {visual.eyebrow}
          </p>
          <p className="mt-4 text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">
            {visual.title}
          </p>
          <p className={`mt-4 text-sm font-bold uppercase tracking-[0.15em] ${tone.subtitle}`}>
            {visual.subtitle}
          </p>
          <div className="mx-auto mt-6 h-px w-52 bg-gradient-to-r from-transparent via-[#f5d77a] to-transparent" />
          <div className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/55">
            <span>Portfolio.exe</span>
            <span>•</span>
            <span>Matrix Interface</span>
            <span>•</span>
            <span>XP Desktop</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function projectVisualTone(tone: ProjectVisual["tone"]) {
  if (tone === "neon") {
    return {
      background:
        "bg-[linear-gradient(135deg,#020817,#0b0b24_48%,#071d18)]",
      glow:
        "bg-[radial-gradient(circle_at_20%_25%,rgba(34,211,238,0.32),transparent_30%),radial-gradient(circle_at_82%_65%,rgba(168,85,247,0.28),transparent_34%)]",
      eyebrow: "text-cyan-300",
      subtitle: "text-fuchsia-300/85",
    };
  }

  if (tone === "green") {
    return {
      background:
        "bg-[linear-gradient(135deg,#03140b,#0b170e_48%,#181404)]",
      glow:
        "bg-[radial-gradient(circle_at_22%_28%,rgba(34,197,94,0.25),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(212,175,55,0.24),transparent_34%)]",
      eyebrow: "text-emerald-300",
      subtitle: "text-[#f5d77a]/85",
    };
  }

  return {
    background:
      "bg-[linear-gradient(135deg,#020202,#170605_50%,#120e03)]",
    glow:
      "bg-[radial-gradient(circle_at_20%_25%,rgba(239,68,68,0.25),transparent_32%),radial-gradient(circle_at_82%_68%,rgba(212,175,55,0.3),transparent_35%)]",
    eyebrow: "text-red-300",
    subtitle: "text-[#f5d77a]/90",
  };
}

function projectLinkClass(kind: ProjectLinkKind | undefined) {
  const base =
    "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black transition hover:-translate-y-0.5";

  switch (kind) {
    case "google":
      return `${base} border-blue-300/20 bg-blue-400/10 text-blue-100 hover:border-blue-300/45`;
    case "facebook":
      return `${base} border-sky-300/20 bg-sky-400/10 text-sky-100 hover:border-sky-300/45`;
    case "tiktok":
      return `${base} border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-100 hover:border-fuchsia-300/45`;
    case "booking":
      return `${base} border-emerald-300/20 bg-emerald-400/10 text-emerald-100 hover:border-emerald-300/45`;
    default:
      return `${base} border-[rgba(245,215,122,0.2)] bg-[rgba(212,175,55,0.08)] text-[#f5d77a] hover:border-[rgba(245,215,122,0.48)]`;
  }
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
