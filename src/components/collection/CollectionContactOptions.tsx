import {
  contactScopeDetails,
  contactScopeNotes,
  contactScopeSummary,
  designContactDescription,
  designContactLabel,
  type WebsiteDesign,
} from "@/data/website-collection";

export default function CollectionContactOptions({ design }: { design?: WebsiteDesign }) {
  return (
    <aside className="collection-contact-options" aria-label="Contact setup for a new website">
      <p className="collection-contact-options-summary">
        {design ? (
          <>
            <strong>For your new website: {designContactLabel(design)}.</strong>{" "}
            {designContactDescription(design)}
          </>
        ) : (
          contactScopeSummary
        )}
      </p>
      <details>
        <summary>Contact setup, upgrades &amp; care</summary>
        <div className="collection-contact-options-detail">
          {design ? (
            <p>{contactScopeSummary}</p>
          ) : (
            <dl>
              <div>
                <dt>{contactScopeDetails.direct.priceLabel} · Direct contact</dt>
                <dd>{contactScopeDetails.direct.description}</dd>
              </div>
              <div>
                <dt>{contactScopeDetails["enquiry-form"].priceLabel} · Standard enquiry form</dt>
                <dd>{contactScopeDetails["enquiry-form"].description}</dd>
              </div>
            </dl>
          )}
          <p>{contactScopeNotes.upgrades}</p>
          <p>{contactScopeNotes.care}</p>
          <p>{contactScopeNotes.standards}</p>
          {(!design || design.status === "client-example") && (
            <p>{contactScopeNotes.clientExamples}</p>
          )}
        </div>
      </details>
    </aside>
  );
}
