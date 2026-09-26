import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/hair-salon.css";
import "./demo.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import MotionControl from "@/components/ui/MotionControl";
import { collectionInquiryHref, designPrice, websiteDesigns } from "@/data/website-collection";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const hairSalon = websiteDesigns.find((design) => design.id === "hair-salon")!;

export const metadata: Metadata = {
  title: {
    default: "Line & Form Hair Website Demo | L&L Tech Solutions",
    template: "%s | Line & Form Website Demo",
  },
  description:
    "Explore a four-page hair salon website with a service menu, salon story and direct-contact page, by L&L Tech Solutions.",
  robots: { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-motion="paused">
      <body className={sans.variable}>
        <a className="skip-link" href="#main-content">
          Skip to the hair salon demo
        </a>
        <div className="hair-demo-bar">
          <a href="https://lltechsolutions.ca/website-collection/hair-salon">
            ← L&L / Template details
          </a>
          <span>Website demo · {designPrice(hairSalon)}</span>
          <div>
            <MotionControl />
            <a
              href={`https://lltechsolutions.ca${collectionInquiryHref({ design: hairSalon.id })}`}
            >
              Make this my website ↗
            </a>
          </div>
        </div>
        <main
          id="main-content"
          className="hair-demo-stage"
          tabIndex={-1}
          data-hair-salon-demo="hair-salon"
        >
          {children}
        </main>
        <div className="hair-demo-disclosure">
          Line & Form Hair is a fictional salon with illustrative imagery and example pricing. This
          website demo is by L&L Tech Solutions. Salon enquiries and appointments are not accepted
          here.
        </div>
      </body>
    </html>
  );
}
