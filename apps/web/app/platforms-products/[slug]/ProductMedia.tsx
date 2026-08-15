'use client';

import { useMemo, useState } from 'react';
import styles from './PlatformDetailPage.module.css';

type ProductMediaProps = {
  name: string;
  localImage?: string | null;
  screenshots?: string[] | null;
  mode?: 'hero' | 'interface';
};

export function ProductMedia({
  name,
  localImage,
  screenshots,
  mode = 'hero',
}: ProductMediaProps) {
  const candidates = useMemo(
    () =>
      [localImage, ...(screenshots ?? [])].filter(
        (value, index, array): value is string => !!value && array.indexOf(value) === index,
      ),
    [localImage, screenshots],
  );

  const [index, setIndex] = useState(0);
  const src = candidates[index];

  if (src) {
    return (
      <img
        className={mode === 'hero' ? styles.heroImage : styles.interfaceImage}
        src={src}
        alt={mode === 'hero' ? `${name} platform cover` : `${name} platform visual`}
        onError={() => setIndex((current) => current + 1)}
      />
    );
  }

  return (
    <div
      className={mode === 'hero' ? styles.heroFallback : styles.interfaceFallback}
      aria-hidden="true"
    >
      <div className={styles.fallbackChrome}>
        <span />
        <span />
        <span />
      </div>

      <div className={styles.fallbackGrid}>
        <aside>
          <i />
          <i />
          <i />
          <i />
        </aside>
        <main>
          <header>
            <span />
            <span />
          </header>
          <section>
            <i />
            <i />
            <i />
            <i />
            <i />
          </section>
        </main>
      </div>
    </div>
  );
}
