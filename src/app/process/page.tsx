import PageIntro from "@/components/ui/PageIntro";
import ProjectCTA from "@/components/ui/ProjectCTA";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Our Process",
  "A clear project process from discovery and scope through design, development, review, launch and ongoing management.",
  "/process",
);
const steps = [
  {
    title: "Understand the business.",
    copy: "We start with your customers, your goals and the work your digital presence needs to do. Existing content, workflows and constraints shape the recommendation.",
    delivery: "Discovery and priorities",
  },
  {
    title: "Define the right scope.",
    copy: "We agree on the deliverables, responsibilities, pricing and timeline. Design direction and required content are planned before implementation begins.",
    delivery: "Written scope and a clear plan",
  },
  {
    title: "Design. Build. Refine.",
    copy: "We create the interface, implement the features and bring the content together. You review meaningful progress, with feedback resolved against the agreed scope.",
    delivery: "A working project for review",
  },
  {
    title: "Launch with care.",
    copy: "We check representative screen sizes, navigation, forms, metadata and the production build. Domain and deployment work follow approval, with documentation for the handoff.",
    delivery: "Approved release and handoff",
  },
  {
    title: "Keep moving forward.",
    copy: "Where an ongoing partnership fits, we plan updates, content, maintenance and improvements around your business. The scope and reporting cadence are agreed together.",
    delivery: "Optional ongoing partnership",
  },
];
export default function ProcessPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our process"
        title="Clear thinking. Careful execution."
        description="A structured process keeps the project understandable, the scope accountable and the finished work easier to maintain."
      />
      <div className="container process-list">
        {steps.map((step, index) => (
          <section className="process-step" key={step.title}>
            <span>0{index + 1}</span>
            <h2>{step.title}</h2>
            <p>
              {step.copy}
              <small>{step.delivery}</small>
            </p>
          </section>
        ))}
      </div>
      <ProjectCTA />
    </>
  );
}
