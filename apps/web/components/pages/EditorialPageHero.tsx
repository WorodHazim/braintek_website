'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import styles from './EditorialPageHero.module.css';
import { BrandMotionStrip } from '@/components/BrandMotionStrip';

type Variant = 'about' | 'sectors' | 'platforms' | 'why';

type Props = {
  variant: Variant;
  eyebrow: string;
  title: string;
  body?: string | null;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

const variantSignals: Record<Variant, { index: string; label: string; meta: string }[]> = {
  about: [
    { index: '01', label: 'Protect', meta: 'Digital trust' },
    { index: '02', label: 'Build', meta: 'Intelligent systems' },
    { index: '03', label: 'Empower', meta: 'Human capability' },
  ],
  sectors: [
    { index: '01', label: 'Context', meta: 'Mandates & risk' },
    { index: '02', label: 'Adapt', meta: 'Sector-sensitive design' },
    { index: '03', label: 'Advance', meta: 'Sustainable outcomes' },
  ],
  platforms: [
    { index: '01', label: 'Assess', meta: 'Insight & readiness' },
    { index: '02', label: 'Operate', meta: 'Workflows & services' },
    { index: '03', label: 'Protect', meta: 'Visibility & control' },
  ],
  why: [
    { index: '01', label: 'Connected', meta: 'One operating model' },
    { index: '02', label: 'Practical', meta: 'Built around real work' },
    { index: '03', label: 'Sustainable', meta: 'Capability that lasts' },
  ],
};

export function EditorialPageHero({
  variant,
  eyebrow,
  title,
  body,
  primaryLabel = 'Book a Consultation',
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref,
}: Props) {
  const heroRef = useRef<HTMLElement>(null);

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty('--cursor-x', `${x}%`);
    event.currentTarget.style.setProperty('--cursor-y', `${y}%`);
  };

  return (
    <>
    <section
      ref={heroRef}
      className={`${styles.hero} ${styles[`hero_${variant}`]}`}
      onPointerMove={onPointerMove}
      style={{ '--cursor-x': '72%', '--cursor-y': '42%' } as CSSProperties}
    >
      <div className={styles.imageLayer} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.orbit} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          {body ? <p className={styles.body}>{body}</p> : null}

          <div className={styles.actions}>
            <Link className={styles.primary} href={primaryHref}>
              {primaryLabel} <ArrowUpRight size={16} />
            </Link>
            {secondaryLabel && secondaryHref ? (
              <Link className={styles.secondary} href={secondaryHref}>
                {secondaryLabel} <ArrowDown size={15} />
              </Link>
            ) : null}
          </div>
        </div>

        <div className={styles.signalPanel} aria-label={`${eyebrow} overview`}>
          <div className={styles.signalTop}>
            <span>{variant === 'sectors' ? 'ADAPTED TO CONTEXT' : 'BRAINTEK / CONNECTED MODEL'}</span>
            <i />
          </div>

          <div className={styles.signalCore} aria-hidden="true">
            <span />
            <i />
            <b />
          </div>

          <div className={styles.signalRows}>
            {variantSignals[variant].map((item) => (
              <div className={styles.signalRow} key={item.index}>
                <span>{item.index}</span>
                <strong>{item.label}</strong>
                <small>{item.meta}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomSignal} aria-hidden="true">
        <span>SECURITY</span><i /><span>SYSTEMS</span><i /><span>CAPABILITY</span>
      </div>
    </section>
    <BrandMotionStrip />
    </>
  );
}
