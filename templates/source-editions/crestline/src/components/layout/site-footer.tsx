import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services/multi-family", label: "Multi-Family" },
  { href: "/services/custom-homes", label: "Custom Homes" },
  { href: "/services/commercial", label: "Commercial" },
  { href: "/services/strata", label: "Strata" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__shell">
          <div className="site-footer__grid">
            <div className="site-footer__brand-block">
              <Link
                href="/"
                className="site-footer__brand-link"
                aria-label="Summit Painting Studio home"
              >
                <span className="sample-wordmark">
                  <strong>SUMMIT</strong>
                  <span>PAINTING STUDIO</span>
                </span>
              </Link>

              <p className="site-footer__copy">
                A fictional painting studio demonstrating commercial, multi-family, strata, custom
                home, and interior service pages. Replace sample content before publishing.
              </p>
            </div>

            <nav className="site-footer__column" aria-label="Footer navigation">
              <h2 className="site-footer__heading">Navigation</h2>

              <div className="site-footer__links">
                {footerLinks.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <nav className="site-footer__column" aria-label="Footer services">
              <h2 className="site-footer__heading">Services</h2>

              <div className="site-footer__links">
                {serviceLinks.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="site-footer__column">
              <h2 className="site-footer__heading">Contact</h2>

              <address className="site-footer__links site-footer__address">
                <span>Email — add your address</span>
                <span>Phone — add your number</span>
                <span>Service area — add your region</span>
                <Link href="/contact">Try the sample enquiry</Link>
              </address>
            </div>
          </div>

          <div className="site-footer__bottom">
            <span>© {year} Summit Painting Studio All rights reserved.</span>

            <span>Fictional studio · Generated sample imagery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
