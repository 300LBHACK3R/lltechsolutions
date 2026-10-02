import type { Metadata, Viewport } from "next";
import "./globals.css";

// Set your own approved business metadata before publishing.
export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  applicationName: "Summit Painting Studio",
  title: {
    default: "Summit Painting Studio | Sample Painting Website",
    template: "%s | Summit Painting Studio",
  },
  description:
    "A fictional painting studio website with illustrative project galleries and a local-only sample enquiry form.",
  robots: { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#071a33",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body className="site-body">{children}</body>
    </html>
  );
}
