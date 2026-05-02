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
        "card-premium edge-gold p-6",
        highlight && "border-[rgba(212,175,55,0.34)]",
        className,
      )}
    >
      {eyebrow ? (
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f5d77a]/80">
          {eyebrow}
        </div>
      ) : null}

      <h3 className="mt-1 text-lg font-semibold tracking-tight">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ImageServiceCard({
  title,
  eyebrow,
  description,
  bullets,
}: {
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
}) {
  return (
    <div className="image-card min-h-[320px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.14),transparent_35%)]" />
      <div className="relative z-[2] flex h-full flex-col justify-end p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f5d77a]/85">
          {eyebrow}
        </div>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 max-w-md text-sm text-white/72">{description}</p>

        <ul className="mt-4 space-y-2 text-sm text-white/82">
          {bullets.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="text-[#f5d77a]">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
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
    <div className="card-premium edge-gold p-5">
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
      <div className="hero-glow" />
      <div className="card-premium edge-gold rounded-[1.75rem] border-[rgba(212,175,55,0.18)] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
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

function ProcessStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="card-premium edge-gold p-6">
      <div className="badge-gold">{number}</div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </div>
  );
}

function ProofCard({
  title,
  before,
  after,
}: {
  title: string;
  before: string;
  after: string;
}) {
  return (
    <div className="card-premium edge-gold p-6">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f5d77a]/80">
        Real improvement
      </div>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
            Before
          </div>
          <p className="mt-2 text-sm text-muted">{before}</p>
        </div>

        <div className="rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.04)] p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#f5d77a]/80">
            After
          </div>
          <p className="mt-2 text-sm text-white/82">{after}</p>
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
            <div className="hero-glow" />

            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <Badge>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Canada Wide • Business Technology Partner
                </Badge>

                <h1 className="mt-6 text-4xl font-bold leading-[0.98] tracking-tight md:text-6xl">
                  Premium Technology Support
                  <br />
                  For Modern Businesses
                </h1>

                <div className="mt-4 h-[2px] w-16 rounded-full bg-[linear-gradient(90deg,#d4af37,#f5d77a)]" />

                <p className="mt-5 max-w-xl text-white/70">
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

                <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-white/50">
                  <span>✔ Canada Wide</span>
                  <span>✔ Fast Response</span>
                  <span>✔ 5-Star Rated</span>
                  <span>✔ Business Trusted</span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
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

            <div className="mt-16 section-divider-soft" />
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
                Services Built To Solve Real Business Problems
              </h2>
              <p className="mt-2 section-subtitle max-w-2xl">
                Premium support, structured systems, and clean execution across
                websites, IT, security, automation, and business technology.
              </p>
            </div>

            <a href="#contact" className="btn-ghost-gold hidden md:inline-flex">
              Get A Quote
            </a>
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <ImageServiceCard
              eyebrow="Online Growth"
              title="Websites & Online Presence"
              description="Sharper websites, better mobile performance, stronger trust, and clearer lead flow."
              bullets={[
                "Website builds & redesigns",
                "SEO and speed improvements",
                "Google Business profile cleanup",
              ]}
            />

            <ImageServiceCard
              eyebrow="Technical Support"
              title="IT Support & Repairs"
              description="Fast fixes, proactive maintenance, and cleaner systems without the usual vendor runaround."
              bullets={[
                "Remote and on-site support",
                "Troubleshooting and optimization",
                "Business and home tech help",
              ]}
            />

            <ImageServiceCard
              eyebrow="Protection"
              title="Security & Recovery"
              description="Practical protection for devices, networks, accounts, and critical business data."
              bullets={[
                "Cybersecurity checks",
                "Backup and recovery setup",
                "Network and WiFi hardening",
              ]}
            />
          </div>
        </Reveal>

        <Reveal delayMs={130}>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <Card
              title="Automation & AI Systems"
              eyebrow="Save time, capture leads, reduce busywork"
              highlight
            >
              <p className="text-sm text-muted">
                Build smart follow-up systems that request reviews, answer
                leads, organize inquiries, and remove repetitive admin.
              </p>

              <FeatureList
                items={[
                  "Lead capture automation",
                  "Review request and follow-up systems",
                  "AI-assisted customer replies",
                  "CRM and workflow automation",
                  "Trade and service business process systems",
                ]}
              />
            </Card>

            <Card
              title="Home & Office Setup"
              eyebrow="Clean, reliable, professional installs"
            >
              <p className="text-sm text-muted">
                Premium setup work for desks, displays, networking, TVs, cable
                management, and business environments that need to look sharp.
              </p>

              <FeatureList
                items={[
                  "Desk and workspace setups",
                  "TV mounting and clean cable routing",
                  "Monitor arms and office installations",
                  "Network and device setup",
                  "Small business equipment optimization",
                ]}
              />
            </Card>
          </div>
        </Reveal>

        <Reveal delayMs={170}>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-[rgba(212,175,55,0.14)] bg-[rgba(212,175,55,0.04)] p-5 md:flex-row md:items-center">
            <div>
              <div className="text-sm font-semibold text-white/90">
                Not sure where to start?
              </div>
              <p className="mt-1 text-sm text-muted">
                Most clients begin with a free audit or one focused fix, then
                expand into a longer-term technology partner relationship.
              </p>
            </div>

            <Button href="#audit" variant="primary">
              Start With A Free Audit
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* PROCESS */}
      <Section id="process" className="border-t border-[rgba(212,175,55,0.12)]">
        <Reveal>
          <h2 className="section-title text-[clamp(1.75rem,4vw,2.4rem)]">
            How It Works
          </h2>
          <p className="mt-2 section-subtitle">
            Clear process. No confusion. No tech chaos.
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <ProcessStep
              number="01"
              title="Audit"
              description="We review the current problem, weak points, opportunities, and what actually matters first."
            />
            <ProcessStep
              number="02"
              title="Plan"
              description="You get a simple path forward with priority order, scope, and realistic next steps."
            />
            <ProcessStep
              number="03"
              title="Build / Fix"
              description="The work gets done properly — cleaner systems, stronger setup, better performance."
            />
            <ProcessStep
              number="04"
              title="Support"
              description="Ongoing help, maintenance, and future improvements when you need them."
            />
          </div>
        </Reveal>
      </Section>

      {/* PROOF */}
      <Section id="proof" className="border-t border-[rgba(212,175,55,0.12)]">
        <Reveal>
          <h2 className="section-title text-[clamp(1.75rem,4vw,2.4rem)]">
            Proof, Not Just Promises
          </h2>
          <p className="mt-2 section-subtitle">
            The goal is not vague “tech help.” The goal is cleaner systems,
            fewer problems, and better business outcomes.
          </p>
        </Reveal>

        <Reveal delayMs={90}>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <ProofCard
              title="Website performance and trust"
              before="Slow pages, weak mobile experience, outdated presentation, unclear calls to action."
              after="Stronger structure, faster load path, more premium presentation, clearer lead flow."
            />
            <ProofCard
              title="Business tech cleanup"
              before="Random issues, scattered support, recurring downtime, no clear accountability."
              after="One reliable point of contact, cleaner systems, faster fixes, better organization."
            />
            <ProofCard
              title="Follow-up and review growth"
              before="Leads went cold, reviews depended on memory, follow-up was inconsistent."
              after="Structured automation, better response flow, more consistent review generation."
            />
          </div>
        </Reveal>
      </Section>

      {/* RESULTS */}
      <Section id="results" className="border-t border-[rgba(212,175,55,0.12)]">
        <Reveal>
          <h2 className="section-title text-[clamp(1.75rem,4vw,2.4rem)]">
            Results You Can Expect
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
              quote="L&L Tech solutions is absolutely top notch. They fixed our computer issues fast, repaired the network correctly and set it up properly, and had everything running smoothly. Our technician was Professional, reliable, and incredibly knowledgeable. Five stars all the way."
              name="M.B"
              meta="MAPS Movers • BC & AB"
              rating={5}
              highlight
            />
            <ReviewCard
              quote="I've got three words for Tate @ L&L Tech Solutions, Secure, Reliable and a Technically Sound Service Provider. Very professional and efficient with the level of service offered."
              name="K.S."
              meta="Accountant • Alberta"
              rating={5}
            />
            <ReviewCard
              quote="Professional, organized, super knowledgeable and actually cares about doing it right. Would recommend L&L Tech Solutions anytime for any service."
              name="R.P."
              meta="Dentist • Saskatchewan"
              rating={5}
            />
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
            I Understand Your Business Workflow
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
                className={
                  plan.featured
                    ? "shadow-[0_22px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(212,175,55,0.12)] md:scale-[1.02]"
                    : undefined
                }
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
        </Reveal>
      </Section>

      {/* AUDIT */}
      <Section id="audit" className="border-t border-[rgba(212,175,55,0.12)]">
        <Reveal>
          <h2 className="section-title text-[clamp(1.75rem,4vw,2.4rem)]">
            What The Free Tech Audit Includes
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
                "Is cybersecurity included?",
                "Yes — practical business security including risk checks, backups, WiFi/network hardening, and protection basics.",
              ],
            ].map(([q, a]) => (
              <Card key={q} title={q}>
                <p className="text-sm text-muted">{a}</p>
              </Card>
            ))}
          </div>
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
