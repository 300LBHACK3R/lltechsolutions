import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { ServicePreviewVideo } from "@/components/ServicePreviewVideo";
import type { PricingGroup, Service } from "@/lib/site";
import {
  getActiveServices,
  getDirectBillingDisplayText,
  getServiceBySlug,
  pricingGroups,
  siteConfig,
} from "@/lib/site";

import styles from "./ServicePage.module.css";

type ServicePageProps = Readonly<{
  params: Promise<{
    slug: string;
  }>;
}>;

type JsonLdProps = Readonly<{
  data: Record<string, unknown>;
}>;

type ServiceOfferRow = Readonly<{
  duration: string;
  price: string;
}>;

type ActionLinkProps = Readonly<{
  href: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}>;

type BookingLinkProps = Readonly<{
  className: string;
  children: ReactNode;
}>;

type OpeningHoursSummary = Readonly<{
  days: string;
  hours: string;
}>;

const DEFAULT_SITE_ORIGIN = "https://example.com";

const PUBLIC_COMMUNITY = "Your Neighbourhood";

const SERVICE_MEDIA_SIZES = "(max-width: 760px) 100vw, " + "(max-width: 1180px) 58vw, " + "36vw";

const RELATED_SERVICE_IMAGE_SIZES =
  "(max-width: 720px) 100vw, " + "(max-width: 1100px) 50vw, " + "33vw";

const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const activeServices = getActiveServices();

export const dynamicParams = false;

function containsControlCharacters(value: string): boolean {
  for (const character of value) {
    const characterCode = character.charCodeAt(0);

    if (characterCode <= 31 || characterCode === 127) {
      return true;
    }
  }

  return false;
}

function normalizeSiteOrigin(value: string): string {
  const candidate = value.trim();

  if (!candidate || containsControlCharacters(candidate)) {
    return DEFAULT_SITE_ORIGIN;
  }

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

function toAbsoluteHttpUrl(value: string, siteOrigin: string): string | null {
  const candidate = value.trim();

  if (!candidate || containsControlCharacters(candidate)) {
    return null;
  }

  try {
    const url = new URL(candidate, `${siteOrigin}/`);

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

function isInternalHref(value: string): boolean {
  return value.startsWith("#") || (value.startsWith("/") && !value.startsWith("//"));
}

function isNativeProtocol(value: string): boolean {
  const normalizedValue = value.trim().toLowerCase();

  return (
    normalizedValue.startsWith("mailto:") ||
    normalizedValue.startsWith("tel:") ||
    normalizedValue.startsWith("sms:")
  );
}

function normalizeActionHref(value: string, fallback: string): string {
  const candidate = value.trim();

  if (!candidate || containsControlCharacters(candidate)) {
    return fallback;
  }

  if (isInternalHref(candidate) || isNativeProtocol(candidate)) {
    return candidate;
  }

  return toAbsoluteHttpUrl(candidate, siteOrigin) || fallback;
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

function isActiveService(service: Service | undefined): service is Service {
  return service?.status === "active";
}

function getServicePricingGroup(service: Service): PricingGroup | undefined {
  return pricingGroups.find(
    (group) => group.serviceSlug === service.slug || group.name === service.name,
  );
}

function getRelatedServices(currentService: Service): Service[] {
  /*
   * With four active launch services, every service page intentionally
   * presents the other three in the same stable display order. A ranking
   * algorithm added complexity without changing the rendered result.
   */
  return activeServices.filter((service) => service.slug !== currentService.slug).slice(0, 3);
}

function getUniqueTextValues(values: readonly string[]): string[] {
  const uniqueValues = new Map<string, string>();

  for (const value of values) {
    const normalizedValue = value.trim().replace(/\s+/g, " ");

    if (!normalizedValue) {
      continue;
    }

    const comparisonKey = normalizedValue.toLocaleLowerCase(siteConfig.locale);

    if (!uniqueValues.has(comparisonKey)) {
      uniqueValues.set(comparisonKey, normalizedValue);
    }
  }

  return Array.from(uniqueValues.values());
}

function createMetadataDescription(service: Service): string {
  const description = service.description.trim().replace(/\s+/g, " ");

  if (description) {
    return description;
  }

  return (
    `${service.name} in ${PUBLIC_COMMUNITY}, ` +
    `${siteConfig.primaryCity}, with current ` +
    `pricing and online booking through ` +
    `${siteConfig.bookingProvider}.`
  );
}

function formatClockTime(value: string): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());

  if (!match) {
    return value.trim();
  }

  const hour = Number(match[1]);

  const minute = Number(match[2]);

  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return value.trim();
  }

  const period = hour >= 12 ? "PM" : "AM";

  const displayHour = hour % 12 || 12;

  return `${displayHour}:` + `${String(minute).padStart(2, "0")} ` + period;
}

function getDayIndex(value: string): number {
  const index = DAY_ORDER.indexOf(value as (typeof DAY_ORDER)[number]);

  return index >= 0 ? index : DAY_ORDER.length;
}

function formatDayLabel(
  values: readonly string[],
  listType: Intl.ListFormatType = "conjunction",
): string {
  const uniqueDays = Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort(
    (first, second) => getDayIndex(first) - getDayIndex(second),
  );

  if (uniqueDays.length === 0) {
    return "See live availability";
  }

  const indices = uniqueDays.map((day) => getDayIndex(day));

  const allDaysAreKnown = indices.every((index) => index < DAY_ORDER.length);

  const daysAreConsecutive =
    allDaysAreKnown &&
    indices.every((index, position) => position === 0 || index === indices[position - 1] + 1);

  if (uniqueDays.length > 1 && daysAreConsecutive) {
    return `${uniqueDays[0]}–` + `${uniqueDays.at(-1)}`;
  }

  return new Intl.ListFormat(siteConfig.locale, {
    style: "long",
    type: listType,
  }).format(uniqueDays);
}

function createOpeningHoursSummary(): OpeningHoursSummary {
  const regularEntries = siteConfig.openingHours.filter(
    (entry) => !entry.isByRequest && Boolean(entry.opens) && Boolean(entry.closes),
  );

  if (regularEntries.length === 0) {
    return {
      days: "See live availability",

      hours: `View current times in ${siteConfig.bookingProvider}.`,
    };
  }

  const firstEntry = regularEntries[0];

  const allTimesMatch = regularEntries.every(
    (entry) => entry.opens === firstEntry.opens && entry.closes === firstEntry.closes,
  );

  return {
    days: formatDayLabel(regularEntries.map((entry) => entry.day)),

    hours:
      allTimesMatch && firstEntry.opens && firstEntry.closes
        ? `${formatClockTime(firstEntry.opens)}–` + `${formatClockTime(firstEntry.closes)}`
        : `View current times in ${siteConfig.bookingProvider}.`,
  };
}

/**
 * Returns a numeric price only when the display string contains one
 * unambiguous monetary amount.
 *
 * A range such as "$60–$205 + GST" is intentionally not reduced to
 * "$60", because that would misrepresent the service in structured data.
 */
function parseSingleNumericPrice(value: string): number | undefined {
  const normalizedValue = value.replace(/,/g, "");

  const matches = [...normalizedValue.matchAll(/(?:CAD\s*|\$)?(\d+(?:\.\d{1,2})?)/gi)];

  if (matches.length !== 1) {
    return undefined;
  }

  const parsedValue = Number(matches[0][1]);

  return Number.isFinite(parsedValue) ? parsedValue : undefined;
}

function createOfferRows(
  service: Service,
  pricingGroup: PricingGroup | undefined,
): ServiceOfferRow[] {
  if (pricingGroup && pricingGroup.prices.length > 0) {
    return pricingGroup.prices.map((item) => ({
      duration: item.duration,

      price: item.price,
    }));
  }

  return [
    {
      duration: service.duration,

      price: service.price,
    },
  ];
}

function createServiceOffers(
  service: Service,
  offerRows: readonly ServiceOfferRow[],
  canonicalUrl: string,
): Record<string, unknown>[] {
  return offerRows.map((item) => {
    const numericPrice = parseSingleNumericPrice(item.price);

    const explicitlyExcludesTax = /\+\s*GST\b/i.test(item.price);

    return {
      "@type": "Offer",

      name: `${service.name} — ${item.duration}`,

      url: canonicalUrl,

      priceCurrency: siteConfig.currency,

      description: `${item.duration}: ${item.price}`,

      ...(numericPrice !== undefined
        ? {
            price: numericPrice,

            priceSpecification: {
              "@type": "UnitPriceSpecification",

              price: numericPrice,

              priceCurrency: siteConfig.currency,

              ...(explicitlyExcludesTax
                ? {
                    valueAddedTaxIncluded: false,
                  }
                : {}),

              unitText: item.duration,
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

function ActionLink({ href, className, ariaLabel, children }: ActionLinkProps) {
  const normalizedHref = normalizeActionHref(href, "/contact");

  if (isInternalHref(normalizedHref)) {
    return (
      <Link className={className} href={normalizedHref} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={normalizedHref}
      aria-label={ariaLabel}
      {...(normalizedHref.startsWith("http://") || normalizedHref.startsWith("https://")
        ? {
            referrerPolicy: "strict-origin-when-cross-origin" as const,
          }
        : {})}
    >
      {children}
    </a>
  );
}

const siteOrigin = normalizeSiteOrigin(siteConfig.domain);

const openGraphFallbackUrl =
  toAbsoluteHttpUrl(siteConfig.assets.openGraphImage, siteOrigin) || `${siteOrigin}/`;

const bookingUrl = siteConfig.bookingUrl;

const cleanPhone = normalizePhoneForHref(siteConfig.phoneE164 || siteConfig.phone);

const textMessageHref = siteConfig.demoMode
  ? "/contact/#sample-contact"
  : cleanPhone
    ? `sms:${cleanPhone}`
    : "/contact";

const waitlistHref = normalizeActionHref(siteConfig.waitlist.href, textMessageHref);

const publicLocation =
  siteConfig.location.trim() ||
  `${PUBLIC_COMMUNITY}, ${siteConfig.primaryCity}, ${siteConfig.region}`;

const publicAddressNote =
  siteConfig.addressNote.trim() ||
  "Exact appointment details are shared privately through the booking process.";

const directBillingText = getDirectBillingDisplayText();

const regularHoursSummary = createOpeningHoursSummary();

const flexibleDaysLabel = formatDayLabel(
  siteConfig.openingHours.filter((entry) => entry.isByRequest).map((entry) => entry.day),
  "disjunction",
);

function BookingLink({ className, children }: BookingLinkProps) {
  if (!bookingUrl || bookingUrl.startsWith("/")) {
    return (
      <Link className={className} href={bookingUrl || "/contact"}>
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
      aria-label={`Open ${siteConfig.businessName} booking through ${siteConfig.bookingProvider} — opens in a new tab`}
    >
      {children}
    </a>
  );
}

export function generateStaticParams(): Array<{
  slug: string;
}> {
  return activeServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = getServiceBySlug(slug);

  if (!isActiveService(service)) {
    return {
      title: "Service Not Found",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pagePath = `/services/${service.slug}`;

  const canonicalUrl = `${siteOrigin}${pagePath}`;

  const pageTitle = `${service.name} in ${PUBLIC_COMMUNITY}, ${siteConfig.primaryCity}`;

  const fullPageTitle = `${pageTitle} | ${siteConfig.businessName}`;

  const description = createMetadataDescription(service);

  const image = service.image || siteConfig.assets.openGraphImage;

  const imageAlt = service.imageAlt || `${service.name} at ${siteConfig.businessName}`;

  const absoluteImageUrl = toAbsoluteHttpUrl(image, siteOrigin) || openGraphFallbackUrl;

  return {
    /**
     * The root layout owns the site-wide title template, so this route
     * supplies only the service-specific title.
     */
    title: pageTitle,

    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: fullPageTitle,

      description,

      url: canonicalUrl,

      siteName: siteConfig.businessName,

      locale: siteConfig.locale.replace("-", "_"),

      type: "website",

      images: [
        {
          url: absoluteImageUrl,

          alt: imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: fullPageTitle,

      description,

      images: [absoluteImageUrl],
    },

    category: "Health and wellness",

    /**
     * Root layout and robots.ts control deployment-aware indexing.
     * Do not add a route-level index:true override here.
     */
    other: {
      "geo.region": "CA-AB",

      "geo.placename": publicLocation,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  const service = getServiceBySlug(slug);

  if (!isActiveService(service)) {
    notFound();
  }

  const pagePath = `/services/${service.slug}`;

  const canonicalUrl = `${siteOrigin}${pagePath}`;

  const serviceId = `${canonicalUrl}#service`;

  const pageId = `${canonicalUrl}#webpage`;

  const imageId = `${canonicalUrl}#primary-image`;

  const breadcrumbId = `${canonicalUrl}#breadcrumb`;

  const pricingGroup = getServicePricingGroup(service);

  const pricingRows = createOfferRows(service, pricingGroup);

  const relatedServices = getRelatedServices(service);

  const serviceOffers = createServiceOffers(service, pricingRows, canonicalUrl);

  const serviceImage = service.image.trim() || siteConfig.assets.detailImage;

  const serviceImageAlt =
    service.imageAlt.trim() || `${service.name} treatment at ${siteConfig.businessName}`;

  const serviceVideo = service.video.trim();

  const serviceVideoPoster = service.videoPoster.trim() || serviceImage;

  const serviceVideoLabel =
    service.videoLabel.trim() || `${service.name} treatment preview at ${siteConfig.businessName}`;

  const serviceIncludes = getUniqueTextValues(service.includes);

  const serviceBestFor = getUniqueTextValues(service.bestFor);

  const tippingPolicyText = siteConfig.tippingPolicy.statement
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase(siteConfig.locale);

  const serviceNotes = getUniqueTextValues(service.notes).filter(
    (note) => note.toLocaleLowerCase(siteConfig.locale) !== tippingPolicyText,
  );

  const pricingHeading =
    pricingRows.length > 1 ? "Choose your appointment length." : "Treatment pricing at a glance.";

  const absoluteServiceImage = toAbsoluteHttpUrl(serviceImage, siteOrigin) || openGraphFallbackUrl;

  const pricingExcludesTax = pricingRows.some((item) => /\+\s*GST\b/i.test(item.price));

  const structuredPageName = `${service.name} in ${PUBLIC_COMMUNITY}, ${siteConfig.primaryCity}`;

  const serviceStructuredData: Record<string, unknown> = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "WebPage",

        "@id": pageId,

        url: canonicalUrl,

        name: structuredPageName,

        description: createMetadataDescription(service),

        inLanguage: siteConfig.locale,

        isPartOf: {
          "@id": `${siteOrigin}/#website`,
        },

        mainEntity: {
          "@id": serviceId,
        },

        about: {
          "@id": serviceId,
        },

        primaryImageOfPage: {
          "@id": imageId,
        },

        breadcrumb: {
          "@id": breadcrumbId,
        },
      },

      {
        "@type": "ImageObject",

        "@id": imageId,

        url: absoluteServiceImage,

        contentUrl: absoluteServiceImage,

        caption: serviceImageAlt,
      },

      {
        "@type": "Service",

        "@id": serviceId,

        name: service.name,

        description: service.description,

        url: canonicalUrl,

        image: {
          "@id": imageId,
        },

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

        mainEntityOfPage: {
          "@id": pageId,
        },

        audience: {
          "@type": "PeopleAudience",

          audienceType: service.who,
        },

        serviceType: service.name,

        ...(serviceOffers.length > 0
          ? {
              offers: serviceOffers,
            }
          : {}),

        ...(bookingUrl
          ? {
              potentialAction: {
                "@type": "ReserveAction",

                name: `Book ${service.name}`,

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

        "@id": breadcrumbId,

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

            name: "Services",

            item: `${siteOrigin}/#services`,
          },

          {
            "@type": "ListItem",

            position: 3,

            name: service.name,

            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceStructuredData} />

      <MotionProvider />
      <Header />

      <main id="main-content" className={styles.page} data-service-slug={service.slug}>
        <section className={styles.hero} aria-labelledby="service-heading">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{siteConfig.businessName}</p>

              <h1 id="service-heading">{service.name}</h1>

              <p className={styles.heroLead}>{service.longDescription}</p>

              <div className={styles.heroAbout}>
                <p>{service.what}</p>
              </div>
            </div>

            <div
              className={styles.mediaColumn}
              role="group"
              aria-label={`${service.name} treatment preview and booking actions`}
            >
              <div className={styles.mediaWrap}>
                <div
                  className={styles.media}
                  data-service-media={service.slug}
                  data-has-video={serviceVideo ? "true" : "false"}
                >
                  <ServicePreviewVideo
                    key={`${service.slug}:${serviceVideo}`}
                    src={serviceVideo}
                    poster={serviceVideoPoster}
                    posterAlt={serviceImageAlt}
                    label={serviceVideoLabel}
                    sizes={SERVICE_MEDIA_SIZES}
                  />
                </div>
              </div>

              <div
                className={styles.heroActions}
                role="group"
                aria-label={`${service.name} booking actions`}
              >
                <BookingLink className={`button primary ${styles.actionButton}`}>
                  Book This Service
                </BookingLink>

                <ActionLink
                  className={`button secondary ${styles.actionButton}`}
                  href={textMessageHref}
                  ariaLabel={`Text your practitioner at ${siteConfig.phone}`}
                >
                  Text your practitioner
                </ActionLink>

                <Link className={`button secondary ${styles.actionButton}`} href="/#services">
                  Back to Services
                </Link>
              </div>
            </div>

            <aside
              className={styles.pricingPanel}
              aria-label={`${service.name} pricing and duration`}
            >
              <div className={styles.pricingHeading}>
                <p className={styles.eyebrow}>Treatment Pricing</p>

                <h2>{pricingHeading}</h2>
              </div>

              <div
                className={styles.pricingMeta}
                role="list"
                aria-label={`${service.name} summary`}
              >
                <div role="listitem">
                  <span>Duration</span>

                  <strong>{service.duration}</strong>
                </div>

                <div role="listitem">
                  <span>Price</span>

                  <strong>{service.price}</strong>
                </div>
              </div>

              {pricingRows.length > 0 ? (
                <div
                  className={styles.pricingRates}
                  role="list"
                  aria-label={`${service.name} pricing options`}
                >
                  {pricingRows.map((item) => (
                    <div key={`${item.duration}-${item.price}`} role="listitem">
                      <span>{item.duration}</span>

                      <strong>{item.price}</strong>
                    </div>
                  ))}
                </div>
              ) : null}

              <p className={styles.pricingNote}>
                {pricingExcludesTax
                  ? "Listed rates are shown before GST. "
                  : "Listed rates are shown as currently published. "}
                No tipping is expected or accepted.
              </p>
            </aside>
          </div>
        </section>

        <section
          className={`${styles.overview} scroll-reveal`}
          aria-label={`${service.name} overview`}
          data-reveal-stagger="85"
        >
          <article data-reveal-item>
            <span>What It Is</span>

            <h2>{service.what}</h2>
          </article>

          <article data-reveal-item>
            <span>Who It Is For</span>

            <h2>{service.who}</h2>
          </article>

          <article data-reveal-item>
            <span>Pressure / Style</span>

            <h2>{service.style}</h2>
          </article>
        </section>

        <section
          className={`${styles.breakdown} scroll-reveal`}
          aria-labelledby="service-includes-heading"
          data-reveal-stagger="100"
        >
          <div className={styles.detailPanel} data-reveal-item>
            <p className={styles.eyebrow}>Treatment Details</p>

            <h2 id="service-includes-heading">What this service may include.</h2>

            <ul>
              {serviceIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className={styles.detailAside} data-reveal-item>
            <p className={styles.eyebrow}>Good Fit For</p>

            <div
              className={styles.chips}
              role="list"
              aria-label={`Common reasons to choose ${service.name}`}
            >
              {serviceBestFor.map((item) => (
                <span key={item} role="listitem">
                  {item}
                </span>
              ))}
            </div>

            <div
              className={styles.quickFacts}
              role="list"
              aria-label={`${service.name} quick facts`}
            >
              <div role="listitem">
                <span>Duration</span>

                <strong>{service.duration}</strong>
              </div>

              <div role="listitem">
                <span>Price</span>

                <strong>{service.price}</strong>
              </div>

              <div role="listitem">
                <span>Pressure</span>

                <strong>{service.pressure}</strong>
              </div>
            </div>
          </aside>
        </section>

        {serviceNotes.length > 0 ? (
          <section
            className={`${styles.notesSection} scroll-reveal`}
            aria-labelledby="service-notes-heading"
            data-reveal-stagger="80"
          >
            <div className={styles.sectionHeading} data-reveal-item>
              <p className={styles.eyebrow}>Before You Book</p>

              <h2 id="service-notes-heading">Helpful notes for this treatment.</h2>
            </div>

            <div className={styles.noteGrid}>
              {serviceNotes.map((item) => (
                <article key={item} data-reveal-item>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section
          className={`${styles.notesSection} scroll-reveal`}
          aria-labelledby="client-essentials-heading"
          data-reveal-stagger="90"
        >
          <div className={styles.sectionHeading} data-reveal-item>
            <p className={styles.eyebrow}>Client Essentials</p>

            <h2 id="client-essentials-heading">Clear answers before you book.</h2>

            <p>
              Important pricing, insurance, and availability information is provided upfront so you
              know what to expect.
            </p>
          </div>

          <div className={styles.noteGrid}>
            {siteConfig.directBilling.enabled ? (
              <article data-reveal-item>
                <p className={styles.miniEyebrow}>Direct Billing</p>

                <h3>{siteConfig.directBilling.heading}</h3>

                <p>{directBillingText}</p>
              </article>
            ) : null}

            <article data-reveal-item>
              <p className={styles.miniEyebrow}>Simple Pricing</p>

              <h3>{siteConfig.tippingPolicy.heading}</h3>

              <p>{siteConfig.tippingPolicy.statement}</p>

              <Link className={styles.textLink} href="/pricing">
                View full pricing
                <span aria-hidden="true"> →</span>
              </Link>
            </article>

            {siteConfig.waitlist.enabled ? (
              <article data-reveal-item>
                <p className={styles.miniEyebrow}>Earlier Openings</p>

                <h3>{siteConfig.waitlist.heading}</h3>

                <p>{siteConfig.waitlist.description}</p>

                <ActionLink
                  className={styles.textLink}
                  href={waitlistHref}
                  ariaLabel={siteConfig.waitlist.buttonLabel}
                >
                  {siteConfig.waitlist.buttonLabel}

                  <span aria-hidden="true"> →</span>
                </ActionLink>
              </article>
            ) : null}
          </div>
        </section>

        <section
          id="booking"
          className={`${styles.bookingSection} scroll-reveal`}
          aria-labelledby="booking-heading"
          data-reveal-stagger="85"
        >
          <div className={styles.bookingCard}>
            <div className={styles.bookingCopy} data-reveal-item>
              <p className={styles.eyebrow}>Online Booking</p>

              <h2 id="booking-heading">Book through {siteConfig.bookingProvider}.</h2>

              <p>
                View your practice’s availability, select your appointment length, and complete the
                booking process through {siteConfig.bookingProvider}. Questions about service fit or
                flexible availability can be sent directly to your practitioner.
              </p>

              <div
                className={styles.bookingActions}
                role="group"
                aria-label="Booking and availability actions"
              >
                <BookingLink className={`button primary ${styles.actionButton}`}>
                  Open Live Booking
                </BookingLink>

                {siteConfig.waitlist.enabled ? (
                  <ActionLink
                    className={`button secondary ${styles.actionButton}`}
                    href={waitlistHref}
                    ariaLabel={siteConfig.waitlist.buttonLabel}
                  >
                    {siteConfig.waitlist.buttonLabel}
                  </ActionLink>
                ) : (
                  <ActionLink
                    className={`button secondary ${styles.actionButton}`}
                    href={textMessageHref}
                    ariaLabel={`Text your practitioner at ${siteConfig.phone}`}
                  >
                    Text your practitioner
                  </ActionLink>
                )}
              </div>
            </div>

            <div className={styles.bookingDetails} role="list" aria-label="Booking details">
              <article role="listitem" data-reveal-item>
                <span>Location</span>

                <strong>{publicLocation}</strong>

                <p>{publicAddressNote}</p>
              </article>

              <article role="listitem" data-reveal-item>
                <span>Regular Hours</span>

                <strong>{regularHoursSummary.days}</strong>

                <p>{regularHoursSummary.hours}</p>
              </article>

              <article role="listitem" data-reveal-item>
                <span>Flexible Times</span>

                <strong>Text to ask</strong>

                <p>{flexibleDaysLabel} appointments may occasionally be possible by request.</p>
              </article>

              <article role="listitem" data-reveal-item>
                <span>Booking System</span>

                <strong>{siteConfig.bookingProvider}</strong>

                <p>
                  Availability, intake, and appointment scheduling are managed through your
                  practitioner’s booking platform.
                </p>
              </article>
            </div>
          </div>
        </section>

        {relatedServices.length > 0 ? (
          <section
            className={`${styles.relatedSection} scroll-reveal`}
            aria-labelledby="related-services-heading"
            data-reveal-stagger="85"
          >
            <div className={styles.sectionHeading} data-reveal-item>
              <p className={styles.eyebrow}>More Services</p>

              <h2 id="related-services-heading">Explore your practitioner’s other treatments.</h2>

              <p>
                Compare treatment styles, appointment lengths, and goals before choosing the option
                that feels right for you.
              </p>
            </div>

            <nav className={styles.relatedGrid} aria-label="Other massage and body-care services">
              {relatedServices.map((item) => {
                const relatedImage = item.image || siteConfig.assets.detailImage;

                return (
                  <Link
                    className={styles.relatedCard}
                    href={`/services/${item.slug}`}
                    key={item.slug}
                    aria-label={`View ${item.name} treatment details`}
                    data-reveal-item
                  >
                    <div className={styles.relatedImage}>
                      <Image
                        className={styles.relatedImageAsset}
                        src={relatedImage}
                        alt={item.imageAlt || `${item.name} at ${siteConfig.businessName}`}
                        fill
                        quality={84}
                        sizes={RELATED_SERVICE_IMAGE_SIZES}
                      />
                    </div>

                    <div className={styles.relatedContent}>
                      <p className={styles.miniEyebrow}>View treatment</p>

                      <h3>{item.name}</h3>

                      <p>{item.description}</p>

                      <span className={styles.textLink}>
                        Explore service
                        <span aria-hidden="true"> →</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </section>
        ) : null}
      </main>

      <BookingLink className="mobile-sticky-book">Book Now</BookingLink>

      <Footer />
    </>
  );
}
