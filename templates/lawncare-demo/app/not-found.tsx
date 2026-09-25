import Link from "next/link";

export default function DemoNotFound() {
  return (
    <div className="lawncare-demo-not-found">
      <h1>That page isn’t in this demo.</h1>
      <p>Explore the lawn care website from the beginning.</p>
      <Link href="/">Return to the demo →</Link>
    </div>
  );
}
