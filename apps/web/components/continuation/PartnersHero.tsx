import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './PartnersHero.module.css';

type PartnersHeroProps = {
  title: string;
  body: string;
};

export function PartnersHero({ title, body }: PartnersHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="partners-hero-title">
      <div className={styles.heroImage} aria-hidden="true" />
      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={styles.heroFrame}>
        <div className={styles.heroCopy}>
          <p className={styles.heroKicker}>Partners & Collaborators</p>

          <h1 id="partners-hero-title">{title}</h1>

          <p className={styles.heroBody}>{body}</p>

          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#partner-ecosystem">
              Explore relationships <ArrowUpRight size={15} />
            </a>

            <Link className={styles.secondaryAction} href="/contact">
              Start a conversation <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <aside className={styles.heroModel} aria-label="BRAINTEK relationship model">
          <p>Relationship ecosystem</p>

          <div>
            <span>01</span>
            <strong>Institutions</strong>
            <small>Institutional relevance</small>
          </div>

          <div>
            <span>02</span>
            <strong>Academia</strong>
            <small>Learning & capability</small>
          </div>

          <div>
            <span>03</span>
            <strong>Technology</strong>
            <small>Systems complementarity</small>
          </div>

          <div>
            <span>04</span>
            <strong>Research</strong>
            <small>Knowledge & advisory</small>
          </div>
        </aside>
      </div>
    </section>
  );
}
