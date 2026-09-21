import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/painting-template.css";
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
const painting = websiteDesigns.find((design) => design.id === "pigment")!;
export const metadata: Metadata = {
  title: {
    default: "Painting Company Website Demo | L&L Tech Solutions",
    template: "%s | Painting Company Demo",
  },
  description:
    "Explore an original L&L painting website design with brush navigation, project photography and a clear estimate journey.",
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-motion="paused">
      <body className={`${sans.variable} ${editorial.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to the painting demo
        </a>
        <div className="painting-demo-bar">
          <a href="https://lltechsolutions.ca/website-collection/pigment">
            ← L&L / Template details
          </a>
          <span>Website demo · {designPrice(painting)}</span>
          <div>
            <MotionControl />
            <a href={`https://lltechsolutions.ca${collectionInquiryHref({ design: painting.id })}`}>
              Make this my website ↗
            </a>
          </div>
        </div>
        <main
          id="main-content"
          className="painting-demo-stage"
          tabIndex={-1}
          data-painting-demo="pigment"
        >
          {children}
        </main>
        <div className="painting-demo-disclosure">
          Sample business and illustrative imagery. This is a website design demo by L&L Tech
          Solutions, not a painting contractor.
        </div>
      </body>
    </html>
  );
}
