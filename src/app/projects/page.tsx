import {
  projectCategoryMeta,
  projects,
  type ProjectCategory,
} from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore L&L Tech Solutions project categories, including custom web builds, tech support, and infrastructure work.",
};

const categories: ProjectCategory[] = [
  "Web Build",
  "Tech Support",
  "Infrastructure",
];

const categoryImages: Record<ProjectCategory, string> = {
  "Web Build": "/images/projects/tow-n-go.jpg",
  "Tech Support": "/images/projects/tech-support.jpg",
  Infrastructure: "/images/projects/rack-cleanup.jpg",
};

export default function ProjectsPage() {
  return (
    <main className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-[rgba(212,175,55,0.07)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_35%)]" />
      </div>

      <section className="container-premium">
        <div className="mx-auto max-w-5xl text-center">
          <span className="section-eyebrow">Projects</span>
          <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Real Work, Organized By Service Category.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
            Explore custom websites, business tech support, and infrastructure
            projects with clear proof, live links, screenshots, and project
            breakdowns.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {categories.map((category) => {
            const meta = projectCategoryMeta[category];
            const count = projects.filter(
              (project) => project.category === category,
            ).length;

            return (
              <Link
                key={category}
                href={`/projects/${meta.slug}`}
                className="group relative overflow-hidden rounded-[2rem] border border-[rgba(212,175,55,0.16)] bg-white/[0.035] shadow-[0_24px_90px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(245,215,122,0.42)]"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-black">
                  <Image
                    src={categoryImages[category]}
                    alt={`${category} project category`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover opacity-64 transition duration-700 group-hover:scale-[1.05] group-hover:opacity-88"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-[rgba(245,215,122,0.28)] bg-black/65 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#f5d77a] backdrop-blur">
                    {count} {count === 1 ? "Project" : "Projects"}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f5d77a]">
                    {meta.eyebrow}
                  </p>
                  <h2 className="mt-4 text-3xl font-black leading-none tracking-[-0.045em]">
                    {category === "Web Build"
                      ? "Custom Web Builds"
                      : category === "Tech Support"
                        ? "Business Tech Support"
                        : "Infrastructure & Field Work"}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    {meta.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#f5d77a]">
                    View Projects
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
