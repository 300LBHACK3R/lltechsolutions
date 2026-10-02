import type { ReactNode } from "react";
import Link from "next/link";

import { BrandLogo } from "@/components/BrandLogo";
import { developerCredit, getActiveServices, navItems, siteConfig } from "@/lib/site";

const DEFAULT_SITE_ORIGIN = "https://example.com";

const PUBLIC_COMMUNITY = "Your Neighbourhood";

const MIN_PHONE_DIGITS = 7;
const MAX_PHONE_DIGITS = 15;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

const OMITTED_NAV_LABELS = new Set(["home", "experience"]);

type SmartLinkProps = Readonly<{
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  fallbackHref?: string;
  openExternalInNewTab?: boolean;
}>;

type FooterNavigationItem = Readonly<{
  label: string;
  href: string;
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

const siteOrigin = normalizeSiteOrigin(siteConfig.domain);

function isInternalHref(href: string): boolean {
  return href.startsWith("#") || (href.startsWith("/") && !href.startsWith("//"));
}

function isNativeProtocol(href: string): boolean {
  const normalizedHref = href.trim().toLowerCase();

  return (
    normalizedHref.startsWith("mailto:") ||
    normalizedHref.startsWith("tel:") ||
    normalizedHref.startsWith("sms:")
  );
}

function toSafeHttpUrl(href: string): URL | null {
  const candidate = href.trim();

  if (!candidate) {
    return null;
  }

  try {
    const url = new URL(candidate);

    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username.length > 0 ||
      url.password.length > 0
    ) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

function toInternalHref(url: URL): string {
  return `${url.pathname}${url.search}${url.hash}` || "/";
}

function normalizeHref(href: string | undefined, fallbackHref = "/"): string {
  const fallback = fallbackHref.trim();

  const candidate = href?.trim();

  if (!candidate) {
    return fallback;
  }

  if (isInternalHref(candidate) || isNativeProtocol(candidate)) {
    return candidate;
  }

  const httpUrl = toSafeHttpUrl(candidate);

  if (!httpUrl) {
    return fallback;
  }

  if (httpUrl.origin === siteOrigin) {
    return toInternalHref(httpUrl);
  }

  if (httpUrl.protocol !== "https:") {
    return fallback;
  }

  return httpUrl.toString();
}

function isExternalHttpsHref(href: string): boolean {
  const url = toSafeHttpUrl(href);

  return Boolean(url && url.protocol === "https:" && url.origin !== siteOrigin);
}

function normalizePhone(value: string): string {
  const candidate = value.trim();

  const hasLeadingPlus = candidate.startsWith("+");

  const digits = candidate.replace(/\D/g, "");

  if (digits.length < MIN_PHONE_DIGITS || digits.length > MAX_PHONE_DIGITS) {
    return "";
  }

  return hasLeadingPlus ? `+${digits}` : digits;
}

function normalizeEmail(value: string): string {
  const candidate = value.trim().toLowerCase();

  if (candidate.length > 254 || !EMAIL_PATTERN.test(candidate)) {
    return "";
  }

  return candidate;
}

function shouldOmitNavigationItem(item: FooterNavigationItem): boolean {
  const normalizedLabel = item.label.trim().toLowerCase();

  const normalizedHref = item.href.trim().toLowerCase();

  return OMITTED_NAV_LABELS.has(normalizedLabel) || normalizedHref.includes("#experience");
}

function deduplicateNavigationItems(
  items: readonly FooterNavigationItem[],
): FooterNavigationItem[] {
  const uniqueItems = new Map<string, FooterNavigationItem>();

  for (const item of items) {
    if (shouldOmitNavigationItem(item)) {
      continue;
    }

    const label = item.label.trim();

    const href = normalizeHref(item.href, "");

    if (!label || !href) {
      continue;
    }

    const key = `${label.toLowerCase()}\n${href}`;

    if (uniqueItems.has(key)) {
      continue;
    }

    uniqueItems.set(key, {
      label,
      href,
    });
  }

  return Array.from(uniqueItems.values());
}

function SmartLink({
  href,
  children,
  className,
  ariaLabel,
  fallbackHref = "/",
  openExternalInNewTab = false,
}: SmartLinkProps) {
  const normalizedHref = normalizeHref(href, fallbackHref);

  if (!normalizedHref) {
    return null;
  }

  if (isInternalHref(normalizedHref)) {
    return (
      <Link className={className} href={normalizedHref} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  const shouldOpenNewTab = openExternalInNewTab && isExternalHttpsHref(normalizedHref);

  return (
    <a
      className={className}
      href={normalizedHref}
      aria-label={ariaLabel}
      data-native-navigation
      {...(shouldOpenNewTab
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

const footerNavItems = deduplicateNavigationItems(navItems);

const activeServices = [...getActiveServices()].sort(
  (first, second) =>
    Number(second.isSignature) - Number(first.isSignature) ||
    first.displayOrder - second.displayOrder ||
    first.name.localeCompare(second.name, siteConfig.locale),
);

const addressNote =
  siteConfig.addressNote.trim() ||
  `Located in ${PUBLIC_COMMUNITY}, ${siteConfig.primaryCity}, ${siteConfig.region}. Exact appointment details are shared privately through the booking process.`;

export function Footer() {
  const currentYear = new Date().getFullYear();

  const displayPhone = siteConfig.phone.trim();

  const cleanPhone = normalizePhone(siteConfig.phoneE164 || displayPhone);

  const email = normalizeEmail(siteConfig.email);

  const telephoneHref = siteConfig.demoMode
    ? "/contact/#sample-contact"
    : cleanPhone
      ? `tel:${cleanPhone}`
      : "";

  const emailHref = siteConfig.demoMode
    ? "/contact/#sample-contact"
    : email
      ? `mailto:${email}`
      : "";

  const bookingProvider = siteConfig.bookingProvider.trim() || "your booking provider";

  const bookingHref = normalizeHref(siteConfig.bookingUrl, "/contact");

  const bookingIsExternal = isExternalHttpsHref(bookingHref);

  const developerHref = developerCredit.url ? normalizeHref(developerCredit.url, "") : "";

  const developerIsExternal = developerHref ? isExternalHttpsHref(developerHref) : false;

  return (
    <footer className="site-footer-final" aria-labelledby="site-footer-heading">
      <div className="site-footer-final__inner">
        <div className="site-footer-final__main">
          <section className="site-footer-final__brand" aria-labelledby="site-footer-heading">
            <BrandLogo variant="footer" />

            <div>
              <p className="site-footer-final__kicker">
                Massage Therapy · {PUBLIC_COMMUNITY}, {siteConfig.primaryCity}
              </p>

              <h2 id="site-footer-heading">{siteConfig.businessName}</h2>
            </div>

            <p>
              Personalized massage and body-care treatments with client-led communication,
              straightforward pricing, and online booking.
            </p>

            <p>
              Treatment questions, appointment expectations, availability, billing, payments, and
              policies are organized in the <SmartLink href="/faq">FAQ</SmartLink>.
            </p>
          </section>

          <div className="site-footer-final__navs">
            {footerNavItems.length > 0 ? (
              <div>
                <strong>Explore</strong>

                <nav aria-label="Footer site navigation">
                  {footerNavItems.map((item) => (
                    <SmartLink key={`${item.label}-${item.href}`} href={item.href}>
                      {item.label}
                    </SmartLink>
                  ))}
                </nav>
              </div>
            ) : null}

            {activeServices.length > 0 ? (
              <div>
                <strong>Services</strong>

                <nav aria-label="Footer service navigation">
                  {activeServices.map((service) => (
                    <SmartLink
                      key={service.slug}
                      href={`/services/${encodeURIComponent(service.slug)}`}
                    >
                      {service.name}
                    </SmartLink>
                  ))}
                </nav>
              </div>
            ) : null}
          </div>

          <address className="site-footer-final__booking">
            <strong>Booking & Contact</strong>

            <p>{addressNote}</p>

            <p>Online booking through {bookingProvider}</p>

            {displayPhone && telephoneHref ? (
              <a
                href={telephoneHref}
                aria-label={`Call your practitioner at ${displayPhone}`}
                data-native-navigation
              >
                {displayPhone}
              </a>
            ) : null}

            {email && emailHref ? (
              <a
                href={emailHref}
                aria-label={`Email your practitioner at ${email}`}
                data-native-navigation
              >
                {email}
              </a>
            ) : null}

            <SmartLink
              className="site-footer-final__button"
              href={bookingHref}
              fallbackHref="/contact"
              ariaLabel={
                bookingIsExternal
                  ? `Open ${siteConfig.businessName} booking through ${bookingProvider} — opens in a new tab`
                  : `Contact ${siteConfig.businessName} about booking`
              }
              openExternalInNewTab={bookingIsExternal}
            >
              Check Availability
            </SmartLink>

            <SmartLink
              className="site-footer-final__button site-footer-final__button--secondary"
              href="/faq"
              ariaLabel={`Read frequently asked questions for ${siteConfig.businessName}`}
            >
              Read the FAQ
            </SmartLink>
          </address>
        </div>

        {siteConfig.demoMode && (
          <p className="source-sample-disclosure">
            Fictional sample practice. Images, services, prices, hours, and policies are
            illustrative. Contact and booking actions stay in this demo.
          </p>
        )}
        <div className="site-footer-final__bottom">
          <p>
            © {currentYear} {siteConfig.businessName}. All rights reserved.
          </p>

          <p>
            {developerCredit.label}{" "}
            {developerHref ? (
              <SmartLink
                href={developerHref}
                fallbackHref=""
                ariaLabel={`Visit ${developerCredit.name}${
                  developerIsExternal ? " — opens in a new tab" : ""
                }`}
                openExternalInNewTab={developerIsExternal}
              >
                {developerCredit.name}
              </SmartLink>
            ) : (
              <span>{developerCredit.name}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
