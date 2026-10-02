import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import PageHero from "@/components/shared/page-hero";
import HomeCta from "@/components/home/home-cta";
import { getProjectCategoryPath, projectCategories, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Explore Summit Painting Studio project galleries, including custom homes, multi-family, strata, and commercial painting projects across your service area.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader light />

      <main className="projects-page">
        <PageHero
          eyebrow="Project Gallery"
          title="A portfolio built across custom homes, multi-family, strata, and commercial projects."
          copy="Explore fictional project studies organized by type. All photographs are generated placeholders, not completed client projects."
          backgroundImage="/images/painting-interior.webp"
          backgroundPosition="center center"
          darkOverlay
        />

        <section className="section projects-gallery-section">
          <div className="container">
            <div className="section-intro projects-gallery-section__intro">
              <span className="section-intro__eyebrow">Portfolio</span>

              <h1 className="section-intro__title">Choose a project gallery.</h1>

              <p className="section-intro__copy">
                Browse fictional project studies by category. Each gallery includes organized
                project examples, locations, descriptions, and supporting images.
              </p>
            </div>

            <div className="project-category-grid">
              {projectCategories.map((category) => {
                const projectCount = projects.filter(
                  (project) => project.category === category.slug,
                ).length;

                return (
                  <Link
                    key={category.slug}
                    href={getProjectCategoryPath(category.slug)}
                    className="project-category-card"
                    aria-label={`View ${category.title} project gallery`}
                  >
                    <div className="project-category-card__media">
                      <img
                        src={category.image}
                        alt={`${category.title} project gallery`}
                        className="project-category-card__image"
                        loading="lazy"
                        decoding="async"
                      />

                      <div className="project-category-card__overlay" />
                    </div>

                    <div className="project-category-card__body">
                      <span className="card__eyebrow">Gallery</span>

                      <h2 className="project-category-card__title">{category.title}</h2>

                      <p className="project-category-card__copy">{category.short}</p>

                      <div className="project-category-card__meta">
                        {projectCount} {projectCount === 1 ? "project" : "projects"}
                      </div>

                      <span className="project-category-card__link">View Gallery →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <HomeCta />
      </main>

      <SiteFooter />
    </>
  );
}
