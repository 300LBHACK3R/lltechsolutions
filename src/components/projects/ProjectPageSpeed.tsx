import Image from "next/image";
import type { Project, ProjectPageSpeedReport } from "@/data/projects";

const metrics = [
  ["performance", "Performance"],
  ["accessibility", "Accessibility"],
  ["bestPractices", "Best practices"],
  ["seo", "SEO"],
] as const satisfies readonly (readonly [keyof ProjectPageSpeedReport, string])[];

export default function ProjectPageSpeed({ project }: { project: Project }) {
  const snapshot = project.pageSpeed;
  if (!snapshot) return null;
  const date = new Intl.DateTimeFormat("en-CA", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${snapshot.date}T12:00:00Z`));

  return (
    <section className="client-pagespeed" aria-labelledby="project-pagespeed-title">
      <div className="client-section-heading">
        <div>
          <p className="eyebrow">Measured on the live homepage</p>
          <h2 id="project-pagespeed-title">PageSpeed snapshots</h2>
        </div>
        <p>
          Google PageSpeed Insights · <time dateTime={snapshot.date}>{date}</time>
        </p>
      </div>
      <div className="client-pagespeed-grid">
        {snapshot.reports.map((report) => (
          <article className="client-pagespeed-report" key={report.device}>
            <h3>{report.device}</h3>
            <dl className="client-pagespeed-scores">
              {metrics.map(([key, label]) => (
                <div key={key}>
                  <dt>{label}</dt>
                  <dd>
                    {report[key]}
                    <span> / 100</span>
                  </dd>
                </div>
              ))}
            </dl>
            <details className="client-pagespeed-original">
              <summary>
                View original report
                <span className="sr-only"> for {report.device.toLowerCase()}</span>
              </summary>
              <figure>
                <Image
                  src={report.image}
                  width={report.width}
                  height={report.height}
                  alt={`${project.title}, ${report.device.toLowerCase()} PageSpeed report: ${metrics
                    .map(([key, label]) => `${label} ${report[key]}`)
                    .join(", ")}. ${date}.`}
                  loading="lazy"
                  unoptimized
                />
                <figcaption>
                  <a href={report.image} target="_blank" rel="noopener noreferrer">
                    Open full-size screenshot <span aria-hidden="true">↗</span>
                    <span className="sr-only">
                      {" "}
                      for {report.device.toLowerCase()}, in a new tab
                    </span>
                  </a>
                </figcaption>
              </figure>
            </details>
          </article>
        ))}
      </div>
      <p className="client-pagespeed-note">
        Homepage tested: <span>{snapshot.testedUrl}</span>. Original screenshots from the date
        shown. These are individual lab tests; scores can vary between runs and are not a site-wide
        guarantee. No real-user field data was available in these reports.
      </p>
    </section>
  );
}
