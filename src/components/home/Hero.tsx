import SignalArtwork from "@/components/ui/SignalArtwork";
import Link from "next/link";
import Image from "next/image";
import { getProject, projectPath } from "@/data/projects";
import StudioMotion from "@/components/home/StudioMotion";

export default function Hero() {
  const website = getProject("tow-n-go");
  const content = getProject("tow-n-go-digital");
  return (
    <section className="premium-hero signal-surface" aria-labelledby="hero-title">
      <SignalArtwork className="surface-signals" />
      <div className="container">
        <div className="studio-opening">
          <div className="studio-introduction">
            <p className="premium-hero-eyebrow">Calgary studio. Canada-wide partnerships.</p>
            <h1 id="hero-title" className="premium-hero-title">
              <span>Your business</span> <span>has outgrown</span> <em>ordinary.</em>
            </h1>
            <p className="premium-hero-description">
              Custom websites. Purpose-built software. Social media that keeps your business in the
              conversation.
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
          <StudioMotion>
            <div className="studio-artboard">
              <div className="studio-grid" aria-hidden="true" />
              <p className="studio-artboard-caption">From first impression. To lasting presence.</p>
              <div className="studio-design-note" aria-hidden="true">
                <span>Design with intent.</span>
                <svg viewBox="0 0 100 45" fill="none">
                  <path d="M3 8C35 0 66 12 87 34M71 30l19 8-1-19" />
                </svg>
              </div>
              <div className="studio-previews">
                <Link
                  href={projectPath(website)}
                  className="studio-website"
                  aria-label={`Explore the ${website.title} website case study`}
                >
                  <div className="studio-image">
                    <Image
                      src={website.image ?? website.video.poster}
                      alt={website.imageAlt ?? website.title}
                      width={1348}
                      height={926}
                      sizes="(min-width: 1900px) 710px, (min-width: 1000px) 46vw, (min-width: 700px) 620px, 88vw"
                      preload
                    />
                  </div>
                  <div className="studio-website-label">
                    <span>
                      Custom website <strong>{website.title}</strong>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </div>
                </Link>
                <Link
                  href={projectPath(content)}
                  className="studio-content"
                  aria-label="Explore Tow-N-Go’s monthly social media and content partnership"
                >
                  <Image
                    src={content.video.poster}
                    alt="Tow-N-Go trailer education Reel created for the monthly content partnership"
                    width={content.video.width}
                    height={content.video.height}
                    sizes="(max-width: 479px) 110px, (min-width: 1900px) 220px, (min-width: 1000px) 16vw, 190px"
                  />
                  <div className="studio-content-label">
                    <span>Beyond launch</span>
                    <strong>
                      Social. Content.
                      <br />
                      Continuity.
                    </strong>
                    <span className="studio-content-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </StudioMotion>
        </div>
        <nav className="studio-pathways" aria-label="Find your next step">
          <Link href="/website-collection" className="studio-pathway">
            <span className="studio-pathway-index" aria-hidden="true">
              01
            </span>
            <span>
              <strong>Find your website.</strong>
              <span>Explore the template collection</span>
            </span>
            <span className="studio-pathway-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
          <Link href="/services" className="studio-pathway">
            <span className="studio-pathway-index" aria-hidden="true">
              02
            </span>
            <span>
              <strong>Bring us your idea.</strong>
              <span>Websites, software &amp; social</span>
            </span>
            <span className="studio-pathway-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
          <Link href="/projects" className="studio-pathway">
            <span className="studio-pathway-index" aria-hidden="true">
              03
            </span>
            <span>
              <strong>See what’s possible.</strong>
              <span>Meet our clients &amp; explore the work</span>
            </span>
            <span className="studio-pathway-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </nav>
      </div>
    </section>
  );
}
