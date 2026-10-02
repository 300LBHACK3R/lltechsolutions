import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import PageHero from "@/components/shared/page-hero";
import ServiceCardGrid from "@/components/shared/service-card-grid";
import HomeCta from "@/components/home/home-cta";
import ServicesProofStrip from "@/components/services/services-proof-strip";

export default function ServicesPage() {
  return (
    <>
      <SiteHeader light />

      <main className="services-page">
        <PageHero
          eyebrow="Services"
          title="Professional painting services built for real project environments."
          copy="From large-scale multi-family and commercial work to strata maintenance, custom homes, and interior painting, Summit Painting Studio delivers organized execution and consistent finish quality across every job."
          backgroundImage="/images/construction-home.webp"
          backgroundPosition="center center"
          darkOverlay
        />

        <ServicesProofStrip />

        <section className="section section--services-main">
          <div className="container">
            <ServiceCardGrid />
          </div>
        </section>

        <HomeCta />
      </main>

      <SiteFooter />
    </>
  );
}
