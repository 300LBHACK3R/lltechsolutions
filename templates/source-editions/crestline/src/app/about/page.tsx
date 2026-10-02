import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

const proofItems = [
  { value: "Plan", label: "Preparation and project scope" },
  { value: "Care", label: "Protection and thoughtful coordination" },
  { value: "Finish", label: "Details and final walkthrough" },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader light />

      <main className="about-page">
        <h1 className="sr-only">About Summit Painting Studio</h1>

        <section className="section section--about-story">
          <div className="container">
            <div className="split-panel split-panel--about">
              <div className="split-panel__content">
                <span className="section-intro__eyebrow">Our Story</span>

                <h2 className="section-intro__title">
                  A considered approach to preparation, colour, and finish.
                </h2>

                <p className="section-intro__copy">
                  Summit Painting Studio is a fictional sample business. This story section is ready
                  for your own background, approach, and approved business details.
                </p>

                <p className="section-intro__copy">
                  Use this space to explain the kinds of painting projects you take on, how you plan
                  a job, and what clients can expect from the process.
                </p>

                <p className="section-intro__copy">
                  Every project is approached with preparation, communication, workmanship, and
                  finish quality — because dependable results come from disciplined execution.
                </p>
              </div>

              <div
                className="media-panel media-panel--about"
                aria-label="Generated illustrative painting interior; not client work"
                role="img"
              />
            </div>
          </div>
        </section>

        <section
          className="section section--soft about-proof-section"
          aria-labelledby="about-proof-heading"
        >
          <div className="container">
            <h2 id="about-proof-heading" className="sr-only">
              Sample painting process
            </h2>

            <div className="card-grid card-grid--three about-stats">
              {proofItems.map((item) => (
                <article key={item.label} className="stats-card stats-card--about">
                  <strong className="stats-card__value">{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
