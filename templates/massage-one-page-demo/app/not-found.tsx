import Link from "next/link";

export default function DemoNotFound() {
  return (
    <div className="onepage-demo-not-found">
      <h1>Everything is on one page.</h1>
      <p>Return to the massage demo to explore its treatments, approach and contact section.</p>
      <Link href="/">Return to the demo →</Link>
    </div>
  );
}
