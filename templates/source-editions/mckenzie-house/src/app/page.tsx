import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { getActiveServices, siteConfig, trustSignals } from "@/lib/site";

const HOME_PATH = "/";

const DEFAULT_SITE_ORIGIN = "https://example.com";

const PUBLIC_COMMUNITY = "Your Neighbourhood";

const pageTitle = "Massage and Body-Care Treatments in Your Neighbourhood, Your City";

const fullPageTitle = `${pageTitle} | ${siteConfig.businessName}`;

const pageDescription =
  "Explore personalized Massage, signature Sensory Massage, Seasonal Body Renewal, and Cup & Buff in Your Neighbourhood, Your City, with clear pricing, client-led care, and online booking.";

type JsonLdProps = {
  data: Record<string, unknown>;
};

type SmartLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  fallbackHref?: string;
  openExternalInNewTab?: boolean;
};

type BookingLinkProps = {
  className: string;
  children: ReactNode;
  ariaLabel?: string;
};

function normalizeSiteOrigin(value: string): string {
  try {
    const url = new URL(value);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return DEFAULT_SITE_ORIGIN;
    }

    return url.origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

function toAbsoluteHttpUrl(value: string, siteOrigin: string): string | null {
  const candidate = value.trim();

  if (!candidate) {
    return null;
  }

  try {
    const url = new URL(candidate, `${siteOrigin}/`);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

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

function isSafeHttpHref(href: string): boolean {
  try {
    const url = new URL(href);

    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function normalizeHref(href: string, fallbackHref: string): string {
  const candidate = href.trim();

  if (isInternalHref(candidate) || isNativeProtocol(candidate) || isSafeHttpHref(candidate)) {
    return candidate;
  }

  return fallbackHref;
}

function normalizePhoneForHref(value: string): string {
  const candidate = value.trim();

  const hasLeadingPlus = candidate.startsWith("+");

  const digits = candidate.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  return hasLeadingPlus ? `+${digits}` : digits;
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

function SmartLink({
  href,
  className,
  children,
  ariaLabel,
  fallbackHref = HOME_PATH,
  openExternalInNewTab = false,
}: SmartLinkProps) {
  const normalizedHref = normalizeHref(href, fallbackHref);

  if (isInternalHref(normalizedHref)) {
    return (
      <Link className={className} href={normalizedHref} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  const shouldOpenNewTab = openExternalInNewTab && isSafeHttpHref(normalizedHref);

  return (
    <a
      className={className}
      href={normalizedHref}
      aria-label={ariaLabel}
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

const siteOrigin = normalizeSiteOrigin(siteConfig.domain);

const canonicalUrl = `${siteOrigin}/`;

const websiteId = `${siteOrigin}/#website`;

const businessId = `${siteOrigin}/#business`;

const webpageId = `${canonicalUrl}#webpage`;

const servicesListId = `${canonicalUrl}#services`;

const primaryImageId = `${canonicalUrl}#primary-image`;

const breadcrumbId = `${canonicalUrl}#breadcrumb`;

const openGraphImageUrl =
  toAbsoluteHttpUrl(siteConfig.assets.openGraphImage, siteOrigin) || canonicalUrl;

const bookingUrl = siteConfig.bookingUrl;

const activeServices = [...getActiveServices()].sort(
  (first, second) =>
    Number(second.isSignature) - Number(first.isSignature) ||
    first.displayOrder - second.displayOrder ||
    first.name.localeCompare(second.name, siteConfig.locale),
);

type ActiveService = (typeof activeServices)[number];

const cleanPhone = normalizePhoneForHref(siteConfig.phoneE164 || siteConfig.phone);

const textMessageHref = siteConfig.demoMode
  ? "/contact/#sample-contact"
  : cleanPhone
    ? `sms:${cleanPhone}`
    : "/contact";

const publicLocation = `${PUBLIC_COMMUNITY}, ${siteConfig.primaryCity}, ${siteConfig.region}`;

const publicAddressNote =
  "Exact appointment details are shared privately through the booking process.";

function getServiceUrl(service: ActiveService): string {
  return `${siteOrigin}/services/` + service.slug;
}

function getServiceImageUrl(service: ActiveService): string {
  return toAbsoluteHttpUrl(service.image, siteOrigin) || openGraphImageUrl;
}

function createServiceSchema(service: ActiveService): Record<string, unknown> {
  const serviceUrl = getServiceUrl(service);

  return {
    "@type": "Service",

    "@id": `${serviceUrl}#service`,

    name: service.name,

    serviceType: service.name,

    description: service.description,

    url: serviceUrl,

    image: getServiceImageUrl(service),

    provider: {
      "@id": businessId,
    },

    areaServed: {
      "@type": "City",

      name: siteConfig.primaryCity,

      addressRegion: siteConfig.region,

      addressCountry: siteConfig.countryCode,
    },
  };
}

const serviceSchemaItems = activeServices.map(createServiceSchema);

const homePageStructuredData: Record<string, unknown> = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebPage",

      "@id": webpageId,

      url: canonicalUrl,

      name: fullPageTitle,

      description: pageDescription,

      inLanguage: siteConfig.locale,

      isPartOf: {
        "@id": websiteId,
      },

      about: {
        "@id": businessId,
      },

      mainEntity: {
        "@id": servicesListId,
      },

      primaryImageOfPage: {
        "@id": primaryImageId,
      },

      breadcrumb: {
        "@id": breadcrumbId,
      },

      hasPart: serviceSchemaItems.map((service) => ({
        "@id": service["@id"],
      })),
    },

    {
      "@type": "ImageObject",

      "@id": primaryImageId,

      url: openGraphImageUrl,

      contentUrl: openGraphImageUrl,

      caption: siteConfig.assets.openGraphImageAlt,
    },

    {
      "@type": "ItemList",

      "@id": servicesListId,

      name: `${siteConfig.businessName} services`,

      numberOfItems: serviceSchemaItems.length,

      itemListOrder: "https://schema.org/ItemListOrderAscending",

      itemListElement: serviceSchemaItems.map((service, index) => ({
        "@type": "ListItem",

        position: index + 1,

        item: {
          "@id": service["@id"],
        },
      })),
    },

    ...serviceSchemaItems,

    {
      "@type": "BreadcrumbList",

      "@id": breadcrumbId,

      itemListElement: [
        {
          "@type": "ListItem",

          position: 1,

          name: "Home",

          item: canonicalUrl,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
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

        alt: siteConfig.assets.openGraphImageAlt,
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

  other: {
    "geo.region": "CA-AB",

    "geo.placename": publicLocation,
  },
};

function BookingLink({ className, children, ariaLabel }: BookingLinkProps) {
  if (!bookingUrl || bookingUrl.startsWith("/")) {
    return (
      <Link className={className} href={bookingUrl || "/contact"} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="strict-origin-when-cross-origin"
      aria-label={
        ariaLabel ||
        `Open ${siteConfig.businessName} booking through ${siteConfig.bookingProvider} — opens in a new tab`
      }
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={homePageStructuredData} />

      <MotionProvider />
      <Header />

      <main id="main-content">
        <section id="home" className="organic-hero" aria-labelledby="home-heading">
          <div className="hero-media" aria-hidden="true">
            <Image
              className="hero-static-image"
              src={siteConfig.assets.heroImage}
              alt=""
              fill
              preload
              quality={88}
              sizes="100vw"
            />

            <div className="hero-wash" />
            <div className="botanical-pattern" />

            <div className="ambient-orb orb-one" />
            <div className="ambient-orb orb-two" />
          </div>

          <div className="hero-inner">
            <p className="hero-pill reveal-up">
              <span aria-hidden="true" />
              Fictional sample practice · Your City
            </p>

            <h1 id="home-heading" className="reveal-up delay-1">
              Restore. Relax.
            </h1>

            <p className="hero-copy reveal-up delay-2">
              A calm, client-led massage experience shaped around pressure preference, comfort,
              communication, and what your body needs that day.
            </p>

            <div className="hero-actions reveal-up delay-3">
              <BookingLink className="button primary">Book a Session</BookingLink>

              <Link className="button secondary" href="/#services">
                Explore Services
              </Link>
            </div>

            <div className="hero-stat-row reveal-up delay-5">
              <div>
                <strong>Client-led</strong>

                <span>Pressure, pace, positioning, and focus are adjusted around you.</span>
              </div>

              <div>
                <strong>Clear policies</strong>

                <span>Add your verified billing and coverage information.</span>
              </div>

              <div>
                <strong>Simple pricing</strong>

                <span>No tipping is expected or accepted.</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="section services-section"
          aria-labelledby="services-heading"
          data-reveal-stagger="85"
        >
          <div className="section-heading" data-reveal-item>
            <p className="eyebrow">Services</p>

            <h2 id="services-heading">
              Massage and body-care services shaped around comfort and goals.
            </h2>

            <p>
              Explore customized Massage, signature Sensory Massage, Seasonal Body Renewal with a
              salt-or-sugar scrub, and Cup & Buff recovery work. Every service is clearly explained,
              professionally presented, and connected to online booking.
            </p>
          </div>

          <div className="service-grid">
            {activeServices.length > 0 ? (
              activeServices.map((service, index) => (
                <Link
                  className={[
                    "service-card",
                    "service-card-link",
                    `service-card--${service.slug}`,
                    service.isSignature ? "service-card--signature" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  href={`/services/${service.slug}`}
                  key={service.slug}
                  aria-label={`View details for ${service.name}`}
                  data-reveal-item
                >
                  {service.isSignature ? (
                    <span className="service-card__signature-badge">
                      <span aria-hidden="true">✦</span>
                      Signature Service
                    </span>
                  ) : null}

                  <div className="service-image">
                    {service.image ? (
                      <Image
                        className="service-card-image"
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        quality={84}
                        sizes="
                            (max-width: 720px) 100vw,
                            (max-width: 1280px) 50vw,
                            25vw
                          "
                      />
                    ) : (
                      <div className="hero-media-placeholder" aria-hidden="true" />
                    )}

                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="service-content">
                    <p className="mini-eyebrow">View treatment</p>

                    <h3>{service.name}</h3>

                    <p>{service.description}</p>

                    <div className="chip-row" aria-label={`Best suited for ${service.name}`}>
                      {service.bestFor.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    <small>{service.pressure}</small>

                    <span className="service-link-text">
                      Explore service
                      <span aria-hidden="true"> →</span>
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <article className="service-card" data-reveal-item>
                <div className="service-content">
                  <p className="mini-eyebrow">Services</p>

                  <h3>Final service details are being prepared.</h3>

                  <p>your practice’s sample service menu will appear here before launch.</p>
                </div>
              </article>
            )}
          </div>
        </section>

        <section
          className="section reviews-story-panel scroll-reveal"
          aria-labelledby="client-trust-heading"
          data-reveal-stagger="90"
        >
          <div className="reviews-story-panel__card">
            <div data-reveal-item>
              <p className="eyebrow">Your practice story</p>

              <h2 id="client-trust-heading">Confidence begins before the appointment.</h2>

              <p>
                Use the reviews layout to share permission-approved feedback. The sample cards are
                editing prompts, ready for your own content.
              </p>

              <div className="reviews-consent-note__actions">
                <Link className="button primary" href="/reviews">
                  Explore the Reviews Layout
                </Link>

                <Link className="button secondary" href={bookingUrl || "/contact"}>
                  Ask a Question
                </Link>
              </div>
            </div>

            <div className="reviews-story-panel__list" aria-label="Client trust highlights">
              {trustSignals.map((signal) => (
                <article key={signal.title} data-reveal-item>
                  <span>{signal.label}</span>

                  <strong>{signal.title}</strong>

                  <p>{signal.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="booking"
          className="section booking-luxury scroll-reveal"
          aria-labelledby="booking-heading"
          data-reveal-stagger="90"
        >
          <div className="booking-luxury__card">
            <div className="booking-luxury__copy" data-reveal-item>
              <p className="eyebrow">Online Booking</p>

              <h2 id="booking-heading">Book through {siteConfig.bookingProvider}.</h2>

              <p>
                View your practice’s availability, select your service and appointment length, and
                complete your booking through {siteConfig.bookingProvider}.
              </p>

              <div className="booking-luxury__actions">
                <BookingLink className="button primary">Open Booking</BookingLink>

                {siteConfig.waitlist.enabled ? (
                  <SmartLink
                    className="button secondary"
                    href={siteConfig.waitlist.href}
                    fallbackHref={textMessageHref}
                    ariaLabel={siteConfig.waitlist.buttonLabel}
                  >
                    {siteConfig.waitlist.buttonLabel}
                  </SmartLink>
                ) : (
                  <a
                    className="button secondary"
                    href={textMessageHref}
                    aria-label={`Text your practitioner at ${siteConfig.phone}`}
                  >
                    Text your practitioner
                  </a>
                )}
              </div>
            </div>

            <div className="booking-luxury__details" aria-label="Booking details">
              <article data-reveal-item>
                <span>Location</span>

                <strong>{publicLocation}</strong>

                <p>{publicAddressNote}</p>
              </article>

              <article data-reveal-item>
                <span>Regular Hours</span>

                <strong>Tuesday–Friday</strong>

                <p>10:00 AM–4:30 PM</p>
              </article>

              <article data-reveal-item>
                <span>Booking System</span>

                <strong>{siteConfig.bookingProvider}</strong>

                <p>
                  Availability, intake, and scheduling remain managed through your practitioner’s
                  booking platform.
                </p>
              </article>

              <article data-reveal-item>
                <span>Simple Pricing</span>

                <strong>{siteConfig.tippingPolicy.heading}</strong>

                <p>{siteConfig.tippingPolicy.statement}</p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <BookingLink className="mobile-sticky-book">Book Now</BookingLink>

      <Footer />
    </>
  );
}
