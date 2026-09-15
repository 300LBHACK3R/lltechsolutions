import {
  collectionCarePlans,
  collectionPricingNote,
  designPrice,
  selectedExtras,
  type WebsiteDesign,
} from "@/data/website-collection";

export default function CostSummary({
  design,
  extras = [],
  care = "unsure",
}: {
  design: WebsiteDesign;
  extras?: readonly string[];
  care?: string;
}) {
  const help = selectedExtras(extras);
  const plan = collectionCarePlans.find((item) => item.id === care);
  return (
    <div className="journey-cost">
      <h3>What your proposal will cover</h3>
      <dl>
        <div>
          <dt>
            {design.name} ·{" "}
            {design.status === "client-example"
              ? "Similar design & launch"
              : "Personalization & launch"}
          </dt>
          <dd>{designPrice(design)}</dd>
        </div>
        <div>
          <dt>
            Additional help
            {help.length > 0 && <small>{help.map((item) => item.name).join(" · ")}</small>}
          </dt>
          <dd>{help.length ? "Quoted separately" : "None selected"}</dd>
        </div>
        <div>
          <dt>Monthly support{plan && <small>{plan.name}</small>}</dt>
          <dd>
            {plan
              ? "Optional · quoted separately"
              : care === "none"
                ? "No plan selected"
                : "We’ll help you decide"}
          </dd>
        </div>
        <div>
          <dt>Hosting, domain & provider fees</dt>
          <dd>Identified separately in your proposal</dd>
        </div>
        <div>
          <dt>Final total & applicable taxes</dt>
          <dd>Confirmed before your deposit</dd>
        </div>
      </dl>
      <p>
        No payment is taken here. We confirm the scope, revisions, timeline and all costs with you
        before work begins.
      </p>
      <p>{collectionPricingNote}</p>
    </div>
  );
}
