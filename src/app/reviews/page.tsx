import Image from "next/image";
import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import ProjectCTA from "@/components/ui/ProjectCTA";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import { clientReviews } from "@/data/reviews";
import { getProject, projectPath } from "@/data/projects";
import { absoluteUrl } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Client Reviews & Testimonials",
  "Read feedback from Heather Knorr of McKenzie House Massage and Chad Muxlow of Tow-N-Go Trailers about L&L’s website and digital work.",
  "/reviews",
);

export default function ReviewsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Client reviews"
        title="Good work starts with a good working relationship."
        description="Communication, care and attention to the business behind the brief. Hear from the clients behind the websites and ongoing partnerships."
      />
      <div className="container review-directory">
        {clientReviews.map((review) => {
          const project = getProject(review.projectId);
          return (
            <Reveal key={review.id} className="review-entry">
              <article
                className={`client-review${review.quote.length > 450 ? " client-review-detailed" : ""}`}
                aria-labelledby={`review-${review.id}`}
              >
                <div className="review-quote-panel">
                  <p className="eyebrow">{review.sourceLabel}</p>
                  <p className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                    ★★★★★
                  </p>
                  <figure>
                    <blockquote>“{review.quote}”</blockquote>
                    <figcaption>
                      <strong id={`review-${review.id}`}>{review.author}</strong>
                      <span>{project.title}</span>
                    </figcaption>
                  </figure>
                </div>
                <aside className="review-project" aria-label="The project behind this review">
                  <p className="eyebrow">The work behind the words</p>
                  {project.image && (
                    <Link
                      href={projectPath(project)}
                      className="review-project-image"
                      aria-label={`Explore ${project.title}`}
                    >
                      <Image
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        width={1348}
                        height={926}
                        sizes="(min-width: 1900px) 620px, (min-width: 1000px) 32vw, (min-width: 700px) 70vw, 90vw"
                      />
                    </Link>
                  )}
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <Link href={projectPath(project)} className="text-link">
                    Explore the project <span aria-hidden="true">↗</span>
                  </Link>
                </aside>
              </article>
            </Reveal>
          );
        })}
        <div className="review-next">
          <p>Get a feel for the work—and how we work together.</p>
          <nav aria-label="Explore working with L&L">
            <Link href="/projects" className="text-link">
              Our clients ↗
            </Link>
            <Link href="/process" className="text-link">
              Our process ↗
            </Link>
          </nav>
        </div>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": absoluteUrl("/reviews#webpage"),
              name: "L&L Tech Solutions Client Reviews",
              url: absoluteUrl("/reviews"),
              inLanguage: "en-CA",
              about: { "@id": absoluteUrl("/#organization") },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Client Reviews",
                  item: absoluteUrl("/reviews"),
                },
              ],
            },
          ],
        }}
      />
      <ProjectCTA />
    </>
  );
}
