import Link from "next/link";

const trustItems = [
  "Custom Websites",
  "SEO Foundations",
  "Remote Support",
  "Infrastructure",
  "Calgary + Canada-Wide",
  "Fast Response",
];

type TrustBarProps = {
  cta?: boolean;
};

export default function TrustBar({ cta = false }: TrustBarProps) {
  return (
    <section className="border-y border-[rgba(212,175,55,0.12)] bg-black/45 py-5">
      <div className="container-premium">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {trustItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.045)] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/76"
              >
                {item}
              </span>
            ))}
          </div>

          {cta ? (
            <div className="flex justify-center lg:justify-end">
              <Link href="/free-tech-audit" className="btn-gold">
                Get A Free Tech Audit
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
