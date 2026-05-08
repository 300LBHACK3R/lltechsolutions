import ProjectsSection from "@/components/home/ProjectsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | L&L Tech Solutions",
  description:
    "View real projects completed by L&L Tech Solutions including websites, infrastructure, networking, and technical systems.",
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}
