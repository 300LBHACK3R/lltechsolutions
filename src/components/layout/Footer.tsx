import Link from "next/link";
import Image from "next/image";
import { navigation, siteConfig } from "@/config/site";
import MotionControl from "@/components/ui/MotionControl";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link href="/" aria-label="L&L Tech Solutions home" className="footer-brand">
              <Image
                src={siteConfig.logo}
                alt="L&L Tech Solutions"
                width={1000}
                height={293}
                sizes="220px"
              />
            </Link>
            <p className="footer-statement">
              Built with intention.
              <br />
              Managed with care.
            </p>
            <p className="muted">Calgary-based · Canada-wide</p>
          </div>
          <nav aria-label="Footer navigation">
            {navigation
              .filter((item) => item.href !== "/")
              .map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
          </nav>
          <div className="footer-contact">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={siteConfig.telephone}>{siteConfig.phone}</a>
            <div className="social-links">
              {siteConfig.socialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} L&L Tech Solutions. All rights reserved.</p>
          <MotionControl />
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/security">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
