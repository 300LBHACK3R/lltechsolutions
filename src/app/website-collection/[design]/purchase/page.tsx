import SignalArtwork from "@/components/ui/SignalArtwork";
import Link from "next/link";
import { notFound } from "next/navigation";
import ManagedTemplateCheckout from "@/components/collection/ManagedTemplateCheckout";
import TemplatePrice from "@/components/collection/TemplatePrice";
import TemplatePurchaseOptions from "@/components/collection/TemplatePurchaseOptions";
import { templateManagedOffer, templateMediaOffer } from "@/data/template-purchase";
import {
  availableDesigns,
  collectionInquiryHref,
  designContactDescription,
  designContactLabel,
  isTemplateSaleActive,
} from "@/data/website-collection";
import { isManagedCheckoutConfigured } from "@/lib/managed-commerce";
import { pageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ design: string }>;
  searchParams: Promise<{ checkout?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { design: id } = await params;
  const design = availableDesigns().find((item) => item.id === id);
  if (!design) notFound();
  return {
    ...pageMetadata(
      `${design.name} — Personalization & Launch`,
      `Choose ${design.name} with your supplied content and branding implemented by L&L, page-speed optimization, technical SEO, launch checks and the listed template scope.`,
      `/website-collection/${id}/purchase`,
    ),
    robots: { index: false, follow: true },
  };
}

export default async function ManagedPurchasePage({ params, searchParams }: Props) {
  const { design: id } = await params;
  const design = availableDesigns().find((item) => item.id === id);
  if (!design || design.startingPriceCad === null) notFound();
  const { checkout } = await searchParams;
  const enabled = design.pageCount !== null && isManagedCheckoutConfigured(id);
  const initialSaleActive = isTemplateSaleActive();
  const inquiryHref = collectionInquiryHref({ design: id });

  return (
    <div className="website-collection managed-purchase-page">
      <div className="container">
        <Link className="text-link managed-back" href={`/website-collection/${id}`}>
          ← Back to {design.name}
        </Link>
        <header className="managed-purchase-heading signal-surface signal-surface-quiet">
          <SignalArtwork className="surface-signals" />
          <p className="eyebrow">Your design. Brought to life by L&L.</p>
          <h1>
            {design.name}
            <span>Personalized. Checked. Launched.</span>
          </h1>
          <p>{templateManagedOffer.summary}</p>
        </header>
        <div className="managed-purchase-layout">
          <section className="managed-purchase-scope" aria-labelledby="managed-scope-title">
            <p className="eyebrow">Your purchase includes</p>
            <h2 id="managed-scope-title">A website for your business.</h2>
            <div className="managed-scope-price">
              <TemplatePrice
                price={design.startingPriceCad}
                initialSaleActive={initialSaleActive}
              />
              <p>One-time personalization & launch · Before applicable taxes</p>
            </div>
            <p className="managed-page-count">
              {design.pageCount === null
                ? "Page scope and final price agreed before booking"
                : design.pageCount === 1
                  ? "One-page website"
                  : `${design.pageCount}-page website`}
              {" · "}
              {designContactLabel(design)}
            </p>
            <ul>
              {design.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="managed-scope-detail">
              <h3>Your contact setup</h3>
              <p>{designContactDescription(design)}</p>
              <p>
                Page-speed optimization, technical SEO and metadata setup, responsive checks and
                security checks are included. Search rankings and exact performance scores depend on
                content, integrations and testing conditions; they aren’t guaranteed results.
              </p>
            </div>
            {(design.clientProjectId || design.independentConcept) && (
              <p className="managed-reference-note">
                This is a new website for your business based on the displayed design direction. The
                original business’s identity, client files, photos and videos are not included. Your
                version uses your own approved content and branding.
              </p>
            )}
            <div className="managed-scope-detail">
              <h3>Original content, if you need it.</h3>
              <p>{templateMediaOffer.summary}</p>
              <Link className="text-link" href={templateMediaOffer.href}>
                Explore photo & video services ↗
              </Link>
            </div>
            <details className="managed-scope-extras">
              <summary>What is quoted separately?</summary>
              <p>
                Extra pages, substantial design changes, original photography and video, custom
                features and integrations, domain and hosting fees, provider charges and ongoing
                maintenance. Your supplied media is implemented within the listed setup scope.
              </p>
              <p>
                {design.deliveryWindow} L&L follows up to arrange content handover, confirm the
                delivery plan and discuss any requested extras before that extra work starts.
              </p>
              <Link className="text-link" href={inquiryHref}>
                Ask for a custom quote ↗
              </Link>
            </details>
            <div className="managed-code-alternative">
              <h3>Prefer a code-only option?</h3>
              <p>
                Work with editable files and setup instructions. You handle personalization,
                integrations, hosting and launch. Reference designs need a separately quoted
                reusable version; their original client files are not for sale.
              </p>
              <TemplatePurchaseOptions designId={id} compact />
            </div>
          </section>
          <section className="managed-purchase-checkout" aria-label="Your business and checkout">
            {checkout === "cancelled" && (
              <p role="status" className="managed-checkout-message">
                Checkout was cancelled. You can review the offer and start again when you’re ready.
              </p>
            )}
            {enabled ? (
              <ManagedTemplateCheckout
                designId={id}
                name={design.name}
                regularPriceCad={design.startingPriceCad}
                initialSaleActive={initialSaleActive}
                inquiryHref={inquiryHref}
              />
            ) : (
              <div className="managed-checkout-unavailable">
                <p className="eyebrow">Let’s make it yours</p>
                <h2>
                  {design.pageCount === null
                    ? "Confirm your project scope."
                    : "We’ll help you get started."}
                </h2>
                {design.pageCount === null ? (
                  <p>
                    This client-inspired example is a starting point. We’ll agree your pages,
                    features and final price before booking.
                  </p>
                ) : (
                  <p>
                    Online checkout is being connected. You can still arrange this template’s
                    personalization and launch with L&L. Send your enquiry with this design selected
                    and we’ll confirm the next steps with you.
                  </p>
                )}
                <Link className="button button-gold" href={inquiryHref}>
                  Arrange my website ↗
                </Link>
                <p className="managed-checkout-note">
                  Need extra pages, photos or video? Include that in your enquiry for a separate
                  quote.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
