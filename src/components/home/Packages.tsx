import Reveal from "@/components/ui/Reveal";

const plans = [
  {
    name: "Website Build",
    price: "$499+",
    description:
      "Custom business websites, landing pages, SEO setup, and professional online presence.",
  },
  {
    name: "Tech Support",
    price: "$50+",
    description:
      "Remote troubleshooting, cleanup, optimization, and business tech support.",
  },
  {
    name: "Monthly Partner",
    price: "$199+/mo",
    description:
      "Ongoing website updates, SEO, support, management, and technical improvements.",
  },
];

export default function Packages() {
  return (
    <section
      id="packages"
      className="border-t border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="container-premium">
        <Reveal>
          <span className="section-eyebrow">Starting Points</span>
          <h2 className="section-title mt-5">Simple Ways To Start.</h2>
          <p className="section-subtitle mt-5">
            Start with a build, a fix, or an ongoing partner plan.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delayMs={index * 90}>
              <div className="card-premium edge-gold h-full p-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-5 text-4xl font-black tracking-tight text-[#f5d77a]">
                  {plan.price}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {plan.description}
                </p>
                <a href="#contact" className="btn-ghost-gold mt-6">
                  Ask About This
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
