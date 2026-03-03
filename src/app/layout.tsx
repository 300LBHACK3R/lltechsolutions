export const metadata: Metadata = {
  metadataBase: new URL("https://lltechsolutions.ca"),

  // Brand / app identity
  applicationName: "L&L Tech Solutions",
  category: "technology",

  // Title + description
  title: {
    default: "L&L Tech Solutions | One & Only Tech Partner",
    template: "%s | L&L Tech Solutions",
  },
  description:
    "Websites, IT support, cybersecurity, automation, and business technology solutions.",

  // Keywords (not a huge ranking factor anymore, but harmless + useful for some crawlers/tools)
  keywords: [
    "L&L Tech Solutions",
    "IT support",
    "Cybersecurity",
    "Network security",
    "Managed IT",
    "Business automation",
    "AI automation",
    "Web development",
    "Technology consulting",
    "Canada",
  ],

  // Ownership / publishing
  authors: [{ name: "L&L Tech Solutions" }],
  creator: "L&L Tech Solutions",
  publisher: "L&L Tech Solutions",

  // Canonical
  alternates: {
    canonical: "https://lltechsolutions.ca",
  },

  // Social previews (LinkedIn/FB/iMessage/etc.)
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://lltechsolutions.ca",
    siteName: "L&L Tech Solutions",
    title: "L&L Tech Solutions | One & Only Tech Partner",
    description:
      "Websites, IT support, cybersecurity, automation, and business technology solutions.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "L&L Tech Solutions",
      },
    ],
  },

  // Twitter/X previews
  twitter: {
    card: "summary_large_image",
    title: "L&L Tech Solutions | One & Only Tech Partner",
    description:
      "Websites, IT support, cybersecurity, automation, and business technology solutions.",
    images: ["/og.png"],
  },

  // Search engine indexing rules
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Prevent browsers from auto-linking phone/email/address (often looks sloppy on landing pages)
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  // Helps control referrer leakage when clicking outbound links
  referrer: "origin-when-cross-origin",

  // Icons (safe defaults; won’t error if missing)
  // Recommended files:
  // /public/favicon.ico
  // /public/apple-touch-icon.png
  // /public/icon.png
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  // Verification placeholders (add later when you set these up)
  // verification: {
  //   google: "GOOGLE_SEARCH_CONSOLE_CODE",
  //   other: {
  //     "msvalidate.01": "BING_CODE",
  //   },
  // },
};
