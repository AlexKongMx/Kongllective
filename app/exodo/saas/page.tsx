import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

const videoUrl = "/media/exodo/saas-demo-v1.mp4";

export const metadata: Metadata = {
  title: "SaaS Explainers | Éxodo × Kongllective",
  description: "A look at Éxodo's animated explainer work for product stories and launches.",
  alternates: { canonical: "/exodo/saas" },
};

export default function ExodoSaas() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" aria-label="Kongllective home" className={styles.brand}>KONGLLECTIVE<span>.</span></Link>
        <span>Selected partner work / Éxodo</span>
      </header>
      <div className={styles.content}>
        <p className={styles.kicker}>Éxodo Animation × Kongllective</p>
        <h1>Make the product<br /><em>easier to see.</em></h1>
        <p className={styles.intro}>Some features make sense as soon as you see them. Éxodo helps turn product stories and existing assets into animated content for launches, demos and marketing, while your team keeps the creative direction.</p>
        <div className={styles.player}>
          <video
            controls
            playsInline
            preload="metadata"
            poster="/media/exodo/saas-demo-poster-v1.jpg"
            aria-label="Éxodo animated explainer demo"
            width={1280}
            height={720}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support this video. <a href={videoUrl}>Open the demo directly</a>.
          </video>
        </div>
        <p className={styles.fallback}>Press play to watch with sound. You can also <a href={videoUrl} target="_blank" rel="noreferrer">open the demo directly</a>.</p>
        <div className={styles.closing}>
          <div><span>01 / Product storytelling</span><span>02 / Animation production</span><span>03 / Launch content</span></div>
          <a href="mailto:alex@kongllective.com?subject=Éxodo%20SaaS%20explainer">Talk to Alex <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <footer className={styles.footer}><span>Producer-led creative partnerships</span><span>Vancouver · Mexico City</span></footer>
    </main>
  );
}
