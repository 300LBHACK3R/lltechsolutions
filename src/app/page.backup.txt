import ContactSection from "@/components/home/ContactSection";
import Hero from "@/components/home/Hero";
import Packages from "@/components/home/Packages";
import Process from "@/components/home/Process";
import Projects from "@/components/home/Projects";
import Proof from "@/components/home/Proof";
import StickyCTA from "@/components/ui/StickyCTA";

export default function Page() {
  return (
    <>
      <StickyCTA />
      <Hero />
      <Process />
      <Projects />
      <Proof />
      <Packages />
      <ContactSection />
    </>
  );
}
