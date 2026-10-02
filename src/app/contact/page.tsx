import ContactForm from "@/components/contact/ContactForm";
import PageIntro from "@/components/ui/PageIntro";
import { siteConfig } from "@/config/site";
import { serviceOptions } from "@/lib/contact-validation";
import { pageMetadata } from "@/lib/metadata";
import { collectionInquiry, type CollectionQuery } from "@/data/website-collection";
import { sourceProduct, sourceVersionRequest } from "@/data/source-products";
import { formatPriceCad } from "@/data/template-promotion";
export const metadata = pageMetadata(
  "Start A Project",
  "Talk with L&L Tech Solutions about a custom website, software application, content production or ongoing social media partnership.",
  "/contact",
);
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<CollectionQuery>;
}) {
  const query = await searchParams;
  const source = typeof query.source === "string" ? sourceProduct(query.source) : null;
  const codeRequest =
    typeof query["source-version"] === "string"
      ? sourceVersionRequest(query["source-version"])
      : null;
  const collection = source
    ? {
        service: serviceOptions[0],
        summary: `${source.name} — source-code download, ${formatPriceCad(source.priceCad)} before applicable taxes.`,
        message: `I’m interested in the ${source.name} source-code download at ${formatPriceCad(source.priceCad)} before applicable taxes. I understand this is the template source and setup guide for one business website. Personalization, hosting, launch and ongoing care are separate. Please let me know how to arrange the purchase.`,
      }
    : (codeRequest ?? collectionInquiry(query));
  const selected =
    collection?.service ?? serviceOptions.find((option) => option === query.service) ?? "";
  return (
    <>
      <PageIntro
        eyebrow="Start a conversation"
        title="What’s next for your business?"
        description="A new website, a better system, or a more consistent presence. Tell us what you have in mind, and we’ll help define the right next step."
      />
      <div className="container contact-layout">
        <ContactForm
          key={`${selected}:${collection?.summary ?? ""}`}
          initialService={selected}
          initialMessage={collection?.message}
          collectionSummary={collection?.summary}
        />
        <aside className="contact-aside">
          <p className="eyebrow">Direct access</p>
          <h2>Let’s talk it through.</h2>
          <p>
            You’ll work directly with Tate at L&L Tech Solutions, from the first conversation
            through the project.
          </p>
          <div className="contact-methods">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={siteConfig.telephone}>{siteConfig.phone}</a>
          </div>
          <p>Calgary, Alberta · Digital services across Canada</p>
          <ul>
            <li>Share the business goal and current website.</li>
            <li>Include your timeline and any essential features.</li>
            <li>We’ll review the details and discuss scope and pricing.</li>
          </ul>
        </aside>
      </div>
    </>
  );
}
