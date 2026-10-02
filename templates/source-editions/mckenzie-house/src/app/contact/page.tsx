import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { siteConfig } from "@/lib/site";

import styles from "./ContactPage.module.css";

const CONTACT_PATH = "/contact";

const DEFAULT_SITE_ORIGIN = "https://example.com";

const PUBLIC_COMMUNITY = "Your Neighbourhood";

const OPEN_GRAPH_IMAGE_WIDTH = 1_200;

const OPEN_GRAPH_IMAGE_HEIGHT = 630;

const MIN_PHONE_DIGITS = 7;
const MAX_PHONE_DIGITS = 15;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

const pageTitle = "Contact your practitioner";

const fullPageTitle = `${pageTitle} | ${siteConfig.businessName}`;

const pageDescription = `Call, text, or email your practitioner at ${siteConfig.businessName} in ${PUBLIC_COMMUNITY}, ${siteConfig.primaryCity}, or open the secure ${siteConfig.bookingProvider} schedule to book an appointment online.`;

type JsonLdProps = Readonly<{
  data: Readonly<Record<string, unknown>>;
}>;

type ActionLinkProps = Readonly<{
  href: string | null;
  className: string;
  ariaLabel: string;
  children: ReactNode;
  external?: boolean;
}>;

type ContactMethodProps = Readonly<{
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
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

function toAbsoluteHttpUrl(value: string, siteOrigin: string): string | null {
  const candidate = value.trim();

  if (!candidate) {
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

function normalizePhoneForHref(value: string): string {
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

function safeJsonStringify(value: unknown): string {
  const serializedValue = JSON.stringify(value);

  if (typeof serializedValue !== "string") {
    return "{}";
  }

  return serializedValue
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

function ActionLink({ href, className, ariaLabel, children, external = false }: ActionLinkProps) {
  if (!href) {
    return null;
  }

  return (
    <a
      className={className}
      href={href}
      aria-label={ariaLabel}
      data-native-navigation
      {...(external && !href.startsWith("/")
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

function ArrowIcon() {
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M7 17 17 7M17 7H8m9 0v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactMethod({ number, eyebrow, title, description, children }: ContactMethodProps) {
  return (
    <article className={styles.methodCard} role="listitem" data-reveal-item>
      <div className={styles.methodHeader}>
        <span className={styles.methodNumber} aria-hidden="true">
          {number}
        </span>

        <p className={styles.methodEyebrow}>{eyebrow}</p>
      </div>

      <h3>{title}</h3>

      <p className={styles.methodDescription}>{description}</p>

      <div className={styles.methodActions}>{children}</div>
    </article>
  );
}

const siteOrigin = normalizeSiteOrigin(siteConfig.domain);

const canonicalUrl = `${siteOrigin}${CONTACT_PATH}`;

const openGraphImageUrl =
  toAbsoluteHttpUrl(siteConfig.assets.openGraphImage, siteOrigin) || `${siteOrigin}/`;

const bookingUrl = siteConfig.bookingUrl;

const cleanPhone = normalizePhoneForHref(siteConfig.phoneE164 || siteConfig.phone);

const cleanEmail = normalizeEmail(siteConfig.email);

const telephoneHref = siteConfig.demoMode
  ? "/contact/#sample-contact"
  : cleanPhone
    ? `tel:${cleanPhone}`
    : null;

const textMessageHref = siteConfig.demoMode
  ? "/contact/#sample-contact"
  : cleanPhone
    ? `sms:${cleanPhone}`
    : null;

const emailHref = siteConfig.demoMode
  ? "/contact/#sample-contact"
  : cleanEmail
    ? `mailto:${cleanEmail}` +
      `?subject=${encodeURIComponent(`Question for ${siteConfig.businessName}`)}`
    : null;

const publicLocation = `${PUBLIC_COMMUNITY}, ${siteConfig.primaryCity}, ${siteConfig.region}`;

const contactActions: Record<string, unknown>[] = [];

if (telephoneHref) {
  contactActions.push({
    "@type": "CommunicateAction",

    name: "Call your practitioner",

    target: telephoneHref,
  });
}

if (textMessageHref) {
  contactActions.push({
    "@type": "CommunicateAction",

    name: "Text your practitioner",

    target: textMessageHref,
  });
}

if (emailHref) {
  contactActions.push({
    "@type": "CommunicateAction",

    name: "Email your practitioner",

    target: emailHref,
  });
}

if (bookingUrl) {
  contactActions.push({
    "@type": "ReserveAction",

    name: "Book a massage appointment",

    target: {
      "@type": "EntryPoint",

      urlTemplate: bookingUrl,

      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
  });
}

const contactPoint: Record<string, unknown> = {
  "@type": "ContactPoint",

  "@id": `${canonicalUrl}#contact-point`,

  contactType: "customer service",

  name: `Contact ${siteConfig.businessName}`,

  availableLanguage: ["English"],

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

  ...(cleanPhone
    ? {
        telephone: cleanPhone,
      }
    : {}),

  ...(cleanEmail
    ? {
        email: cleanEmail,
      }
    : {}),
};

const structuredData: Readonly<Record<string, unknown>> = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "ContactPage",

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
        "@id": `${canonicalUrl}#contact-point`,
      },

      breadcrumb: {
        "@id": `${canonicalUrl}#breadcrumb`,
      },

      ...(contactActions.length > 0
        ? {
            potentialAction: contactActions,
          }
        : {}),
    },

    contactPoint,

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

          name: "Contact",

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

    type: "website",

    locale: siteConfig.locale.replace("-", "_"),

    images: [
      {
        url: openGraphImageUrl,

        width: OPEN_GRAPH_IMAGE_WIDTH,

        height: OPEN_GRAPH_IMAGE_HEIGHT,

        alt: siteConfig.assets.openGraphImageAlt || `Contact ${siteConfig.businessName}`,
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

export default function ContactPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <MotionProvider />
      <Header />

      <main id="main-content" className={styles.page}>
        <section
          className={`${styles.hero} scroll-reveal`}
          aria-labelledby="contact-page-heading"
          data-reveal-stagger="90"
        >
          <div className={styles.heroPattern} aria-hidden="true" />

          <div className={styles.heroGlow} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={styles.heroCopy} data-reveal-item>
              <p className={styles.eyebrow}>Contact your practitioner</p>

              <h1 id="contact-page-heading">Three simple ways to connect.</h1>

              <p className={styles.heroLead}>
                Choose the contact method that suits you. In this sample website, all contact
                actions stay on this page and no appointment is created.
              </p>

              <div
                className={styles.heroActions}
                role="group"
                aria-label="Contact your practitioner"
              >
                <ActionLink
                  className="button primary"
                  href={bookingUrl}
                  ariaLabel={`Open your practice’s ${siteConfig.bookingProvider} booking schedule — opens in a new tab`}
                  external
                >
                  Book Online
                </ActionLink>

                <ActionLink
                  className="button secondary"
                  href={textMessageHref}
                  ariaLabel={`Text your practitioner at ${siteConfig.phone}`}
                >
                  Text your practitioner
                </ActionLink>

                <ActionLink
                  className="button secondary"
                  href={emailHref}
                  ariaLabel={`Email your practitioner at ${siteConfig.email}`}
                >
                  Email your practitioner
                </ActionLink>
              </div>
            </div>

            <aside
              className={styles.heroCard}
              aria-labelledby="direct-contact-heading"
              data-reveal-item
            >
              <span className={styles.heroCardLabel}>Direct Contact</span>

              <h2 id="direct-contact-heading">Reach-out</h2>

              <p>
                The contact details below are editable placeholders. Add your practice information
                and connect your preferred booking service before launch.
              </p>

              <address className={styles.directList}>
                <ActionLink
                  className={styles.directItem}
                  href={telephoneHref}
                  ariaLabel={`Call your practitioner at ${siteConfig.phone}`}
                >
                  <span>Phone</span>

                  <strong>{siteConfig.phone}</strong>
                </ActionLink>

                <ActionLink
                  className={styles.directItem}
                  href={emailHref}
                  ariaLabel={`Email your practitioner at ${siteConfig.email}`}
                >
                  <span>Email</span>

                  <strong>{siteConfig.email}</strong>
                </ActionLink>

                <ActionLink
                  className={styles.directItem}
                  href={bookingUrl}
                  ariaLabel={`Open ${siteConfig.bookingProvider} booking — opens in a new tab`}
                  external
                >
                  <span>Online Booking</span>

                  <strong>{siteConfig.bookingProvider}</strong>
                </ActionLink>
              </address>
            </aside>
          </div>
        </section>

        {siteConfig.demoMode && (
          <section id="sample-contact" className="source-sample-panel" aria-labelledby="booking">
            <p className="eyebrow">Fictional sample practice</p>
            <h2 id="booking">Your booking connection goes here.</h2>
            <p>
              Cedar House Wellness is an editable demonstration. No appointments, calls, messages,
              or payments are processed. The telephone number and email address are placeholders.
            </p>
            <p>
              Add your practice details and preferred booking connection before enabling live
              contact actions.
            </p>
          </section>
        )}

        <section
          className={`${styles.methods} scroll-reveal`}
          aria-labelledby="contact-methods-heading"
          data-reveal-stagger="80"
        >
          <div className={styles.sectionIntro} data-reveal-item>
            <p className={styles.eyebrowDark}>Choose What Is Easiest</p>

            <h2 id="contact-methods-heading">Phone, email, or online booking.</h2>

            <p>
              Use phone or email for questions. Use {siteConfig.bookingProvider} when you are ready
              to choose a service and an available appointment time.
            </p>
          </div>

          <div className={styles.methodGrid} role="list" aria-label="Contact methods">
            <ContactMethod
              number="01"
              eyebrow="Phone"
              title={siteConfig.phone}
              description="Call for a direct conversation or text your practitioner for quick questions, appointment details, and earlier-opening requests."
            >
              <ActionLink
                className={styles.methodLink}
                href={telephoneHref}
                ariaLabel={`Call your practitioner at ${siteConfig.phone}`}
              >
                Call your practitioner
                <ArrowIcon />
              </ActionLink>

              <ActionLink
                className={styles.methodLinkSecondary}
                href={textMessageHref}
                ariaLabel={`Text your practitioner at ${siteConfig.phone}`}
              >
                Text your practitioner
              </ActionLink>
            </ContactMethod>

            <ContactMethod
              number="02"
              eyebrow="Email"
              title={siteConfig.email}
              description="Email your practitioner when your question needs more detail or when written communication is the easiest option."
            >
              <ActionLink
                className={styles.methodLink}
                href={emailHref}
                ariaLabel={`Email your practitioner at ${siteConfig.email}`}
              >
                Email your practitioner
                <ArrowIcon />
              </ActionLink>
            </ContactMethod>

            <ContactMethod
              number="03"
              eyebrow="Online Booking"
              title={siteConfig.bookingProvider}
              description="Review services, appointment lengths, and your practitioner’s current availability before completing your booking securely online."
            >
              <ActionLink
                className={styles.methodLink}
                href={bookingUrl}
                ariaLabel={`Open your practice’s ${siteConfig.bookingProvider} booking schedule — opens in a new tab`}
                external
              >
                Check Availability
                <ArrowIcon />
              </ActionLink>
            </ContactMethod>
          </div>
        </section>

        <section
          className={`${styles.noteSection} scroll-reveal`}
          aria-labelledby="contact-note-heading"
        >
          <div className={styles.noteCard} data-reveal-item>
            <p className={styles.eyebrow}>Your Neighbourhood, Your City</p>

            <h2 id="contact-note-heading">
              Questions go to your practitioner. Bookings stay in {siteConfig.bookingProvider}.
            </h2>

            <p>{siteConfig.addressNote}</p>

            <div
              className={styles.noteActions}
              role="group"
              aria-label="Contact and booking actions"
            >
              <ActionLink
                className="button primary"
                href={textMessageHref}
                ariaLabel={`Text your practitioner at ${siteConfig.phone}`}
              >
                Text your practitioner
              </ActionLink>

              <ActionLink
                className="button secondary"
                href={emailHref}
                ariaLabel={`Email your practitioner at ${siteConfig.email}`}
              >
                Email your practitioner
              </ActionLink>

              <ActionLink
                className="button secondary"
                href={bookingUrl}
                ariaLabel={`Open your practice’s ${siteConfig.bookingProvider} booking schedule — opens in a new tab`}
                external
              >
                Book Online
              </ActionLink>
            </div>
          </div>
        </section>
      </main>

      <ActionLink
        className="mobile-sticky-book"
        href={bookingUrl}
        ariaLabel={`Open your practice’s ${siteConfig.bookingProvider} booking schedule — opens in a new tab`}
        external
      >
        Book Now
      </ActionLink>

      <Footer />
    </>
  );
}
