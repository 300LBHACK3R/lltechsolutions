import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import HomeServicesPreview from "@/components/home/HomeServicesPreview";
import HomeProjectsPreview from "@/components/home/HomeProjectsPreview";
import ClientProof from "@/components/home/ClientProof";
import ProjectCTA from "@/components/ui/ProjectCTA";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
export const metadata = pageMetadata(
  "Calgary Web Design, Software & Social Media",
  siteConfig.description,
  "/",
);
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HomeServicesPreview />
      <HomeProjectsPreview />
      <ClientProof />
      <ProjectCTA />
    </>
  );
}
