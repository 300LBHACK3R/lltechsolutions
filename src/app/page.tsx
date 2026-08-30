import ClientProof from "@/components/home/ClientProof";
import Hero from "@/components/home/Hero";
import HomeFinalCTA from "@/components/home/HomeFinalCTA";
import HomeProjectsPreview from "@/components/home/HomeProjectsPreview";
import HomeServicesPreview from "@/components/home/HomeServicesPreview";
import TrustBar from "@/components/ui/TrustBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar cta />
      <HomeServicesPreview />
      <HomeProjectsPreview />
      <ClientProof />
      <HomeFinalCTA />
    </>
  );
}
