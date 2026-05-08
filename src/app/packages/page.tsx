import PackagesSection from "@/components/home/PackagesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages | L&L Tech Solutions",
  description:
    "Explore website, support, infrastructure, and ongoing business technology packages from L&L Tech Solutions.",
};

export default function PackagesPage() {
  return <PackagesSection />;
}
