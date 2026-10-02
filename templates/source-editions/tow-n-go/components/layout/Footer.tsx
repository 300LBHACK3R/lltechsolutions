import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/recent-jobs", label: "Project Gallery" },
  {
    href: "/rentals",
    label: "Trailer Rentals",
  },
  {
    href: "/services",
    label: "Services / Add-Ons",
  },
  {
    href: "/about",
    label: "About Us",
  },
  {
    href: "/faq",
    label: "FAQ",
  },
  {
    href: "/contact",
    label: "Contact / Inquiry",
  },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.07),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.025),transparent_55%)]"
      />

      <Container className="relative py-10 sm:py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.35fr)_minmax(180px,0.8fr)_minmax(220px,1fr)] md:gap-8 lg:gap-14">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              {siteConfig.shortName}
            </h2>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Trailer rentals, empty-trailer delivery and collection, and loaded transport across
              Sampletown and the Sample Valley. You load it. Trail & Co hauls it.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
              Quick Links
            </h2>

            <div className="mt-5 flex flex-col items-start gap-3.5 text-sm">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-sm text-zinc-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
              Contact
            </h2>

            <div className="mt-5 space-y-3.5 text-sm leading-6 text-zinc-300">
              <p>{siteConfig.location}</p>

              <a
                href={siteConfig.phoneHref}
                className="block w-fit rounded-sm transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                {siteConfig.phone}
              </a>

              <a
                href={siteConfig.emailHref}
                className="block w-fit max-w-full break-all rounded-sm transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:break-words"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs leading-6 text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <p>Fictional sample business. Replace all details before launch.</p>
        </div>
      </Container>
    </footer>
  );
}
