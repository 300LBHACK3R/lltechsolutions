import LegalDocument from "@/components/legal/LegalDocument";
import PageHero from "@/components/ui/PageHero";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Website Terms of Use",
  description:
    "Review the terms that apply when using lltechsolutions.ca, its project information, external links, and inquiry tools.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Website Terms"
        title={
          <>
            Straightforward terms for
            <span className="page-title-accent"> using this website.</span>
          </>
        }
        description="These terms apply to lltechsolutions.ca. Individual client projects, services, pricing, ownership, support, and delivery obligations are governed by a separate written agreement."
        secondary={{ label: "Contact Us", href: "/contact" }}
      />

      <LegalDocument
        updated="August 29, 2026"
        sections={[
          {
            title: "Website purpose",
            content: (
              <p>
                This website provides general information about L&amp;L Tech
                Solutions, its services, selected work, process, and starting
                investment ranges. Website content is not a binding project
                proposal, guarantee, professional legal advice, or substitute
                for a signed service agreement.
              </p>
            ),
          },
          {
            title: "Project inquiries and pricing",
            content: (
              <>
                <p>
                  Sending an inquiry does not create a client relationship or
                  obligate either party to proceed. Availability, scope,
                  schedule, deliverables, responsibilities, revisions, payment,
                  intellectual property, and support are confirmed in writing
                  before project work begins.
                </p>
                <p>
                  Published prices are starting points unless expressly stated
                  otherwise. A final quote depends on the actual scope.
                </p>
              </>
            ),
          },
          {
            title: "Intellectual property",
            content: (
              <p>
                The L&amp;L name, branding, website design, original copy, code,
                graphics, and other site materials are protected by applicable
                intellectual-property rights. Client names, logos, screenshots,
                and linked services remain the property of their respective
                owners and are shown as portfolio examples where authorized.
              </p>
            ),
          },
          {
            title: "Acceptable use",
            content: (
              <p>
                You may not misuse the website, attempt unauthorized access,
                interfere with its operation, submit malicious content, scrape
                it in a way that creates unreasonable load, impersonate another
                person, or use the inquiry form for spam or unlawful activity.
              </p>
            ),
          },
          {
            title: "External links and availability",
            content: (
              <>
                <p>
                  The site links to live client projects, booking services, and
                  social platforms that L&amp;L does not control. Those services
                  may change, become unavailable, or apply their own terms.
                </p>
                <p>
                  Reasonable care is taken to maintain this website, but
                  uninterrupted access, error-free operation, or the continued
                  availability of every external link is not guaranteed.
                </p>
              </>
            ),
          },
          {
            title: "Contact",
            content: (
              <p>
                Questions about these terms can be sent to {siteConfig.email}.
                Project-specific questions should reference the applicable
                proposal or signed agreement.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
