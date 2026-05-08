import Reveal from "@/components/ui/Reveal";

const infoItems = [
  "Business name and location",
  "Website link, if you have one",
  "What you want built, fixed, or improved",
  "Timeline, urgency, or preferred start date",
  "Whether you need web, support, marketing, or on-site systems",
];

const trustNotes = [
  {
    title: "Clear next step",
    text: "We’ll review your request and recommend the smartest starting point.",
  },
  {
    title: "Scoped properly",
    text: "Custom websites, support, marketing, infrastructure, and management are quoted based on scope.",
  },
  {
    title: "No pressure",
    text: "You’ll get practical direction before any work moves forward.",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[rgba(212,175,55,0.12)] py-20 md:py-28"
    >
      <div className="hero-glow" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <span className="section-eyebrow">Contact</span>

              <h2 className="mt-5 max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.065em] md:text-7xl">
                Let’s Build, Fix, Or Improve The Right Thing First.
              </h2>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-base leading-8 text-muted md:text-lg">
                Send the details and we’ll reply with a clear next step, quote,
                or audit direction. The goal is simple: clean scope, clear
                communication, and work that actually moves the business
                forward.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="badge-dark">Free Audit</span>
                <span className="badge-dark">Quote Request</span>
                <span className="badge-dark">Web Builds</span>
                <span className="badge-dark">Support & Infrastructure</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal delayMs={100}>
            <form className="card-premium edge-gold overflow-hidden p-6 md:p-8">
              <div className="flex flex-col justify-between gap-4 border-b border-[rgba(212,175,55,0.12)] pb-6 md:flex-row md:items-start">
                <div>
                  <p className="text-2xl font-black tracking-[-0.035em]">
                    Get Your Free Tech Audit
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Fill this out and we’ll send a clear plan, quote, or next
                    step.
                  </p>
                </div>

                <span className="badge-gold w-fit">No obligation</span>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <Field label="Your name" name="name" />
                <Field label="Business name" name="business" />
                <Field label="Email" name="email" type="email" />
                <Field label="Phone (optional)" name="phone" type="tel" />
                <Field label="Website (optional)" name="website" />
                <SelectField
                  label="What do you need?"
                  name="service"
                  options={[
                    "Free Tech Audit",
                    "Custom Website Build",
                    "SEO / Google / Facebook Setup",
                    "Social Media / Ads Support",
                    "Remote Tech Support",
                    "Infrastructure / Network / CCTV",
                    "Ongoing Monthly Partner",
                  ]}
                />
                <SelectField
                  label="Timeline"
                  name="timeline"
                  options={[
                    "This week",
                    "Within 2 weeks",
                    "This month",
                    "Flexible / planning ahead",
                  ]}
                />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-white/80">
                  Project details
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us what you need built, fixed, cleaned up, or improved..."
                  className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[rgba(245,215,122,0.5)] focus:ring-2 focus:ring-[rgba(245,215,122,0.12)]"
                />
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <a href="#packages" className="btn-ghost-gold">
                  View Packages
                </a>
                <button type="submit" className="btn-gold">
                  Send Request
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal delayMs={180}>
            <aside className="card-premium edge-gold flex h-full flex-col overflow-hidden p-6 md:p-8">
              <div>
                <span className="section-eyebrow">Best Info To Include</span>

                <h3 className="mt-5 text-3xl font-black tracking-[-0.045em]">
                  Help Us Understand The Job Quickly.
                </h3>

                <ul className="mt-6 grid gap-4">
                  {infoItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-white/82">
                      <span className="mt-[2px] text-[#f5d77a]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 grid gap-4">
                {trustNotes.map((note) => (
                  <div
                    key={note.title}
                    className="rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.045)] p-5"
                  >
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#f5d77a]/85">
                      {note.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {note.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                  <p className="text-sm leading-7 text-white/78">
                    Prefer to keep it simple? Send your business name, what you
                    need, and the best way to contact you. We’ll take it from
                    there.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white/80">{label}</span>
      <input
        name={name}
        type={type}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[rgba(245,215,122,0.5)] focus:ring-2 focus:ring-[rgba(245,215,122,0.12)]"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white/80">{label}</span>
      <select
        name={name}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-4 text-sm text-white outline-none transition focus:border-[rgba(245,215,122,0.5)] focus:ring-2 focus:ring-[rgba(245,215,122,0.12)]"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-black">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
