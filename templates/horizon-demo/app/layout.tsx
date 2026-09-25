import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/horizon-template.css";
import "./demo.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import MotionControl from "@/components/ui/MotionControl";
import { collectionInquiryHref, designPrice, websiteDesigns } from "@/data/website-collection";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
});
const horizon = websiteDesigns.find((design) => design.id === "horizon")!;

export const metadata: Metadata = {
  title: {
    default: "Landscape Contracting Website Demo | L&L Tech Solutions",
    template: "%s | Landscape Contracting Demo",
  },
  description:
    "Explore a four-page landscape contracting website design with services, illustrative projects and a clear contact journey, by L&L Tech Solutions.",
  robots: { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-motion="paused">
      <body className={`${sans.variable} ${editorial.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to the landscape demo
        </a>
        <div className="horizon-demo-bar">
          <a href="https://lltechsolutions.ca/website-collection/horizon">
            ← L&L / Template details
          </a>
          <span>Website demo · {designPrice(horizon)}</span>
          <div>
            <MotionControl />
            <a href={`https://lltechsolutions.ca${collectionInquiryHref({ design: horizon.id })}`}>
              Make this my website ↗
            </a>
          </div>
        </div>
        <main
          id="main-content"
          className="horizon-demo-stage"
          tabIndex={-1}
          data-horizon-demo="horizon"
        >
          {children}
        </main>
        <div className="horizon-demo-disclosure">
          Sample business and illustrative imagery. This is a website design demo by L&L Tech
          Solutions, not a landscape contractor.
        </div>
      </body>
    </html>
  );
}
