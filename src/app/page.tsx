import ContactSection from "@/components/home/ContactSection";
import Hero from "@/components/home/Hero";
import Packages from "@/components/home/Packages";
import Process from "@/components/home/Process";
import Proof from "@/components/home/Proof";
import ServiceScroller from "@/components/home/ServiceScroller";
import StickyCTA from "@/components/ui/StickyCTA";

export default function Page() {
  return (
    <>
      <StickyCTA />
      <Hero />
      <ServiceScroller />
      <Process />
      <Proof />
      <Packages />
      <ContactSection />
    </>
  );
}
