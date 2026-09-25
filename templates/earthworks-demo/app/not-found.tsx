import Link from "next/link";

export default function DemoNotFound() {
  return (
    <div className="earthworks-demo-not-found">
      <h1>That page isn’t in this demo.</h1>
      <p>Explore the earthworks website from the beginning.</p>
      <Link href="/">Return to the demo →</Link>
    </div>
  );
}
