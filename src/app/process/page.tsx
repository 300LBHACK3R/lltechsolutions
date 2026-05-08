import ProcessSection from "@/components/home/ProcessSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process | L&L Tech Solutions",
  description:
    "Learn how L&L Tech Solutions approaches projects, support, websites, infrastructure, and technical systems.",
};

export default function ProcessPage() {
  return <ProcessSection />;
}
