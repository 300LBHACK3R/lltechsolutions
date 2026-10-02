import Link from "next/link";

type AboutStat = {
  title: string;
  copy: string;
};

const aboutStats: AboutStat[] = [
  {
    title: "Organized",
    copy: "Structured planning, practical coordination, and professional site delivery.",
  },
  {
    title: "Dependable",
    copy: "Consistent standards, clean execution, and reliable finish quality from start to completion.",
  },
  {
    title: "Versatile",
    copy: "Experience across commercial, multi-family, strata, custom home, and interior environments.",
  },
];

export default function HomeAboutPreview() {
  return (
    <section className="section home-about" aria-labelledby="home-about-heading">
      <div className="container">
        <div className="about-feature">
          <div className="split-panel split-panel--about-home">
            <div className="about-feature__content">
              <span className="section-intro__eyebrow">About Summit</span>

              <h2 id="home-about-heading" className="section-intro__title">
                Built on craftsmanship, professionalism, and consistent results.
              </h2>

              <p className="section-intro__copy">
                Summit Painting Studio supports projects across your service area with a practical,
                organized approach built around preparation, clean execution, and dependable finish
                quality.
              </p>

              <p className="section-intro__copy">
                From commercial and multi-family work to strata, custom homes, and interior
                painting, each project is approached with the same commitment to coordination,
                workmanship, and presentation.
              </p>

              <Link
                href="/about"
                className="about-feature__link"
                aria-label="Learn more about Summit Painting Studio"
              >
                Learn More About Summit
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <aside className="stats-card stats-card--feature" aria-label="Sample studio approach">
              <span className="stats-card__eyebrow">Our Sample Approach</span>

              {aboutStats.map((item) => (
                <div key={item.title} className="stats-card__item">
                  <strong>{item.title}</strong>
                  <span>{item.copy}</span>
                </div>
              ))}

              <p className="stats-card__footer">
                Summit Painting Studio is positioned to deliver professional painting services with
                the care, organization, and presentation described in this fictional example.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
