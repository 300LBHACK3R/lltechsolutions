import Link from "next/link";
import HeroShowcase from "@/components/home/HeroShowcase";
import SignalArtwork from "@/components/ui/SignalArtwork";
import { projects } from "@/data/projects";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <SignalArtwork className="hero-signals" />
      <div className="container">
        <div className="hero-topline">
          <p className="eyebrow">
            <span className="studio-indicator" aria-hidden="true" />
            Calgary-based · Canada-wide digital studio
          </p>
          <span className="studio-edition">Independent thinking. Connected execution.</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">
              Your business has outgrown <em>ordinary.</em>
              <span>Its digital presence should too.</span>
            </h1>
            <p className="hero-description">
              L&L Tech Solutions creates high-performance websites, purpose-built software, and
              managed content systems for businesses ready to look established, operate
              intelligently, and stay visible.
            </p>
            <div className="button-row">
              <Link href="/contact" className="button button-gold">
                Start A Project <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/projects" className="text-link">
                Explore Selected Work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <HeroShowcase
            projects={["mckenzie-house", "tow-n-go", "tates-tv"].flatMap((id) => {
              const project = projects.find((item) => item.id === id);
              if (!project) return [];
              const {
                id: projectId,
                title,
                category,
                relationship,
                image,
                imageAlt,
                liveUrl,
              } = project;
              return [{ id: projectId, title, category, relationship, image, imageAlt, liveUrl }];
            })}
          />
        </div>
        <div className="hero-proof">
          {[
            ["Strategy", "Designed around the business"],
            ["Execution", "Custom code and content"],
            ["Continuity", "Managed beyond launch"],
          ].map(([title, copy]) => (
            <div key={title}>
              <span>{title}</span>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
