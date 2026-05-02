import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/ui/Reveal";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="container-premium">
        <Reveal>
          <span className="section-eyebrow">Contact</span>
          <h2 className="section-title mt-5">
            Let’s Build Or Fix The Right Thing First.
          </h2>
          <p className="section-subtitle mt-5">
            Send what you need. We’ll reply with a clear next step, quote, or
            audit direction.
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <ContactForm />

            <div className="card-premium edge-gold p-6 transition-transform duration-300 hover:scale-[1.01]">
              <h3 className="text-xl font-semibold">Best info to include</h3>

              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li>• Business name and location</li>
                <li>• Website link, if you have one</li>
                <li>• What you want built, fixed, or improved</li>
                <li>• Timeline or urgency</li>
                <li>• Whether you need web, support, or on-site systems</li>
              </ul>

              <div className="mt-6 rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.05)] p-4">
                <p className="text-sm text-white/80">
                  Best starting point: request a free audit so we can identify
                  the fastest path to results.
                </p>
              </div>

              <div className="mt-6 grid gap-3 text-sm text-muted">
                <div className="card-soft p-4">
                  Custom websites, support, automation, infrastructure, and
                  ongoing management are all quoted based on scope.
                </div>
                <div className="card-soft p-4">
                  Clear scope, clean communication, and practical next steps
                  before work begins.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
