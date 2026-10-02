import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import HomeHero from "@/components/home/home-hero";
import HomeAboutPreview from "@/components/home/home-about-preview";
import HomeProjectsPreview from "@/components/home/home-projects-preview";
import HomeCta from "@/components/home/home-cta";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main className="page-main">
        <HomeHero />
        <HomeAboutPreview />
        <HomeProjectsPreview />
        <HomeCta />
      </main>

      <SiteFooter />
    </>
  );
}
