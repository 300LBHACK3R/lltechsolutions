import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/earthworks-template.css";
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
const earthworks = websiteDesigns.find((design) => design.id === "earthworks")!;
export const metadata: Metadata = {
  title: {
    default: "Excavation & Landscaping Website Demo | L&L Tech Solutions",
    template: "%s | Excavation & Landscaping Demo",
  },
  description:
    "Explore an original seven-page L&L earthworks design with project imagery, material inspiration, helpful answers and a clear journey from site preparation to finished landscape.",
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-motion="paused">
      <body className={`${sans.variable} ${editorial.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to the earthworks demo
        </a>
        <div className="earthworks-demo-bar">
          <a href="https://lltechsolutions.ca/website-collection/earthworks">
            ← L&L / Template details
          </a>
          <span>Website demo · {designPrice(earthworks)}</span>
          <div>
            <MotionControl />
            <a
              href={`https://lltechsolutions.ca${collectionInquiryHref({ design: earthworks.id })}`}
            >
              Make this my website ↗
            </a>
          </div>
        </div>
        <main
          id="main-content"
          className="earthworks-demo-stage"
          tabIndex={-1}
          data-earthworks-demo="earthworks"
        >
          {children}
        </main>
        <div className="earthworks-demo-disclosure">
          Sample business and illustrative imagery. This is a website design demo by L&L Tech
          Solutions, not an earthworks contractor.
        </div>
      </body>
    </html>
  );
}
