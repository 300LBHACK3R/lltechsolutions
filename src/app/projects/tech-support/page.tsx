import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Support Projects | L&L Tech Solutions",
  description:
    "View remote tech support, cleanup, account setup, and business technology support projects by L&L Tech Solutions.",
};

export default function TechSupportPage() {
  return (
    <ProjectCategoryPage
      category="Tech Support"
      eyebrow="Business Technology Support"
      title="Remote Tech Support"
      description="Remote troubleshooting, computer cleanup, account setup, system optimization, maintenance, and practical business support."
    />
  );
}
