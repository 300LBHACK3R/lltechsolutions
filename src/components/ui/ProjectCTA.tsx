import Link from "next/link";
export default function ProjectCTA() {
  return (
    <section className="final-cta">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow">Your next chapter</p>
          <h2>
            Let’s build something
            <br />
            <span className="gold">worthy of your business.</span>
          </h2>
          <p>Tell us where you are today and where you want to go.</p>
        </div>
        <div className="cta-actions">
          <Link href="/contact" className="button button-gold">
            Start A Project <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/free-tech-audit" className="text-link">
            Start with a free digital audit <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
