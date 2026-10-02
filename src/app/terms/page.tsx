import PageIntro from "@/components/ui/PageIntro";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { sourceLicense, sourceLicenseVersion } from "@/data/source-products";
export const metadata = pageMetadata(
  "Website Terms",
  "Using this website. Information from L&L Tech Solutions.",
  "/terms",
);
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Website Terms"
        title="Using this website."
        description="L&L Tech Solutions · Calgary, Alberta, Canada"
      />
      <div className="container prose">
        <section>
          <h2>Information and project scope</h2>
          <p>
            The website describes L&L Tech Solutions and examples of its work. Prices shown are
            starting points in Canadian dollars. A written project proposal or agreement defines
            deliverables, pricing, timing, responsibilities and ongoing support.
          </p>
        </section>
        <section>
          <h2>Work and client assets</h2>
          <p>
            Client names, logos and project imagery belong to their respective owners and are shown
            to identify the work. Ownership and permitted use of project deliverables are addressed
            in the applicable client agreement.
          </p>
        </section>
        <section>
          <h2>Results and external services</h2>
          <p>
            Search rankings, audience reach, leads and revenue depend on many factors and are not
            guaranteed. External websites and services operate under their own terms and may change
            independently.
          </p>
        </section>
        <section id="source-downloads">
          <h2>Source-code downloads</h2>
          <p>
            Code-only purchases are separate from personalized website projects. The selected
            download page and checkout show the product, CAD price and any applicable taxes before
            payment. The personalization and launch promotion does not apply to source-code
            downloads.
          </p>
          <h3>{sourceLicense.title}</h3>
          <ul>
            {sourceLicense.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p>
            Files are delivered through a download link after payment is verified. The link is also
            emailed to the checkout address and is valid for 30 days. Save your own backup. Contact
            L&L if access fails, files are missing or the supplied template does not work as
            described; include your order reference, but never your card details. We will review the
            issue and arrange an appropriate resolution. Nothing in these terms removes applicable
            consumer rights.
          </p>
          <p>
            Download support covers access and problems with the supplied files. New features,
            customization, deployment, integration work, future version upgrades and ongoing
            maintenance are separately scoped. Licence version: {sourceLicenseVersion}.
          </p>
        </section>
        <section>
          <h2>Questions</h2>
          <p>
            Contact L&L Tech Solutions if you need clarification about the website, a service or a
            proposed engagement.
          </p>
        </section>
        <p>
          Questions? <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
      </div>
    </>
  );
}
