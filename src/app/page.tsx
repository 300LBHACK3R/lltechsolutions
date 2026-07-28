import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import Projects from "@/components/home/Projects";
import Proof from "@/components/home/Proof";
import Packages from "@/components/home/Packages";
import ContactSection from "@/components/home/ContactSection";
import BusinessJsonLd from "@/components/seo/BusinessJsonLd";
import TrustBar from "@/components/ui/TrustBar";
import StickyCTA from "@/components/ui/StickyCTA";

export default function Page() {
  return (
    <>
      <BusinessJsonLd />
      <StickyCTA />
      <Hero />
      <TrustBar cta />
      <Proof />
      <Projects />
      <Process />
      <Packages />
      <TrustBar />
      <ContactSection />
    </>
  );
}
