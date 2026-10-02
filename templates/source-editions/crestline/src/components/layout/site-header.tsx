"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { services } from "@/data/services";

type SiteHeaderProps = {
  light?: boolean;
};

type NavItem = {
  href: string;
  label: string;
  hasDropdown?: boolean;
};

type HeaderServiceItem = {
  slug: string;
  title: string;
  short: string;
};

const typedServices = services as readonly HeaderServiceItem[];

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SiteHeader(props: SiteHeaderProps) {
  const pathname = usePathname();
  return <HeaderForPath key={pathname} {...props} pathname={pathname} />;
}

// A new route (including back/forward navigation) starts with a closed menu.
function HeaderForPath({ light, pathname }: SiteHeaderProps & { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isLight = light ?? pathname !== "/";

  const visibleNavItems =
    pathname === "/" ? NAV_ITEMS.filter((item) => item.href !== "/") : NAV_ITEMS;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={cn("site-header", isLight && "site-header--light")}>
      <div className="sample-notice">Fictional sample · Generated imagery · Enquiry demo only</div>
      <div className="site-header__bar">
        <Link href="/" className="site-header__brand" aria-label="Summit Painting Studio home">
          <span className="sample-wordmark">
            <strong>SUMMIT</strong>
            <span>PAINTING STUDIO</span>
          </span>
        </Link>

        <button
          type="button"
          className="site-header__menu-button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <div
          id="primary-navigation"
          className={cn("site-header__right", menuOpen && "site-header__right--open")}
        >
          <nav className="site-header__nav" aria-label="Primary navigation">
            {visibleNavItems.map((item) => {
              const active = isActive(item.href);

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.href}
                    className="site-header__nav-item site-header__nav-item--dropdown"
                  >
                    <Link
                      href={item.href}
                      className={cn("site-header__link", active && "site-header__link--active")}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>

                    <div className="site-header__dropdown">
                      <div className="site-header__dropdown-inner">
                        {typedServices.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="site-header__dropdown-link"
                          >
                            <span>{service.title}</span>
                            <small>{service.short}</small>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("site-header__link", active && "site-header__link--active")}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact"
            className="site-header__cta"
            aria-label="Request a quote from Summit Painting Studio"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
