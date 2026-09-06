import PageIntro from "@/components/ui/PageIntro";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Security",
  "Careful handling, clear reporting. Information from L&L Tech Solutions.",
  "/security",
);
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Security"
        title="Careful handling, clear reporting."
        description="L&L Tech Solutions · Calgary, Alberta, Canada"
      />
      <div className="container prose">
        <section>
          <h2>Website controls</h2>
          <p>
            This website uses HTTPS in its production hosting, browser security headers and
            server-side inquiry validation. The inquiry endpoint checks request origin, limits
            request size and field lengths, filters a hidden spam field and applies best-effort
            request throttling.
          </p>
        </section>
        <section>
          <h2>Contact form</h2>
          <p>
            Send only the information needed to discuss your project. Do not include credentials,
            payment details or private client records. If sensitive information is required later,
            we will agree on an appropriate transfer method.
          </p>
        </section>
        <section>
          <h2>Report a concern</h2>
          <p>
            If you notice a security issue, contact our business email with the affected URL, a
            concise description and non-sensitive reproduction details. Please avoid accessing other
            people’s information or disrupting the service.
          </p>
        </section>
        <p>
          Questions? <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
      </div>
    </>
  );
}
