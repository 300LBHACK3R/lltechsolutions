import SignalArtwork from "@/components/ui/SignalArtwork";
import Link from "next/link";

export default function HomeProjectCTA() {
  return (
    <section
      className="home-project-invitation signal-surface signal-surface-quiet"
      aria-labelledby="home-project-invitation-title"
    >
      <SignalArtwork className="surface-signals" />
      <div className="container">
        <div className="home-project-invitation-inner">
          <h2 id="home-project-invitation-title">
            Let’s build <em>what’s next.</em>
          </h2>
          <p className="home-project-invitation-copy">
            Tell us what you have in mind. We’ll help you choose the right next step.
          </p>
          <div className="home-project-invitation-actions">
            <Link href="/contact" className="premium-hero-primary">
              Let’s talk <span aria-hidden="true">↗</span>
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
