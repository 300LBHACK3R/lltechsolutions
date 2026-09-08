import Link from "next/link";
import Image from "next/image";
import { navigation, siteConfig } from "@/config/site";
import MotionControl from "@/components/ui/MotionControl";

export default function Footer() {
  return (
    <footer className="site-footer footer-compact">
      <div className="container">
        <div className="footer-main">
          <div className="footer-identity">
            <Link href="/" aria-label="L&L Tech Solutions home" className="footer-brand">
              <Image
                src={siteConfig.logo}
                alt="L&L Tech Solutions"
                width={1000}
                height={293}
                sizes="180px"
              />
            </Link>
            <p className="footer-location">Calgary-based · Canada-wide</p>
          </div>
          <div className="footer-contact">
            <a className="footer-email" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <a href={siteConfig.telephone}>{siteConfig.phone}</a>
            <div className="social-links">
              {siteConfig.socialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {navigation
              .filter((item) => item.href !== "/")
              .map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} L&L Tech Solutions. All rights reserved.</p>
          <MotionControl />
          <nav className="footer-legal" aria-label="Legal information">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/security">Security</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
