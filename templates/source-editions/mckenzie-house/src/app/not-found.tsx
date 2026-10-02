import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <>
      <Header />

      <main id="main-content" className={styles.page}>
        <section className={styles.card} aria-labelledby="not-found-heading">
          <p className={styles.eyebrow}>404 · Page Not Found</p>

          <h1 id="not-found-heading">This page is no longer here.</h1>

          <p>
            The address may have changed, or the page may have been removed. You can return home,
            explore your practitioner’s services, or contact Cedar House Wellness directly.
          </p>

          <div className={styles.actions}>
            <Link className="button primary" href="/">
              Return Home
            </Link>

            <Link className="button secondary" href="/#services">
              Explore Services
            </Link>

            <Link className="button secondary" href="/contact">
              Contact your practitioner
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
