import Link from "next/link";
export default function NotFound() {
  return (
    <section className="tl-demo-not-found">
      <h1>That page isn’t here.</h1>
      <p>Return to the demo to keep exploring.</p>
      <Link href="/">Back to the home page →</Link>
    </section>
  );
}
