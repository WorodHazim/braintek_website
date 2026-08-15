'use client';

import { useMemo, useState } from 'react';
import styles from './PlatformsLandingV2.module.css';

type PlatformCoverProps = {
  slug: string;
  name: string;
  screenshots?: string[] | null;
};

function normalizedKey(slug: string, name: string) {
  const source = `${slug} ${name}`.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (source.includes('psytest') || source.includes('pytest')) return 'psytest';
  if (source.includes('ailex')) return 'ailex';
  if (source.includes('scheduler')) return 'scheduler';
  if (source.includes('skoolee')) return 'skoolee';
  if (source.includes('opspilot')) return 'opspilot';
  if (source.includes('sentinelshield') || source.includes('sentineshield')) {
    return 'sentinelshield';
  }

  return slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
}

export function PlatformCover({
  slug,
  name,
  screenshots,
}: PlatformCoverProps) {
  const key = normalizedKey(slug, name);

  const candidates = useMemo(
    () =>
      [
        `/home/platforms/${key}.jpg`,
        `/home/platforms/${key}.png`,
        `/home/platforms/${key}.webp`,
        ...(screenshots ?? []),
      ].filter(
        (value, index, array): value is string =>
          !!value && array.indexOf(value) === index,
      ),
    [key, screenshots],
  );

  const [index, setIndex] = useState(0);
  const src = candidates[index];

  if (!src) {
    return (
      <div className={styles.coverFallback} aria-hidden="true">
        <div className={styles.fallbackChrome}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.fallbackUi}>
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
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <img
      className={styles.coverImage}
      src={src}
      alt={`${name} platform cover`}
      loading="lazy"
      draggable={false}
      onError={() => setIndex((current) => current + 1)}
    />
  );
}
