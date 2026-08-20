import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './HomePillars.module.css';

const pillars = [
  {
    number: '01',
    label: 'Protect',
    title: 'Cybersecurity & Digital Protection',
    description:
      'Protect digital environments through monitoring, testing, compliance readiness and resilient security foundations.',
    image: '/home/pillars/pillar-protect.jpg',
    href: '/services',
  },
  {
    number: '02',
    label: 'Build',
    title: 'Software Solutions & Systems Development',
    description:
      'Build custom systems, connected platforms, workflow automation and AI-enabled operational environments.',
    image: '/home/pillars/pillar-build.jpg',
    href: '/services',
  },
  {
    number: '03',
    label: 'Empower',
    title: 'Manpower Development & Workforce Empowerment',
    description:
      'Strengthen leaders and teams through diagnostics, AI readiness and structured capability development.',
    image: '/home/pillars/pillar-empower.jpg',
    href: '/services',
  },
] as const;

export function HomePillars() {
  return (
    <section className={styles.section} aria-labelledby="home-pillars-title">
      <div className={`container ${styles.heading}`} data-reveal>
        <p className={styles.kicker}>Three business pillars</p>

        <div className={styles.headingMain}>
          <h2 id="home-pillars-title">Protect. Build. Empower.</h2>

          <p>
            Three connected capabilities for institutions that need stronger
            protection, better systems and sustainable human capability.
          </p>
        </div>
      </div>

      <div className={`container ${styles.grid}`}>
        {pillars.map((pillar) => (
          <Link
            key={pillar.number}
            href={pillar.href}
            className={styles.card}
          >
            <div className={styles.cardHead}>
              <strong>{pillar.label}</strong>
              <span>{pillar.number}</span>
            </div>

            <div className={styles.media}>
              <img
                src={pillar.image}
                alt=""
                loading="lazy"
                draggable={false}
              />
              <span className={styles.mediaTone} aria-hidden="true" />
            </div>

            <div className={styles.body}>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>

              <span className={styles.link}>
                Explore capability
                <ArrowUpRight size={15} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
