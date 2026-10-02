import Link from "next/link";

export default function HomeCta() {
  return (
    <section className="section home-cta" aria-labelledby="home-cta-heading">
      <div className="container">
        <div className="cta-panel home-cta-panel">
          <div className="cta-panel__content">
            <span className="section-intro__eyebrow">Request a Quote</span>

            <h2 id="home-cta-heading" className="section-intro__title">
              Need a painting team built for clean execution?
            </h2>

            <p className="section-intro__copy">
              Summit Painting Studio supports commercial, multi-family, strata, custom home, and
              interior projects across your service area with organized coordination, professional
              site standards, and strong finish quality.
            </p>
          </div>

          <div className="cta-panel__actions">
            <Link
              href="/contact"
              className="button button--primary"
              aria-label="Request a quote from Summit Painting Studio"
            >
              Request a Quote
            </Link>

            <Link
              href="/projects"
              className="text-link"
              aria-label="View Summit Painting Studio project portfolio"
            >
              View Projects
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
