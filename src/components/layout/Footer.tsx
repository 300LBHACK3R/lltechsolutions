import Link from "next/link";
import Image from "next/image";
import { navigation, siteConfig } from "@/config/site";
import MotionControl from "@/components/ui/MotionControl";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-identity">
            <Link href="/" aria-label="L&L Tech Solutions home" className="footer-brand">
              <Image
                src={siteConfig.logo}
                alt="L&L Tech Solutions"
                width={1000}
                height={293}
                sizes="148px"
              />
            </Link>
            <p className="footer-location">Calgary-based · Canada-wide</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {navigation
              .filter((item) => ["/services", "/projects", "/packages"].includes(item.href))
              .map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
          </nav>
          <div className="footer-contact">
            <a href={siteConfig.telephone}>{siteConfig.phone}</a>
            <a href={`mailto:${siteConfig.email}`}>
              Email us <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">© {new Date().getFullYear()} L&L Tech Solutions.</p>
          <nav className="footer-socials" aria-label="Follow L&L Tech Solutions">
            {siteConfig.socialLinks.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
          <div className="footer-utilities">
            <nav className="footer-legal" aria-label="Legal information">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/security">Security</Link>
            </nav>
            <MotionControl />
          </div>
        </div>
      </div>
    </footer>
  );
}
