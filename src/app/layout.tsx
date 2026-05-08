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
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
};

const NAV = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/#process" },
  { label: "Projects", href: "/#projects" },
  { label: "Packages", href: "/#packages" },
  { label: "Contact", href: "/#contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[var(--bg-main)] font-sans text-white antialiased`}
      >
        <div className="page-shell">
          <header className="nav-shell">
            <div className="container-premium flex items-center justify-between gap-6 py-2">
              <Link
                href="/"
                aria-label="L&L Tech Solutions home"
                className="flex h-[72px] w-[210px] shrink-0 items-center overflow-visible sm:w-[235px] md:w-[255px]"
              >
                <Image
                  src="/brand/logo.jpg"
                  alt="L&L Tech Solutions"
                  width={900}
                  height={300}
                  priority
                  className="h-auto w-[210px] origin-left scale-[1.32] object-contain drop-shadow-[0_0_16px_rgba(212,175,55,0.24)] sm:w-[235px] sm:scale-[1.4] md:w-[255px] md:scale-[1.48]"
                />
              </Link>

              <nav className="hidden items-center text-sm font-bold uppercase tracking-[0.05em] text-white/90 md:flex">
                {NAV.map((item, index) => (
                  <div key={item.href} className="flex items-center">
                    <Link
                      href={item.href}
                      className="px-3 py-2 transition hover:text-[#f5d77a]"
                    >
                      {item.label}
                    </Link>

                    {index < NAV.length - 1 && (
                      <span
                        className="mx-1 h-4 w-px bg-white/40"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <Link
                  href="/#contact"
                  className="btn-outline-gold hidden sm:inline-flex"
                >
                  Request A Quote
                </Link>

                <details className="relative md:hidden">
                  <summary className="list-none cursor-pointer rounded-full border border-[rgba(212,175,55,0.2)] px-4 py-2 text-sm font-semibold text-white/85">
                    Menu
                  </summary>

                  <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-[rgba(212,175,55,0.14)] bg-black shadow-xl">
                    <div className="p-2">
                      {NAV.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-xl px-3 py-2.5 text-sm font-semibold uppercase tracking-[0.05em] text-white/80 transition hover:bg-[rgba(212,175,55,0.06)] hover:text-[#f5d77a]"
                        >
                          {item.label}
                        </Link>
                      ))}

                      <Link
                        href="/#contact"
                        className="btn-gold mt-2 flex w-full"
                      >
                        Request A Quote
                      </Link>
                    </div>
                  </div>
                </details>
              </div>
            </div>

            <div className="nav-data-line" aria-hidden="true">
              <span className="nav-data-pulse" />
              <span className="nav-data-node nav-data-node-one" />
              <span className="nav-data-node nav-data-node-two" />
              <span className="nav-data-node nav-data-node-three" />
            </div>
          </header>

          <main>{children}</main>

          <footer className="border-t border-[rgba(212,175,55,0.12)] py-10 text-center text-sm text-muted">
            © {new Date().getFullYear()} L&amp;L Tech Solutions
          </footer>
        </div>

        <style>{`
          section[id] {
            scroll-margin-top: 120px;
          }
        `}</style>
      </body>
    </html>
  );
}
