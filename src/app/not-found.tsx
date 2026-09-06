import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
export default function NotFound() {
  return (
    <>
      <PageIntro
        eyebrow="404 / Page not found"
        title="Let’s get you back on track."
        description="This page may have moved. Explore our current services or get in touch about your project."
      />
      <div className="container button-row" style={{ paddingBottom: 90 }}>
        <Link href="/" className="button button-gold">
          Back to home
        </Link>
        <Link href="/services" className="text-link">
          Explore services →
        </Link>
      </div>
    </>
  );
}
