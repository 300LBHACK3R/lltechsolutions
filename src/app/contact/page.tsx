import ContactForm from "@/components/contact/ContactForm";
import PageIntro from "@/components/ui/PageIntro";
import { siteConfig } from "@/config/site";
import { serviceOptions } from "@/lib/contact-validation";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Start A Project",
  "Talk with L&L Tech Solutions about a custom website, software application, content production or ongoing social media partnership.",
  "/contact",
);
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const selected = serviceOptions.find((option) => option === service) ?? "";
  return (
    <>
      <PageIntro
        eyebrow="Start a conversation"
        title="What’s next for your business?"
        description="A new website, a better system, or a more consistent presence. Tell us what you have in mind, and we’ll help define the right next step."
      />
      <div className="container contact-layout">
        <ContactForm initialService={selected} />
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
