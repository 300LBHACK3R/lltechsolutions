import { servicePillars } from "@/data/services";
import Reveal from "@/components/ui/Reveal";
import ServiceExplorer from "@/components/home/ServiceExplorer";
export default function HomeServicesPreview() {
  return (
    <section
      className="section section-charcoal services-preview"
      aria-labelledby="services-preview-title"
    >
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Three disciplines. One digital partner.</p>
              <h2 id="services-preview-title">
                One business.
                <br />
                <span className="gold">Every digital connection.</span>
              </h2>
            </div>
            <p>
              From the first impression to the systems behind it, we help your business show up and
              work better.
            </p>
          </div>
          <ServiceExplorer
            services={servicePillars.map(({ id, name, shortName, preview, title }) => ({
              id,
              name,
              shortName,
              preview,
              title,
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
