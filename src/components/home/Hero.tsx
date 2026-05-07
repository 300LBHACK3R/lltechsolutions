import Reveal from "@/components/ui/Reveal";

const trustItems = [
  "Custom websites",
  "SEO & Google setup",
  "Social media management",
  "Ads & lead generation",
  "Remote tech support",
  "Infrastructure",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="tech-hero-bg relative flex min-h-[calc(100vh-118px)] items-center overflow-hidden border-b border-[rgba(212,175,55,0.12)] py-12 text-center md:min-h-[calc(100vh-104px)] md:py-16"
    >
      <div className="absolute inset-0 bg-black/62" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2),transparent_42%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,215,122,0.55)] to-transparent" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="mx-auto max-w-6xl">
            <span className="badge-gold mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Websites • Marketing • IT • Infrastructure
            </span>

            <h1 className="mx-auto mt-6 max-w-6xl text-5xl font-black leading-[0.9] tracking-[-0.07em] md:text-7xl xl:text-7xl">
              Technology That
              <br />
              Builds Trust &
              <br />
              Drives Growth
              <span className="text-[#f5d77a]">.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-white/76 md:text-xl md:leading-9">
              Custom websites, SEO, Google/Facebook setup, social media, ads,
              remote tech support, and infrastructure — all under one technology
              partner.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#contact" className="btn-gold">
                Request A Quote
              </a>
              <a href="#projects" className="btn-ghost-gold">
                View Our Work
              </a>
            </div>

            <div className="mx-auto mt-7 flex max-w-4xl flex-wrap justify-center gap-2">
              {trustItems.map((item) => (
                <span key={item} className="badge-dark">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
