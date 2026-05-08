import Reveal from "@/components/ui/Reveal";
import { projects, type ProjectCategory } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

const projectGroups: {
  category: ProjectCategory;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}[] = [
  {
    category: "Web Build",
    eyebrow: "Websites & Digital Growth",
    title: "Custom Web Builds",
    description:
      "Premium websites, SEO structure, Google/Facebook setup, social media support, ads, and lead-focused digital systems.",
    image: "/images/projects/tow-n-go.jpg",
  },
  {
    category: "Tech Support",
    eyebrow: "Business Technology Support",
    title: "Remote Tech Support",
    description:
      "Computer cleanup, troubleshooting, software setup, account support, business systems, maintenance, and ongoing technical help.",
    image: "/images/projects/tech-support.jpg",
  },
  {
    category: "Infrastructure",
    eyebrow: "On-Site Technical Systems",
    title: "Infrastructure & Field Work",
    description:
      "Network racks, cabling, CCTV, switches, patch panels, RJ45 work, system setup, and clean on-site technical installs.",
    image: "/images/projects/rack-cleanup.jpg",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="hero-glow" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-4xl">
              <span className="section-eyebrow">Selected Work</span>

              <h2 className="section-title mt-5">
                Explore The Work By Service Category.
              </h2>

              <p className="section-subtitle mt-5">
                View real project examples across custom websites, business tech
                support, and on-site infrastructure work.
              </p>
            </div>

            <Link href="/services" className="btn-ghost-gold">
              View Services
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projectGroups.map((group, index) => {
            const count = projects.filter(
              (project) => project.category === group.category,
            ).length;

            return (
              <Reveal key={group.category} delayMs={index * 100}>
                <article className="card-premium edge-gold hover-lift group flex h-full flex-col overflow-hidden">
                  <div className="relative h-72 overflow-hidden bg-black">
                    <Image
                      src={group.image}
                      alt={group.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                    <div className="absolute left-5 top-5">
                      <span className="badge-gold">{group.category}</span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f5d77a]/85">
                        {group.eyebrow}
                      </p>

                      <h3 className="mt-2 text-3xl font-black tracking-[-0.045em]">
                        {group.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm leading-7 text-muted">
                      {group.description}
                    </p>

                    <div className="mt-6 rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.045)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f5d77a]/80">
                        Available Project Examples
                      </p>
                      <p className="mt-2 text-sm text-white/82">
                        {count} project{count === 1 ? "" : "s"} available in
                        this category.
                      </p>
                    </div>

                    <div className="mt-auto pt-7">
                      <Link href="/services" className="btn-ghost-gold w-full">
                        View Jobs
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
