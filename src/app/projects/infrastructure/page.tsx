import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infrastructure Projects",
  description:
    "Network cleanup, rack organization, CCTV setup, cabling, and infrastructure work by L&L Tech Solutions.",
};

export default function InfrastructureProjectsPage() {
  return <ProjectCategoryPage category="Infrastructure" />;
}
