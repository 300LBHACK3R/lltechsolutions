import ProjectInquiryForm from "@/components/contact/ProjectInquiryForm";
import PageHero from "@/components/ui/PageHero";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Start a Website, Software, or Social Media Project",
  description:
    "Tell L&L Tech Solutions what your business needs to design, develop, launch, or manage. Request a clear project review and recommended next step.",
  path: "/contact",
  keywords: [
    "website project inquiry Calgary",
    "software development consultation Canada",
    "social media management consultation Calgary",
  ],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Project Inquiry"
        title={
          <>
            Tell us what the business needs
            <span className="page-title-accent"> to build or grow.</span>
          </>
        }
        description="Share the objective, current situation, required functionality, content needs, and timeline. We will review the opportunity and reply with a clear recommendation."
        secondary={{ label: "View Selected Work", href: "/projects" }}
        meta={[
          "Website projects",
          "Custom software",
          "Social management",
          "Ongoing partnerships",
        ]}
      />

      <ProjectInquiryForm />
    </>
  );
}
