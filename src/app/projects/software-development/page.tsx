import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Software Development Projects",
  "Explore Tate’s TV, a custom media application demonstrating interface design, scheduling workflows and ongoing software development.",
  "/projects/software-development",
);
export default function Page() {
  return <ProjectCategoryPage category="software-development" />;
}
