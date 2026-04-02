import ScrollSpyNav, {
  type NavItem,
} from "@/components/navigation/ScrollSpyNav";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[var(--bg-main)] font-sans text-white antialiased`}
      >
        <div className="page-shell">
          {/* Background atmosphere */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_32%)]" />
            <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[rgba(212,175,55,0.08)] blur-3xl" />
            <div className="absolute right-[-180px] top-[10%] h-[320px] w-[320px] rounded-full bg-[rgba(245,215,122,0.05)] blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
          </div>

          <header className="nav-premium sticky top-0 z-50 shadow-[0_8px_30px_rgba(0,0,0,0.28)]">
            <div className="container-premium flex items-center justify-between gap-4 py-3">
              <Link
                href="/"
                aria-label="L and L Tech Solutions home"
                className="group flex shrink-0 items-center gap-3"
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-[rgba(212,175,55,0.08)] blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  <Image
                    src="/brand/logo.png"
                    alt="L&L Tech Solutions"
                    width={180}
                    height={180}
                    priority
                    className="relative h-[50px] w-auto object-contain md:h-[58px]"
                  />
                </div>
              </Link>

              <ScrollSpyNav className="hidden md:flex" items={NAV} />

              <div className="flex items-center gap-3">
                <a href="#contact" className="btn-gold hidden sm:inline-flex">
                  Free Tech Audit
                </a>

                <details className="relative md:hidden">
                  <summary className="list-none cursor-pointer rounded-full border border-[rgba(212,175,55,0.14)] bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/85 transition hover:border-[rgba(212,175,55,0.24)] hover:bg-white/[0.05]">
                    Menu
                  </summary>

                  <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[rgba(10,10,10,0.96)] shadow-[0_20px_70px_rgba(0,0,0,0.58)] backdrop-blur-xl">
                    <div className="p-2">
                      {NAV.map(({ label, href }) => (
                        <a
                          key={href}
                          href={href}
                          className="block rounded-xl px-3 py-2.5 text-sm text-white/78 transition hover:bg-[rgba(212,175,55,0.06)] hover:text-[#f5d77a]"
                        >
                          {label}
                        </a>
                      ))}

                      <a href="#contact" className="btn-gold mt-2 flex w-full">
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

          <footer className="border-t border-[rgba(212,175,55,0.12)]">
            <div className="container-premium flex flex-col gap-4 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
              <div>© {new Date().getFullYear()} L&amp;L Tech Solutions</div>

              <div className="flex flex-wrap gap-4">
                <a className="transition hover:text-white" href="#services">
                  Services
                </a>
                <a className="transition hover:text-white" href="#packages">
                  Packages
                </a>
                <a className="transition hover:text-white" href="#contact">
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </div>

        <style>{`
          section[id] {
            scroll-margin-top: 110px;
          }
        `}</style>
      </body>
    </html>
  );
}
