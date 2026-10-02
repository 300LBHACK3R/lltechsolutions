"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { services } from "@/data/services";

type HomeServiceItem = {
  slug: string;
  title: string;
  short: string;
  image?: string;
  homeHeroImage?: string;
  detailImage?: string;
};

const HOME_SERVICE_ORDER = ["multi-family", "custom-homes", "strata", "commercial"] as const;

function getServiceImage(service: HomeServiceItem) {
  return (
    service.homeHeroImage ??
    service.image ??
    service.detailImage ??
    "/images/construction-home.webp"
  );
}

export default function HomeHero() {
  const orderedServices = useMemo<HomeServiceItem[]>(() => {
    return HOME_SERVICE_ORDER.map((slug) =>
      services.find((service) => service.slug === slug),
    ).filter(Boolean) as HomeServiceItem[];
  }, []);

  const [activeSlug, setActiveSlug] = useState<string>(orderedServices[0]?.slug ?? "multi-family");

  const activeService =
    orderedServices.find((service) => service.slug === activeSlug) ?? orderedServices[0];

  if (!activeService) return null;

  const backgroundImage = getServiceImage(activeService);

  return (
    <section className="home-services-hero" aria-label="Featured services">
      <h1 className="sr-only">Summit Painting Studio — Sample Painting Website</h1>
      <div
        key={activeService.slug}
        className="home-services-hero__bg"
        aria-hidden="true"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
      />

      <div className="home-services-hero__overlay" />

      <div className="home-services-hero__inner">
        <div className="container">
          <div className="home-services-hero__grid">
            {orderedServices.map((service) => {
              const isActive = service.slug === activeSlug;

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`home-service-column${isActive ? " home-service-column--active" : ""}`}
                  onMouseEnter={() => setActiveSlug(service.slug)}
                  onFocus={() => setActiveSlug(service.slug)}
                  aria-label={`View ${service.title} service details`}
                >
                  <div className="home-service-column__content">
                    <h2 className="home-service-column__title">{service.title}</h2>

                    <p className="home-service-column__copy">{service.short}</p>

                    <span className="home-service-column__button">Learn More →</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="home-services-hero__mobile-actions">
            <Link
              href="/services"
              className="site-header__cta"
              aria-label="View all Summit Painting Studio services"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
