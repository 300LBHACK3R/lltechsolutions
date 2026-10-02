import Link from "next/link";
import { notFound } from "next/navigation";
import DesignCover from "@/components/collection/DesignCover";
import SourceCheckout from "@/components/collection/SourceCheckout";
import TemplatePrice from "@/components/collection/TemplatePrice";
import {
  sourceProduct,
  sourceHref,
  sourceInquiryHref,
  sourceLicense,
  sourceLicenseVersion,
} from "@/data/source-products";
import {
  websiteDesigns,
  collectionInquiryHref,
  formatPriceCad,
  isTemplateSaleActive,
} from "@/data/website-collection";
import { isSourceCheckoutConfigured } from "@/lib/source-commerce";
import packageManifest from "@/data/source-package-manifest.json";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ design: string }>; searchParams: Promise<{ checkout?: string }> };

export async function generateMetadata({ params }: Props) {
  const { design } = await params;
  const product = sourceProduct(design);
  if (!product) notFound();
  return pageMetadata(
    `${product.name} Source Code`,
    `Download the editable ${product.name} template source with sample content and setup instructions. One business website licence.`,
    sourceHref(design),
  );
}

export default async function SourcePage({ params, searchParams }: Props) {
  const { design: id } = await params;
  const product = sourceProduct(id);
  const design = websiteDesigns.find((item) => item.id === id);
  if (!product || !design) notFound();
  const { checkout } = await searchParams;
  const enabled = isSourceCheckoutConfigured(id);
  const records = packageManifest.packages as { designId: string; assetNote?: string }[];
  const assetNote = records.filter((item) => item.designId === id).at(-1)?.assetNote;

  return (
    <div className="website-collection source-page">
      <div className="container">
        <Link className="text-link source-back" href={`/website-collection/${id}`}>
          ← Back to {product.name}
        </Link>
        <header className="source-heading">
          <p className="eyebrow">The design. Your development.</p>
          <h1>
            {product.name}
            <br />
            <span>Source code.</span>
          </h1>
          <p>A ready-made design foundation, with the freedom to work in the code yourself.</p>
        </header>
        <div className="source-layout">
          <div className="source-preview">
            <DesignCover design={design} />
            <p className="source-small">
              Design preview. Business names and content are examples. Replace them with your own
              before launch.
            </p>
            <Link className="text-link" href={`/website-collection/${id}#preview`}>
              Explore screenshots & live demo ↗
            </Link>
            <section className="source-included" aria-labelledby="source-included-title">
              <h2 id="source-included-title">Inside your download</h2>
              <ul>
                <li>
                  Editable React, Next.js and TypeScript source for this template’s{" "}
                  {design.pageCount === 1 ? "one-page website" : `${design.pageCount}-page layout`}.
                </li>
                <li>Sample content, styles, interactions and included sample imagery.</li>
                <li>Setup instructions, a contact configuration guide and a launch checklist.</li>
                <li>A licence for one business website, with development and staging copies.</li>
              </ul>
              {assetNote && <p className="source-asset-note">{assetNote}</p>}
            </section>
          </div>
          <aside className="source-order" aria-labelledby="source-order-title">
            <p className="eyebrow">Code-only edition</p>
            <h2 id="source-order-title">Build on your terms.</h2>
            <p className="source-price">{formatPriceCad(product.priceCad)}</p>
            <p className="source-small">
              One-time purchase · Before applicable taxes
              <br />
              Separate from the personalization & launch promotion.
            </p>
            <p>
              You handle the content, setup and hosting. Sample forms demonstrate the layout;
              connecting email, booking or payment services is your responsibility.
            </p>
            {checkout === "cancelled" && (
              <p role="status" className="source-status">
                Checkout was cancelled. You can return to it when you’re ready.
              </p>
            )}
            {enabled ? (
              <SourceCheckout designId={id} priceCad={product.priceCad} />
            ) : (
              <div className="source-checkout">
                <p>
                  Online checkout isn’t open for this download yet. Ask us to arrange your purchase.
                </p>
                <Link className="button button-gold" href={sourceInquiryHref(id)}>
                  Ask about this download ↗
                </Link>
              </div>
            )}
            <div className="source-managed">
              <h3>Prefer us to handle it?</h3>
              <p>
                Choose personalization and launch for your branding, supplied content and the setup
                included in the agreed scope.
              </p>
              <TemplatePrice
                price={design.startingPriceCad}
                initialSaleActive={isTemplateSaleActive()}
              />
              <Link className="button button-outline" href={collectionInquiryHref({ design: id })}>
                Personalize & launch ↗
              </Link>
            </div>
          </aside>
        </div>
        <section
          className="source-license"
          id="source-license"
          aria-labelledby="source-license-title"
        >
          <p className="eyebrow">Clear from the start</p>
          <h2 id="source-license-title">{sourceLicense.title}</h2>
          <ul>
            {sourceLicense.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="source-small">
            Licence version {sourceLicenseVersion}. Your ZIP and email link follow verified payment.
            Save a local backup; download links last 30 days. Contact L&L for access or file issues.
            Customization, extra pages, deployment and ongoing support can be quoted separately.
          </p>
        </section>
      </div>
    </div>
  );
}
