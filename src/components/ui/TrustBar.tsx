import StudioMark from "@/components/ui/StudioMark";
import Link from "next/link";

const clients = [
  "Tow-N-Go Trailers",
  "Crestline Painting",
  "McKenzie House Massage",
  "Tate's TV",
  "TateByers.ca",
];

type TrustBarProps = {
  cta?: boolean;
};

export default function TrustBar({ cta = false }: TrustBarProps) {
  return (
    <section className="trust-bar-corporate">
      <div className="container-premium">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            <StudioMark compact />

            <span className="hidden h-8 w-px bg-[#10243a]/10 lg:block" />

            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {clients.map((client) => (
                <span
                  key={client}
                  className="text-xs font-semibold tracking-[0.01em] text-[#10243a]/52"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          {cta ? (
            <Link
              href="/projects"
              className="text-xs font-black uppercase tracking-[0.15em] text-[#245fa4] transition hover:text-[#10243a]"
            >
              Explore selected work →
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
