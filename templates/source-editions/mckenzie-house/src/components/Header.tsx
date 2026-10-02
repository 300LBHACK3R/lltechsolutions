"use client";

import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/BrandLogo";
import { navItems, siteConfig } from "@/lib/site";

const HOME_PATH = "/";
const CONTACT_PATH = "/contact";

const DEFAULT_SITE_ORIGIN = "https://example.com";

const OMITTED_LABELS = new Set(["experience"]);

type NavigationTarget = Readonly<{
  href: string;
  pathname: string;
  hash: string;
  kind: "internal" | "native" | "external";
}>;

type NavigationItem = Readonly<{
  label: string;
  href: string;
}>;

type SmartLinkProps = Readonly<{
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaCurrent?: "page" | undefined;
  fallbackHref?: string;
  openExternalInNewTab?: boolean;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}>;

function normalizeSiteOrigin(value: string): string {
  const candidate = value.trim() || DEFAULT_SITE_ORIGIN;

  try {
    const url = new URL(candidate);

    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username.length > 0 ||
      url.password.length > 0
    ) {
      return DEFAULT_SITE_ORIGIN;
    }

    return url.origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

const SITE_ORIGIN = normalizeSiteOrigin(siteConfig.domain);

function normalizePathname(value: string): string {
  if (!value || value === "/") {
    return "/";
  }

  return value.replace(/\/+$/, "") || "/";
}

function isNativeProtocol(value: string): boolean {
  const normalized = value.trim().toLowerCase();

  return (
    normalized.startsWith("tel:") ||
    normalized.startsWith("sms:") ||
    normalized.startsWith("mailto:")
  );
}

function parseTarget(value: string, fallback = HOME_PATH): NavigationTarget {
  const candidate = value.trim();

  if (candidate && isNativeProtocol(candidate)) {
    return {
      href: candidate,

      pathname: HOME_PATH,

      hash: "",

      kind: "native",
    };
  }

  try {
    const url = new URL(candidate || fallback, `${SITE_ORIGIN}/`);

    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username.length > 0 ||
      url.password.length > 0
    ) {
      throw new Error("Unsafe navigation target");
    }

    const pathname = normalizePathname(url.pathname);

    const hash = url.hash.replace(/^#/, "");

    if (url.origin === SITE_ORIGIN) {
      return {
        href: `${url.pathname}${url.search}${url.hash}` || HOME_PATH,

        pathname,

        hash,

        kind: "internal",
      };
    }

    if (url.protocol !== "https:") {
      throw new Error("External navigation must use HTTPS");
    }

    return {
      href: url.toString(),

      pathname,

      hash,

      kind: "external",
    };
  } catch {
    if (fallback !== HOME_PATH) {
      return parseTarget(fallback, HOME_PATH);
    }

    return {
      href: HOME_PATH,

      pathname: HOME_PATH,

      hash: "",

      kind: "internal",
    };
  }
}

function createNavigationItems(values: readonly NavigationItem[]): readonly NavigationItem[] {
  const unique = new Map<string, NavigationItem>();

  for (const value of values) {
    const label = value.label.trim();

    const normalizedLabel = label.toLocaleLowerCase(siteConfig.locale);

    const target = parseTarget(value.href);

    if (
      !label ||
      OMITTED_LABELS.has(normalizedLabel) ||
      target.href.toLowerCase().includes("#experience")
    ) {
      continue;
    }

    const key = `${normalizedLabel}\n${target.href}`;

    if (!unique.has(key)) {
      unique.set(key, {
        label,
        href: target.href,
      });
    }
  }

  return Object.freeze(Array.from(unique.values()));
}

const NAVIGATION_ITEMS = createNavigationItems(navItems);

function SmartLink({
  href,
  children,
  className,
  ariaLabel,
  ariaCurrent,
  fallbackHref = HOME_PATH,
  openExternalInNewTab = false,
  onClick,
}: SmartLinkProps) {
  const target = parseTarget(href, fallbackHref);

  if (target.kind === "internal") {
    return (
      <Link
        className={className}
        href={target.href}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        onClick={onClick}
        prefetch={false}
      >
        {children}
      </Link>
    );
  }

  const newTab = target.kind === "external" && openExternalInNewTab;

  return (
    <a
      className={className}
      href={target.href}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      onClick={onClick}
      data-native-navigation
      {...(newTab
        ? {
            target: "_blank",

            rel: "noopener noreferrer",

            referrerPolicy: "strict-origin-when-cross-origin" as const,
          }
        : {})}
    >
      {children}
    </a>
  );
}

function HeaderContent({
  pathname,
}: Readonly<{
  pathname: string;
}>) {
  const currentPath = normalizePathname(pathname);

  const mobileMenuRef = useRef<HTMLDetailsElement | null>(null);

  const visibleItems = useMemo(
    () =>
      currentPath === HOME_PATH
        ? NAVIGATION_ITEMS.filter((item) => {
            const target = parseTarget(item.href);

            return !(
              target.pathname === HOME_PATH &&
              (target.hash === "" || target.hash === "home")
            );
          })
        : NAVIGATION_ITEMS,
    [currentPath],
  );

  const bookingProvider = siteConfig.bookingProvider.trim() || "your booking provider";

  const bookingTarget = parseTarget(siteConfig.bookingUrl, CONTACT_PATH);

  const bookingIsExternal = bookingTarget.kind === "external";

  const bookingLabel = bookingIsExternal
    ? `Book a massage appointment through ${bookingProvider} — opens in a new tab`
    : `Book a massage appointment through ${bookingProvider}`;

  const closeMobileMenu = () => {
    mobileMenuRef.current?.removeAttribute("open");
  };

  const handleMobileLinkClick = () => {
    closeMobileMenu();
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <BrandLogo variant="header" />

        <nav className="nav desktop-nav" aria-label="Primary navigation">
          {visibleItems.map((item) => {
            const target = parseTarget(item.href);

            const current =
              target.kind === "internal" && !target.hash && target.pathname === currentPath
                ? "page"
                : undefined;

            return (
              <SmartLink
                key={`${item.label}-${item.href}`}
                href={item.href}
                ariaCurrent={current}
                openExternalInNewTab={target.kind === "external"}
              >
                {item.label}
              </SmartLink>
            );
          })}
        </nav>

        <details key={currentPath} ref={mobileMenuRef} className="mobile-nav-disclosure">
          <summary className="mobile-menu-toggle">
            <span className="sr-only">Menu</span>

            <span className="mobile-menu-toggle__line" aria-hidden="true" />

            <span className="mobile-menu-toggle__line" aria-hidden="true" />

            <span className="mobile-menu-toggle__line" aria-hidden="true" />
          </summary>

          <nav className="mobile-nav-panel" aria-label="Mobile navigation">
            {visibleItems.map((item) => {
              const target = parseTarget(item.href);

              const current =
                target.kind === "internal" && !target.hash && target.pathname === currentPath
                  ? "page"
                  : undefined;

              return (
                <SmartLink
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  ariaCurrent={current}
                  onClick={handleMobileLinkClick}
                  openExternalInNewTab={target.kind === "external"}
                >
                  {item.label}
                </SmartLink>
              );
            })}

            <SmartLink
              className="mobile-nav-book"
              href={bookingTarget.href}
              fallbackHref={CONTACT_PATH}
              ariaLabel={bookingLabel}
              onClick={handleMobileLinkClick}
              openExternalInNewTab={bookingIsExternal}
            >
              Book a Session
            </SmartLink>
          </nav>
        </details>

        <SmartLink
          className="nav-cta"
          href={bookingTarget.href}
          fallbackHref={CONTACT_PATH}
          ariaLabel={bookingLabel}
          openExternalInNewTab={bookingIsExternal}
        >
          Book Now
        </SmartLink>
      </header>
    </>
  );
}

export function Header() {
  const pathname = usePathname() || HOME_PATH;

  return <HeaderContent pathname={pathname} />;
}
