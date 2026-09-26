import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/medical-spa.css";
import "./demo.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import MotionControl from "@/components/ui/MotionControl";
import { collectionInquiryHref, designPrice, websiteDesigns } from "@/data/website-collection";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});
const medicalSpa = websiteDesigns.find((design) => design.id === "medical-spa")!;

export const metadata: Metadata = {
  title: {
    default: "Aurel Aesthetics Website Demo | L&L Tech Solutions",
    template: "%s | Aurel Aesthetics Website Demo",
  },
  description:
    "Explore a six-page medical spa website with treatment information, a consultation guide and a calm editorial design, by L&L Tech Solutions.",
  robots: { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-motion="paused">
      <body className={`${sans.variable} ${editorial.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to the medical spa demo
        </a>
        <div className="medical-spa-demo-bar">
          <a href="https://lltechsolutions.ca/website-collection/medical-spa">
            ← L&L / Template details
          </a>
          <span>Website demo · {designPrice(medicalSpa)}</span>
          <div>
            <MotionControl />
            <a
              href={`https://lltechsolutions.ca${collectionInquiryHref({ design: medicalSpa.id })}`}
            >
              Make this my website ↗
            </a>
          </div>
        </div>
        <main
          id="main-content"
          className="medical-spa-demo-stage"
          tabIndex={-1}
          data-medical-spa-demo="medical-spa"
        >
          {children}
        </main>
        <div className="medical-spa-demo-disclosure">
          Fictional medical spa and illustrative imagery. This is a website design demo by L&L Tech
          Solutions. Appointment bookings are not accepted here.
        </div>
      </body>
    </html>
  );
}
