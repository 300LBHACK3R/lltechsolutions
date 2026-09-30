import Link from "next/link";
import { transportPagePath, type TransportTemplate } from "@/data/website-collection";
import { TransportNavigation } from "@/components/collection/TransportInteractions";
import DemoEnquiryForm from "@/components/collection/DemoEnquiryForm";

export function TransportHeader({ template, page }: { template: TransportTemplate; page: string }) {
  return <TransportNavigation template={template} page={page} />;
}

export function TransportPageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="tl-page-intro tl-wrap">
      <p className="tl-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

export function TransportContact({
  template,
  enquiryHref,
}: {
  template: TransportTemplate;
  enquiryHref: string;
}) {
  return (
    <section
      className="tl-contact tl-wrap tl-section"
      id="contact"
      aria-label="Contact information"
    >
      <div className="tl-contact-details">
        <p className="tl-kicker">Let’s talk through the details</p>
        <h2>
          The next move
          <br />
          starts here.
        </h2>
        <p>
          {template.form
            ? "Explore the enquiry layout with sample details. Nothing is sent or saved in this demonstration."
            : "Your own phone, email and service area make the next step simple. Direct-contact links are connected when your website launches."}
        </p>
        <dl>
          <div>
            <dt>Telephone</dt>
            <dd>
              Your business number <small>Added at launch</small>
            </dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              hello@example.com <small>Sample, not monitored</small>
            </dd>
          </div>
          <div>
            <dt>Service area</dt>
            <dd>Your approved locations and routes</dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>Your opening hours and enquiry availability</dd>
          </div>
        </dl>
      </div>
      <div className="tl-contact-panel">
        {template.form ? (
          <>
            <h2>Enquiry preview</h2>
            <DemoEnquiryForm
              idPrefix={`transport-${template.id}`}
              services={template.services.map((service) => service.name)}
              notice="Demonstration form. Nothing is sent or saved. Use sample details only; do not enter real shipment addresses, customer details, cargo values or confidential information."
            />
          </>
        ) : (
          <>
            <span className="tl-contact-arrow" aria-hidden="true">
              ↗
            </span>
            <h2>
              Make it
              <br />
              your next chapter.
            </h2>
            <p>
              This template includes your supplied contact information. An existing booking link can
              be added; enquiry forms and custom booking systems are quoted separately.
            </p>
          </>
        )}
        <div className="tl-real-enquiry">
          <p>Want this website for your business?</p>
          <a className="tl-button" href={enquiryHref}>
            Make this my website <span aria-hidden="true">↗</span>
          </a>
          <small>This opens a real enquiry with L&L Tech Solutions.</small>
        </div>
      </div>
    </section>
  );
}

export function TransportFooter({
  template,
  enquiryHref,
}: {
  template: TransportTemplate;
  enquiryHref: string;
}) {
  return (
    <footer className="tl-footer tl-wrap">
      <div>
        <Link className="tl-footer-brand" href="/">
          {template.brand}
        </Link>
        <p>{template.subbrand}</p>
      </div>
      <nav aria-label="Footer">
        <Link href={template.pages.length === 1 ? "#contact" : transportPagePath("Contact")}>
          Contact
        </Link>
        <a href={enquiryHref}>Make this my website ↗</a>
      </nav>
      <p className="tl-footer-note">
        Fictional business. Illustrative imagery and sample services demonstrate this design. No
        transport, rental, booking or tracking service is operated by this demo.
      </p>
    </footer>
  );
}
