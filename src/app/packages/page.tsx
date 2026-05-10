import ContactSection from "@/components/home/ContactSection";
import Packages from "@/components/home/Packages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages | L&L Tech Solutions",
  description:
    "Explore L&L Tech Solutions starting points for website builds, tech support, and monthly technology partner plans.",
};

export default function PackagesPage() {
  return (
    <>
      <Packages />
      <ContactSection />
    </>
  );
}
