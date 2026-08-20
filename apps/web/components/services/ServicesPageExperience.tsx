'use client';

import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { InstitutionalHero } from '@/components/continuation/InstitutionalHero';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';
import styles from './ServicesPageExperience.module.css';

type ServiceItem = {
  slug: string;
  name: string;
  summary?: string | null;
  pillar?: string | null;
};

type ServicesPageExperienceProps = {
  services: ServiceItem[];
};

type PillarKey = 'protect' | 'build' | 'empower';

const pillars = [
  {
    key: 'protect' as const,
    number: '01',
    verb: 'Protect',
    short: 'Digital protection',
    title: 'Cybersecurity & Digital Protection',
    description:
      'Strengthen digital resilience, reduce exposure and improve institutional readiness through practical security controls, monitoring and vulnerability management.',
    anchor: 'cybersecurity',
  },
  {
    key: 'build' as const,
    number: '02',
    verb: 'Build',
    short: 'Systems & AI',
    title: 'Software Solutions & Systems Development',
    description:
      'Design systems around real operational requirements—from custom platforms and workflow automation to practical AI integration and intelligent assistants.',
    anchor: 'systems',
  },
  {
    key: 'empower' as const,
    number: '03',
    verb: 'Empower',
    short: 'Human capability',
    title: 'Manpower Development & Workforce Empowerment',
    description:
      'Build workforce readiness through psychometric-informed development, AI leadership enablement and role-relevant capability pathways tied to measurable need.',
    anchor: 'capability',
  },
];

const outcomes = [
  {
    number: '01',
    label: 'Protect confidently',
    text: 'Strengthen digital trust through clearer protection, monitoring, testing and readiness.',
  },
  {
    number: '02',
    label: 'Build intelligently',
    text: 'Create systems, automation and AI-enabled workflows around the way the institution actually operates.',
  },
  {
    number: '03',
    label: 'Develop sustainably',
    text: 'Connect workforce development to real roles, leadership readiness and institutional priorities.',
  },
];

const process = ['Diagnose', 'Secure', 'Design', 'Implement', 'Enable', 'Evaluate'];

function classifyService(service: ServiceItem): PillarKey {
  const source = `${service.pillar ?? ''} ${service.name}`.toLowerCase();

  if (
    source.includes('cyber') ||
    source.includes('digital protection') ||
    source.includes('penetration') ||
    source.includes('vulnerability') ||
    source.includes('network security') ||
    source.includes('identity security') ||
    source.includes('cloud security')
  ) {
    return 'protect';
  }

  if (
    source.includes('manpower') ||
    source.includes('workforce') ||
    source.includes('psychometric') ||
    source.includes('training') ||
    source.includes('leadership') ||
    source.includes('teacher') ||
    source.includes('capability')
  ) {
    return 'empower';
  }

  return 'build';
}

export function ServicesPageExperience({
  services,
}: ServicesPageExperienceProps) {
  const [activePillar, setActivePillar] = useState<PillarKey>('protect');

  const grouped = useMemo(() => {
    const result: Record<PillarKey, ServiceItem[]> = {
      protect: [],
      build: [],
      empower: [],
    };

    services.forEach((service) => {
      result[classifyService(service)].push(service);
    });

    return result;
  }, [services]);

  useEffect(() => {
    const sections = pillars
      .map((pillar) => document.getElementById(pillar.anchor))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const update = () => {
      const marker = window.innerHeight * 0.34;
      let next: PillarKey = 'protect';
      let best = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - marker);

        if (distance < best) {
          best = distance;
          next = section.dataset.pillar as PillarKey;
        }
      });

      setActivePillar(next);
    };

    update();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <main id="main-content" className={`home-v2 ${styles.page}`}>
      <InstitutionalHero
        variant="services"
        eyebrow="Services / Applied Capability"
        title="Services that move institutions forward."
        body="BRAINTEK connects cybersecurity, intelligent systems and workforce capability in one practical service model built around real institutional needs."
        modelLabel="One connected service model"
        rows={[
          { number: '01', title: 'Protect', note: 'Digital trust' },
          { number: '02', title: 'Build', note: 'Systems & AI' },
          { number: '03', title: 'Empower', note: 'Human capability' },
        ]}
        primary={{ label: 'Explore services', href: '#service-model' }}
        secondary={{ label: 'Start a conversation', href: '/contact' }}
      />

      <nav className={styles.jumpNav} aria-label="Service pillars">
        <div className={styles.pageFrame}>
          <div className={styles.jumpNavInner}>
            <span className={styles.jumpLabel}>Service model</span>

            <div className={styles.jumpLinks}>
              {pillars.map((pillar) => (
                <a
                  key={pillar.key}
                  href={`#${pillar.anchor}`}
                  className={activePillar === pillar.key ? styles.jumpActive : ''}
                >
                  <span>{pillar.number}</span>
                  {pillar.verb}
                </a>
              ))}
            </div>

            <Link href="/contact" className={styles.jumpCta}>
              Start a conversation <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      <section id="service-model" className={styles.introSection}>
        <div className={styles.pageFrame}>
          <p className={styles.kicker}>Three connected pillars</p>

          <div className={styles.sectionHeading}>
            <h2>Protection, systems and people should reinforce one another.</h2>

            <p>
              BRAINTEK does not treat cybersecurity, technology delivery and
              capability development as isolated interventions. The service
              architecture is designed to connect all three around the same
              institutional operating reality.
            </p>
          </div>
        </div>
      </section>

      {pillars.map((pillar) => {
        const items = grouped[pillar.key];

        return (
          <section
            key={pillar.key}
            id={pillar.anchor}
            data-pillar={pillar.key}
            className={`${styles.pillarSection} ${styles[`pillar_${pillar.key}`]}`}
          >
            <div className={styles.pageFrame}>
              <p className={styles.pillarKicker}>
                {pillar.number} / {pillar.verb}
              </p>

              <div className={styles.pillarHeading}>
                <h2>{pillar.title}</h2>
                <p>{pillar.description}</p>
              </div>

              <div className={styles.serviceGrid}>
                {items.length ? (
                  items.map((service, index) => (
                    <Link
                      href={`/services/${service.slug}`}
                      key={service.slug}
                      className={styles.serviceCard}
                    >
                      <div className={styles.serviceTop}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <ArrowUpRight size={15} />
                      </div>

                      <h3>{service.name}</h3>

                      {service.summary ? <p>{service.summary}</p> : null}

                      <strong>Explore service</strong>
                    </Link>
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    Service content for this pillar is managed through the CMS.
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className={styles.outcomes}>
        <div className={styles.pageFrame}>
          <p className={styles.kicker}>Why the model matters</p>

          <div className={styles.sectionHeading}>
            <h2>Different capabilities. One operational outcome.</h2>

            <p>
              The value comes from connecting protection, operational systems
              and human capability rather than optimizing each area in
              isolation.
            </p>
          </div>

          <div className={styles.outcomesGrid}>
            {outcomes.map((outcome) => (
              <article key={outcome.number}>
                <span>{outcome.number}</span>
                <h3>{outcome.label}</h3>
                <p>{outcome.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.pageFrame}>
          <p className={styles.kicker}>How we work</p>

          <div className={styles.sectionHeading}>
            <h2>A disciplined path from diagnosis to improvement.</h2>

            <p>
              We begin with the operating context, design around real
              constraints, support implementation and evaluate what should
              improve next.
            </p>
          </div>

          <div className={styles.processGrid}>
            {process.map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i>
                  <Check size={11} />
                </i>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HomeFinalCTA />
    </main>
  );
}
