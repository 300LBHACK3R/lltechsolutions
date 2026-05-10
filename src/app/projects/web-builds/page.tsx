import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Web Builds | L&L Tech Solutions",
  description:
    "View custom website and digital growth projects by L&L Tech Solutions.",
};

export default function WebBuildsPage() {
  return (
    <ProjectCategoryPage
      category="Web Build"
      eyebrow="Websites & Digital Growth"
      title="Custom Web Builds"
      description="Custom-coded websites, SEO structure, Google/Facebook setup, digital presence, ads, and lead-focused web systems."
    />
  );
}
