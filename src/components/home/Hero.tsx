import Link from "next/link";

export default function Hero() {
  return (
    <section className="premium-hero" aria-labelledby="hero-title">
      <div className="container">
        <p className="premium-hero-eyebrow">Calgary studio. Canada-wide partnerships.</p>
        <h1 id="hero-title" className="premium-hero-title">
          <span>Your business has</span>
          <span>
            outgrown <em>ordinary.</em>
          </span>
        </h1>
        <p className="premium-hero-description">
          Custom websites, purpose-built software and social media management.
          <br className="premium-hero-copy-break" /> Built around your business. Supported beyond
          launch.
        </p>
        <div className="premium-hero-actions">
          <Link href="/contact" className="premium-hero-primary">
            Start a project <span aria-hidden="true">↗</span>
          </Link>
          <Link href="#home-work" className="premium-hero-secondary">
            Explore our work <span aria-hidden="true">↓</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
