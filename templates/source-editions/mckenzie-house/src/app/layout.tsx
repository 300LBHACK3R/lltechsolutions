import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { PersistentSiteNavigation } from "@/components/PersistentSiteNavigation";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: { default: siteConfig.businessName, template: `%s | ${siteConfig.businessName}` },
  description: siteConfig.description,
  robots: { index: !siteConfig.demoMode, follow: !siteConfig.demoMode },
  icons: { icon: "/brand/cedar-mark.svg" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d150d" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-CA" dir="ltr" data-scroll-behavior="smooth">
      <body>
        <PersistentSiteNavigation />
        {children}
      </body>
    </html>
  );
}
