import PageIntro from "@/components/ui/PageIntro";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Privacy",
  "How we handle your inquiry. Information from L&L Tech Solutions.",
  "/privacy",
);
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Privacy"
        title="How we handle your inquiry."
        description="L&L Tech Solutions · Calgary, Alberta, Canada"
      />
      <div className="container prose">
        <section>
          <h2>Information you provide</h2>
          <p>
            The inquiry form asks for your name, email address, business details, optional phone and
            website, service interests, timeline and project description. We use this information to
            respond, discuss the requested work and manage the resulting business relationship.
            Please do not include passwords, payment-card details or sensitive client records.
          </p>
        </section>
        <section>
          <h2>Website and email providers</h2>
          <p>
            This website is hosted on Vercel. Contact-form messages are delivered using Resend and
            received in our business email account. These providers process the information needed
            to operate their services and may process data outside Canada. Hosting services may
            record technical request information for operation and security.
          </p>
        </section>
        <section>
          <h2>Storage and choices</h2>
          <p>
            We keep inquiry correspondence as needed for follow-up, project administration and
            applicable recordkeeping obligations. Contact us to ask about information you have
            provided or request correction or deletion. Some business records may need to be
            retained.
          </p>
        </section>
        <section>
          <h2>Cookies and external links</h2>
          <p>
            This release does not add advertising pixels or optional analytics scripts. Hosting and
            security services may process essential technical information. Client projects, social
            profiles and booking platforms linked from this site have their own privacy practices.
          </p>
        </section>
        <p>
          Questions? <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
      </div>
    </>
  );
}
