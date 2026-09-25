import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DesignPreview from "@/components/collection/DesignPreview";
import TemplateShowcase from "@/components/collection/TemplateShowcase";
import paintingDemo from "@/data/painting-demo.json";
import plumbingDemo from "@/data/plumbing-demo.json";
import earthworksDemo from "@/data/earthworks-demo.json";
import lawncareDemo from "@/data/lawncare-demo.json";
import horizonDemo from "@/data/horizon-demo.json";
import CollectionContactOptions from "@/components/collection/CollectionContactOptions";
import CollectionCustomization from "@/components/collection/CollectionCustomization";
import { readTemplateShowcase } from "@/lib/template-showcase";
import CollectionMedia from "@/components/collection/CollectionMedia";
import CostSummary from "@/components/collection/CostSummary";
import ProjectVideo from "@/components/projects/ProjectVideo";
import { projects, projectPath } from "@/data/projects";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, liveDemoLabel } from "@/config/site";
import {
  availableDesigns,
  categoryForIndustry,
  categoryHref,
  collectionInquiryHref,
  collectionIndustries,
  collectionTiers,
  designHref,
  designPrice,
  designPriceContext,
  designStatusLabel,
  designInquiryLabel,
  designScopeLabel,
  designContactLabel,
} from "@/data/website-collection";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ design: string }> };
export function generateStaticParams() {
  return availableDesigns().map((design) => ({ design: design.id }));
}
export async function generateMetadata({ params }: Props) {
  const { design: id } = await params;
  const selected = availableDesigns().find((item) => item.id === id);
  if (!selected) notFound();
  return pageMetadata(
    `${selected.name} Website Design`,
    selected.description,
    designHref(selected),
  );
}
export default async function DesignPage({ params }: Props) {
  const { design: id } = await params;
  const design = availableDesigns().find((item) => item.id === id);
  if (!design) notFound();
  const media =
    design.id === "pigment"
      ? readTemplateShowcase(paintingDemo)
      : design.id === "structure"
        ? readTemplateShowcase(plumbingDemo, "structure")
        : design.id === "earthworks"
          ? readTemplateShowcase(earthworksDemo, "earthworks")
          : design.id === "lawncare"
            ? readTemplateShowcase(lawncareDemo, "lawncare")
            : design.id === "horizon"
              ? readTemplateShowcase(horizonDemo, "horizon")
              : null;
  const category = categoryForIndustry(design.industry);
  const clientProject = design.clientProjectId
    ? projects.find(
        (project) => project.id === design.clientProjectId && project.ownership === "client",
      )
    : undefined;
  if (design.status === "client-example" && !clientProject) notFound();
  const relatedProject = clientProject?.relatedWork
    ? projects.find((project) => project.id === clientProject.relatedWork?.projectId)
    : undefined;
  const liveDemoUrl =
    media?.url ??
    clientProject?.liveUrl ??
    (!design.concept && design.demoUrl.startsWith("https://") ? design.demoUrl : null);
  return (
    <div className="website-collection template-detail">
      <header className="template-detail-header">
        <div className="container">
          <div className="template-detail-breadcrumb">
            <Link
              className="text-link"
              href={category ? `${categoryHref(category)}#designs` : "/website-collection#designs"}
            >
              ← {category?.name ?? "Website Templates"}
            </Link>
            <span>{designStatusLabel(design)}</span>
          </div>
          <div className="template-detail-intro">
            <div className="template-detail-title">
              <p className="eyebrow">
                {collectionTiers.find((tier) => tier.id === design.tier)?.name} /{" "}
                {collectionIndustries.find((industry) => industry.id === design.industry)?.name}
              </p>
              <h1>{design.name}</h1>
              <p className="template-detail-description">{design.description}</p>
            </div>
            <div className="template-detail-purchase">
              <p className="template-detail-price">{designPrice(design)}</p>
              <p className="template-detail-price-context">
                {designPriceContext(design)} · Before applicable taxes.
              </p>
              <p className="template-detail-scope-note">
                {designScopeLabel(design)} · {designContactLabel(design)}
              </p>
              <div className="template-detail-actions">
                <Link
                  className="button button-gold"
                  href={collectionInquiryHref({ design: design.id })}
                >
                  {designInquiryLabel(design)} ↗
                </Link>
                {liveDemoUrl ? (
                  <a
                    className="button button-outline"
                    href={liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {liveDemoLabel} <span className="sr-only">in a new tab</span>↗
                  </a>
                ) : (
                  <a href="#preview" className="button button-outline">
                    View the design ↓
                  </a>
                )}
              </div>
              <p className="template-detail-delivery">{design.deliveryWindow}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <section
          id="preview"
          className="collection-section template-detail-preview"
          aria-labelledby="preview-title"
        >
          <div className="template-detail-preview-heading">
            <h2 id="preview-title">{clientProject ? "Client website" : "Design preview"}</h2>
            <p>
              {media
                ? media.screenshots.length
                  ? "Browse the screenshots for a closer look."
                  : "Your branding, content and imagery make it yours."
                : clientProject
                  ? "Watch the walkthrough or explore the client story."
                  : design.concept
                    ? "Explore the sample pages and try your business name."
                    : "A closer look at the website layout."}
            </p>
          </div>
          {design.independentConcept && (
            <p className="collection-fineprint">{design.independentConcept.note}</p>
          )}
          {media ? (
            <TemplateShowcase design={design} media={media} />
          ) : clientProject ? (
            <>
              <p className="collection-fineprint">
                Built for {clientProject.title} · {clientProject.status}. This is a real client
                example. We can create a similar direction using your own branding, imagery and
                business content. The client’s logo, photos and client-specific materials stay with
                their business.
              </p>
              {design.clientScopeNote && (
                <p className="template-client-scope">{design.clientScopeNote}</p>
              )}
              <ProjectVideo
                video={clientProject.video}
                projectId={`collection-${clientProject.id}`}
              />
              <div className="button-row">
                <Link className="text-link" href={projectPath(clientProject)}>
                  Explore the client story ↗
                </Link>
                {relatedProject && (
                  <Link className="text-link" href={projectPath(relatedProject)}>
                    {clientProject.relatedWork?.label} ↗
                  </Link>
                )}
              </div>
            </>
          ) : design.concept ? (
            <DesignPreview design={design} />
          ) : (
            <div>
              {design.pagePreview && (
                <>
                  <p className="collection-fineprint" id="live-demo-note">
                    Live concept demo with placeholder business details. This is a captured page
                    preview; open the demo to interact. Your own services, content and contact
                    workflow are confirmed before launch.
                  </p>
                  <div
                    className="live-demo-scroll"
                    role="region"
                    aria-label={`${design.name} scrollable page preview`}
                    aria-describedby="live-demo-note"
                    tabIndex={0}
                  >
                    <Image {...design.pagePreview} alt={design.pagePreview.alt} unoptimized />
                  </div>
                </>
              )}
            </div>
          )}
          {design.walkthrough && (
            <CollectionMedia
              video={design.walkthrough}
              title={`${design.name} website walkthrough`}
            />
          )}
        </section>
        <section className="collection-section design-detail-scope" aria-labelledby="scope-title">
          <div>
            <p className="eyebrow">Included in the starting scope</p>
            <h2 id="scope-title">Your website, built with you.</h2>
            <p>
              {designScopeLabel(design)}. {design.deliveryWindow}
            </p>
            <ul>
              {design.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Make it your own</h3>
            <ul>
              {design.customization?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              L&L personalizes and launches collection websites using React, Next.js and TypeScript,
              with deployment through Vercel. Your proposal confirms the finished pages, revisions,
              integrations and content responsibilities.
            </p>
            <p>
              {clientProject
                ? "The client website is a reference for the design direction and customer journey. Your version is separately scoped and built with your own brand and content; client-specific assets are not included."
                : "The design foundation is reusable. Your real identity and content make the finished website yours; an exclusive bespoke layout can be scoped separately."}
            </p>
          </div>
        </section>
        <CollectionContactOptions design={design} />
        <CollectionCustomization designId={design.id} />
        <section
          className="collection-section journey-disclosures"
          aria-label="Useful details before enquiring"
        >
          <details>
            <summary>Pricing, monthly care and separate costs</summary>
            <CostSummary design={design} />
          </details>
          <details>
            <summary>Performance evidence & launch checks</summary>
            {design.performance?.length ? (
              design.performance.map((result) => (
                <article key={`${result.measuredAt}-${result.device}`} className="design-evidence">
                  <h3>
                    {result.device} · {result.measuredAt}
                  </h3>
                  <p>
                    Tested page:{" "}
                    <a href={result.url} target="_blank" rel="noopener noreferrer">
                      {result.url} ↗
                    </a>
                  </p>
                  <p>
                    Lighthouse {result.lighthouseVersion} · {result.conditions}
                  </p>
                  <dl>
                    {Object.entries(result.scores).map(([label, value]) => (
                      <div key={label}>
                        <dt>
                          {label === "bestPractices"
                            ? "Best practices"
                            : label === "seo"
                              ? "SEO"
                              : label}
                        </dt>
                        <dd>{value}/100</dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    className="text-link"
                    href={result.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View the recorded report ↗
                  </a>
                </article>
              ))
            ) : (
              <p>
                No published performance measurements for this design yet. Your personalized website
                is checked before launch; dated reports can be added here when available.
              </p>
            )}
            <p>
              Results describe the tested URL, content and conditions. Personalization, media,
              integrations and connection speed can change them. Every launch includes agreed
              responsive, accessibility, metadata, form and security checks.
            </p>
          </details>
          <details>
            <summary>Optional extras & ongoing support</summary>
            <p>Want to consider content help or monthly care before getting in touch?</p>
            <Link className="text-link" href={`/website-collection/start?design=${design.id}`}>
              Explore support options ↗
            </Link>
          </details>
          <details>
            <summary>What happens after booking?</summary>
            <p>
              Once the scope is agreed, we guide you through your business details, content and
              brand assets. You can ask for help anywhere you need it.
            </p>
            <Link className="text-link" href="/website-collection/brief">
              See the content handover guide ↗
            </Link>
          </details>
        </section>
        <section className="collection-end">
          <div>
            <p className="eyebrow">Your next step</p>
            <h2>Make this your starting point.</h2>
            <p>Tell us about your business. We’ll confirm the scope and price together.</p>
          </div>
          <Link className="button button-gold" href={collectionInquiryHref({ design: design.id })}>
            {designInquiryLabel(design)} ↗
          </Link>
        </section>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${design.name} — L&L website design${design.status === "concept" ? " concept" : ""}`,
          description: design.description,
          url: absoluteUrl(designHref(design)),
          creator: { "@id": absoluteUrl("/#organization") },
          inLanguage: "en-CA",
        }}
      />
    </div>
  );
}
