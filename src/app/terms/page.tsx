import PageIntro from "@/components/ui/PageIntro";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
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
