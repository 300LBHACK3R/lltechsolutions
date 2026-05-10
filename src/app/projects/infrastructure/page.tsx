import ProjectCategoryPage from "@/components/projects/ProjectCategoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infrastructure Projects | L&L Tech Solutions",
  description:
    "View network, CCTV, rack cleanup, cabling, and on-site infrastructure projects by L&L Tech Solutions.",
};

export default function InfrastructurePage() {
  return (
    <ProjectCategoryPage
      category="Infrastructure"
      eyebrow="On-Site Technical Systems"
      title="Infrastructure & Field Work"
      description="Network racks, cabling, CCTV, switches, patch panels, RJ45 work, clean installs, and on-site technical systems."
    />
  );
}
