'use client';

import { useMemo, useState } from 'react';
import styles from './AboutLandingV2.module.css';

export function CeoPortrait() {
  const candidates = useMemo(
    () => [
      '/home/team/prof-fawzi-alghazali.jpg',
      '/home/team/prof-fawzi-alghazali.png',
      '/home/team/prof-fawzi-alghazali.webp',
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const src = candidates[index];

  if (!src) {
    return (
      <div className={styles.ceoFallback} aria-label="Prof. Fawzi Alghazali">
        <span>FG</span>
      </div>
    );
  }

  return (
    <img
      className={styles.ceoImage}
      src={src}
      alt="Prof. Fawzi Alghazali, CEO and Founder of BRAINTEK"
      onError={() => setIndex((current) => current + 1)}
    />
  );
}
