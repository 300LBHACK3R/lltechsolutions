import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Website Design & Development Case Studies",
  description:
    "Explore custom business websites, responsive interfaces, booking and inquiry systems, technical SEO, and ongoing website partnerships by L&L Tech Solutions.",
  path: "/projects/web-builds",
  keywords: [
    "Calgary website case studies",
    "custom website design portfolio Canada",
    "Next.js website portfolio",
  ],
});

export default function WebsiteProjectsPage() {
  return <ProjectCategoryPage category="Website Design" />;
}
