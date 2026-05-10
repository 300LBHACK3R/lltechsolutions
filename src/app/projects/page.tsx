import Projects from "@/components/home/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | L&L Tech Solutions",
  description:
    "Explore L&L Tech Solutions project categories including custom web builds, remote tech support, and infrastructure work.",
};

export default function ProjectsPage() {
  return <Projects />;
}
