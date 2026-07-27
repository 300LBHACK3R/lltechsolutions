import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

const trustItems = [
  "Custom Development",
  "SEO & Digital Growth",
  "Remote IT",
  "Cybersecurity",
  "Cat6 & CCTV",
  "Ongoing Management",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="tech-hero-bg relative overflow-hidden border-b border-[rgba(212,175,55,0.12)]"
    >
      <div className="absolute inset-0 bg-black/68" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.24),transparent_42%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,215,122,0.55)] to-transparent" />

      <div className="container-premium relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center py-16 text-center md:min-h-[780px] md:py-24">
        <Reveal>
          <div className="mx-auto max-w-6xl">
            <span className="badge-gold mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Calgary-Based • Canada-Wide Digital & Remote Support
            </span>

            <h1 className="mx-auto mt-7 max-w-6xl text-5xl font-black leading-[0.9] tracking-[-0.07em] md:text-7xl xl:text-8xl">
              Custom Development.
              <br />
              Secure IT.
              <br />
              Connected Infrastructure
              <span className="text-[#f5d77a]">.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-4xl text-base leading-8 text-white/76 md:text-xl md:leading-9">
              L&amp;L Tech Solutions builds high-performance websites and web
              applications, manages digital growth, solves technical problems
              remotely, and deploys reliable network infrastructure for homes
              and businesses.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/services#web-software" className="btn-gold">
                Start A Digital Project
              </Link>
              <Link href="/services#remote-it" className="btn-ghost-gold">
                Get Remote Support
              </Link>
              <Link
                href="/services#network-infrastructure"
                className="btn-ghost-gold"
              >
                Book A Network Assessment
              </Link>
            </div>

            <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-2">
              {trustItems.map((item) => (
                <span key={item} className="badge-dark">
                  {item}
                </span>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-sm leading-7 text-white/52">
              Canada-wide: development, SEO, content, management, and remote IT.
              Calgary area: cabling, Ethernet, racks, Wi-Fi, CCTV, and on-site
              assessments.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="hero-wave" />
    </section>
  );
}
