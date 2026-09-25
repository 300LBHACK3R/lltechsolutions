import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/lawn-template.css";
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
const lawncare = websiteDesigns.find((design) => design.id === "lawncare")!;

export const metadata: Metadata = {
  title: {
    default: "Lawn Care Website Demo | L&L Tech Solutions",
    template: "%s | Lawn Care Demo",
  },
  description:
    "Explore a four-page lawn care and maintenance website design with services, illustrative work and a clear contact journey, by L&L Tech Solutions.",
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-motion="paused">
      <body className={`${sans.variable} ${editorial.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to the lawncare demo
        </a>
        <div className="lawncare-demo-bar">
          <a href="https://lltechsolutions.ca/website-collection/lawncare">
            ← L&L / Template details
          </a>
          <span>Website demo · {designPrice(lawncare)}</span>
          <div>
            <MotionControl />
            <a href={`https://lltechsolutions.ca${collectionInquiryHref({ design: lawncare.id })}`}>
              Make this my website ↗
            </a>
          </div>
        </div>
        <main
          id="main-content"
          className="lawncare-demo-stage"
          tabIndex={-1}
          data-lawncare-demo="lawncare"
        >
          {children}
        </main>
        <div className="lawncare-demo-disclosure">
          Sample business and illustrative imagery. This is a website design demo by L&L Tech
          Solutions, not a lawncare contractor.
        </div>
      </body>
    </html>
  );
}
