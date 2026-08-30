import "@/styles/globals.css";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { BusinessStructuredData } from "@/components/seo/StructuredData";
import StickyCTA from "@/components/ui/StickyCTA";
import { absoluteUrl, siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Geist,
  Geist_Mono,
} from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteTitle =
  "Calgary Web Design, Software & Social Media | L&L Tech Solutions";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "technology",
  keywords: [...siteConfig.keywords],
  authors: [
    {
      name: "Tate Byers",
      url: "https://tatebyers.ca",
    },
  ],
  creator: "Tate Byers",
  publisher: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-CA": siteConfig.url,
    },
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
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
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteTitle,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.openGraphImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} digital studio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteConfig.description,
    images: [absoluteUrl("/twitter-image.jpg")],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#071522" },
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteConfig.language}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} min-h-screen bg-[var(--bg-main)] font-sans text-white antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <BusinessStructuredData />

        <div className="page-shell">
          <SiteHeader />

          <main id="main-content" tabIndex={-1}>
            {children}
          </main>

          <SiteFooter />
          <StickyCTA />
        </div>
      </body>
    </html>
  );
}
