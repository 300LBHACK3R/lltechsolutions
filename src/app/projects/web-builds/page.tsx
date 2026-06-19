import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Build Projects",
  description:
    "Custom website builds, SEO cleanup, mobile-first layouts, and conversion-focused web projects by L&L Tech Solutions.",
};

export default function WebBuildProjectsPage() {
  return <ProjectCategoryPage category="Web Build" />;
}
