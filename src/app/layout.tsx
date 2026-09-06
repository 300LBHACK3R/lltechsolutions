import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/config/site";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
});
export const viewport: Viewport = { themeColor: "#080808" };
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Calgary Web Design, Software & Social Media | L&L Tech Solutions",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: { icon: "/brand/icon.png", apple: "/brand/apple-icon.png" },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots:
    process.env.VERCEL_ENV === "preview"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body className={`${sans.variable} ${editorial.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": absoluteUrl("/#organization"),
                name: siteConfig.name,
                url: siteConfig.url,
                logo: absoluteUrl(siteConfig.logo),
                email: siteConfig.email,
                telephone: "+17782158483",
                description: siteConfig.description,
                areaServed: siteConfig.areaServed,
                sameAs: siteConfig.socialLinks.map((link) => link.href),
              },
              {
                "@type": "WebSite",
                "@id": absoluteUrl("/#website"),
                url: siteConfig.url,
                name: siteConfig.name,
                inLanguage: "en-CA",
                publisher: { "@id": absoluteUrl("/#organization") },
              },
            ],
          }}
        />
      </body>
    </html>
  );
}
