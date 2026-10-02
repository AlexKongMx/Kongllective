import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const media = "/media/exodo/casino";
const video = `${media}/eas-demo-2026.mp4`;
const characters = [
  { file: "diamond-queen", name: "Diamond queen", detail: "Royal character / red palette", width: 939, height: 1000 },
  { file: "club-queen", name: "Club queen", detail: "Royal character / blue palette", width: 1000, height: 1000 },
  { file: "heart-jack", name: "Heart jack", detail: "Card character / red palette", width: 1025, height: 1600 },
  { file: "club-jack", name: "Club jack", detail: "Card character / blue palette", width: 982, height: 1600 },
  { file: "joker", name: "Joker", detail: "Juggling character", width: 1266, height: 1474 },
  { file: "red-card-character", name: "Red card character", detail: "Character variation / red palette", width: 1060, height: 1600 },
  { file: "blue-card-character", name: "Blue card character", detail: "Character variation / blue palette", width: 935, height: 1600 },
];

export const metadata: Metadata = {
  title: "Casino Characters & Animation | Éxodo × Kongllective",
  description: "Explore Éxodo's casino character samples and 2026 animation reel, presented by Kongllective.",
  alternates: { canonical: "/exodo/casino" },
  openGraph: {
    title: "Casino Characters & Animation | Éxodo × Kongllective",
    description: "A cast of characters. A world of possibilities. Selected character work and the Éxodo 2026 studio reel.",
    url: "/exodo/casino",
    images: [{ url: `${media}/diamond-queen.jpg`, width: 939, height: 1000, alt: "Éxodo diamond queen character" }],
  },
};

export default function ExodoCasino() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Kongllective home">KONGLLECTIVE<span>.</span></Link>
        <nav aria-label="Page navigation"><a href="#characters">Characters</a><a href="#reel">Watch reel <span aria-hidden="true">↗</span></a></nav>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Éxodo Animation × Kongllective</p>
          <h1 id="hero-title">A cast of<br />characters.<br /><em>A world of<br />possibilities.</em></h1>
          <p className={styles.intro}>Distinctive personalities for casino and gaming worlds. Explore a selection of Éxodo’s character work, then see the studio’s animation in motion.</p>
          <div className={styles.actions}><a className={styles.primary} href="#characters">Explore the characters <span aria-hidden="true">↓</span></a><a href="#reel">Watch the studio reel <span aria-hidden="true">↗</span></a></div>
          <p className={styles.heroNote}>Selected partner work / Casino & gaming</p>
        </div>
        <div className={styles.heroArt}>
          <span className={styles.artIndex}>01 / Meet the cast</span>
          <Image src={`${media}/diamond-queen.jpg`} alt="Diamond queen, a stylized 3D character in a red, white and black card suit costume" width={939} height={1000} priority unoptimized />
          <div className={styles.artCaption}><span>Éxodo Animation</span><span>Character showcase</span></div>
        </div>
      </section>

      <section id="characters" className={styles.section} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>01 / Character showcase</p><h2 id="characters-title">Personality in<br /><em>every detail.</em></h2></div><p>A coordinated cast of card-inspired characters, from royal figures to a playful joker. Open any sample for a closer look.</p></div>
        <div className={styles.gallery}>
          {characters.map((character, index) => (
            <a key={character.file} href={`${media}/${character.file}.jpg`} target="_blank" rel="noreferrer" className={styles.card} aria-label={`View full image: ${character.name} (opens in a new tab)`}>
              <div className={`${styles.cardImage} ${index < 2 ? styles.darkImage : ""}`}><Image src={`${media}/${character.file}.jpg`} alt={character.name} width={character.width} height={character.height} unoptimized /></div>
              <div className={styles.cardCaption}><div><h3>{character.name}</h3><p>{character.detail}</p></div><span aria-hidden="true">↗</span></div>
            </a>
          ))}
        </div>
      </section>

      <section id="reel" className={`${styles.section} ${styles.reelSection}`} aria-labelledby="reel-title">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>02 / Éxodo studio reel</p><h2 id="reel-title">See the work<br /><em>come to life.</em></h2></div><p>The Éxodo 2026 demo offers a broader look at the studio’s animation work across characters, worlds and visual storytelling.</p></div>
        <div className={styles.player}><video controls playsInline preload="metadata" poster={`${media}/eas-demo-2026-poster.jpg`} width={1280} height={720} aria-label="Éxodo Animation 2026 studio demo reel"><source src={video} type="video/mp4" />Your browser does not support this video. <a href={video}>Open the reel directly</a>.</video></div>
        <div className={styles.videoNote}><span>Éxodo Animation / Demo 2026</span><a href={video} target="_blank" rel="noreferrer">Open video directly <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className={styles.contact} aria-labelledby="contact-title"><p className={styles.kicker}>Let’s talk production</p><h2 id="contact-title">What’s your<br /><em>next world?</em></h2><p>Share your creative brief, visual direction and production needs. Alex can connect you with Éxodo to explore the right fit.</p><a className={styles.primary} href="mailto:alex@kongllective.com?subject=%C3%89xodo%20casino%20%26%20gaming%20production">Talk to Alex <span aria-hidden="true">↗</span></a><Link href="/exodo/saas" className={styles.otherWork}>Also explore Éxodo’s SaaS demo <span aria-hidden="true">↗</span></Link></section>
      <footer className={styles.footer}><Link href="/">Kongllective / Selected partners</Link><span>Vancouver · Mexico City</span></footer>
    </main>
  );
}
