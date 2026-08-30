import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Software Design & Development Case Studies",
  description:
    "Explore custom web applications, digital products, portals, workflows, media platforms, integrations, and ongoing software development by L&L Tech Solutions.",
  path: "/projects/software-development",
  keywords: [
    "custom software case studies Canada",
    "web application development portfolio",
    "Next.js software development",
  ],
});

export default function SoftwareDevelopmentProjectsPage() {
  return <ProjectCategoryPage category="Software Development" />;
}
