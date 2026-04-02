import ScrollSpyNav, {
  type NavItem,
} from "@/components/navigation/ScrollSpyNav";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lltechsolutions.ca"),
  title: {
    default: "L&L Tech Solutions | Business Technology Partner",
    template: "%s | L&L Tech Solutions",
  },
  description:
    "L&L Tech Solutions provides cybersecurity, IT support, AI automation, web development, and business technology solutions for modern companies across Canada.",
  keywords: [
    "IT support Canada",
    "Cybersecurity services",
    "Business automation",
    "Web development services",
    "Managed IT services",
    "AI automation",
    "Network security",
    "Technology consulting",
  ],
  authors: [{ name: "L&L Tech Solutions" }],
  creator: "L&L Tech Solutions",
  publisher: "L&L Tech Solutions",
  alternates: {
    canonical: "https://lltechsolutions.ca",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://lltechsolutions.ca",
    siteName: "L&L Tech Solutions",
    title: "L&L Tech Solutions | Business Technology Partner",
    description:
      "Cybersecurity, IT support, automation, and web development — handled under one trusted technology partner.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "L&L Tech Solutions – Business Technology Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "L&L Tech Solutions | Business Technology Partner",
    description:
      "Cybersecurity, IT support, automation, and web development — handled under one trusted technology partner.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

const NAV: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Reviews", href: "#reviews" },
  { label: "Industries", href: "#industries" },
  { label: "Packages", href: "#packages" },
  { label: "Audit", href: "#audit" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white selection:bg-[#d4af37] selection:text-black`}
      >
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(212,175,55,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.15) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="absolute top-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-[#d4af37]/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/90" />
        </div>

        <header className="sticky top-0 z-50 border-b border-[#d4af3720] bg-[#050505]/80 backdrop-blur-xl transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-[#d4af37]/10 blur-xl" />
                <Image
                  src="/brand/logo.png"
                  alt="L&L Tech Solutions"
                  width={180}
                  height={180}
                  priority
                  className="relative h-[52px] w-auto object-contain md:h-[60px] drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                />
              </div>
            </Link>

            <ScrollSpyNav
              className="hidden md:flex items-center gap-6 lg:gap-8"
              items={NAV}
            />

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f5d77a] px-4 py-2 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(212,175,55,0.25)] hover:scale-[1.02] transition"
              >
                Free Tech Audit
              </a>

              <details className="relative md:hidden">
                <summary className="list-none cursor-pointer rounded-xl border border-[#d4af3720] bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition">
                  Menu
                </summary>

                <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-[#d4af3720] bg-[#070707]/95 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.60)]">
                  <div className="p-2">
                    {NAV.map(({ label, href }) => (
                      <a
                        key={href}
                        href={href}
                        className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
                      >
                        {label}
                      </a>
                    ))}

                    <a
                      href="#contact"
                      className="mt-2 block rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f5d77a] px-3 py-2 text-center text-sm font-semibold text-black"
                    >
                      Free Tech Audit
                    </a>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </header>

        <main className="relative pb-[calc(84px+env(safe-area-inset-bottom))]">
          {children}
        </main>

        <footer className="border-t border-[#d4af3720]">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} L&L Tech Solutions</div>
            <div className="flex gap-4">
              <a className="hover:text-white transition" href="#services">
                Services
              </a>
              <a className="hover:text-white transition" href="#packages">
                Packages
              </a>
              <a className="hover:text-white transition" href="#contact">
                Contact
              </a>
            </div>
          </div>
        </footer>

        <style>{`section[id]{scroll-margin-top:96px;}`}</style>
      </body>
    </html>
  );
}
