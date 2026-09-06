import Link from "next/link";
import HeroShowcase from "@/components/home/HeroShowcase";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Calgary-based · Canada-wide digital studio</p>
            <h1>
              Your business has outgrown ordinary.<span>Its digital presence should too.</span>
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
          <HeroShowcase />
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
