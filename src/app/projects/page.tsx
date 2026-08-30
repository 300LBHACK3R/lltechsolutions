import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import {
  projectCategoryMeta,
  projects,
  type ProjectCategory,
} from "@/lib/projects";
import { ProjectCollectionStructuredData } from "@/components/seo/StructuredData";
import { createMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Website, Software & Social Media Case Studies",
  description:
    "Explore live website, custom software, and social media management projects by L&L Tech Solutions, including scope, services, outcomes, and connected channels.",
  path: "/projects",
  keywords: [
    "Calgary web design portfolio",
    "custom software development portfolio",
    "social media management case studies",
  ],
});

const categories: ProjectCategory[] = [
  "Website Design",
  "Software Development",
  "Social Media Management",
];

const categoryImages: Record<ProjectCategory, string> = {
  "Website Design": "/images/projects/tow-n-go.webp",
  "Software Development": "/images/projects/tates-tv.webp",
  "Social Media Management": "/images/projects/mckenzie-house.webp",
};

const categoryLabels: Record<ProjectCategory, string> = {
  "Website Design": "Web Experiences",
  "Software Development": "Digital Products",
  "Social Media Management": "Managed Brands",
};

export default function ProjectsPage() {
  const featured = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <>
      <ProjectCollectionStructuredData />

      <PageHero
        eyebrow="Projects & Case Studies"
        title={
          <>
            Real businesses.
            <span className="page-title-accent"> Digital systems built around them.</span>
          </>
        }
        description="Explore live websites, purpose-built software, and managed digital channels—along with the challenge, scope, services delivered, connected platforms, and result."
        primary={{ label: "Start A Similar Project", href: "/contact" }}
        secondary={{ label: "Review Services", href: "/services" }}
        meta={[
          "Live client projects",
          "Detailed case studies",
          "Ongoing partnerships",
        ]}
      />

      <section className="section-ivory relative overflow-hidden py-20 md:py-28">
        <div className="ivory-blue-orb ivory-blue-orb-right" />
        <div className="ivory-gold-orb" />

        <div className="container-premium relative z-10">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <span className="section-eyebrow section-eyebrow-dark">
                  Browse By Discipline
                </span>

                <h2 className="font-editorial mt-7 text-5xl font-semibold leading-[0.92] tracking-[-0.04em] text-[#10243a] md:text-7xl">
                  Every case study
                  <span className="block italic text-[#17477f]">
                    goes beyond the screenshot.
                  </span>
                </h2>
              </div>

              <p className="max-w-xl text-base leading-8 text-[#31465e]/62 md:text-lg lg:justify-self-end">
                Open a category to review the challenge, solution, services,
                connected platforms, ongoing management, and live project.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {categories.map((category, index) => {
              const meta = projectCategoryMeta[category];
              const count = projects.filter(
                (project) => project.category === category,
              ).length;

              return (
                <Reveal key={category} delayMs={index * 90}>
                  <Link
                    href={`/projects/${meta.slug}`}
                    className="project-category-card group"
                  >
                    <div className="relative aspect-[16/12] overflow-hidden bg-black">
                      <Image
                        src={categoryImages[category]}
                        alt={`${category} project category`}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover object-top opacity-70 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-92"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/28 to-transparent" />
                      <div className="absolute left-0 top-0 h-1 w-28 bg-[linear-gradient(90deg,#2f6fbb,#e4c77f)]" />

                      <div className="absolute left-5 top-5 flex items-center gap-3">
                        <span className="rounded-full bg-[#2f6fbb] px-3 py-1 text-[0.58rem] font-black uppercase tracking-[0.16em] text-white">
                          {categoryLabels[category]}
                        </span>
                        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/48">
                          {count} {count === 1 ? "project" : "projects"}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <h3 className="font-editorial text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-white">
                          {category}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-sm leading-7 text-[#31465e]/60">
                        {meta.description}
                      </p>

                      <p className="mt-6 text-xs font-black uppercase tracking-[0.15em] text-[#17477f] transition group-hover:translate-x-1">
                        View case studies →
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-obsidian relative overflow-hidden py-20 md:py-28">
        <div className="corporate-grid absolute inset-0 opacity-12" />
        <div className="projects-blue-glow" />

        <div className="container-premium relative z-10">
          <Reveal>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <span className="section-eyebrow">Featured Live Work</span>

                <h2 className="font-editorial mt-7 text-5xl font-semibold leading-[0.92] tracking-[-0.04em] text-[#f3f7fb] md:text-7xl">
                  Built, launched,
                  <span className="block italic text-[#e4c77f]">
                    and actively used.
                  </span>
                </h2>
              </div>

              <Link href="/contact" className="btn-gold">
                Start A Project
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {featured.map((project, index) => (
              <Reveal key={project.title} delayMs={index * 70}>
                <a
                  href={project.liveUrl ?? "/projects"}
                  target={project.liveUrl ? "_blank" : undefined}
                  rel={project.liveUrl ? "noreferrer" : undefined}
                  className="featured-live-card group"
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? `${project.title} project`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top opacity-72 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-94"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(202,164,81,0.18),transparent_40%),linear-gradient(135deg,#050505,#120d03)]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/16 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#d9bd7c]">
                      {project.relationship}
                    </p>
                    <h3 className="font-editorial mt-3 text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-white md:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/42 transition group-hover:text-[#e4c77f]">
                      Open live project ↗
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Your project should become"
        accent="the next strong case study."
        description="Tell us what the business needs to build, improve, launch, or manage. We will recommend the clearest route forward."
        secondaryLabel="Review Services"
        secondaryHref="/services"
      />
    </>
  );
}
