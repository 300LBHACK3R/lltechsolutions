import Reveal from "@/components/ui/Reveal";

const plans = [
  {
    name: "Website Build",
    price: "$499+",
    description:
      "Custom business websites, landing pages, SEO setup, Google/Facebook setup, and professional online presence.",
    bullets: [
      "Custom React / Next.js builds",
      "SEO and metadata foundation",
      "Mobile-first responsive design",
    ],
  },
  {
    name: "Tech Support",
    price: "$50+",
    description:
      "Remote troubleshooting, cleanup, optimization, account setup, and business tech support.",
    bullets: [
      "Remote computer support",
      "System cleanup and optimization",
      "Accounts, email, and software setup",
    ],
  },
  {
    name: "Monthly Partner",
    price: "$199+/mo",
    description:
      "Ongoing website updates, SEO, support, management, improvements, and technical direction.",
    bullets: [
      "Website updates and maintenance",
      "SEO and Google-facing improvements",
      "Ongoing support and optimization",
    ],
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
            Start with a build, a fix, or an ongoing technology partner plan.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delayMs={index * 100}>
              <div className="card-premium edge-gold h-full p-6 transition-transform duration-300 hover:scale-[1.01]">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-5 text-4xl font-black tracking-tight text-[#f5d77a]">
                  {plan.price}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {plan.description}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-white/76">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="text-[#f5d77a]">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

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
