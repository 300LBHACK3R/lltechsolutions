"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { navigation, siteConfig } from "@/config/site";

export default function Header() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => {
    if (menu.current) menu.current.open = false;
  };
  const active = (href: string) => (href === "/" ? pathname === href : pathname.startsWith(href));
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" aria-label="L&L Tech Solutions home" className="brand" onClick={close}>
          <Image
            src={siteConfig.logo}
            alt="L&L Tech Solutions"
            width={1000}
            height={293}
            priority
            sizes="230px"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={active(href) ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button button-outline header-cta" href="/contact">
          Start A Project <span aria-hidden="true">↗</span>
        </Link>
        <details
          ref={menu}
          key={pathname}
          className="mobile-nav"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              close();
              menu.current?.querySelector("summary")?.focus();
            }
          }}
        >
          <summary>
            Menu <span aria-hidden="true">＋</span>
          </summary>
          <nav aria-label="Mobile navigation">
            {navigation.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                aria-current={active(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            <a href={siteConfig.telephone}>{siteConfig.phone}</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
