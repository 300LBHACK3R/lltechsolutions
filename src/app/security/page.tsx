import LegalDocument from "@/components/legal/LegalDocument";
import PageHero from "@/components/ui/PageHero";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Website Security & Responsible Disclosure",
  description:
    "Review the security practices used on lltechsolutions.ca and the responsible process for reporting a suspected vulnerability.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title={
          <>
            Practical safeguards.
            <span className="page-title-accent"> Responsible disclosure.</span>
          </>
        }
        description="The website uses layered security controls, limited data collection, server-side validation, and a responsible process for reporting suspected vulnerabilities."
        secondary={{ label: "Contact Us", href: "/contact" }}
      />

      <LegalDocument
        updated="August 29, 2026"
        sections={[
          {
            title: "Security approach",
            content: (
              <p>
                The production site uses HTTPS, restrictive browser-security
                headers, controlled framing and resource policies, server-side
                form validation, origin checks, request-size limits, abuse
                controls, dependency checks, and automated build validation.
              </p>
            ),
          },
          {
            title: "Responsible disclosure",
            content: (
              <>
                <p>
                  Do not publish a suspected vulnerability or include sensitive
                  personal data in a report. Send the affected page or endpoint,
                  clear reproduction steps, observed impact, and supporting
                  request details to {siteConfig.email}.
                </p>
                <p>
                  Please allow reasonable time to investigate and correct a
                  credible issue before sharing details publicly.
                </p>
              </>
            ),
          },
          {
            title: "Good-faith testing boundaries",
            content: (
              <p>
                Avoid denial-of-service testing, spam, destructive activity,
                social engineering, credential attacks, privacy invasion,
                persistence, or access to data beyond what is necessary to
                demonstrate the issue. Stop testing if sensitive information is
                encountered.
              </p>
            ),
          },
          {
            title: "No guarantee",
            content: (
              <p>
                Security is an ongoing process. These measures reduce risk but
                cannot guarantee that every vulnerability, service-provider
                incident, or malicious action will be prevented.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
