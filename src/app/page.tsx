import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import HomeProjectsPreview from "@/components/home/HomeProjectsPreview";
import HomeProjectCTA from "@/components/home/HomeProjectCTA";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
export const metadata = pageMetadata(
  "Calgary Web Design, Software & Social Media",
  siteConfig.description,
  "/",
);
export default function HomePage() {
  return (
    <div className="home-premium">
      <Hero />
      <TrustBar />
      <HomeProjectsPreview />
      <HomeProjectCTA />
    </div>
  );
}
