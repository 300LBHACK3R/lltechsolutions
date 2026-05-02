import Reveal from "@/components/ui/Reveal";

const proof = [
  {
    title: "Custom Web Builds",
    text: "Built from scratch with modern code, strong structure, responsive layouts, SEO foundations, and conversion-focused pages.",
  },
  {
    title: "Business Tech Support",
    text: "Remote support, cleanup, optimization, account setup, systems management, and practical ongoing technical help.",
  },
  {
    title: "Infrastructure Work",
    text: "Rack cleanup, structured cabling, switches, patch panels, CCTV, networks, and clean on-site technical systems.",
  },
];

export default function Proof() {
  return (
    <section
      id="results"
      className="border-t border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="container-premium">
        <Reveal>
          <span className="section-eyebrow">Why It Works</span>
          <h2 className="section-title mt-5">
            We Don’t Just “Do Tech.” We Build Systems That Make Businesses Look
            And Operate Better.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {proof.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 90}>
              <div className="card-premium edge-gold h-full p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
