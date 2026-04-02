import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/ui/Reveal";
import StickyCTA from "@/components/ui/StickyCTA";
import type { ReactNode } from "react";

/* -------------------------------------------------------
   Small utilities (kept local to avoid extra dependencies)
-------------------------------------------------------- */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* -------------------------------------------------------
   Layout primitives
-------------------------------------------------------- */
function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6">{children}</div>;
}

function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
      {children}
    </span>
  );
}

/* -------------------------------------------------------
   Buttons / Cards
-------------------------------------------------------- */
function Button({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-white text-slate-900 shadow-[0_12px_40px_rgba(255,255,255,0.10)] hover:bg-white/90"
      : "border border-white/15 bg-white/5 text-white hover:bg-white/10";

  return (
    <a href={href} className={cn(base, styles)}>
      {children}
    </a>
  );
}

function Card({
  title,
  eyebrow,
  highlight,
  className,
  children,
}: {
  title: string;
  eyebrow?: string;
  highlight?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/[0.04]",
        "shadow-[0_14px_70px_rgba(0,0,0,0.55)]",
        "transition-transform duration-300 hover:-translate-y-1",
        highlight && "ring-1 ring-white/15 border-white/20",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-28 bg-gradient-to-r from-fuchsia-500/16 via-cyan-400/10 to-transparent blur-2xl" />
      </div>

      <div className="pointer-events-none absolute -top-24 left-1/2 h-44 w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl opacity-35" />

      <div className="relative p-6">
        {eyebrow ? (
          <div className="text-xs font-semibold tracking-wide text-white/55">
            {eyebrow}
          </div>
        ) : null}

        <h3 className="mt-1 text-lg font-semibold tracking-tight">{title}</h3>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   Reusable UI bits
-------------------------------------------------------- */
function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-white/80">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden className="mt-[2px] text-white/60">
            •
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoGridCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className={cn(
        "h-full rounded-2xl px-5 py-4",
        "border border-purple-400/30",
        "shadow-[0_0_18px_rgba(168,85,247,0.14)]",
        "transition-all duration-300",
        "hover:shadow-[0_0_38px_rgba(168,85,247,0.32)] hover:-translate-y-1",
      )}
    >
      <div className="mt-1 text-lg font-semibold text-white">{title}</div>
      <p className="mt-2 text-sm text-white/80">{description}</p>
    </div>
  );
}

function PriceTag({
  label = "Starting at",
  amount,
  cadence = "/mo",
  plus = true,
  size = "lg",
}: {
  label?: string;
  amount: number;
  cadence?: string;
  plus?: boolean;
  size?: "lg" | "md";
}) {
  const priceClass =
    size === "lg"
      ? "text-4xl font-bold tracking-tight text-white"
      : "text-3xl font-bold tracking-tight text-white";

  return (
    <div className="flex items-end justify-between gap-4">
      <p className="text-sm text-white/70">{label}</p>

      <p className={priceClass}>
        ${amount}
        {plus ? (
          <span className="ml-1 align-top text-lg text-white/85">+</span>
        ) : null}
        <span className="ml-1 text-sm font-semibold text-white/70">
          {cadence}
        </span>
      </p>
    </div>
  );
}

/* -------------------------------------------------------
   Reviews UI
-------------------------------------------------------- */
function Stars({ rating = 5 }: { rating?: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div
      className="flex items-center gap-1 leading-none"
      aria-label={`${full} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "text-white" : "text-white/25"}>
          ★
        </span>
      ))}
    </div>
  );
}

function RatingStrip({
  rating = 5.0,
  countText = "Based on client feedback",
  sourceLabel = "Client Reviews",
}: {
  rating?: number;
  countText?: string;
  sourceLabel?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_14px_70px_rgba(0,0,0,0.55)]">
      <div className="pointer-events-none absolute -inset-24 opacity-60 blur-3xl">
        <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-fuchsia-500/18" />
        <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-cyan-400/14" />
      </div>

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90">
            <span className="text-lg font-bold">★</span>
          </div>

          <div>
            <div className="text-sm font-semibold text-white/85">
              {sourceLabel}
            </div>
            <div className="mt-1 text-xs text-white/55">{countText}</div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 md:justify-end">
          <div className="text-right">
            <div className="text-3xl font-bold tracking-tight">
              {rating.toFixed(1)}
            </div>
            <div className="mt-1 text-xs text-white/55">Average rating</div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Stars rating={Math.round(rating)} />
            <div className="text-xs text-white/55">★★★★★</div>
          </div>

          <a
            href="#contact"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-white/90 transition"
          >
            Get Free Audit
          </a>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({
  quote,
  name,
  meta,
  rating = 5,
  highlight,
}: {
  quote: string;
  name: string;
  meta: string;
  rating?: number;
  highlight?: boolean;
}) {
  return (
    <Card title={`“${quote}”`} eyebrow="Client feedback" highlight={highlight}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white">{name}</div>
          <div className="text-xs text-white/55">{meta}</div>
        </div>
        <div className="text-right">
          <Stars rating={rating} />
          <div className="mt-1 text-[11px] text-white/45">Verified</div>
        </div>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------
   Hero dashboard widgets
-------------------------------------------------------- */
function Metric({
  label,
  value,
  pct,
}: {
  label: string;
  value: string;
  pct: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xs text-white/60">{label}</div>
        <div className="text-[11px] text-white/55">{pct}%</div>
      </div>
      <div className="mt-1 text-sm text-white/85">{value}</div>
      <div className="mt-3 h-2 w-full rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-white/60"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SampleDashboard() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-r from-fuchsia-500/18 via-cyan-400/12 to-transparent blur-2xl" />

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_14px_70px_rgba(0,0,0,0.55)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Sample Tech Audit</div>
            <p className="mt-1 text-xs text-white/55">
              Example preview — your real report is customized to your business.
            </p>
          </div>
          <Badge>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Healthy
          </Badge>
        </div>

        <div className="mt-4 grid gap-3">
          <Metric
            label="Website"
            value="Speed + conversion wins identified"
            pct={72}
          />
          <Metric
            label="Security"
            value="Backup + WiFi hardening recommended"
            pct={58}
          />
          <Metric
            label="Automation"
            value="Review + follow-up flows available"
            pct={64}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/60">
          <Pill>Fast response</Pill>
          <Pill>Remote + On-site</Pill>
          <Pill>Monthly options</Pill>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   Page
-------------------------------------------------------- */
export default function Page() {
  const results: Array<[string, string]> = [
    ["⚡ Faster Fixes", "Most issues resolved in 24–48h"],
    [
      "⭐ More Reviews",
      "Automated review requests + follow-ups → more Google reviews over time",
    ],
    [
      "🛡️ Less Downtime",
      "Prevent problems early with monitoring + backups → fewer interruptions",
    ],
    [
      "🤝 One Partner",
      "Website + IT + security in one place — no vendor runaround",
    ],
  ];

  const industries: Array<[string, string]> = [
    [
      "🔧 Trades",
      "Faster quotes, automated follow-ups, and booking systems that save hours every week.",
    ],
    [
      "🦷 Clinics / Dental",
      "Reliable systems, secure patient data, and smoother online intake experiences.",
    ],
    [
      "🏢 Offices",
      "Stable email, secure backups, and reliable devices that keep teams productive.",
    ],
    [
      "🛍 Retail",
      "Reliable POS systems, strong networks, and uptime that protects daily revenue.",
    ],
    [
      "🎥 Creators",
      "High-performance websites and automation that turn audiences into clients.",
    ],
    [
      "🏘 Property / Services",
      "Centralized technology support across locations with one reliable partner.",
    ],
  ];

  const packageCardBase =
    "border border-purple-400/20 shadow-[0_0_18px_rgba(168,85,247,0.10)] transition-all duration-300 hover:shadow-[0_0_34px_rgba(168,85,247,0.22)] hover:-translate-y-1";

  const packageCardFeatured =
    "scale-[1.03] border border-purple-400/50 shadow-[0_0_40px_rgba(168,85,247,0.25)] transition-all duration-300 hover:shadow-[0_0_55px_rgba(168,85,247,0.32)] hover:-translate-y-1";

  const plans = [
    {
      title: "Essential Care",
      eyebrow: "Starter",
      price: 249,
      bestFor: "Best for: Solo businesses & small teams",
      features: [
        "Fast remote tech support when issues happen",
        "Security + maintenance checks",
        "Google Business Profile optimization",
        "Automated review requests",
        "Website monitoring to prevent downtime",
      ],
      actions: [
        {
          label: "Start with Essential",
          href: "#contact",
          variant: "secondary" as const,
        },
        {
          label: "Free Tech Audit",
          href: "#audit",
          variant: "secondary" as const,
        },
      ],
      note: "No long-term contracts required.",
      className: packageCardBase,
      featured: false,
    },
    {
      title: "Growth Partner ⭐",
      eyebrow: "Most popular",
      price: 499,
      bestFor: "Best for: Growing businesses needing ongoing support",
      features: [
        "Everything in Essential",
        "Customer follow-up automation",
        "Regular website improvements & updates",
        "Priority support",
        "Monthly performance & improvement report",
      ],
      actions: [
        {
          label: "Choose Growth Partner",
          href: "#contact",
          variant: "primary" as const,
        },
        {
          label: "Free Tech Audit",
          href: "#audit",
          variant: "secondary" as const,
        },
      ],
      note: "Upgrade anytime as your needs evolve.",
      className: packageCardFeatured,
      featured: true,
    },
    {
      title: "Complete Tech Partner",
      eyebrow: "Outsourced IT",
      price: 899,
      bestFor: "Best for: Companies wanting outsourced IT leadership",
      features: [
        "Unlimited remote support",
        "On-site support options",
        "Practical security monitoring",
        "Business automation systems",
        "Ongoing technology strategy & planning",
      ],
      actions: [
        {
          label: "Book Consultation",
          href: "#contact",
          variant: "secondary" as const,
        },
        {
          label: "Free Tech Audit",
          href: "#audit",
          variant: "secondary" as const,
        },
      ],
      note: "Flexible plans — adjust anytime.",
      className: packageCardBase,
      featured: false,
    },
  ] as const;

  return (
    <>
      <StickyCTA />

      {/* HERO */}
      <Section className="pt-14 md:pt-20">
        <Reveal>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-24 -z-10 opacity-70 blur-3xl">
              <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-fuchsia-500/22" />
              <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-cyan-400/16" />
            </div>

            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <Badge>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <strong>Canada Wide • Business Technology Partner</strong>
                </Badge>

                <h1 className="mt-6 text-4xl font-bold leading-[1.03] tracking-tight md:text-6xl">
                  Your One &amp; ONLY <br />
                  Business Technology Partner
                </h1>

                <p className="mt-4 text-white/75">
                  Websites, AI automation, cybersecurity, repairs, marketing and
                  ongoing IT support — handled under one trusted partner.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="#contact" variant="primary">
                    Get Free Tech Audit
                  </Button>
                  <Button href="#contact" variant="secondary">
                    Request a Quote
                  </Button>
                  <Button href="#services" variant="secondary">
                    View Services
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-white/60">
                  <Pill>Fast response</Pill>
                  <Pill>Remote + On-site</Pill>
                  <Pill>Clear monthly options</Pill>
                  <Pill>Clean installs &amp; documentation</Pill>
                </div>

                <p className="mt-6 text-sm text-white/65">
                  <strong>
                    Service area: Canada Wide. Remote support anywhere. On-site
                    available.
                  </strong>
                </p>
              </div>

              <Reveal delayMs={120}>
                <SampleDashboard />
              </Reveal>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* SERVICES */}
      <Section id="services" className="border-t border-white/10">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Everything Your Business Needs — One Technology Partner !
              </h2>
              <p className="mt-2 text-white/75">
                From websites and marketing to IT support and cybersecurity, we
                handle technology so you can <strong> focus on growth.</strong>
              </p>
            </div>

            <a
              href="#contact"
              className="hidden md:inline-flex rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Get A Quote
            </a>
          </div>
        </Reveal>

        <Reveal delayMs={90}>
          <div className="mt-8 grid gap-4 md:grid-cols-3 md:items-stretch">
            <Card
              title="🚀 Websites & Online Growth"
              eyebrow="Get found online and turn visitors into customers."
            >
              <FeatureList
                items={[
                  "Website builds & optimization",
                  "SEO basics + speed improvements",
                  "Google Business profile upgrades",
                  "Booking/contact systems",
                  "Review request automation",
                ]}
              />
            </Card>

            <div className="relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow border border-white/30">
                  Most Requested
                </span>
              </div>

              <Card
                title="🔧 IT Support That Just Works"
                eyebrow="Fast fixes, proactive maintenance, zero tech headaches."
                highlight
              >
                <FeatureList
                  items={[
                    "Remote assistance",
                    "On-site support",
                    "Device cleanup & optimization",
                    "Troubleshooting & fixes",
                    "Home & personal technology support",
                    "Mounting + setups (as requested)",
                  ]}
                />
              </Card>
            </div>

            <Card
              title="🔐 Business Security & Protection"
              eyebrow="Protect your data, devices, and network from real threats."
            >
              <FeatureList
                items={[
                  "Cybersecurity risk assessments",
                  "Virus & malware protection",
                  "Backup & recovery setup",
                  "Network & WiFi security",
                  "Password & breach exposure checks",
                  "Email & network setup",
                ]}
              />
            </Card>
          </div>
        </Reveal>

        <Reveal delayMs={140}>
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-4xl">
              <Card
                title="⚡ Automation & AI Systems"
                eyebrow="Automate follow-ups, capture leads, and save hours every week."
                highlight
              >
                <p className="mb-4 text-sm text-white/70">
                  Automations that capture leads, follow up, request reviews,
                  and reduce busywork.
                </p>

                <ul className="grid gap-y-2 text-sm text-white/80 md:grid-cols-2 md:gap-x-10">
                  <li>• AI workflow setup</li>
                  <li>• AI customer replies</li>
                  <li>• Lead capture automation</li>
                  <li>• Review + follow-up automation</li>
                  <li>• CRM automation</li>
                  <li>• Trade business systems</li>
                </ul>
              </Card>
            </div>
          </div>
        </Reveal>

        <p className="text-center text-sm opacity-70 mt-8">
          <strong>
            🚀 Most clients start with one service and transition into a full
            Technology Partner relationship as their business grows. 🚀
          </strong>
        </p>
      </Section>

      {/* RESULTS */}
      <Section id="results" className="border-t border-white/10">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Results you can expect
          </h2>
          <p className="mt-2 text-white/75">
            Clear outcomes, not vague “tech talk”.
          </p>
        </Reveal>

        <Reveal delayMs={90}>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {results.map(([t, d]) => (
              <InfoGridCard key={t} title={t} description={d} />
            ))}
          </div>
        </Reveal>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" className="border-t border-white/10">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Reviews & Client Feedback
          </h2>
          <p className="mt-2 text-white/75">
            Businesses trust results — not promises.
          </p>
        </Reveal>

        <Reveal delayMs={60}>
          <div className="mt-6">
            <RatingStrip
              rating={5.0}
              sourceLabel="Client Reviews"
              countText="Real feedback from businesses using L&L Tech Solutions"
            />
            <p className="mt-2 text-xs text-white/55">
              Average client rating • Based on client feedback & completed
              projects
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={90}>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <ReviewCard
              quote="L&L Tech solutions is absolutely top notch. They fixed our computer issues fast, repaired the network correctly and set it up properly, and had everything running smoothly. Our technician was Professional, reliable, and incredibly knowledgeable. Five stars all the way 😉"
              name="M.B"
              meta="MAPS Movers • BC & AB"
              rating={5}
              highlight
            />
            <ReviewCard
              quote="I've got three words for Tate @ L&L Tech Solutions, Secure, Reliable and a Technically Sound Service Provider. Very professional and efficient with the level of service offered. I will definitely keep in touch, and I 100% recommend to others. Thank you L&L for your help."
              name="K.S."
              meta="Accountant • Alberta"
              rating={5}
            />
            <ReviewCard
              quote="Professional, organized, SUPER knowledgeable and actually cares about doing it right. Would recommend L&L Tech Solutions anytime for any service."
              name="R.P."
              meta="Dentist • Saskatchewan"
              rating={5}
            />
          </div>
        </Reveal>

        <Reveal delayMs={140}>
          <div className="mt-6">
            <Card
              title="Want more 5-star reviews automatically?"
              eyebrow="Automation"
              highlight
            >
              <p className="text-sm text-white/80">
                Turn happy customers into consistent reviews with automated
                follow-ups and reply templates — no chasing people.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="#contact" variant="primary">
                  Automate My Reviews
                </Button>
                <Button href="#audit" variant="secondary">
                  See Audit Details
                </Button>
              </div>

              <p className="mt-5 text-center text-xs text-white/55">
                🍁Trusted by small businesses, trades, and growing teams across
                Canada 🍁.
              </p>
            </Card>
          </div>
        </Reveal>
      </Section>

      {/* INDUSTRIES */}
      <Section id="industries" className="border-t border-white/10">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            I understand your business workflow.
          </h2>
          <p className="mt-2 text-white/75">
            Technology solutions tailored to how real businesses actually
            operate.
          </p>
        </Reveal>

        <Reveal delayMs={90}>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {industries.map(([t, d]) => (
              <InfoGridCard key={t} title={t} description={d} />
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-white/60">
            Don’t see your industry? If your business relies on technology
            daily, I can help.
          </p>
        </Reveal>
      </Section>

      {/* PACKAGES */}
      <Section id="packages" className="border-t border-white/10">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Monthly Packages
          </h2>
          <p className="mt-2 text-white/75">
            Choose a starting point — upgrade anytime as your business grows.
          </p>
        </Reveal>

        <Reveal delayMs={90}>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.title}
                title={plan.title}
                eyebrow={plan.eyebrow}
                highlight={plan.featured}
                className={plan.className}
              >
                <PriceTag
                  label="Starting at"
                  amount={plan.price}
                  cadence="/mo"
                  plus
                  size={plan.featured ? "md" : "lg"}
                />

                <p className="mt-2 text-xs text-white/55">{plan.bestFor}</p>

                <FeatureList items={[...plan.features]} />

                <div className="mt-5 flex flex-wrap gap-3">
                  {plan.actions.map((a) => (
                    <Button key={a.label} href={a.href} variant={a.variant}>
                      {a.label}
                    </Button>
                  ))}
                </div>

                <p className="mt-4 text-xs text-white/55">{plan.note}</p>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-sm text-white/60">
            Packages are customizable based on needs, team size, and complexity.
          </p>
          <p className="mt-2 text-sm text-white/60">
            Not sure which plan fits? Start with Essential — most clients
            upgrade as their needs grow.
          </p>
        </Reveal>
      </Section>

      {/* AUDIT */}
      <Section id="audit" className="border-t border-white/10">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            What the Free Tech Audit includes
          </h2>
          <p className="mt-2 text-white/75">
            You’ll get clear wins + a plan (not fluff).
          </p>
        </Reveal>

        <Reveal delayMs={90}>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card
              title="Free Tech Audit"
              eyebrow="No obligation"
              highlight
              className="border border-purple-400/40 shadow-[0_0_30px_rgba(168,85,247,0.18)] transition-all duration-300 hover:shadow-[0_0_48px_rgba(168,85,247,0.28)] hover:-translate-y-1"
            >
              <p className="text-sm text-white/75">
                A quick but valuable review of your website + visibility + basic
                security so you know exactly what to fix first.
              </p>

              <FeatureList
                items={[
                  "Website speed + mobile check",
                  "Google Business Profile review",
                  "Basic security hygiene check",
                  "Automation opportunities (reviews / leads / follow-ups)",
                  "3 quick wins + 1 bigger play",
                ]}
              />

              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="#contact" variant="primary">
                  Book Free Audit
                </Button>
                <Button href="#contact" variant="secondary">
                  Ask a Question
                </Button>
              </div>

              <p className="mt-4 text-xs text-white/55">
                Best for: businesses that want clarity before spending money.
              </p>
            </Card>

            <Card
              title="Cyber Risk Snapshot"
              eyebrow="Paid mini-audit (easy starter)"
              className={packageCardBase}
            >
              <p className="text-sm text-white/75">
                Focused cybersecurity check with a simple 1-page PDF report and
                a clear priority list.
              </p>

              <FeatureList
                items={[
                  "Password / breach exposure checks",
                  "Basic external exposure review",
                  "Website header & security scan",
                  "WiFi / network hardening checklist",
                  "Recommendations + priority list",
                ]}
              />

              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="#contact" variant="secondary">
                  Request Snapshot
                </Button>
                <Button href="#contact" variant="secondary">
                  Ask Pricing
                </Button>
              </div>

              <p className="mt-4 text-xs text-white/55">
                Best for: businesses that want a quick security baseline.
              </p>
            </Card>
          </div>

          <p className="mt-6 text-sm text-white/60">
            Not sure which one you need? Start with the Free Audit — it’s the
            fastest way to identify the right next step.
          </p>
        </Reveal>

        <Reveal delayMs={140}>
          <div className="mt-6">
            <Card
              title="High-trust proposals"
              eyebrow="Closes deals faster"
              highlight
              className="border border-purple-400/30 shadow-[0_0_22px_rgba(168,85,247,0.14)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.24)] hover:-translate-y-1"
            >
              <p className="text-sm text-white/80">
                After the audit, you’ll receive a clean 1-page proposal
                outlining scope, timeline, pricing, and next steps — so
                decisions are simple and projects move forward quickly.
              </p>

              <FeatureList
                items={[
                  "Clear scope & deliverables",
                  "Transparent pricing",
                  "Realistic timelines",
                  "Priority recommendations",
                  "Simple next-step approval",
                ]}
              />

              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="#contact" variant="primary">
                  Get My Plan
                </Button>
                <Button href="#contact" variant="secondary">
                  Ask Questions
                </Button>
              </div>

              <p className="mt-4 text-xs text-white/55">
                Designed to remove confusion and help businesses move forward
                with confidence.
              </p>
            </Card>
          </div>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="border-t border-white/10">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-white/75">
            Straight answers to common questions before getting started.
          </p>
        </Reveal>

        <Reveal delayMs={90}>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              [
                "Do I need a new website?",
                "Usually no. Most businesses need speed improvements, mobile fixes, and better lead capture — not a full rebuild.",
              ],
              [
                "Can you work with my current provider?",
                "Yes. I can complement what you have, take over management, or handle specific parts only.",
              ],
              [
                "Do you do one-time projects?",
                "Yes — audits, fixes, installs, and setups. Monthly packages are optional.",
              ],
              [
                "How fast can you start?",
                "Often same day for remote issues. On-site timelines depend on location and scope.",
              ],
              [
                "What does “Tech Partner” mean?",
                "One reliable point of contact for website, systems, security basics, automation, and ongoing support.",
              ],
              [
                "Do you help businesses with good websites already?",
                "Yes — strong websites still need IT support, security, backups, automation, performance tuning, and maintenance.",
              ],
              [
                "Is cybersecurity included?",
                "Yes — practical business security including risk checks, backups, WiFi/network hardening, and protection basics.",
              ],
              [
                "What if I only need a quick fix?",
                "That’s completely fine. Start with a one-time service and upgrade later only if it makes sense.",
              ],
            ].map(([q, a]) => (
              <Card key={q} title={q} className={packageCardBase}>
                <p className="text-sm text-white/80">{a}</p>
              </Card>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={140}>
          <p className="mt-8 text-center text-sm text-white/60">
            Still unsure? Start with a free tech audit — you’ll get clear
            answers and a practical next step.
          </p>
        </Reveal>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="border-t border-white/10">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Contact
          </h2>
          <p className="mt-2 text-white/75">
            Send what you need — I’ll reply with a clear next step and pricing.
          </p>
        </Reveal>

        <Reveal delayMs={90}>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <ContactForm />

            <Card
              title="Fastest info to include"
              eyebrow="So I can quote fast"
              highlight
            >
              <FeatureList
                items={[
                  "Business name + location",
                  "Website link (if any)",
                  "What’s broken / goal",
                  "Deadline (if any)",
                  "Best time to reach you",
                ]}
              />

              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/80">
                  Fastest start: do the{" "}
                  <span className="font-semibold text-white">
                    Free Tech Audit
                  </span>{" "}
                  first.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button href="#audit" variant="primary">
                    Book Free Audit
                  </Button>
                  <Button href="#contact" variant="secondary">
                    Send Message
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </Reveal>

        <div className="h-24 md:hidden" />
      </Section>
    </>
  );
}
