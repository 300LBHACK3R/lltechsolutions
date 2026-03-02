import ScrollSpyNav, { type NavItem } from "@/components/ScrollSpyNav";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "L&L Tech Solutions | One & Only Tech Partner",
  description:
    "Websites, IT support, cybersecurity, automation, and business technology solutions.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050814] text-white selection:bg-white/20`}
      >
        {/* ===== Premium Background ===== */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-52 left-[-260px] h-[760px] w-[760px] rounded-full bg-fuchsia-500/18 blur-3xl" />
          <div className="absolute top-[120px] right-[-260px] h-[820px] w-[820px] rounded-full bg-cyan-400/12 blur-3xl" />
          <div className="absolute bottom-[-320px] left-[15%] h-[820px] w-[820px] rounded-full bg-indigo-500/10 blur-3xl" />

          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "76px 76px",
            }}
          />

          {/* subtle noise */}
          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/35 to-black/75" />
        </div>

        {/* ===== Navbar ===== */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050814]/55 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <Image
                src="/logo.png"
                alt="L&L Tech Solutions"
                width={40}
                height={40}
                priority
                className="h-9 w-auto object-contain drop-shadow-[0_0_16px_rgba(168,85,247,0.35)]"
              />
              <span className="hidden sm:block truncate font-semibold tracking-tight text-white/90">
                L&L Tech Solutions
              </span>
            </Link>

            <ScrollSpyNav
              className="hidden md:flex items-center gap-8"
              items={NAV}
            />

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_12px_40px_rgba(255,255,255,0.10)] hover:bg-white/90 transition"
              >
                Free Tech Audit
              </a>

              {/* Mobile menu */}
              <details className="relative md:hidden">
                <summary className="list-none cursor-pointer rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition">
                  Menu
                </summary>

                <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#070b1a]/95 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.50)]">
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
                      className="mt-2 block rounded-xl bg-white px-3 py-2 text-center text-sm font-semibold text-slate-900 hover:bg-white/90 transition"
                    >
                      Free Tech Audit
                    </a>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </header>

        <main className="relative">{children}</main>

        <footer className="border-t border-white/10">
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

        {/* Anchor offset for sticky header */}
        <style>{`section[id]{scroll-margin-top:96px;}`}</style>
      </body>
    </html>
  );
}
