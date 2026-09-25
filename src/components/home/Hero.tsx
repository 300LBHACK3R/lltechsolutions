import Link from "next/link";
import HeroShowcase from "@/components/home/HeroShowcase";
import { projects } from "@/data/projects";

export default function Hero() {
  return (
    <section className="premium-hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="premium-hero-topline">
          <p>
            Calgary-based <span aria-hidden="true">/</span> Canada-wide
          </p>
          <span>Independent digital studio</span>
        </div>
        <div className="premium-hero-grid">
          <div className="premium-hero-copy">
            <p className="premium-hero-eyebrow">
              <span aria-hidden="true" />
              L&L Tech Solutions
            </p>
            <h1 id="hero-title" className="premium-hero-title">
              Your business has outgrown <em>ordinary.</em>
            </h1>
            <p className="premium-hero-editorial">Its digital presence should too.</p>
            <p className="premium-hero-description">
              Custom websites. Purpose-built software. Social media and content, thoughtfully
              managed. One studio to bring your business together online.
            </p>
            <div className="premium-hero-actions">
              <Link href="/contact" className="premium-hero-primary">
                Start a project <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/projects" className="premium-hero-secondary">
                Meet our clients <span aria-hidden="true">→</span>
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
      </div>
    </section>
  );
}
