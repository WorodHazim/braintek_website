'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { TeamMember } from '@/lib/content';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';
import styles from './ExpertTeamExperience.module.css';

type Props = {
  team: TeamMember[];
  heroTitle: string;
  heroBody: string;
};

const LOCAL_PORTRAITS: Record<string, string> = {
  'Prof. Fawzi Alghazali': '/home/team/prof-fawzi-alghazali.jpg',
  'Eng. Ahmed Ali Anwar': '/home/team/eng-ahmed-ali-anwar.jpg',
  'MOIZ HASSAN': '/home/team/moiz-hassan.jpg',
  'Cetin Erdem': '/home/team/cetin-erdem.jpg',
  'Nisreen Khambaty': '/home/team/nisreen-khambaty.jpg',
  'Princess Clark Tabar': '/home/team/princess-clark-tabar.jpg',
  'LAUD ZION C. CASCALLA': '/home/team/laud-zion-c-cascalla.jpg',
  'Akmal Xudayberdiyev': '/home/team/akmal-xudayberdiyev.jpg',
  'Maduranga Senadheera': '/home/team/maduranga-senadheera.jpg',
  'DILSHAN MUNASINGHE': '/home/team/dilshan-munasinghe.jpg',
};

const disciplines = [
  {
    number: '01',
    title: 'Strategy & Human Capital',
    body: 'Institutional direction, workforce capability and psychometric-informed development.',
  },
  {
    number: '02',
    title: 'AI & Software',
    body: 'AI enablement, systems engineering, full-stack development and operational platforms.',
  },
  {
    number: '03',
    title: 'Cybersecurity',
    body: 'Penetration testing, application security, digital protection and resilience.',
  },
  {
    number: '04',
    title: 'Cloud, APIs & Data',
    body: 'Cloud security, API optimization, automation, data protection and database integrity.',
  },
];

function initialsFor(member: TeamMember) {
  if (member.initials?.trim()) return member.initials.trim();

  return member.name
    .replace(/\\b(Prof|Eng)\\.?\\s*/gi, '')
    .split(/\\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function Portrait({ member }: { member: TeamMember }) {
  const candidates = useMemo(
    () =>
      [LOCAL_PORTRAITS[member.name], member.portraitUrl]
        .filter(
          (value, index, array): value is string =>
            !!value && array.indexOf(value) === index,
        ),
    [member.name, member.portraitUrl],
  );

  const [candidateIndex, setCandidateIndex] = useState(0);
  const src = candidates[candidateIndex];

  if (!src) {
    return (
      <div className={styles.initialVisual} aria-hidden="true">
        <i />
        <i />
        <span>{initialsFor(member)}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${member.name} portrait`}
      loading="lazy"
      draggable={false}
      onError={() => setCandidateIndex((current) => current + 1)}
    />
  );
}

export function ExpertTeamExperience({
  team,
  heroTitle,
  heroBody,
}: Props) {
  return (
    <div className="home-v2">
      <section className={styles.hero} aria-labelledby="expert-team-title">
        <div className={styles.heroImage} aria-hidden="true" />
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={styles.heroFrame}>
          <div className={styles.heroCopy}>
            <p className={styles.heroKicker}>Expert Team</p>
            <h1 id="expert-team-title">{heroTitle}</h1>
            <p className={styles.heroBody}>{heroBody}</p>

            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#team-grid">
                Meet the team <ArrowUpRight size={15} />
              </a>
              <Link className={styles.secondaryAction} href="/contact">
                Start a conversation <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <aside className={styles.heroModel} aria-label="BRAINTEK expertise model">
            <p>One coordinated team</p>
            <div>
              <span>01</span>
              <strong>Strategic</strong>
              <small>Institutional direction</small>
            </div>
            <div>
              <span>02</span>
              <strong>Technical</strong>
              <small>Systems, AI & security</small>
            </div>
            <div>
              <span>03</span>
              <strong>Human capability</strong>
              <small>Readiness & development</small>
            </div>
          </aside>
        </div>
      </section>

      <section id="team-grid" className={styles.teamSection}>
        <div className={styles.pageFrame}>
          <p className={styles.kicker}>People behind the work</p>

          <div className={styles.teamHeading}>
            <h2>Expertise designed to connect.</h2>
            <p>
              Strategic, technical and human-capability expertise brought
              together around the same institutional challenge. Approved
              portraits are used where available; otherwise the interface uses
              a restrained initials treatment.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <article className={styles.card} key={`${member.name}-${index}`}>
                <div className={styles.visual}>
                  <Portrait member={member} />
                  <span className={styles.cardIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className={styles.cardCopy}>
                  <h3>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                  {member.contribution ? (
                    <p className={styles.contribution}>{member.contribution}</p>
                  ) : null}
                  {member.relevance ? (
                    <p className={styles.relevance}>{member.relevance}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.integration}>
        <div className={styles.pageFrame}>
          <div className={styles.integrationHeading}>
            <p className={styles.kickerLight}>Integrated delivery</p>
            <div>
              <h2>Different specialties. One operating model.</h2>
              <p>
                The value is not in having separate experts. It is in bringing
                the right disciplines together around the same institutional
                problem, priorities and operating reality.
              </p>
            </div>
          </div>

          <div className={styles.disciplineGrid}>
            {disciplines.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Exact same curtain/fixed conversion section used by the homepage. */}
      <HomeFinalCTA />
    </div>
  );
}
