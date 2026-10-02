import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { ClientPortrait } from "@/components/ClientPortrait";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { additionalClientReviews, featuredClientReviews } from "@/lib/reviews";
import { siteConfig } from "@/lib/site";

import styles from "./ReviewsPage.module.css";

const REVIEWS_PATH = "/reviews";

const DEFAULT_SITE_ORIGIN = "https://example.com";

const OPEN_GRAPH_IMAGE_WIDTH = 1_200;

const OPEN_GRAPH_IMAGE_HEIGHT = 630;

// Replace this illustrative interior with your own approved hero image.
const REVIEWS_HERO_IMAGE = "/images/massage-room.webp";

const pageTitle = "Review Content Placeholders";

const fullPageTitle = `${pageTitle} | ${siteConfig.businessName}`;

const pageDescription =
  "Editable review and client-story content slots for the fictional Cedar House Wellness website template. No testimonials or ratings are included.";

type JsonLdProps = Readonly<{
  data: Record<string, unknown>;
}>;

type SafeExternalLinkProps = Readonly<{
  href: string;
  className?: string;
  ariaLabel: string;
  children: ReactNode;
}>;

type BookingLinkProps = Readonly<{
  className: string;
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

function toSecureExternalUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.toString() : null;
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

function SafeExternalLink({ href, className, ariaLabel, children }: SafeExternalLinkProps) {
  const safeHref = toSecureExternalUrl(href);

  if (!safeHref) {
    return null;
  }

  return (
    <a
      className={className}
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer"
      referrerPolicy="strict-origin-when-cross-origin"
      aria-label={ariaLabel}
      data-native-navigation
    >
      {children}
    </a>
  );
}

const siteOrigin = normalizeSiteOrigin(siteConfig.domain);

const canonicalUrl = `${siteOrigin}${REVIEWS_PATH}`;

const openGraphImageUrl =
  toAbsoluteHttpUrl(siteConfig.assets.openGraphImage, siteOrigin) || `${siteOrigin}/`;

const bookingUrl = siteConfig.bookingUrl;

const reviewsHeroSources = Array.from(
  new Set(
    [REVIEWS_HERO_IMAGE, siteConfig.assets.detailImage]
      .map((source) => source.trim())
      .filter(Boolean),
  ),
);

function EditingGuideLink() {
  return (
    <a className={styles.googleLink} href="#consent-heading">
      Editing guide <span aria-hidden="true">↗</span>
    </a>
  );
}

function BookingLink({ className, children }: BookingLinkProps) {
  if (!bookingUrl || bookingUrl.startsWith("/")) {
    return (
      <Link className={className} href={bookingUrl || "/contact"}>
        {children}
      </Link>
    );
  }

  return (
    <SafeExternalLink
      className={className}
      href={bookingUrl}
      ariaLabel={`Open ${siteConfig.businessName} booking through ${siteConfig.bookingProvider} — opens in a new tab`}
    >
      {children}
    </SafeExternalLink>
  );
}

// Describe the template route without publishing review or rating schema.
const structuredData: Record<string, unknown> = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "CollectionPage",

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

      breadcrumb: {
        "@id": `${canonicalUrl}#breadcrumb`,
      },
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

          name: "Review Placeholders",

          item: canonicalUrl,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  /**
   * The root layout owns the site-wide title template, so this route
   * supplies only the page-specific title.
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

    type: "website",

    locale: siteConfig.locale.replace("-", "_"),

    images: [
      {
        url: openGraphImageUrl,

        width: OPEN_GRAPH_IMAGE_WIDTH,

        height: OPEN_GRAPH_IMAGE_HEIGHT,

        alt:
          siteConfig.assets.openGraphImageAlt ||
          `Review placeholders for ${siteConfig.businessName}`,
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

export default function ReviewsPage() {
  const hasFeaturedReviews = featuredClientReviews.length > 0;

  const hasAdditionalReviews = additionalClientReviews.length > 0;

  return (
    <>
      <JsonLd data={structuredData} />

      <MotionProvider />
      <Header />

      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="reviews-heading">
          <div className={styles.heroMedia} aria-hidden="true">
            <ClientPortrait
              className={styles.heroBackground}
              sources={reviewsHeroSources}
              alt=""
              initials="CH"
              sizes="100vw"
              preload
            />
          </div>

          <div className={styles.heroOverlay} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Editable Review Page</p>

              <h1 id="reviews-heading">
                Your client stories.
                <br />
                Ready to add.
              </h1>

              <p>
                Cedar House Wellness is a fictional practice used to demonstrate this template.
                These cards are editing instructions. Replace them with permission-approved feedback
                before publishing your own website.
              </p>

              <div className={styles.heroActions} role="group" aria-label="Review page actions">
                <BookingLink className="button primary">Book a Session</BookingLink>

                <a className="button secondary" href="#consent-heading">
                  Read the Editing Guide
                </a>

                <Link className="button secondary" href="/#services">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {hasFeaturedReviews ? (
          <section
            className={`${styles.featuredSection} scroll-reveal`}
            aria-labelledby="featured-stories-heading"
            data-reveal-stagger="90"
          >
            <div className={styles.sectionIntro} data-reveal-item>
              <p className={styles.eyebrow}>Featured Content Slots</p>

              <h2 id="featured-stories-heading">Make room for your client stories.</h2>

              <p>
                Illustrative room images and editable instructions show how this layout can present
                approved feedback.
              </p>
            </div>

            <div
              className={styles.featuredGrid}
              role="list"
              aria-label="Featured review placeholders"
            >
              {featuredClientReviews.map((review) => (
                <article
                  className={styles.featuredCard}
                  key={review.id}
                  role="listitem"
                  data-reveal-item
                >
                  <div className={styles.featuredPhoto}>
                    <ClientPortrait
                      sources={review.photoSources}
                      alt={review.photoAlt || "Editable image placeholder"}
                      initials={review.initials}
                      sizes="(max-width: 820px) 100vw, 42vw"
                    />

                    <div className={styles.photoLabel}>
                      <span>Placeholder</span>

                      <strong>{review.firstName}</strong>
                    </div>
                  </div>

                  <div className={styles.featuredBody}>
                    <div className={styles.reviewMeta}>
                      <span>{review.source}</span>

                      <span>Editable Content</span>
                    </div>

                    {review.reviewTitle ? (
                      <p className={styles.reviewTitle}>{review.reviewTitle}</p>
                    ) : null}

                    <blockquote>
                      <p>{review.quote}</p>
                    </blockquote>

                    <footer className={styles.featuredFooter}>
                      <div>
                        <strong>{review.reviewerName}</strong>

                        <span>{review.publishedLabel}</span>
                      </div>

                      <EditingGuideLink />
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {hasAdditionalReviews ? (
          <section
            className={`${styles.communitySection} scroll-reveal`}
            aria-labelledby="community-reviews-heading"
            data-reveal-stagger="65"
          >
            <div className={styles.sectionIntroLight} data-reveal-item>
              <p className={styles.eyebrowDark}>More Content Slots</p>

              <h2 id="community-reviews-heading">A flexible grid for approved feedback.</h2>

              <p>
                Add the reviews you are ready to share, update each attribution, and remove any
                unused cards. These placeholders do not represent client experiences.
              </p>
            </div>

            <div
              className={styles.reviewGrid}
              role="list"
              aria-label="Additional review placeholders"
            >
              {additionalClientReviews.map((review) => (
                <article
                  className={styles.reviewCard}
                  key={review.id}
                  role="listitem"
                  data-reveal-item
                >
                  <div className={styles.reviewCardTop}>
                    <span className={styles.initials} aria-hidden="true">
                      {review.initials}
                    </span>

                    <div>
                      <small>{review.source}</small>
                    </div>
                  </div>

                  {review.reviewTitle ? (
                    <p className={styles.reviewTitle}>{review.reviewTitle}</p>
                  ) : null}

                  <blockquote>
                    <p>{review.quote}</p>
                  </blockquote>

                  <footer className={styles.reviewCardFooter}>
                    <div>
                      <strong>{review.reviewerName}</strong>

                      <span>{review.publishedLabel}</span>
                    </div>

                    <EditingGuideLink />
                  </footer>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section
          className={`${styles.consentSection} scroll-reveal`}
          aria-labelledby="consent-heading"
        >
          <div className={styles.consentCard} data-reveal-item>
            <div>
              <p className={styles.eyebrow}>Before You Publish</p>

              <h2 id="consent-heading">Replace every placeholder with approved content.</h2>
            </div>

            <div className={styles.consentCopy}>
              <p>
                Add feedback you have permission to publish, keep the original wording accurate, and
                confirm the reviewer’s preferred display name. Label shortened text as an excerpt
                and verify any source link you add.
              </p>

              <p>
                The included images show illustrative interiors, not clients. Replace or remove them
                as needed, and keep a record of permission for any client name, story, or photo you
                choose to publish.
              </p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.ctaSection} scroll-reveal`}
          aria-labelledby="reviews-cta-heading"
        >
          <div className={styles.ctaCard} data-reveal-item>
            <p className={styles.eyebrow}>Plan Your Visit</p>

            <h2 id="reviews-cta-heading">Personalized care begins with listening.</h2>

            <p>
              Explore the sample service menu or contact page. Update the booking destination and
              these next steps to match your own practice before launch.
            </p>

            <div
              className={styles.ctaActions}
              role="group"
              aria-label="Booking and contact actions"
            >
              <BookingLink className="button primary">Book a Session</BookingLink>

              <Link className="button secondary" href="/contact">
                Contact the Practice
              </Link>

              <Link className="button secondary" href="/about">
                About the Practice
              </Link>
            </div>
          </div>
        </section>
      </main>

      <BookingLink className="mobile-sticky-book">Book Now</BookingLink>

      <Footer />
    </>
  );
}
