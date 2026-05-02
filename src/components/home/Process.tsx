import Reveal from "@/components/ui/Reveal";

const steps = [
  [
    "01",
    "Audit",
    "We review your website, systems, support needs, and technical environment.",
  ],
  [
    "02",
    "Plan",
    "You get clear priorities, scope, pricing, and realistic next steps.",
  ],
  [
    "03",
    "Build / Fix",
    "We execute cleanly — websites, support, systems, or infrastructure.",
  ],
  [
    "04",
    "Maintain",
    "Ongoing support, updates, SEO, monitoring, and future improvements.",
  ],
];

export default function Process() {
  return (
    <section
      id="process"
      className="border-t border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="container-premium">
        <Reveal>
          <span className="section-eyebrow">Process</span>
          <h2 className="section-title mt-5">Clean Process. Clear Outcomes.</h2>
          <p className="section-subtitle mt-5">
            No confusion, no scattered vendors, no guessing. Just organized
            technical execution.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {steps.map(([num, title, desc], index) => (
            <Reveal key={title} delayMs={index * 90}>
              <div className="card-premium edge-gold h-full p-6 transition-transform duration-300 hover:scale-[1.01]">
                <span className="badge-gold">{num}</span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
