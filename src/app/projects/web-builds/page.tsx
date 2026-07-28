import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web, Software & Digital Growth Projects",
  description:
    "Explore custom websites, web applications, SEO foundations, booking and inquiry systems, Google Business management, social media, content, and ongoing digital partnerships by L&L Tech Solutions.",
};

export default function WebBuildProjectsPage() {
  return <ProjectCategoryPage category="Web Build" />;
}
