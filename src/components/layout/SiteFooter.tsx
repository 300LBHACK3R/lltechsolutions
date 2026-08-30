import {
  legalNavigation,
  serviceNavigation,
  siteConfig,
  socialNavigation,
  studioNavigation,
} from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import StudioMark from "@/components/ui/StudioMark";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="executive-footer">
      <div className="footer-studio-rail" />
      <div className="corporate-grid absolute inset-0 opacity-10" />

      <div className="container-premium relative z-10 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr_0.7fr]">
          <div>
            <Link
              href="/"
              className="footer-brand"
              aria-label="L&L Tech Solutions home"
            >
              <Image
                src="/brand/logo-mark.webp"
                alt=""
                width={92}
                height={92}
                sizes="92px"
              />
              <span>
                <strong>L&amp;L</strong>
                <small>Tech Solutions</small>
              </span>
            </Link>

            <p className="font-editorial mt-8 max-w-xl text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-[#f3f7fb] md:text-5xl">
              Digital work that carries
              <span className="block italic text-[#e4c77f]">
                the weight of your business.
              </span>
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#dbe6f2]/48">
              Custom websites, purpose-built software, and managed content from
              one accountable Calgary-based digital studio.
            </p>

            <div className="mt-7">
              <StudioMark inverse />
            </div>
          </div>

          <div>
            <p className="footer-heading">Services</p>
            <div className="mt-6 grid gap-4">
              {serviceNavigation.map((item) => (
                <Link key={item.href} href={item.href} className="footer-link">
                  {item.label}
                </Link>
              ))}
            </div>

            <p className="footer-heading mt-10">Studio</p>
            <div className="mt-6 grid gap-4">
              {studioNavigation.map((item) => (
                <Link key={item.href} href={item.href} className="footer-link">
                  {item.label}
                </Link>
              ))}
            </div>

            <p className="footer-heading mt-10">Follow L&amp;L</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
              {socialNavigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  {item.label} ↗
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="footer-heading">Start A Conversation</p>

            <p className="mt-6 text-sm leading-7 text-white/44">
              Share the business, the current challenge, and the result you want.
              We will recommend the clearest next step.
            </p>

            <a
              href={siteConfig.phone.href}
              className="mt-8 block text-xl font-black tracking-[-0.03em] text-white"
            >
              {siteConfig.phone.display}
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 block break-all text-sm text-white/46 transition hover:text-[#e4c77f]"
            >
              {siteConfig.email}
            </a>

            <Link href="/contact" className="btn-blue mt-7">
              Start A Project
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/[0.08] pt-6 text-xs text-white/30 lg:flex-row lg:items-center lg:justify-between">
          <p>© {year} L&amp;L Tech Solutions. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-4 lg:justify-end">
            {legalNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="footer-legal-link"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
