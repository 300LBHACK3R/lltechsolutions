import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import type { PricingGroup } from "@/lib/site";
import { pricingGroups, pricingNotices, siteConfig } from "@/lib/site";

import styles from "./PricingPage.module.css";

const PRICING_PATH = "/pricing";

const DEFAULT_SITE_ORIGIN = "https://example.com";

const PUBLIC_COMMUNITY = "Your Neighbourhood";

const OPEN_GRAPH_IMAGE_WIDTH = 1_200;

const OPEN_GRAPH_IMAGE_HEIGHT = 630;

const SERVICE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const pageTitle = "Massage Pricing in Your Neighbourhood, Your City";

const fullPageTitle = `${pageTitle} | ${siteConfig.businessName}`;

const pageDescription =
  "View current Cedar House Wellness pricing in Your Neighbourhood, Your City for Massage, Sensory Massage, Seasonal Body Renewal, and Cup & Buff, with clear durations, GST information, direct-billing guidance, and no tipping expected.";

type JsonLdProps = Readonly<{
  data: Record<string, unknown>;
}>;

type BookingActionProps = Readonly<{
  className: string;
  fallbackLabel: string;
  children: ReactNode;
}>;

function normalizeSiteOrigin(value: string): string {
  try {
    const url = new URL(value);

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

function toAbsoluteHttpUrl(value: string, baseOrigin: string): string | null {
  const candidate = value.trim();

  if (!candidate) {
    return null;
  }

  try {
    const url = new URL(candidate, `${baseOrigin}/`);

    if (
      (url.protocol !== "https:" && url.protocol !== "http:") ||
      url.username.length > 0 ||
      url.password.length > 0
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function toSecureUrl(value: string, baseOrigin: string): URL | null {
  const absoluteUrl = toAbsoluteHttpUrl(value, baseOrigin);

  if (!absoluteUrl) {
    return null;
  }

  try {
    const url = new URL(absoluteUrl);

    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function toRelativeHref(url: URL): string {
  return `${url.pathname}` + `${url.search}` + `${url.hash}`;
}

function createServiceHref(serviceSlug: string | undefined): string | null {
  const normalizedSlug = serviceSlug?.trim().toLowerCase() || "";

  if (!normalizedSlug || !SERVICE_SLUG_PATTERN.test(normalizedSlug)) {
    return null;
  }

  return `/services/${normalizedSlug}`;
}

function parseSingleNumericPrice(value: string): number | null {
  const normalizedValue = value.replace(/,/g, "");

  const matches = [...normalizedValue.matchAll(/(?:CAD\s*|\$)\s*(\d+(?:\.\d{1,2})?)/gi)];

  if (matches.length !== 1) {
    return null;
  }

  const numericPrice = Number(matches[0][1]);

  return Number.isFinite(numericPrice) ? numericPrice : null;
}

function createPricingOffers(
  group: PricingGroup,
  serviceUrl: string,
): Array<Record<string, unknown>> {
  return group.prices.map((item, index) => {
    const numericPrice = parseSingleNumericPrice(item.price);

    const excludesTax = /\+\s*GST\b/i.test(item.price);

    return {
      "@type": "Offer",
      "@id": `${serviceUrl}#offer-${index + 1}`,
      url: serviceUrl,
      name: `${group.name} — ${item.duration}`,
      priceCurrency: siteConfig.currency,
      description: `${item.duration}: ${item.price}`,
      ...(numericPrice !== null
        ? {
            price: numericPrice,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: numericPrice,
              priceCurrency: siteConfig.currency,
              unitText: item.duration,
              ...(excludesTax
                ? {
                    valueAddedTaxIncluded: false,
                  }
                : {}),
            },
          }
        : {}),
    };
  });
}

function safeJsonStringify(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function JsonLd({ data }: JsonLdProps) {
  if (siteConfig.demoMode) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonStringify(data),
      }}
    />
  );
}

const siteOrigin = normalizeSiteOrigin(siteConfig.domain);

const canonicalUrl = `${siteOrigin}${PRICING_PATH}`;

const openGraphImageUrl =
  toAbsoluteHttpUrl(siteConfig.assets.openGraphImage, siteOrigin) || `${siteOrigin}/`;

const bookingDestination = toSecureUrl(siteConfig.bookingUrl, siteOrigin);

const bookingUrl = bookingDestination?.toString() || null;

const publicLocation = `${PUBLIC_COMMUNITY}, ${siteConfig.primaryCity}, ${siteConfig.region}`;

const pricingItemListId = `${canonicalUrl}#services`;

const pricingListItems = pricingGroups.map((group, index) => {
  const serviceHref = createServiceHref(group.serviceSlug);

  const serviceUrl = serviceHref ? `${siteOrigin}${serviceHref}` : canonicalUrl;

  const serviceId = serviceHref
    ? `${serviceUrl}#service`
    : `${pricingItemListId}-item-${index + 1}`;

  const offers = createPricingOffers(group, serviceUrl);

  return {
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      "@id": serviceId,
      url: serviceUrl,
      name: group.name,
      ...(group.note
        ? {
            description: group.note,
          }
        : {}),
      provider: {
        "@id": `${siteOrigin}/#business`,
      },
      areaServed: {
        "@type": "Place",
        name: publicLocation,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.primaryCity,
          addressRegion: siteConfig.region,
          addressCountry: siteConfig.countryCode,
        },
      },
      ...(offers.length > 0 ? { offers } : {}),
    },
  };
});

const pricingPageStructuredData: Record<string, unknown> = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: fullPageTitle,
      description: pageDescription,
      inLanguage: siteConfig.locale,
      isPartOf: {
        "@id": `${siteOrigin}/#website`,
      },
      about: {
        "@id": `${siteOrigin}/#business`,
      },
      mainEntity: {
        "@id": pricingItemListId,
      },
      breadcrumb: {
        "@id": `${canonicalUrl}#breadcrumb`,
      },
      ...(bookingUrl
        ? {
            potentialAction: {
              "@type": "ReserveAction",
              name: `Book with ${siteConfig.businessName}`,
              target: {
                "@type": "EntryPoint",
                urlTemplate: bookingUrl,
                actionPlatform: [
                  "https://schema.org/DesktopWebPlatform",
                  "https://schema.org/MobileWebPlatform",
                ],
              },
            },
          }
        : {}),
    },

    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteOrigin}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pricing",
          item: canonicalUrl,
        },
      ],
    },

    {
      "@type": "ItemList",
      "@id": pricingItemListId,
      name: `${siteConfig.businessName} treatment pricing`,
      numberOfItems: pricingListItems.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: pricingListItems,
    },
  ],
};

export const metadata: Metadata = {
  /**
   * The root layout owns the site-wide title template, so this route
   * supplies only its page-specific title.
   */
  title: pageTitle,
  description: pageDescription,

  alternates: {
    canonical: canonicalUrl,
  },

  openGraph: {
    title: fullPageTitle,
    description: pageDescription,
    url: canonicalUrl,
    siteName: siteConfig.businessName,
    locale: siteConfig.locale.replace("-", "_"),
    type: "website",
    images: [
      {
        url: openGraphImageUrl,
        width: OPEN_GRAPH_IMAGE_WIDTH,
        height: OPEN_GRAPH_IMAGE_HEIGHT,
        alt: siteConfig.assets.openGraphImageAlt || `${siteConfig.businessName} treatment pricing`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: fullPageTitle,
    description: pageDescription,
    images: [openGraphImageUrl],
  },

  category: "Health and wellness",

  /**
   * Root layout and robots.ts control environment-aware indexing.
   * Do not add a route-level index:true override here.
   */
  other: {
    "geo.region": "CA-AB",
    "geo.placename": publicLocation,
  },
};

function BookingAction({ className, fallbackLabel, children }: BookingActionProps) {
  if (!bookingDestination) {
    return (
      <Link className={className} href="/contact">
        {fallbackLabel}
      </Link>
    );
  }

  if (bookingDestination.origin === siteOrigin) {
    return (
      <Link className={className} href={toRelativeHref(bookingDestination)}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={bookingDestination.toString()}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="strict-origin-when-cross-origin"
      aria-label={`Open ${siteConfig.businessName} booking through ${siteConfig.bookingProvider} — opens in a new tab`}
      data-native-navigation
    >
      {children}
    </a>
  );
}

export default function PricingPage() {
  const serviceCountLabel = `${pricingGroups.length} ${
    pricingGroups.length === 1 ? "Service" : "Services"
  }`;

  return (
    <>
      <JsonLd data={pricingPageStructuredData} />

      <MotionProvider />
      <Header />

      <main id="main-content" className={styles.page}>
        <section
          className={`${styles.hero} scroll-reveal`}
          aria-labelledby="pricing-page-heading"
          data-reveal-stagger="90"
        >
          <div className={styles.heroGlow} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={styles.heroCopy} data-reveal-item>
              <p className={styles.eyebrow}>Pricing</p>

              <h1 id="pricing-page-heading">Clear treatment pricing.</h1>

              <p className={styles.heroLead}>
                Choose the service and appointment length that fit best, then continue into your
                practice’s {siteConfig.bookingProvider} booking schedule.
              </p>

              <div className={styles.heroActions} role="group" aria-label="Pricing page actions">
                <BookingAction className="button primary" fallbackLabel="Ask About Booking">
                  Check Availability
                </BookingAction>

                <Link className="button secondary" href="/#services">
                  Explore Services
                </Link>
              </div>
            </div>

            <aside className={styles.heroPanel} aria-label="Pricing highlights" data-reveal-item>
              <div>
                <span>Current Menu</span>

                <strong>{serviceCountLabel}</strong>
              </div>

              <div>
                <span>Price Display</span>

                <strong>Before GST</strong>
              </div>

              <div>
                <span>Tipping</span>

                <strong>Not expected or accepted</strong>
              </div>

              <div>
                <span>Booking</span>

                <strong>Live through {siteConfig.bookingProvider}</strong>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="pricing"
          className="section pricing-menu-luxury scroll-reveal"
          aria-labelledby="pricing-heading"
          data-reveal-stagger="80"
        >
          <div className="pricing-menu-luxury__intro" data-reveal-item>
            <p className="eyebrow">Treatment Rates</p>

            <h2 id="pricing-heading">Choose your service and appointment length.</h2>

            <p>
              Every listed service remains client-led. Pressure, pacing, positioning, and focus can
              be adjusted within the treatment itself.
            </p>
          </div>

          <div className="pricing-menu-luxury__shell">
            <div
              className="pricing-menu-luxury__cards"
              role="list"
              aria-label="Treatment pricing menu"
            >
              {pricingGroups.map((group, groupIndex) => {
                const serviceHref = createServiceHref(group.serviceSlug);

                const groupKey = group.serviceSlug || `${group.name}-${groupIndex}`;

                return (
                  <article
                    className="pricing-menu-card"
                    key={groupKey}
                    role="listitem"
                    data-reveal-item
                  >
                    <header>
                      <span>Service</span>

                      <h3>
                        {serviceHref ? <Link href={serviceHref}>{group.name}</Link> : group.name}
                      </h3>

                      {group.note ? <p>{group.note}</p> : null}
                    </header>

                    <div
                      className="pricing-menu-card__rows"
                      role="list"
                      aria-label={`${group.name} appointment lengths and prices`}
                    >
                      {group.prices.map((item, priceIndex) => (
                        <div
                          className="pricing-menu-card__row"
                          key={`${groupKey}-${item.duration}-${item.price}-${priceIndex}`}
                          role="listitem"
                        >
                          <strong>{item.duration}</strong>

                          <span>{item.price}</span>
                        </div>
                      ))}
                    </div>

                    {serviceHref ? (
                      <Link
                        className={styles.serviceLink}
                        href={serviceHref}
                        aria-label={`View ${group.name} treatment details`}
                      >
                        View treatment details
                        <span aria-hidden="true">→</span>
                      </Link>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className={`${styles.support} scroll-reveal`}
          aria-labelledby="pricing-support-heading"
          data-reveal-stagger="80"
        >
          <div className={styles.supportIntro} data-reveal-item>
            <p className={styles.eyebrow}>Before You Book</p>

            <h2 id="pricing-support-heading">Simple policies, clearly explained.</h2>

            <p>
              Payment, direct billing, GST, and tipping information should be clear before you
              arrive.
            </p>
          </div>

          <div className={styles.supportGrid} role="list" aria-label="Pricing and payment policies">
            {pricingNotices.map((notice) => (
              <article key={notice.id} role="listitem" data-reveal-item>
                <span>{notice.title}</span>

                <p>{notice.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`${styles.bookingCta} scroll-reveal`}
          aria-labelledby="pricing-booking-heading"
          data-reveal-stagger="80"
        >
          <div data-reveal-item>
            <p className={styles.eyebrow}>Ready to Book?</p>

            <h2 id="pricing-booking-heading">Choose a service, then find a time that works.</h2>

            <p>
              Live appointment availability remains managed through {siteConfig.bookingProvider}.
            </p>
          </div>

          <div
            className={styles.bookingActions}
            role="group"
            aria-label="Booking and contact actions"
            data-reveal-item
          >
            <BookingAction className="button primary" fallbackLabel="Contact your practitioner">
              Check Availability
            </BookingAction>

            <Link className="button secondary" href="/contact">
              Ask a Question
            </Link>
          </div>
        </section>
      </main>

      <BookingAction className="mobile-sticky-book" fallbackLabel="Contact your practitioner">
        Book Now
      </BookingAction>

      <Footer />
    </>
  );
}
