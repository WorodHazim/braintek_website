'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { TeamRail, type TeamMember } from '@/components/TeamRail';
import styles from './ExpertTeamExperience.module.css';

type ExpertTeamExperienceProps = {
  team: TeamMember[];
};

const disciplines = [
  ['Strategy & Human Capital', 'Institutional direction, workforce capability and psychometric-informed development.'],
  ['AI & Software', 'AI enablement, systems engineering, full-stack development and operational platforms.'],
  ['Cybersecurity', 'Penetration testing, application security, digital protection and resilience.'],
  ['Cloud, APIs & Data', 'Cloud security, API optimization, automation, data protection and database integrity.'],
];

export function ExpertTeamExperience({ team }: ExpertTeamExperienceProps) {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.kicker}>Expert team</p>
          <h1>One institutional challenge. Multiple disciplines working together.</h1>
          <p>
            BRAINTEK brings together strategic leadership, software engineering, AI enablement,
            cybersecurity, cloud, data protection and workforce-development expertise.
          </p>
        </div>
      </section>

      <section className={styles.teamSection} aria-labelledby="expert-team-list-title">
        <div className={`container ${styles.sectionIntro}`}>
          <p className={styles.kickerDark}>People behind the work</p>
          <div>
            <h2 id="expert-team-list-title">Expertise designed to connect.</h2>
            <p>
              Approved portraits are shown when available. Where a portrait has not yet been
              supplied, the interface uses a clearly graphic initials treatment rather than a
              fabricated photograph.
            </p>
          </div>
        </div>

        <TeamRail members={team} />
      </section>

      <section className={styles.disciplines}>
        <div className={`container ${styles.disciplineGrid}`}>
          <div className={styles.disciplineTitle}>
            <p className={styles.kicker}>Integrated delivery</p>
            <h2>Different specialties. One operating model.</h2>
          </div>

          <div className={styles.disciplineList}>
            {disciplines.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <p className={styles.kicker}>Work with BRAINTEK</p>
            <h2>Bring the right expertise around the problem.</h2>
          </div>
          <Link href="/contact">
            Book a Consultation <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
