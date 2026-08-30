import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

export default function ClientProof() {
  return (
    <section className="section-white relative overflow-hidden py-28 md:py-40">
      <div className="testimonial-blue-bar" />
      <div className="testimonial-gold-orb" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
            <div>
              <span className="section-eyebrow section-eyebrow-dark">
                Client Experience
              </span>

              <h2 className="font-editorial mt-8 text-5xl font-semibold leading-[0.91] tracking-[-0.045em] text-[#10243a] md:text-7xl">
                The result matters.
                <span className="block italic text-[#2f6fbb]">
                  So does the experience of getting there.
                </span>
              </h2>

              <div className="mt-9 flex items-center gap-4">
                <span
                  className="tracking-[0.16em] text-[#b48a2d]"
                  aria-label="Five out of five stars"
                >
                  ★★★★★
                </span>
                <span className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#10243a]/36">
                  Google review
                </span>
              </div>
            </div>

            <blockquote className="executive-testimonial">
              <span className="executive-quote-mark" aria-hidden="true">
                “
              </span>

              <p className="font-editorial relative text-3xl font-semibold leading-[1.14] tracking-[-0.025em] text-[#10243a] md:text-4xl">
                Tate has been a joy to work with. I am blown away by his
                professionalism and care. His communication has made me feel
                understood and heard each step of the way. Money well spent,
                especially on a complicated web project—I know it is in good
                hands with Tate.
              </p>

              <footer className="mt-9 flex flex-col justify-between gap-5 border-t border-[#10243a]/10 pt-7 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold text-[#10243a]">Heather Knorr</p>
                  <p className="mt-1 text-sm text-[#31465e]/52">
                    McKenzie House Massage
                  </p>
                </div>

                <Link
                  href="/projects/web-builds"
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-[#245fa4] transition hover:text-[#10243a]"
                >
                  View the project →
                </Link>
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
