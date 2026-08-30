import LegalDocument from "@/components/legal/LegalDocument";
import PageHero from "@/components/ui/PageHero";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Notice",
  description:
    "Learn what information L&L Tech Solutions receives through this website, why it is used, and how to contact the studio about privacy questions.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Notice"
        title={
          <>
            Clear information about
            <span className="page-title-accent"> how this website uses data.</span>
          </>
        }
        description="This notice explains the information submitted through lltechsolutions.ca, the limited technical data processed to operate the website, and the choices available to visitors."
        secondary={{ label: "Contact Us", href: "/contact" }}
      />

      <LegalDocument
        updated="August 29, 2026"
        sections={[
          {
            title: "Information you choose to provide",
            content: (
              <>
                <p>
                  The project-inquiry form may collect your name, business name,
                  email address, phone number, website or social profile,
                  selected service, preferred timeline, and the project details
                  you enter.
                </p>
                <p>
                  Please do not submit passwords, payment-card details, private
                  access credentials, government identifiers, medical records,
                  or other information that is not necessary to review a digital
                  project.
                </p>
              </>
            ),
          },
          {
            title: "How the information is used",
            content: (
              <>
                <p>
                  Information submitted through the site is used to review the
                  inquiry, communicate with you, prepare a recommendation or
                  quote, prevent abuse, and maintain the security and reliability
                  of the website.
                </p>
                <p>
                  The site does not sell project-inquiry information or use it
                  to build third-party advertising profiles.
                </p>
              </>
            ),
          },
          {
            title: "Service providers and technical records",
            content: (
              <>
                <p>
                  Hosting, security, and email-delivery providers may process
                  limited technical records required to serve the website,
                  protect it from abuse, and deliver your inquiry. Those records
                  may include an IP address, browser information, request time,
                  referring page, and delivery status.
                </p>
                <p>
                  External project links, booking platforms, Google, Facebook,
                  TikTok, and other third-party services operate under their own
                  privacy terms.
                </p>
              </>
            ),
          },
          {
            title: "Retention and protection",
            content: (
              <>
                <p>
                  Inquiry information is kept only as long as reasonably needed
                  to respond, manage a potential or active business relationship,
                  maintain records, resolve disputes, and meet legitimate legal
                  or security requirements.
                </p>
                <p>
                  Reasonable administrative and technical safeguards are used,
                  but no internet transmission or storage system can be
                  guaranteed completely secure.
                </p>
              </>
            ),
          },
          {
            title: "Access, correction, or deletion requests",
            content: (
              <p>
                To ask about personal information submitted through the website,
                request a correction, or request deletion where appropriate,
                email {siteConfig.email}. L&amp;L may need to verify the request
                before acting on it.
              </p>
            ),
          },
          {
            title: "Changes to this notice",
            content: (
              <p>
                This notice may be updated when the website, service providers,
                or business practices change. The updated date at the top of the
                page identifies the current version.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
