import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Custom Website Projects",
  "Explore custom business websites for Tow-N-Go Trailers, Crestline Painting, McKenzie House Massage and Tate Byers.",
  "/projects/web-builds",
);
export default function Page() {
  return <ProjectCategoryPage category="web-builds" />;
}
