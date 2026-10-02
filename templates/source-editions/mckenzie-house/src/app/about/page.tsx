import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { siteConfig } from "@/lib/site";

import styles from "./AboutPage.module.css";

const ABOUT_PATH = "/about";
const DEFAULT_SITE_ORIGIN = "https://example.com";

const PUBLIC_LOCATION = {
  community: "Your Neighbourhood",
  city: siteConfig.primaryCity,
  region: siteConfig.region,
  countryCode: siteConfig.countryCode,
} as const;

const pageTitle = "About the Practice";
const fullPageTitle = `${pageTitle} | ${siteConfig.businessName}`;

const pageDescription =
  "An editable practice introduction for the fictional Cedar House Wellness template, with space to describe your approach, setting, and appointment experience.";

const approachPoints = [
  {
    id: "listening",
    eyebrow: "Listening",
    title: "The appointment starts with understanding what you need.",
    text: "Describe how you discuss preferences, comfort, and appointment goals. Explain what a new visitor can expect from the opening conversation.",
  },
  {
    id: "adjustments",
    eyebrow: "Adjustments",
    title: "Pressure, pace, positioning, and focus stay client-led.",
    text: "Explain how visitors can request a change in pressure, pace, or positioning during an appointment. Adapt this copy to your actual approach.",
  },
  {
    id: "comfort",
    eyebrow: "Comfort",
    title: "The experience is calm, clear, and never meant to feel rushed.",
    text: "Use this space to describe the setting, communication, and comfort options that are available at your practice.",
  },
  {
    id: "practical-care",
    eyebrow: "Practical Care",
    title: "Different stages of life can shape the session.",
    text: "Describe the appointments you offer and any preparation visitors should know about. Include only services and qualifications you can accurately represent.",
  },
] as const;

const practiceDetails = [
  {
    label: "Approach",
    value: "Add Your Care Approach",
  },
  {
    label: "Focus",
    value: "Add Your Practice Focus",
  },
  {
    label: "Booking",
    value: "Add Your Booking Details",
  },
  {
    label: "Location",
    value: `${PUBLIC_LOCATION.community}, ${PUBLIC_LOCATION.city}`,
  },
] as const;

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

function toAbsoluteUrl(value: string, siteOrigin: string): string {
  try {
    return new URL(value, `${siteOrigin}/`).toString();
  } catch {
    return siteOrigin;
  }
}

function getSafeHttpUrl(value: string): string | null {
  try {
    const url = new URL(value);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function safeJsonStringify(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
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

const canonicalUrl = toAbsoluteUrl(ABOUT_PATH, siteOrigin);

const businessId = `${siteOrigin}/#business`;

const websiteId = `${siteOrigin}/#website`;

const primaryImageId = `${canonicalUrl}#primary-image`;

const primaryImagePath = "/images/medical-spa-interior.webp";
const primaryImageAlt = "Illustrative wellness interior for the Cedar House Wellness template";
const primaryImageUrl = toAbsoluteUrl(primaryImagePath, siteOrigin);

const openGraphImageUrl = toAbsoluteUrl(siteConfig.assets.openGraphImage, siteOrigin);

const bookingUrl = getSafeHttpUrl(siteConfig.bookingUrl);

const aboutStructuredData: Record<string, unknown> = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${canonicalUrl}#webpage`,
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

      primaryImageOfPage: {
        "@id": primaryImageId,
      },

      breadcrumb: {
        "@id": `${canonicalUrl}#breadcrumb`,
      },
    },

    {
      "@type": "ImageObject",
      "@id": primaryImageId,
      url: primaryImageUrl,
      contentUrl: primaryImageUrl,
      caption: primaryImageAlt,
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
          name: pageTitle,
          item: canonicalUrl,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  /*
   * The root layout owns the site-wide title template, so this page
   * supplies only its route-specific title.
   */
  title: pageTitle,
  description: pageDescription,

  alternates: {
    canonical: ABOUT_PATH,
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
};

function BookingAction() {
  if (!bookingUrl) {
    return (
      <Link className="button primary" href="/contact">
        Contact the Practice
      </Link>
    );
  }

  return (
    <a
      className="button primary"
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="strict-origin-when-cross-origin"
      aria-label={`Open ${siteConfig.businessName} booking through ${siteConfig.bookingProvider} — opens in a new tab`}
    >
      Check Availability
    </a>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutStructuredData} />

      <MotionProvider />
      <Header />

      <main id="main-content" className={styles.page}>
        <section
          className={`${styles.hero} scroll-reveal`}
          aria-labelledby="about-page-heading"
          data-reveal-stagger="100"
        >
          <div className={styles.heroTexture} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={styles.heroMedia} data-reveal-item>
              <div className={styles.imageFrame}>
                <Image
                  src={primaryImagePath}
                  alt={primaryImageAlt}
                  fill
                  preload
                  quality={88}
                  sizes="(max-width: 1040px) 100vw, 48vw"
                />
              </div>

              <div className={styles.nameCard}>
                <span>Fictional Practice</span>

                <strong>{siteConfig.businessName}</strong>
              </div>
            </div>

            <div className={styles.heroCopy} data-reveal-item>
              <p className={styles.eyebrow}>Editable Practice Introduction</p>

              <h1 id="about-page-heading">A calm space for thoughtful care.</h1>

              <div className={styles.heroActions}>
                <Link className="button primary" href="/#services">
                  Explore Services
                </Link>

                <Link className="button secondary" href="/contact">
                  Contact the Practice
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`${styles.approach} scroll-reveal`}
          aria-labelledby="about-approach-heading"
          data-reveal-stagger="80"
        >
          <div className={styles.sectionIntro} data-reveal-item>
            <p className={styles.eyebrow}>Describe Your Approach</p>

            <h2 id="about-approach-heading">Care shaped around the person on the table.</h2>

            <p>
              Cedar House Wellness is a fictional practice created for this template. Use the
              prompts below to introduce your own care philosophy, communication style, and
              appointment experience.
            </p>
          </div>

          <div className={styles.approachGrid}>
            {approachPoints.map((point) => (
              <article key={point.id} data-reveal-item>
                <span>{point.eyebrow}</span>

                <h3>{point.title}</h3>

                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`${styles.details} scroll-reveal`}
          aria-labelledby="about-details-heading"
          data-reveal-stagger="80"
        >
          <div className={styles.detailsCopy} data-reveal-item>
            <p className={styles.eyebrow}>Cedar House Wellness</p>

            <h2 id="about-details-heading">Introduce your practice and its setting.</h2>

            <p>
              Replace this paragraph with a concise introduction to your practice. Add your real
              location, verified background, and booking details, then update the information cards
              to help visitors plan their appointment.
            </p>
          </div>

          <div className={styles.detailGrid} data-reveal-item>
            {practiceDetails.map((detail) => (
              <div key={detail.label}>
                <span>{detail.label}</span>

                <strong>{detail.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section
          className={`${styles.cta} scroll-reveal`}
          aria-labelledby="about-booking-heading"
          data-reveal-stagger="80"
        >
          <div data-reveal-item>
            <p className={styles.eyebrow}>Ready When You Are</p>

            <h2 id="about-booking-heading">Find the service and time that feel right.</h2>

            <p>
              Browse the sample service menu and pricing page. Replace the sample details and
              booking link with your own information before publishing.
            </p>
          </div>

          <div className={styles.ctaActions} data-reveal-item>
            <BookingAction />

            <Link className="button secondary" href="/pricing">
              View Pricing
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
