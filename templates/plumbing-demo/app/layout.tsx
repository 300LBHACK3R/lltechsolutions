import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/plumbing-template.css";
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
const plumbing = websiteDesigns.find((design) => design.id === "structure")!;
export const metadata: Metadata = {
  title: {
    default: "Plumbing Company Website Demo | L&L Tech Solutions",
    template: "%s | Plumbing Company Demo",
  },
  description:
    "Explore an original L&L plumbing website design with pipe navigation, refined interiors and a clear service enquiry journey.",
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-motion="paused">
      <body className={`${sans.variable} ${editorial.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to the plumbing demo
        </a>
        <div className="plumbing-demo-bar">
          <a href="https://lltechsolutions.ca/website-collection/structure">
            ← L&L / Template details
          </a>
          <span>Website demo · {designPrice(plumbing)}</span>
          <div>
            <MotionControl />
            <a href={`https://lltechsolutions.ca${collectionInquiryHref({ design: plumbing.id })}`}>
              Make this my website ↗
            </a>
          </div>
        </div>
        <main
          id="main-content"
          className="plumbing-demo-stage"
          tabIndex={-1}
          data-plumbing-demo="structure"
        >
          {children}
        </main>
        <div className="plumbing-demo-disclosure">
          Sample business and illustrative imagery. This is a website design demo by L&L Tech
          Solutions, not a plumbing contractor.
        </div>
      </body>
    </html>
  );
}
