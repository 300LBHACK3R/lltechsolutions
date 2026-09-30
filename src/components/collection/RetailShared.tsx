import Link from "next/link";
import { retailPagePath, type RetailTemplate } from "@/data/website-collection";
import { RetailNavigation } from "@/components/collection/RetailInteractions";
import DemoEnquiryForm from "@/components/collection/DemoEnquiryForm";

export function RetailHeader({ template, page }: { template: RetailTemplate; page: string }) {
  return (
    <RetailNavigation
      id={template.id}
      brand={template.brand}
      subbrand={template.subbrand}
      pages={template.pages}
      activePage={page}
    />
  );
}

export function RetailPageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="retail-page-intro retail-wrap">
      <p className="retail-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function RetailContact({
  template,
  enquiryHref,
}: {
  template: RetailTemplate;
  enquiryHref: string;
}) {
  return (
    <section
      className="retail-contact retail-wrap retail-section"
      id="contact"
      aria-label="Contact information"
    >
      <div className="retail-contact-details">
        <p className="retail-kicker">Find your next favourite</p>
        <h2>
          We’d love
          <br />
          to hear from you.
        </h2>
        <p>
          {template.form
            ? "Explore the enquiry layout with sample details. This preview sends no message, takes no payment and creates no order or appointment."
            : "A simple way for customers to get in touch. Your own phone, email and location are connected when your website launches."}
        </p>
        <dl>
          <div>
            <dt>Telephone</dt>
            <dd>
              (403) 555-0142<small>Illustrative number · inactive in this demo</small>
            </dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              hello@example.com<small>Sample address · not monitored</small>
            </dd>
          </div>
          <div>
            <dt>Find us</dt>
            <dd>
              Your neighbourhood, Calgary
              <small>Example location · your address replaces this</small>
            </dd>
          </div>
          <div>
            <dt>Good to know</dt>
            <dd>
              Opening hours, accessibility and service enquiries
              <small>Your business supplies and approves these details</small>
            </dd>
          </div>
        </dl>
      </div>
      <div className="retail-contact-panel">
        {template.form ? (
          <>
            <h2>Enquiry preview</h2>
            <DemoEnquiryForm
              idPrefix={`retail-${template.id}`}
              services={template.services.map((service) => service.name)}
              notice="Demonstration form. Nothing is sent or saved. Use sample details only; do not enter personal, payment or health information. This does not confirm an order, quote or appointment."
            />
          </>
        ) : (
          <>
            <span className="retail-contact-arrow" aria-hidden="true">
              ↗
            </span>
            <h2>
              Your place.
              <br />
              Their next favourite.
            </h2>
            <p>
              Direct contact is included. An existing shop or scheduling link can be added;
              checkout, inventory, payments and booking systems are separately scoped.
            </p>
          </>
        )}
        <div className="retail-real-enquiry">
          <p>Picture your own business here?</p>
          <a className="retail-button" href={enquiryHref}>
            Make this my website <span aria-hidden="true">↗</span>
          </a>
          <small>This opens a real enquiry with L&L Tech Solutions.</small>
        </div>
      </div>
    </section>
  );
}

export function RetailFooter({
  template,
  enquiryHref,
}: {
  template: RetailTemplate;
  enquiryHref: string;
}) {
  const contact = template.pages.find((page) => page === "Contact" || page === "Visit");
  return (
    <footer className="retail-footer retail-wrap">
      <div>
        <Link className="retail-footer-brand" href="/">
          {template.brand}
        </Link>
        <p>{template.subbrand}</p>
      </div>
      <nav aria-label="Footer">
        <Link href={contact ? retailPagePath(contact) : "#contact"}>{contact ?? "Contact"}</Link>
        <a href={enquiryHref}>Make this my website ↗</a>
      </nav>
      <p className="retail-footer-note">
        Fictional business and illustrative imagery. Products, services, prices and opening
        information illustrate the design; no purchase or booking is available here.
      </p>
    </footer>
  );
}
