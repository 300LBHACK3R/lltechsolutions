import Link from "next/link";

export default function HomeProjectCTA() {
  return (
    <section className="home-project-invitation" aria-labelledby="home-project-invitation-title">
      <div className="container">
        <div className="home-project-invitation-inner">
          <div>
            <p className="eyebrow">Your next chapter</p>
            <h2 id="home-project-invitation-title">
              A business like yours
              <br />
              <em>deserves a considered presence.</em>
            </h2>
            <p className="home-project-invitation-copy">
              A new website, a better way of working, or a brand that stays present. Tell us what
              you have in mind. We’ll help you choose the right next step.
            </p>
          </div>
          <div className="home-project-invitation-actions">
            <Link href="/contact" className="home-project-invitation-link">
              <span>Let’s talk about your project</span>
              <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/free-tech-audit" className="text-link">
              Start with a free digital audit <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
