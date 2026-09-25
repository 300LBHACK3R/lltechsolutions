import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/massage-one-page.css";
import "./demo.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { collectionInquiryHref, designPrice, websiteDesigns } from "@/data/website-collection";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
});
const design = websiteDesigns.find((item) => item.id === "massage-one-page")!;

export const metadata: Metadata = {
  title: "One-Page Massage Website Demo | L&L Tech Solutions",
  description:
    "Explore Soma Massage, a fictional one-page website design with treatment summaries, an introduction and direct-contact placeholders, by L&L Tech Solutions.",
  robots: { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-motion="paused">
      <body className={`${sans.variable} ${editorial.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to the massage demo
        </a>
        <div className="onepage-demo-bar">
          <a href="https://lltechsolutions.ca/website-collection/massage-one-page">
            ← L&L / Template details
          </a>
          <span>One-page website demo · {designPrice(design)}</span>
          <a href={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}>
            Make this my website ↗
          </a>
        </div>
        <main id="main-content" className="onepage-demo-stage" tabIndex={-1}>
          {children}
        </main>
        <div className="onepage-demo-disclosure">
          Soma Massage is a fictional business. Sample copy and illustrative imagery demonstrate the
          design; no appointments or messages are taken here.
        </div>
      </body>
    </html>
  );
}
