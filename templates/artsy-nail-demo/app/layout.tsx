import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/artsy-nail.css";
import "./demo.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import MotionControl from "@/components/ui/MotionControl";
import { collectionInquiryHref, designPrice, websiteDesigns } from "@/data/website-collection";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const design = websiteDesigns.find((item) => item.id === "artsy-nails")!;

export const metadata: Metadata = {
  title: {
    default: "CHROMA NAIL CLUB Website Demo | L&L Tech Solutions",
    template: "%s | CHROMA NAIL CLUB Demo",
  },
  description:
    "Explore a four-page creative nail studio website with a nail menu, studio story and demonstration enquiry form, by L&L Tech Solutions.",
  robots: { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-motion="paused">
      <body className={sans.variable}>
        <a className="skip-link" href="#main-content">
          Skip to the nail studio demo
        </a>
        <div className="artsy-nail-demo-bar">
          <a href="https://lltechsolutions.ca/website-collection/artsy-nails">
            ← L&L / Template details
          </a>
          <span>Website demo · {designPrice(design)}</span>
          <div>
            <MotionControl />
            <a href={`https://lltechsolutions.ca${collectionInquiryHref({ design: design.id })}`}>
              Make this my website ↗
            </a>
          </div>
        </div>
        <main
          id="main-content"
          className="artsy-nail-demo-stage"
          tabIndex={-1}
          data-artsy-nail-demo="artsy-nails"
        >
          {children}
        </main>
        <div className="artsy-nail-demo-disclosure">
          Fictional studio and illustrative imagery. This L&L Tech Solutions website demo does not
          accept appointments. The studio enquiry form is a demonstration only.
        </div>
      </body>
    </html>
  );
}
