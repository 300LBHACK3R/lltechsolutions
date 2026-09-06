import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Social Media & Content Projects",
  "See Tow-N-Go digital management and the McKenzie House Massage launch, with original content, connected channels and ongoing support.",
  "/projects/social-media-management",
);
export default function Page() {
  return <ProjectCategoryPage category="social-media-management" />;
}
