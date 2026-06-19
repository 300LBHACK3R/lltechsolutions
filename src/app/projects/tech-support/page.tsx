import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Support Projects",
  description:
    "Business tech support, system cleanup, troubleshooting, optimization, and support work by L&L Tech Solutions.",
};

export default function TechSupportProjectsPage() {
  return <ProjectCategoryPage category="Tech Support" />;
}
