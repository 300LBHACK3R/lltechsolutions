import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import {
  getProjectsByCategory,
  projectCategoryMeta,
  type Project,
  type ProjectCategory,
  type ProjectLinkKind,
} from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

type ProjectCategoryPageProps = {
  category: ProjectCategory;
};

export default function ProjectCategoryPage({
  category,
}: ProjectCategoryPageProps) {
  const meta = projectCategoryMeta[category];
  const categoryProjects = getProjectsByCategory(category);

  return (
    <>
      <PageHero
        eyebrow={meta.eyebrow}
        title={
          <>
            {meta.title}
          </>
        }
        description={meta.description}
        primary={{ label: "Start A Similar Project", href: "/contact" }}
        secondary={{ label: "All Project Categories", href: "/projects" }}
        meta={[
          `${categoryProjects.length} published ${
            categoryProjects.length === 1 ? "project" : "projects"
          }`,
          "Live links where available",
          "Challenge, solution & result",
        ]}
      />

      <section className="section-ivory relative overflow-hidden py-20 md:py-28">
        <div className="ivory-blue-orb ivory-blue-orb-right" />
        <div className="ivory-gold-orb" />

        <div className="container-premium relative z-10">
          {categoryProjects.length > 0 ? (
            <div className="grid gap-10 md:gap-14">
              {categoryProjects.map((project, index) => (
                <Reveal key={project.title} delayMs={index * 80}>
                  <ProjectCaseStudy
                    project={project}
                    reverse={index % 2 === 1}
                    index={index}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-black/10 bg-white p-9 text-center shadow-[0_28px_80px_rgba(28,20,8,0.09)]">
              <p className="font-editorial text-4xl font-semibold text-[#10243a]">
                {meta.emptyMessage}
              </p>
            </div>
          )}
        </div>
      </section>

      <PageCTA
        title="Looking for this standard"
        accent="of digital execution?"
        description="Share the current limitation, required functionality, business objective, and timeline. We will outline the clearest next step."
        secondaryLabel="Review Services"
        secondaryHref="/services"
      />
    </>
  );
}

function ProjectCaseStudy({
  project,
  reverse,
  index,
}: {
  project: Project;
  reverse: boolean;
  index: number;
}) {
  return (
    <article className="case-study-card">
      <div className={reverse ? "case-study-visual lg:order-2" : "case-study-visual"}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1920px) 720px, (min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top opacity-82"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <div className="absolute left-0 top-0 h-1 w-36 bg-[linear-gradient(90deg,#2f6fbb,#e4c77f)]" />

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#2f6fbb] px-3 py-1 text-[0.58rem] font-black uppercase tracking-[0.16em] text-white">
            {project.category}
          </span>

          {project.liveUrl ? (
            <span className="rounded-full border border-white/14 bg-black/58 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white/72 backdrop-blur">
              Live project
            </span>
          ) : null}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#d9bd7c]">
            {project.relationship}
          </p>
          <h2 className="font-editorial mt-3 text-4xl font-semibold leading-[0.94] tracking-[-0.04em] text-white md:text-6xl">
            {project.title}
          </h2>
        </div>
      </div>

      <div className={reverse ? "case-study-content lg:order-1" : "case-study-content"}>
        <div className="flex items-center justify-between gap-5">
          <p className="text-[0.64rem] font-black uppercase tracking-[0.18em] text-[#9b762c]">
            Case Study {String(index + 1).padStart(2, "0")}
          </p>

          <span className="font-editorial text-5xl font-semibold text-[#2f6fbb]/22">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-5 text-base leading-8 text-[#31465e]/68">
          {project.description}
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {project.stats.map((stat) => (
            <div key={`${project.title}-${stat.label}`} className="case-stat">
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>

        {project.management ? (
          <div className="management-panel mt-7">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#ead39a]">
              Ongoing Partnership
            </p>
            <h3 className="font-editorial mt-3 text-3xl font-semibold text-white">
              {project.management.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/56">
              {project.management.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.management.services.map((service) => (
                <span key={service} className="management-chip">
                  {service}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-8 grid gap-5">
          <CaseText title="Challenge" text={project.challenge} />
          <CaseText title="Solution" text={project.solution} />
          <CaseText title="Result" text={project.result} result />
        </div>

        <div className="mt-8">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#9b762c]">
            Services Delivered
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.services.map((service) => (
              <span key={service} className="case-service-chip">
                {service}
              </span>
            ))}
          </div>
        </div>

        {project.links && project.links.length > 0 ? (
          <div className="mt-8 border-t border-black/10 pt-7">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#9b762c]">
              Live Presence & Connected Channels
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <a
                  key={`${project.title}-${link.label}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={projectLinkClass(link.kind)}
                >
                  {link.label} ↗
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
              rel="noopener noreferrer"
              className="btn-blue"
            >
              View Live Project
            </a>
          ) : null}

          <Link href="/contact" className="btn-dark-outline">
            Start A Similar Project
          </Link>
        </div>
      </div>
    </article>
  );
}

function CaseText({
  title,
  text,
  result = false,
}: {
  title: string;
  text: string;
  result?: boolean;
}) {
  return (
    <div className={result ? "case-text-block case-text-result" : "case-text-block"}>
      <p>{title}</p>
      <span>{text}</span>
    </div>
  );
}

function projectLinkClass(kind: ProjectLinkKind | undefined) {
  const base =
    "inline-flex items-center rounded-lg border px-3 py-2 text-xs font-black transition hover:-translate-y-0.5";

  switch (kind) {
    case "google":
      return `${base} border-blue-700/15 bg-blue-600/[0.07] text-blue-800 hover:border-blue-700/35`;
    case "facebook":
      return `${base} border-sky-700/15 bg-sky-600/[0.07] text-sky-800 hover:border-sky-700/35`;
    case "tiktok":
      return `${base} border-fuchsia-700/15 bg-fuchsia-600/[0.07] text-fuchsia-800 hover:border-fuchsia-700/35`;
    case "booking":
      return `${base} border-emerald-700/15 bg-emerald-600/[0.07] text-emerald-800 hover:border-emerald-700/35`;
    default:
      return `${base} border-[#9b762c]/20 bg-[#caa451]/[0.08] text-[#71551e] hover:border-[#9b762c]/45`;
  }
}
