type ContactDetailItem = {
  number: string;
  label: string;
  value: string;
  href?: string;
  text: string;
};

const contactDetails: ContactDetailItem[] = [
  {
    number: "01",
    label: "Email",
    value: "Add your email",
    text: "Replace this placeholder with your business email before publishing.",
  },
  {
    number: "02",
    label: "Phone",
    value: "Add your phone",
    text: "Replace this placeholder with your business phone before publishing.",
  },
  {
    number: "03",
    label: "Service Area",
    value: "Add your region",
    text: "Describe the locations and communities your business serves.",
  },
  {
    number: "04",
    label: "Project Types",
    value: "Commercial to Custom Homes",
    text: "Illustrative service categories; adapt them to your own business.",
  },
];

export default function ContactDetails() {
  return (
    <section className="section contact-details" aria-labelledby="contact-details-heading">
      <div className="container">
        <div className="section-intro contact-details__intro">
          <span className="section-intro__eyebrow">Get in Touch</span>

          <h2 id="contact-details-heading" className="section-intro__title">
            Clear contact options for your next painting project.
          </h2>

          <p className="section-intro__copy">
            This sample has no active contact details. The form below demonstrates validation
            locally without sending or storing your information.
          </p>
        </div>

        <div className="card-grid contact-details__grid">
          {contactDetails.map((item) => (
            <article key={item.number} className="card contact-details__card">
              <span className="card__eyebrow">{item.number}</span>

              <div className="card__meta">{item.label}</div>

              {item.href ? (
                <a
                  href={item.href}
                  className="card__title contact-details__link"
                  aria-label={`${item.label}: ${item.value}`}
                >
                  {item.value}
                </a>
              ) : (
                <h3 className="card__title">{item.value}</h3>
              )}

              <p className="card__copy">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
