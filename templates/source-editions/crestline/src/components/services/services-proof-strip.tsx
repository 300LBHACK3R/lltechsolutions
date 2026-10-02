type ProofItem = {
  value: string;
  label: string;
  copy: string;
};

const proofItems: ProofItem[] = [
  {
    value: "Plan",
    label: "Project Preparation",
    copy: "Describe how your team reviews surfaces, scope, scheduling, and access before work begins.",
  },
  {
    value: "Care",
    label: "Site Coordination",
    copy: "Explain your approach to protecting surrounding areas and communicating with project teams.",
  },
  {
    value: "Finish",
    label: "Final Details",
    copy: "Add your approved finish standards and walkthrough process here.",
  },
];

export default function ServicesProofStrip() {
  return (
    <section
      className="section services-proof-strip section--services-proof"
      aria-labelledby="services-proof-heading"
    >
      <div className="container">
        <h2 id="services-proof-heading" className="sr-only">
          Sample project approach
        </h2>

        <div className="services-proof-strip__grid">
          {proofItems.map((item) => (
            <article key={item.label} className="services-proof-strip__card">
              <div className="services-proof-strip__topline" aria-hidden="true" />

              <strong className="services-proof-strip__value">{item.value}</strong>

              <h3 className="services-proof-strip__label">{item.label}</h3>

              <p className="services-proof-strip__copy">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
