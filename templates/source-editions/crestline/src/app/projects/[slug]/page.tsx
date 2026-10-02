import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import PageHero from "@/components/shared/page-hero";
import HomeCta from "@/components/home/home-cta";
import { getProjectCategory, getProjectsByCategory, projectCategories } from "@/data/projects";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projectCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getProjectCategory(slug);

  if (!category) {
    return {
      title: "Project Gallery Not Found",
    };
  }

  return {
    title: `${category.title} Project Gallery`,
    description: category.description,
    alternates: {
      canonical: `/projects/${category.slug}`,
    },
    openGraph: {
      title: `${category.title} Project Gallery | Summit Painting Studio`,
      description: category.description,
      images: [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: `${category.title} project gallery`,
        },
      ],
    },
  };
}

export default async function ProjectCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const category = getProjectCategory(slug);

  if (!category) {
    notFound();
  }

  const categoryProjects = getProjectsByCategory(category.slug);

  return (
    <>
      <SiteHeader light />

      <main className="project-category-page">
        <PageHero
          eyebrow="Project Gallery"
          title={`${category.title} Projects`}
          copy={category.description}
          backgroundImage={category.image}
          backgroundPosition="center center"
          darkOverlay
        />

        <section className="section project-category-section">
          <div className="container">
            <div className="project-category-topbar">
              <div>
                <span className="section-intro__eyebrow">Illustrative Portfolio</span>

                <h1 className="section-intro__title">{category.title} Gallery</h1>

                <p className="section-intro__copy">
                  Browse fictional project studies using generated imagery. Each project can include
                  multiple photos, descriptions, and location details.
                </p>
              </div>

              <Link href="/projects" className="button button--primary">
                Back to Galleries
              </Link>
            </div>

            {categoryProjects.length > 0 ? (
              <div className="project-gallery-list">
                {categoryProjects.map((project) => (
                  <article key={project.slug} className="project-gallery-card">
                    <div className="project-gallery-card__media">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="project-gallery-card__cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="project-gallery-card__body">
                      <div className="project-gallery-card__header">
                        <span className="card__eyebrow">{project.categoryTitle}</span>

                        <h2 className="project-gallery-card__title">{project.title}</h2>

                        <p className="project-gallery-card__meta">
                          {[project.location, project.type].filter(Boolean).join(" • ")}
                        </p>

                        <p className="project-gallery-card__copy">{project.description}</p>
                      </div>

                      {project.images.length > 0 && (
                        <div className="project-gallery-card__images">
                          {project.images.map((image) => (
                            <figure key={image.alt} className="project-gallery-card__image-wrap">
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="project-gallery-card__image"
                                loading="lazy"
                                decoding="async"
                              />
                            </figure>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="project-gallery-empty">
                <h2>No projects added yet.</h2>
                <p>Add projects to this gallery from the main projects data file.</p>
              </div>
            )}
          </div>
        </section>

        <HomeCta />
      </main>

      <SiteFooter />
    </>
  );
}
