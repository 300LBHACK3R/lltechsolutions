import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/wellness-template.css";
import "./demo.css";
import type { Metadata } from "next";
import MotionControl from "@/components/ui/MotionControl";
import { collectionInquiryHref, designPrice, websiteDesigns } from "@/data/website-collection";

const wellness = websiteDesigns.find((design) => design.id === "mckenzie-house")!;

export const metadata: Metadata = {
  title: {
    default: "Wellness & Massage Website Demo | L&L Tech Solutions",
    template: "%s | Wellness & Massage Demo",
  },
  description:
    "Explore a six-page wellness and massage website design with treatments, pricing, about, FAQ and a demonstration contact journey, by L&L Tech Solutions.",
  robots: { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-motion="paused">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to the wellness demo
        </a>
        <div className="wellness-demo-bar">
          <a href="https://lltechsolutions.ca/website-collection/mckenzie-house">
            ← L&L / Template details
          </a>
          <span>Website demo · {designPrice(wellness)}</span>
          <div>
            <MotionControl />
            <a href={`https://lltechsolutions.ca${collectionInquiryHref({ design: wellness.id })}`}>
              Make this my website ↗
            </a>
          </div>
        </div>
        <main id="main-content" className="wellness-demo-stage" tabIndex={-1}>
          {children}
        </main>
        <div className="wellness-demo-disclosure">
          Sample business and illustrative imagery. This is a website design demo by L&L Tech
          Solutions, not a massage or wellness practice. Demo forms do not send or save information,
          and no appointments are booked.
        </div>
      </body>
    </html>
  );
}
