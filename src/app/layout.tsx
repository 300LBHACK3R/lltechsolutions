import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const siteUrl = "https://lltechsolutions.ca";
const siteName = "L&L Tech Solutions";
const siteTitle = "L&L Tech Solutions | Custom Websites, IT & Infrastructure";
const siteDescription =
  "L&L Tech Solutions builds custom websites, manages business IT systems, and installs clean technical infrastructure for modern companies across Canada.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
};

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[var(--bg-main)] text-white antialiased`}
      >
        <div className="page-shell">
          {/* HEADER */}
          <header className="sticky top-0 z-50 border-b border-[rgba(212,175,55,0.14)] bg-black/85 shadow-[0_10px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="container-premium flex items-center justify-between gap-6 py-3">
              {/* LOGO */}
              <Link href="/" className="flex shrink-0 items-center">
                <Image
                  src="/brand/logo.png"
                  alt="L&L Tech Solutions"
                  width={240}
                  height={240}
                  priority
                  className="h-[64px] w-auto object-contain md:h-[76px]"
                />
              </Link>

              {/* DESKTOP NAV */}
              <nav className="hidden items-center text-sm font-bold uppercase tracking-[0.05em] text-white/90 md:flex">
                {[{ label: "Home", href: "#home" }, ...NAV].map(
                  (item, index, arr) => (
                    <div key={item.href} className="flex items-center">
                      <a
                        href={item.href}
                        className="px-3 py-2 transition hover:text-[#f5d77a]"
                      >
                        {item.label}
                      </a>

                      {index < arr.length - 1 && (
                        <span className="mx-1 h-4 w-px bg-white/40" />
                      )}
                    </div>
                  ),
                )}
              </nav>

              {/* CTA + MOBILE */}
              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  className="hidden rounded-full border-2 border-[#f5d77a] px-5 py-2 text-sm font-black uppercase tracking-[0.05em] text-white transition hover:bg-[#f5d77a] hover:text-black sm:inline-flex"
                >
                  Request A Quote
                </a>

                <details className="relative md:hidden">
                  <summary className="list-none cursor-pointer rounded-full border border-[rgba(212,175,55,0.2)] px-4 py-2 text-sm">
                    Menu
                  </summary>

                  <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-[rgba(212,175,55,0.14)] bg-black shadow-xl">
                    <div className="p-2">
                      {[{ label: "Home", href: "#home" }, ...NAV].map(
                        (item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="block px-3 py-2 text-sm uppercase text-white/80 hover:text-[#f5d77a]"
                          >
                            {item.label}
                          </a>
                        ),
                      )}

                      <a href="#contact" className="btn-gold mt-2 w-full">
                        Request A Quote
                      </a>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <main>{children}</main>

          {/* FOOTER */}
          <footer className="border-t border-[rgba(212,175,55,0.12)] py-10 text-center text-sm text-muted">
            © {new Date().getFullYear()} L&amp;L Tech Solutions
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
