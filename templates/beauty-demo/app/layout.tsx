import "@/styles/globals.css";
import "@/styles/base.css";
import "@/styles/beauty-template.css";
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
const beauty = websiteDesigns.find((design) => design.id === "still")!;

export const metadata: Metadata = {
  title: {
    default: "Forma Nail & Skin Website Demo | L&L Tech Solutions",
    template: "%s | Forma Website Demo",
  },
  description:
    "Explore a three-page nail and esthetics studio website with a service menu, direct-contact page and warm editorial design, by L&L Tech Solutions.",
  robots: { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-motion="paused">
      <body className={`${sans.variable} ${editorial.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to the beauty studio demo
        </a>
        <div className="beauty-demo-bar">
          <a href="https://lltechsolutions.ca/website-collection/still">← L&L / Template details</a>
          <span>Website demo · {designPrice(beauty)}</span>
          <div>
            <MotionControl />
            <a href={`https://lltechsolutions.ca${collectionInquiryHref({ design: beauty.id })}`}>
              Make this my website ↗
            </a>
          </div>
        </div>
        <main
          id="main-content"
          className="beauty-demo-stage"
          tabIndex={-1}
          data-beauty-demo="still"
        >
          {children}
        </main>
        <div className="beauty-demo-disclosure">
          Fictional studio and illustrative imagery. This is a website design demo by L&L Tech
          Solutions, not a salon. Appointment bookings are not accepted here.
        </div>
      </body>
    </html>
  );
}
