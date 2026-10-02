import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig, socialImage } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  robots: { index: false, follow: false },
  openGraph: { title: siteConfig.name, description: siteConfig.description, images: [socialImage] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#050505" };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-[#050505] text-white">
        <div className="border-b border-[#d4af37]/25 bg-[#17130a] px-4 py-2 text-center text-xs leading-5 text-[#ead78e]">
          Fictional sample business · illustrative fleet and prices · enquiries stay in your browser
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.075),transparent_62%)]"
        />
        <Navbar />
        <div className="relative flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
