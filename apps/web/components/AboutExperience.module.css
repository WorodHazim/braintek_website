'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { EditorialPageHero } from './EditorialPageHero';
import { BluePageCTA } from './BluePageCTA';
import styles from './AboutExperience.module.css';

type CmsPage = { hero_title: string; hero_subtitle?: string | null };

type Pillar = { eyebrow: string; title: string; text: string };

const values = [
  ['Security', 'Protection and responsible safeguards are foundational to sustainable transformation.'],
  ['Strategic Intelligence', 'We design around real institutional problems and sound decision-making.'],
  ['Operational Effectiveness', 'We focus on stronger workflows, better systems and dependable results in practice.'],
  ['Human Capability', 'Institutional strength depends on the quality, readiness and development of people.'],
  ['Responsible Innovation', 'Advanced technology is used with discipline, accountability and operational realism.'],
  ['Partnership', 'We work as aligned partners, adapting to strategic and operational realities.'],
  ['Excellence', 'We pursue precision, quality and depth in thinking, design and execution.'],
  ['Sustainability', 'We build for continuity and long-term value rather than short-lived interventions.'],
];

export function AboutExperience({ page, pillars }: { page: CmsPage; pillars: Pillar[] }) {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-about-reveal]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { items.forEach((el) => (el.dataset.visible = 'true')); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      (entry.target as HTMLElement).dataset.visible = 'true';
      observer.unobserve(entry.target);
    }), { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const title = page.hero_title === 'Where AI Powers Work, Innovation, and Growth.'
    ? 'Built to connect security, systems and human capability.'
    : page.hero_title;

  return (
    <main id="main-content" className={styles.page}>
      <EditorialPageHero
        variant="about"
        eyebrow="About BRAINTEK"
        title={title}
        body={page.hero_subtitle}
        primaryLabel="Explore Our Services"
        primaryHref="/services"
        secondaryLabel="Meet the Team"
        secondaryHref="/expert-team"
      />

      <section className={styles.intro}>
        <div className={`container ${styles.introGrid}`}>
          <p className={styles.kicker} data-about-reveal>Who we are</p>
          <div className={styles.introStatement} data-about-reveal>
            <h2>One institutional model for protection, performance and people.</h2>
          </div>
          <div className={styles.introCopy} data-about-reveal>
            <p>BRAINTEK AI Solutions & Consultancies works at the intersection of secure digital infrastructure, intelligent systems, operational improvement and workforce capability.</p>
            <p>We help institutions move beyond fragmented tools and isolated interventions toward environments in which security, systems and human readiness reinforce one another.</p>
            <div className={styles.introPrinciples}>
              <span>Secure foundations</span><span>Usable systems</span><span>Capable people</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pillarsSection}>
        <div className={`container ${styles.pillarsHeader}`} data-about-reveal>
          <p className={styles.kicker}>Core business architecture</p>
          <h2>Protect. Build. Empower.</h2>
          <p>Three commercial pillars designed to operate as one transformation model.</p>
        </div>
        <div className={styles.pillarGrid}>
          {pillars.map((pillar, index) => (
            <article className={styles.pillarCard} key={pillar.title} data-about-reveal>
              <div className={styles.pillarTop}><span>0{index + 1}</span><i /></div>
              <p className={styles.pillarVerb}>{index === 0 ? 'Protect' : index === 1 ? 'Build' : 'Empower'}</p>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
              <div className={styles.pillarOrbit} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.direction}>
        <div className={`container ${styles.directionGrid}`}>
          <div className={styles.vision} data-about-reveal>
            <p className={styles.kicker}>Vision</p>
            <h2>A trusted leader in secure, intelligent, human-centered institutional transformation.</h2>
          </div>
          <div className={styles.directionCards}>
            <article data-about-reveal>
              <span>01 / Mission</span>
              <h3>Protect what matters. Modernize how institutions operate. Strengthen the people who drive performance.</h3>
            </article>
            <article data-about-reveal>
              <span>02 / Perspective</span>
              <h3>Institutional progress is strongest when secure foundations, intelligent systems and empowered people move together.</h3>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={`container ${styles.valuesHeader}`} data-about-reveal>
          <p className={styles.kicker}>Values</p>
          <h2>Principles that shape how BRAINTEK thinks, builds and delivers.</h2>
        </div>
        <div className={`container ${styles.valuesGrid}`}>
          {values.map(([name, text], index) => (
            <article key={name} data-about-reveal>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className={`container ${styles.valuesLink}`} data-about-reveal>
          <Link href="/why-braintek">Explore why BRAINTEK <ArrowUpRight size={15} /></Link>
        </div>
      </section>

      <BluePageCTA
        title="Protect the environment. Modernize the operation. Strengthen the people who sustain it."
        body="Talk to BRAINTEK about an integrated institutional transformation pathway."
      />
    </main>
  );
}
