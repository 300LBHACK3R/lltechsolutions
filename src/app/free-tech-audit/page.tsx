import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Free Digital Audit",
  "Request a practical review of your website, customer journey, local-search foundations and social presence.",
  "/free-tech-audit",
);
export default function AuditPage() {
  return (
    <>
      <PageIntro
        eyebrow="Free digital audit"
        title="Know what to improve first."
        description="A practical starting conversation for business owners. We review your public digital presence and identify priorities worth addressing."
      />
      <div className="container">
        <div className="audit-grid">
          {[
            [
              "Website & customer journey",
              "Is the business clear? Can customers find the right service, understand the offer and take the next step?",
            ],
            [
              "Search foundations",
              "We review public page structure, titles, descriptions and local business information for obvious gaps.",
            ],
            [
              "Brand & content",
              "We look at consistency across your website and social profiles, including imagery, messaging and recent content.",
            ],
            [
              "A useful next step",
              "You receive a focused recommendation to help decide what deserves attention. Implementation is scoped separately.",
            ],
          ].map(([title, copy]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{copy}</p>
            </section>
          ))}
        </div>
        <div className="button-row" style={{ paddingBottom: 70 }}>
          <Link href="/contact?service=Free%20Digital%20Audit" className="button button-gold">
            Request Your Audit ↗
          </Link>
          <Link href="/projects" className="text-link">
            Explore our work →
          </Link>
        </div>
      </div>
    </>
  );
}
