import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import PageHero from "@/components/shared/page-hero";
import ContactDetails from "@/components/contact/contact-details";
import ContactFormSection from "@/components/contact/contact-form-section";

export default function ContactPage() {
  return (
    <>
      <SiteHeader light />

      <main className="contact-page">
        <PageHero
          eyebrow="Contact"
          title="Let’s talk about your next painting project."
          copy="Try the local-only sample enquiry for this fictional painting studio. Nothing is sent or stored, and no quote is requested."
          backgroundImage="/images/painting-interior.webp"
          backgroundPosition="center right"
          darkOverlay={false}
        />

        <ContactDetails />
        <ContactFormSection />
      </main>

      <SiteFooter />
    </>
  );
}
