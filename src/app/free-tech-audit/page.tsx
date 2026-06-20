import type { Metadata } from "next";
import Link from "next/link";
import TrustBar from "@/components/ui/TrustBar";

export const metadata: Metadata = {
  title: "Free Tech Audit | L&L Tech Solutions",
  description:
    "Get a free tech audit for your website, Google presence, business tech setup, SEO foundations, and online trust signals.",
  alternates: {
    canonical: "/free-tech-audit",
  },
  openGraph: {
    title: "Free Tech Audit | L&L Tech Solutions",
    description:
      "A practical review of your website, Google presence, tech setup, and online trust signals.",
    url: "/free-tech-audit",
    siteName: "L&L Tech Solutions",
    images: ["/brand/logo.jpg"],
    type: "website",
  },
};

const auditItems = [
  {
    title: "Website Presence",
    text: "We review your current site, layout, mobile experience, speed, trust signals, and conversion path.",
  },
  {
    title: "Google & SEO Foundation",
    text: "We check your search basics, metadata, Google-facing structure, and local business visibility opportunities.",
  },
  {
    title: "Business Tech Setup",
    text: "We look for practical issues in your online tools, accounts, support flow, and tech systems that may be slowing you down.",
  },
  {
    title: "Clear Next Steps",
    text: "You get a simple action plan: what matters now, what can wait, and what would make the strongest business impact.",
  },
];

const whoItsFor = [
  "Small businesses",
  "Contractors",
  "Local service companies",
  "Startups and side businesses",
  "Businesses with outdated websites",
  "Owners who need practical tech direction",
];

export default function FreeTechAuditPage() {
  return (
    <main className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[850px] -translate-x-1/2 rounded-full bg-[rgba(212,175,55,0.08)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_36%)]" />
      </div>

      <section className="container-premium">
        <div className="mx-auto max-w-5xl text-center">
          <span className="section-eyebrow">Free Tech Audit</span>
          <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.065em] md:text-7xl">
            Find The Gaps Holding Your Business Back Online.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
            A practical review for small businesses, contractors, and local
            service companies. We look at your website, Google presence, tech
            setup, SEO foundations, and online trust signals.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-gold">
              Request My Free Audit
            </Link>
            <Link href="/services" className="btn-ghost-gold">
              View Services
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {auditItems.map((item, index) => (
            <div
              key={item.title}
              className="card-premium edge-gold p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.08)] text-sm font-black text-[#f5d77a]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-2xl font-black tracking-[-0.04em]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card-premium p-6 md:p-8">
            <span className="section-eyebrow">Who This Is For</span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
              Built For Owners Who Need Clarity, Not Confusion.
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {whoItsFor.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-semibold text-white/78"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="card-premium edge-gold p-6 md:p-8">
            <span className="section-eyebrow">What You Get</span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
              A Simple Action Plan You Can Actually Use.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              No bloated report. No pressure. Just a clear breakdown of what is
              working, what is weak, and what should be improved first.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-gold">
                Start The Audit
              </Link>
              <Link href="/projects" className="btn-ghost-gold">
                See Project Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16">
        <TrustBar />
      </div>
    </main>
  );
}
