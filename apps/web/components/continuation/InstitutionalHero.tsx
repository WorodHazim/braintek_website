import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './InstitutionalHero.module.css';

type HeroRow = {
  number: string;
  title: string;
  note: string;
};

type HeroAction = {
  label: string;
  href: string;
};

type InstitutionalHeroProps = {
  variant: 'services' | 'sectors' | 'platforms' | 'portfolio' | 'insights' | 'contact';
  eyebrow: string;
  title: string;
  body?: string | null;
  modelLabel: string;
  rows: HeroRow[];
  primary?: HeroAction;
  secondary?: HeroAction;
};

export function InstitutionalHero({
  variant,
  eyebrow,
  title,
  body,
  modelLabel,
  rows,
  primary,
  secondary,
}: InstitutionalHeroProps) {
  return (
    <section
      className={`${styles.hero} ${styles[`hero_${variant}`]}`}
      aria-labelledby={`${variant}-hero-title`}
    >
      <div className={styles.heroImage} aria-hidden="true" />
      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={styles.heroFrame}>
        <div className={styles.heroCopy}>
          <p className={styles.heroKicker}>{eyebrow}</p>

          <h1 id={`${variant}-hero-title`}>{title}</h1>

          {body ? <p className={styles.heroBody}>{body}</p> : null}

          {primary || secondary ? (
            <div className={styles.heroActions}>
              {primary ? (
                <Link className={styles.primaryAction} href={primary.href}>
                  {primary.label}
                  <ArrowUpRight size={15} />
                </Link>
              ) : null}

              {secondary ? (
                <Link className={styles.secondaryAction} href={secondary.href}>
                  {secondary.label}
                  <ArrowUpRight size={15} />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        <aside className={styles.heroModel} aria-label={modelLabel}>
          <p>{modelLabel}</p>

          {rows.map((row) => (
            <div key={row.number}>
              <span>{row.number}</span>
              <strong>{row.title}</strong>
              <small>{row.note}</small>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
