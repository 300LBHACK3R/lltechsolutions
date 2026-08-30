import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Social Media Management & Content Case Studies",
  description:
    "Explore social media strategy, Google Business support, photography, video, publishing, campaigns, and ongoing brand-management partnerships by L&L Tech Solutions.",
  path: "/projects/social-media-management",
  keywords: [
    "social media management case studies Calgary",
    "TikTok management portfolio Canada",
    "digital content management projects",
  ],
});

export default function SocialMediaManagementProjectsPage() {
  return <ProjectCategoryPage category="Social Media Management" />;
}
