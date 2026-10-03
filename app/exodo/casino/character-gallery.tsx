"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type Character = {
  file: string;
  name: string;
  detail: string;
  width: number;
  height: number;
};

export default function CharacterGallery({ characters, media }: { characters: Character[]; media: string }) {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const previousOverflow = useRef<string | null>(null);
  const character = characters[selected];

  const move = (direction: number) => setSelected((index) => (index + direction + characters.length) % characters.length);
  const restoreScroll = () => {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    touch.current = null;
  };

  useEffect(() => () => {
    if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
  }, []);

  return (
    <>
      <div className={styles.gallery}>
        {characters.map((item, index) => (
          <button
            key={item.file}
            type="button"
            className={styles.card}
            aria-label={`View character: ${item.name}`}
            aria-haspopup="dialog"
            onClick={() => {
              setSelected(index);
              dialog.current?.showModal();
              previousOverflow.current = document.body.style.overflow;
              document.body.style.overflow = "hidden";
            }}
          >
            <span className={`${styles.cardImage} ${index < 2 ? styles.darkImage : ""}`}>
              <Image src={`${media}/${item.file}.jpg`} alt={item.name} width={item.width} height={item.height} unoptimized />
            </span>
            <span className={styles.cardCaption}>
              <span><span className={styles.cardTitle}>{item.name}</span><span className={styles.cardDetail}>{item.detail}</span></span>
              <span aria-hidden="true">＋</span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-labelledby="character-title"
        aria-describedby="character-instructions"
        onClose={restoreScroll}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div className={styles.lightboxHeader}>
          <span>Éxodo / Character showcase</span>
          <button type="button" aria-label="Close gallery" onClick={() => dialog.current?.close()}>×</button>
        </div>
        <div
          className={styles.lightboxStage}
          onTouchStart={(event) => {
            touch.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
          }}
          onTouchCancel={() => { touch.current = null; }}
          onTouchEnd={(event) => {
            const start = touch.current;
            touch.current = null;
            if (!start || event.touches.length || !event.changedTouches.length) return;
            const dx = event.changedTouches[0].clientX - start.x;
            const dy = event.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
          }}
        >
          <Image src={`${media}/${character.file}.jpg`} alt={character.name} width={character.width} height={character.height} unoptimized draggable={false} />
          <button type="button" className={styles.previous} aria-label="Previous character" onClick={() => move(-1)}>‹</button>
          <button type="button" className={styles.next} aria-label="Next character" onClick={() => move(1)}>›</button>
        </div>
        <div className={styles.lightboxCaption} aria-live="polite" aria-atomic="true">
          <h3 id="character-title">{character.name}</h3>
          <span>{selected + 1} / {characters.length}</span>
        </div>
        <p id="character-instructions" className={styles.lightboxHint}>Swipe or use the arrows to explore. Press Escape to close.</p>
      </dialog>
    </>
  );
}
