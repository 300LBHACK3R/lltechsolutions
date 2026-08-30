import Reveal from "@/components/ui/Reveal";
import Link from "next/link";
import type { ReactNode } from "react";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalDocumentProps = {
  updated: string;
  sections: readonly LegalSection[];
};

export default function LegalDocument({
  updated,
  sections,
}: LegalDocumentProps) {
  return (
    <section className="section-ivory relative overflow-hidden py-20 md:py-28">
      <div className="ivory-blue-orb ivory-blue-orb-right" />
      <div className="ivory-gold-orb" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_30px_90px_rgba(16,36,58,0.08)] sm:p-10 md:p-14">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9b762c]">
              Last updated {updated}
            </p>

            <div className="legal-document mt-10 grid gap-12">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-editorial text-3xl font-semibold tracking-[-0.035em] text-[#10243a] md:text-4xl">
                    {section.title}
                  </h2>
                  <div className="mt-5 grid gap-4 text-sm leading-7 text-[#31465e]/76 md:text-base md:leading-8">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-14 flex flex-col gap-3 border-t border-black/10 pt-8 sm:flex-row">
              <Link href="/contact" className="btn-blue">
                Contact L&amp;L
              </Link>
              <Link href="/" className="btn-dark-outline">
                Return Home
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
