import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/ui/Reveal";
import StickyCTA from "@/components/ui/StickyCTA";
import type { ReactNode } from "react";

/* -------------------------------------------------------
   Small utilities
-------------------------------------------------------- */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* -------------------------------------------------------
   Layout primitives
-------------------------------------------------------- */
function Container({ children }: { children: ReactNode }) {
  return <div className="container-premium">{children}</div>;
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
    <section id={id} className={cn("section-premium", className)}>
      <Container>{children}</Container>
    </section>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return <span className="badge-gold">{children}</span>;
}

function Pill({ children }: { children: ReactNode }) {
  return <span className="badge-dark">{children}</span>;
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
  return (
    <a
      href={href}
      className={variant === "primary" ? "btn-gold" : "btn-ghost-gold"}
    >
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
        "card-premium p-6",
        highlight && "border-[rgba(212,175,55,0.35)]",
        className,
      )}
    >
      {eyebrow ? (
        <div className="text-xs font-semibold tracking-[0.14em] uppercase text-[#f5d77a]/80">
          {eyebrow}
        </div>
      ) : null}

      <h3 className="mt-1 text-lg font-semibold tracking-tight">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------
   Reusable UI bits
-------------------------------------------------------- */
function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5 text-sm text-muted">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className="mt-[2px] text-[#f5d77a]">
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
    <div className="card-premium p-5">
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-2 text-sm text-muted">{description}</p>
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
      ? "text-4xl font-bold tracking-tight"
      : "text-3xl font-bold tracking-tight";

  return (
    <div className="flex items-end justify-between gap-4">
      <p className="text-sm text-muted">{label}</p>

      <p className={priceClass}>
        ${amount}
        {plus ? (
          <span className="ml-1 align-top text-lg text-[#f5d77a]">+</span>
        ) : null}
        <span className="ml-1 text-sm font-semibold text-muted">{cadence}</span>
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
        <span key={i} className={i < full ? "text-[#f5d77a]" : "text-white/20"}>
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
    <div className="card-premium p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(212,175,55,0.16)] bg-[rgba(212,175,55,0.06)] text-[#f5d77a]">
            <span className="text-lg font-bold">★</span>
          </div>

          <div>
            <div className="text-sm font-semibold text-white/90">
              {sourceLabel}
            </div>
            <div className="mt-1 text-xs text-muted">{countText}</div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 md:justify-end">
          <div className="text-right">
            <div className="text-3xl font-bold tracking-tight">
              {rating.toFixed(1)}
            </div>
            <div className="mt-1 text-xs text-muted">Average rating</div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Stars rating={Math.round(rating)} />
            <div className="text-xs text-muted">★★★★★</div>
          </div>

          <a href="#contact" className="btn-gold">
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
          <div className="text-xs text-muted">{meta}</div>
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
    <div className="card-soft p-4">
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted">{label}</div>
        <div className="text-[11px] text-white/55">{pct}%</div>
      </div>
      <div className="mt-1 text-sm text-white/90">{value}</div>
      <div className="mt-3 h-2 w-full rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-[linear-gradient(90deg,#d4af37,#f5d77a)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SampleDashboard() {
  return (
    <div className="relative">
      <div className="card-premium rounded-[1.75rem] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Sample Tech Audit</div>
            <p className="mt-1 text-xs text-muted">
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

        <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
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
      "Automated review requests + follow-ups create more Google reviews over time",
    ],
    [
      "🛡️ Less Downtime",
      "Prevent problems early with monitoring + backups and reduce interruptions",
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
      "Reliable systems, secure data, and smoother online intake experiences.",
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

  const packageCardBase = "border-[rgba(212,175,55,0.16)]";
  const packageCardFeatured =
    "border-[rgba(212,175,55,0.35)] shadow-[0_18px_60px_rgba(0,0,0,0.45),0_10px_30px_rgba(212,175,55,0.14)] md:scale-[1.02]";

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
      title: "Growth Partner",
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
    <div className="page-shell">
      <StickyCTA />

      {/* HERO */}
      <Section className="pt-14 md:pt-20">
        <Reveal>
          <div className="relative">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <Badge>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Canada Wide • Business Technology Partner
                </Badge>

                <h1 className="mt-6 text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
                  Premium Technology Support
                  <br />
                  For Modern Businesses
                </h1>

                <p className="mt-4 max-w-xl text-muted">
                  Websites, automation, cybersecurity, repairs, and ongoing IT
                  support — handled properly by one reliable partner.
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

                <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <Pill>Fast response</Pill>
                  <Pill>Remote + On-site</Pill>
                  <Pill>Clear monthly options</Pill>
                  <Pill>Clean installs &amp; documentation</Pill>
                </div>

                <p className="mt-6 text-sm text-muted">
                  <strong className="text-white/90">
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
      <Section
        id="services"
        className="border-t border-[rgba(212,175,55,0.12)]"
      >
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="section-title text-[clamp(1.75rem,4vw,2.4rem)]">
                Everything Your Business Needs — One Technology Partner
              </h2>
              <p className="mt-2 section-subtitle max-w-2xl">
                From websites and marketing to IT support and cybersecurity, we
                handle technology so you can focus on growth.
              </p>
            </div>

            <a href="#contact" className="btn-ghost-gold hidden md:inline-flex">
              Get A Quote
            </a>
          </div>
        </Reveal>

        <Reveal delayMs={90}>
          <div className="mt-8 grid gap-4 md:grid-cols-3 md:items-stretch">
            <Card
              title="Websites & Online Growth"
              eyebrow="Get found online and turn visitors into customers"
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
                <span className="badge-gold shadow-[0_8px_25px_rgba(212,175,55,0.18)]">
                  Most Requested
                </span>
              </div>

              <Card
                title="IT Support That Just Works"
                eyebrow="Fast fixes, proactive maintenance, zero tech headaches"
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
              title="Business Security & Protection"
              eyebrow="Protect your data, devices, and network from real threats"
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
                title="Automation & AI Systems"
                eyebrow="Automate follow-ups, capture leads, and save hours every week"
                highlight
              >
                <p className="mb-4 text-sm text-muted">
                  Automations that capture leads, follow up, request reviews,
                  and reduce busywork.
                </p>

                <ul className="grid gap-y-2 text-sm text-muted md:grid-cols-2 md:gap-x-10">
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

        <p className="mt-8 text-center text-sm text-muted">
          <strong className="text-white/90">
            Most clients start with one service and transition into a full
            Technology Partner relationship as their business grows.
          </strong>
        </p>
      </Section>

      {/* RESULTS */}
      <Section id="results" className="border-t border-[rgba(212,175,55,0.12)]">
        <Reveal>
          <h2 className="section-title text-[clamp(1.75rem,4vw,2.4rem)]">
            Results you can expect
          </h2>
          <p className="mt-2 section-subtitle">
            Clear outcomes, not vague tech talk.
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
      <Section id="reviews" className="border-t border-[rgba(212,175,55,0.12)]">
        <Reveal>
          <h2 className="section-title text-[clamp(1.75rem,4vw,2.4rem)]">
            Reviews & Client Feedback
          </h2>
          <p className="mt-2 section-subtitle">
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
            <p className="mt-2 text-xs text-muted">
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
              <p className="text-sm text-muted">
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

              <p className="mt-5 text-center text-xs text-muted">
                Trusted by small businesses, trades, and growing teams across
                Canada.
              </p>
            </Card>
          </div>
        </Reveal>
      </Section>

      {/* INDUSTRIES */}
      <Section
        id="industries"
        className="border-t border-[rgba(212,175,55,0.12)]"
      >
        <Reveal>
          <h2 className="section-title text-[clamp(1.75rem,4vw,2.4rem)]">
            I understand your business workflow.
          </h2>
          <p className="mt-2 section-subtitle">
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

          <p className="mt-8 text-center text-sm text-muted">
            Don’t see your industry? If your business relies on technology
            daily, I can help.
          </p>
        </Reveal>
      </Section>

      {/* PACKAGES */}
      <Section
        id="packages"
        className="border-t border-[rgba(212,175,55,0.12)]"
      >
        <Reveal>
          <h2 className="section-title text-[clamp(1.75rem,4vw,2.4rem)]">
            Monthly Packages
          </h2>
          <p className="mt-2 section-subtitle">
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

                <p className="mt-2 text-xs text-muted">{plan.bestFor}</p>

                <FeatureList items={[...plan.features]} />

                <div className="mt-5 flex flex-wrap gap-3">
                  {plan.actions.map((a) => (
                    <Button key={a.label} href={a.href} variant={a.variant}>
                      {a.label}
                    </Button>
                  ))}
                </div>

                <p className="mt-4 text-xs text-muted">{plan.note}</p>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted">
            Packages are customizable based on needs, team size, and complexity.
          </p>
          <p className="mt-2 text-sm text-muted">
            Not sure which plan fits? Start with Essential — most clients
            upgrade as their needs grow.
          </p>
        </Reveal>
      </Section>

      {/* AUDIT */}
      <Section id="audit" className="border-t border-[rgba(212,175,55,0.12)]">
        <Reveal>
          <h2 className="section-title text-[clamp(1.75rem,4vw,2.4rem)]">
            What the Free Tech Audit includes
          </h2>
          <p className="mt-2 section-subtitle">
            You’ll get clear wins + a plan, not fluff.
          </p>
        </Reveal>

        <Reveal delayMs={90}>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card title="Free Tech Audit" eyebrow="No obligation" highlight>
              <p className="text-sm text-muted">
                A quick but valuable review of your website, visibility, and
                basic security so you know exactly what to fix first.
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

              <p className="mt-4 text-xs text-muted">
                Best for: businesses that want clarity before spending money.
              </p>
            </Card>

            <Card
              title="Cyber Risk Snapshot"
              eyebrow="Paid mini-audit (easy starter)"
              className={packageCardBase}
            >
              <p className="text-sm text-muted">
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

              <p className="mt-4 text-xs text-muted">
                Best for: businesses that want a quick security baseline.
              </p>
            </Card>
          </div>

          <p className="mt-6 text-sm text-muted">
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
            >
              <p className="text-sm text-muted">
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

              <p className="mt-4 text-xs text-muted">
                Designed to remove confusion and help businesses move forward
                with confidence.
              </p>
            </Card>
          </div>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="border-t border-[rgba(212,175,55,0.12)]">
        <Reveal>
          <h2 className="section-title text-[clamp(1.75rem,4vw,2.4rem)]">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 section-subtitle">
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
              <Card key={q} title={q}>
                <p className="text-sm text-muted">{a}</p>
              </Card>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={140}>
          <p className="mt-8 text-center text-sm text-muted">
            Still unsure? Start with a free tech audit — you’ll get clear
            answers and a practical next step.
          </p>
        </Reveal>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="border-t border-[rgba(212,175,55,0.12)]">
        <Reveal>
          <h2 className="section-title text-[clamp(1.75rem,4vw,2.4rem)]">
            Contact
          </h2>
          <p className="mt-2 section-subtitle">
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

              <div className="mt-6 rounded-xl border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.05)] p-4">
                <p className="text-sm text-muted">
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
    </div>
  );
}
