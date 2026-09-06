import Link from "next/link";
import { servicePillars } from "@/data/services";
import Reveal from "@/components/ui/Reveal";
export default function HomeServicesPreview() {
  return (
    <section className="section section-charcoal">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Three disciplines. One digital partner.</p>
              <h2>Everything connects.</h2>
            </div>
            <p>
              From the first impression to the systems behind it, we help your business show up and
              work better.
            </p>
          </div>
          <div className="service-rows">
            {servicePillars.map((service, index) => (
              <Link href={`/services#${service.id}`} className="service-row" key={service.id}>
                <span className="row-number">0{index + 1}</span>
                <h3>{service.name}</h3>
                <p>{service.preview}</p>
                <span className="row-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
