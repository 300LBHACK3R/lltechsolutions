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
        <section id="managed-template-purchases">
          <h2>Personalized template purchases</h2>
          <p>
            Managed checkout purchases the selected template’s listed pages and contact setup,
            personalized with your supplied business information, branding and content. The review
            page shows the included scope, CAD price and any active template promotion; applicable
            taxes are shown in Stripe before payment. Page-speed optimization, technical SEO and
            metadata setup, responsive and security checks, and launch are included within this
            scope. No specific score or search ranking is guaranteed.
          </p>
          <p>
            Extra pages, custom features, original photography or videography, new content creation,
            domains, hosting, provider charges and ongoing care are separate. Indicating interest in
            an extra does not purchase it. Request a tailored quote before paying if the listed
            scope does not meet your needs. A client website is a design reference; its original
            branding, media and private files are not transferred to you.
          </p>
          <p>
            After verified payment, your order and business brief are recorded and confirmations are
            sent to you and L&amp;L. Tate will contact you to arrange content handover and timing;
            payment does not promise an immediate or automatic website launch. We agree on any
            additional work and cost before proceeding. If you need to cancel, change the scope or
            resolve an issue, contact L&amp;L with your order reference so we can review work
            already performed and arrange an appropriate resolution. Applicable consumer rights
            remain. Purchase terms version: 2026-10-02.
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
