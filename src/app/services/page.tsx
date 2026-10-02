import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import SignalArtwork from "@/components/ui/SignalArtwork";
import { getProject, projectPath } from "@/data/projects";
import { contentProduction, servicePillars } from "@/data/services";
import { absoluteUrl } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Website, Software & Social Media Services",
  "Website development, custom software and social media, plus photography and videography for websites and business content. Calgary-based L&L Tech Solutions.",
  "/services",
);

const serviceExamples = {
  "website-development": "tow-n-go",
  "software-development": "tates-tv",
  "social-media-management": "tow-n-go-digital",
} as const;

function ServiceExample({ serviceId }: { serviceId: keyof typeof serviceExamples }) {
  const project = getProject(serviceExamples[serviceId]);
  const isContent = project.category === "social-media-management";
  const screenshot = project.gallery?.[serviceId === "software-development" ? 1 : 0];

  return (
    <figure className={`services-example${isContent ? " services-example-content" : ""}`}>
      <Link
        href={projectPath(project)}
        className="services-example-image"
        aria-label={`Explore ${project.title}`}
      >
        <Image
          src={screenshot?.src ?? project.video.poster}
          alt={screenshot?.alt ?? `Still from ${project.video.title}`}
          width={screenshot?.width ?? project.video.width}
          height={screenshot?.height ?? project.video.height}
          sizes={
            isContent
              ? "(max-width: 799px) 230px, 280px"
              : "(max-width: 799px) 92vw, (max-width: 1600px) 48vw, 740px"
          }
        />
        <span className="services-example-open" aria-hidden="true">
          ↗
        </span>
      </Link>
      <figcaption>
        <div>
          <p className="services-proof-label">
            {project.ownership === "studio" ? "L&L studio product" : "Client work"}
          </p>
          <Link href={projectPath(project)} className="services-proof-title">
            {project.title}
          </Link>
          <p className="services-proof-relationship">{project.relationship}</p>
        </div>
        {isContent ? (
          <>
            <p className="services-proof-description">{project.description}</p>
            <Link href={projectPath(project)} className="text-link">
              Explore the partnership <span aria-hidden="true">↗</span>
            </Link>
          </>
        ) : (
          <Link href={projectPath(project)} className="text-link">
            Explore the project <span aria-hidden="true">↗</span>
          </Link>
        )}
      </figcaption>
    </figure>
  );
}

export default function ServicesPage() {
  const productionProject = getProject("mckenzie-digital-launch");

  return (
    <div className="services-page">
      <header className="services-intro signal-surface">
        <SignalArtwork className="surface-signals" />
        <div className="container">
          <p className="eyebrow">L&L / Our services</p>
          <div className="services-intro-layout">
            <h1>
              Built around your business.<span>Connected by design.</span>
            </h1>
            <div className="services-intro-copy">
              <p>
                Websites, software and content that work together. A clear scope, thoughtful
                execution and a real person to help you take the next step.
              </p>
              <Link href="/contact" className="text-link">
                Tell us what you have in mind <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <nav className="services-index" aria-label="Explore our services">
          {servicePillars.map((service, index) => (
            <Link href={`#${service.id}`} key={service.id}>
              <span className="services-index-number" aria-hidden="true">
                0{index + 1}
              </span>
              <span>{service.shortName}</span>
              <span className="services-index-arrow" aria-hidden="true">
                ↓
              </span>
            </Link>
          ))}
        </nav>
        {servicePillars.map((service, index) => (
          <section
            className={`services-chapter services-chapter-${service.id}`}
            id={service.id}
            aria-labelledby={`${service.id}-title`}
            key={service.id}
          >
            <div className="services-chapter-label">
              <p className="eyebrow">
                0{index + 1} / {service.name}
              </p>
              <Link href={service.work} className="text-link">
                Related work <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="services-chapter-layout">
              <ServiceExample serviceId={service.id} />
              <div className="services-chapter-copy">
                <h2 id={`${service.id}-title`}>{service.title}</h2>
                <p className="services-description">{service.description}</p>
                <h3 className="services-capabilities-heading">What we can help with</h3>
                <ul className="services-capabilities">
                  {service.capabilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.inquiry)}`}
                  className="button button-outline"
                >
                  Discuss your project <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
            {service.id === "website-development" && (
              <div className="services-template-path">
                <div>
                  <h3>Start with a design you love.</h3>
                  <p>
                    Choose a custom-coded template. We personalize it with your supplied content and
                    branding, prepare the site and handle its launch within the agreed scope.
                  </p>
                </div>
                <Link href="/website-collection" className="text-link">
                  Explore Website Templates <span aria-hidden="true">↗</span>
                </Link>
              </div>
            )}
            {service.id === "social-media-management" && (
              <section
                className="services-production"
                id={contentProduction.id}
                aria-labelledby="services-production-title"
              >
                <div className="services-production-heading">
                  <p className="eyebrow">Original content / From shoot to screen</p>
                  <h3 id="services-production-title">{contentProduction.title}</h3>
                  <p>{contentProduction.description}</p>
                  <Link href={projectPath(productionProject)} className="text-link">
                    Explore McKenzie House’s content launch <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <div className="services-production-details">
                  <ul>
                    {contentProduction.uses.map((use) => (
                      <li key={use}>{use}</li>
                    ))}
                  </ul>
                  <p>{contentProduction.scope}</p>
                  <Link
                    href={`/contact?service=${encodeURIComponent(contentProduction.inquiry)}`}
                    className="text-link"
                  >
                    Plan your photo & video project <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </section>
            )}
          </section>
        ))}
        <section
          className="services-next-step signal-surface signal-surface-quiet"
          aria-labelledby="services-next-title"
        >
          <SignalArtwork className="surface-signals" />
          <div>
            <p className="eyebrow">A clear next step</p>
            <h2 id="services-next-title">Bring us the idea. We’ll help shape the work.</h2>
            <p>Tell us what you need. We’ll agree on the scope, timing and cost before we begin.</p>
          </div>
          <div className="services-next-actions">
            <Link href="/contact" className="button button-gold">
              Start a conversation <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/packages" className="text-link">
              Explore pricing <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": servicePillars.map((service) => ({
            "@type": "Service",
            name: service.name,
            description: service.description,
            url: absoluteUrl(`/services#${service.id}`),
            provider: { "@id": absoluteUrl("/#organization") },
            areaServed: "Canada",
          })),
        }}
      />
    </div>
  );
}
