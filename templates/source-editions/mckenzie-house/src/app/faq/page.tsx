import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import type { FaqCategory, FaqItem } from "@/lib/site";
import { faqs, siteConfig } from "@/lib/site";

import styles from "./FaqPage.module.css";

const FAQ_PATH = "/faq";

const DEFAULT_SITE_ORIGIN = "https://example.com";

const PUBLIC_COMMUNITY = "Your Neighbourhood";

const OPEN_GRAPH_IMAGE_WIDTH = 1_200;

const OPEN_GRAPH_IMAGE_HEIGHT = 630;

const MIN_PHONE_DIGITS = 7;
const MAX_PHONE_DIGITS = 15;

const pageTitle = "Frequently Asked Questions";

const fullPageTitle = `${pageTitle} | ${siteConfig.businessName}`;

const pageDescription =
  "Find clear answers about Cedar House Wellness in Your Neighbourhood, Your City, including intake, hands-on treatment time, communication, consent, pressure adjustments, services, booking, hours, billing, payments, youth appointments, and earlier openings.";

type JsonLdProps = Readonly<{
  data: Readonly<Record<string, unknown>>;
}>;

type FaqGroupDefinition = Readonly<{
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  categories: readonly FaqCategory[];
}>;

type FaqGroup = Readonly<{
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  categories: readonly FaqCategory[];
  items: readonly FaqItem[];
}>;

type ActionProps = Readonly<{
  className: string;
  children: ReactNode;
}>;

const FAQ_GROUP_DEFINITIONS = [
  {
    id: "location-availability",

    eyebrow: "Practice Details",

    title: "Location, hours, and availability",

    description:
      "Where appointments are offered, when your practitioner is regularly available, and what to do when the listed schedule does not work.",

    categories: ["location", "availability"],
  },

  {
    id: "appointment-experience",

    eyebrow: "What to Expect",

    title: "Communication, consent, and your appointment",

    description:
      "How intake, hands-on treatment time, pressure adjustments, comfort, boundaries, and client-led changes are handled before and during treatment.",

    categories: ["experience"],
  },

  {
    id: "booking-services",

    eyebrow: "Choosing Care",

    title: "Booking, services, and treatment fit",

    description:
      "How to book, how the services differ, and how your practitioner adapts treatment around comfort, pressure, age, pregnancy, postpartum needs, and personal preferences.",

    categories: ["booking", "services"],
  },

  {
    id: "billing-pricing",

    eyebrow: "Client Essentials",

    title: "Pricing, payments, and direct billing",

    description:
      "Straightforward information about GST, direct billing, payment methods, tipping, and other practical details before an appointment.",

    categories: ["pricing", "billing", "payments", "policies"],
  },
] as const satisfies readonly FaqGroupDefinition[];

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

function assertFaqGroupDefinitions(definitions: readonly FaqGroupDefinition[]): void {
  const groupIds = new Set<string>();

  const assignedCategories = new Set<FaqCategory>();

  for (const definition of definitions) {
    const groupId = definition.id.trim();

    if (!groupId || groupIds.has(groupId)) {
      throw new Error(`FAQ group ids must be unique and non-empty: "${definition.id}".`);
    }

    groupIds.add(groupId);

    for (const category of definition.categories) {
      if (assignedCategories.has(category)) {
        throw new Error(`FAQ category "${category}" is assigned to more than one group.`);
      }

      assignedCategories.add(category);
    }
  }
}

function assertFaqCollection(items: readonly FaqItem[]): void {
  if (items.length === 0) {
    throw new Error("The FAQ page requires at least one published question.");
  }

  const normalizedQuestions = new Set<string>();

  for (const item of items) {
    const question = item.question.trim();

    const answer = item.answer.trim();

    if (!question || !answer) {
      throw new Error("Every FAQ item requires a non-empty question and answer.");
    }

    const comparisonKey = question.toLocaleLowerCase(siteConfig.locale);

    if (normalizedQuestions.has(comparisonKey)) {
      throw new Error(`Duplicate FAQ question: "${question}".`);
    }

    normalizedQuestions.add(comparisonKey);
  }
}

function getFaqGroups(items: readonly FaqItem[]): readonly FaqGroup[] {
  const categorizedItems = new Set<FaqItem>();

  const groups: FaqGroup[] = FAQ_GROUP_DEFINITIONS.map((definition) => {
    const groupItems = items.filter(
      (item) =>
        item.category !== undefined &&
        definition.categories.some((category) => category === item.category),
    );

    for (const item of groupItems) {
      categorizedItems.add(item);
    }

    return {
      ...definition,
      items: groupItems,
    };
  }).filter((group) => group.items.length > 0);

  const uncategorizedItems = items.filter((item) => !categorizedItems.has(item));

  if (uncategorizedItems.length > 0) {
    groups.push({
      id: "more-questions",

      eyebrow: "More Information",

      title: "Additional questions",

      description:
        "Other helpful information about appointments and the Cedar House Wellness experience.",

      categories: [],

      items: uncategorizedItems,
    });
  }

  return groups;
}

assertFaqGroupDefinitions(FAQ_GROUP_DEFINITIONS);

assertFaqCollection(faqs);

const siteOrigin = normalizeSiteOrigin(siteConfig.domain);

const canonicalUrl = `${siteOrigin}${FAQ_PATH}`;

const openGraphImageUrl =
  toAbsoluteHttpUrl(siteConfig.assets.openGraphImage, siteOrigin) || `${siteOrigin}/`;

const bookingUrl = siteConfig.bookingUrl;

const cleanPhone = normalizePhoneForHref(siteConfig.phoneE164 || siteConfig.phone);

const textMessageHref = siteConfig.demoMode
  ? "/contact/#sample-contact"
  : cleanPhone
    ? `sms:${cleanPhone}`
    : null;

const publicLocation = `${PUBLIC_COMMUNITY}, ${siteConfig.primaryCity}, ${siteConfig.region}`;

const faqGroups = getFaqGroups(faqs);

const answerCountLabel = `${faqs.length} ${
  faqs.length === 1 ? "clear answer" : "clear answers"
}, organized by topic.`;

const structuredData: Readonly<Record<string, unknown>> = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "FAQPage",

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

      mainEntity: faqs.map((item, index) => ({
        "@type": "Question",

        "@id": `${canonicalUrl}#question-${index + 1}`,

        name: item.question,

        acceptedAnswer: {
          "@type": "Answer",

          "@id": `${canonicalUrl}#answer-${index + 1}`,

          text: item.answer,
        },
      })),
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

          name: "FAQ",

          item: canonicalUrl,
        },
      ],
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

    type: "website",

    locale: siteConfig.locale.replace("-", "_"),

    images: [
      {
        url: openGraphImageUrl,

        width: OPEN_GRAPH_IMAGE_WIDTH,

        height: OPEN_GRAPH_IMAGE_HEIGHT,

        alt:
          siteConfig.assets.openGraphImageAlt ||
          `${siteConfig.businessName} frequently asked questions`,
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
   * Root layout and robots.ts control deployment-aware indexing.
   * Do not add a route-level index:true override here.
   */
  other: {
    "geo.region": "CA-AB",

    "geo.placename": publicLocation,
  },
};

function BookingAction({ className, children }: ActionProps) {
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
      data-native-navigation
    >
      {children}
    </a>
  );
}

function TextAction({ className, children }: ActionProps) {
  if (!textMessageHref) {
    return (
      <Link className={className} href={bookingUrl || "/contact"}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={textMessageHref}
      aria-label={`Text your practitioner at ${siteConfig.phone}`}
      data-native-navigation
    >
      {children}
    </a>
  );
}

export default function FaqPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <MotionProvider />
      <Header />

      <main id="main-content" className={styles.page}>
        <section
          className={`${styles.hero} scroll-reveal`}
          aria-labelledby="faq-page-heading"
          data-reveal-stagger="90"
        >
          <div className={styles.heroTexture} aria-hidden="true" />

          <div className={styles.heroGlow} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={styles.heroCopy} data-reveal-item>
              <p className={styles.eyebrow}>Frequently Asked Questions</p>

              <h1 id="faq-page-heading">Clear answers before you book.</h1>

              <p className={styles.heroLead}>
                Learn what happens before hands-on care, how treatment time is protected, how
                pressure and positioning can be changed, and find answers about services, location,
                availability, billing, payments, youth appointments, pregnancy, and postpartum care.
              </p>

              <div className={styles.heroActions} role="group" aria-label="FAQ page actions">
                <Link className="button primary" href="/#services">
                  Explore Services
                </Link>

                <Link className="button secondary" href={bookingUrl || "/contact"}>
                  Contact your practitioner
                </Link>
              </div>
            </div>

            <aside
              className={styles.heroPanel}
              aria-labelledby="faq-directory-heading"
              data-reveal-item
            >
              <span className={styles.heroPanelLabel}>Quick Directory</span>

              <h2 id="faq-directory-heading">{answerCountLabel}</h2>

              <nav className={styles.directoryNav} aria-label="FAQ topic directory">
                {faqGroups.map((group) => (
                  <a href={`#${group.id}`} key={group.id}>
                    <span>{group.title}</span>

                    <span aria-hidden="true">↓</span>
                  </a>
                ))}
              </nav>
            </aside>
          </div>
        </section>

        <section className={styles.directory} aria-label="Frequently asked questions">
          <div className={styles.directoryShell}>
            {faqGroups.map((group, groupIndex) => (
              <section
                className={`${styles.group} scroll-reveal`}
                id={group.id}
                key={group.id}
                aria-labelledby={`${group.id}-heading`}
                data-reveal-stagger="55"
              >
                <header className={styles.groupIntro} data-reveal-item>
                  <span className={styles.groupIndex} aria-hidden="true">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className={styles.eyebrowDark}>{group.eyebrow}</p>

                    <h2 id={`${group.id}-heading`}>{group.title}</h2>

                    <p>{group.description}</p>
                  </div>
                </header>

                <div className={styles.list}>
                  {group.items.map((item, itemIndex) => {
                    const itemId = `${group.id}-question-${itemIndex + 1}`;

                    return (
                      <details
                        className={styles.item}
                        id={itemId}
                        key={`${group.id}:${item.question}`}
                        data-reveal-item
                      >
                        <summary>
                          <span className={styles.questionNumber} aria-hidden="true">
                            {String(itemIndex + 1).padStart(2, "0")}
                          </span>

                          <span className={styles.question}>{item.question}</span>

                          <span className={styles.icon} aria-hidden="true">
                            +
                          </span>
                        </summary>

                        <div className={styles.answer}>
                          <p>{item.answer}</p>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section
          id="insurance-providers"
          className={`${styles.insuranceSection} scroll-reveal`}
          aria-labelledby="insurance-providers-heading"
          data-reveal-stagger="35"
        >
          <div className={styles.insuranceIntro} data-reveal-item>
            <p className={styles.eyebrowDark}>Direct Billing</p>
            <h2 id="insurance-providers-heading">Your Insurance Information</h2>
            <p>
              Use this section for your verified billing details and accepted providers. The sample
              practice does not represent insurance acceptance.
            </p>
          </div>

          <ul className={styles.insuranceGrid} aria-label="Accepted direct-billing providers">
            {siteConfig.directBilling.providers.map((provider) => (
              <li key={provider} data-reveal-item>
                {provider}
              </li>
            ))}
          </ul>

          <p className={styles.insuranceDisclaimer} data-reveal-item>
            {siteConfig.directBilling.disclaimer}
          </p>
        </section>

        <section
          className={`${styles.support} scroll-reveal`}
          aria-labelledby="faq-support-heading"
          data-reveal-stagger="80"
        >
          <div className={styles.supportCopy} data-reveal-item>
            <p className={styles.eyebrowDark}>Still Unsure?</p>

            <h2 id="faq-support-heading">Ask your practitioner directly.</h2>

            <p>
              Questions about intake, hands-on time, service fit, pressure, comfort, pregnancy or
              postpartum care, youth appointments, direct billing, or flexible availability can be
              discussed before you book.
            </p>
          </div>

          <div
            className={styles.supportActions}
            role="group"
            aria-label="FAQ contact and booking actions"
            data-reveal-item
          >
            <TextAction className="button primary">Text your practitioner</TextAction>

            <Link className="button secondary" href={bookingUrl || "/contact"}>
              Send a Message
            </Link>

            <BookingAction className="button secondary">Check Availability</BookingAction>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
