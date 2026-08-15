'use client';

import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
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

type Pillar = {
  key: PillarKey;
  number: string;
  verb: string;
  short: string;
  title: string;
  description: string;
  anchor: string;
};

const pillars: Pillar[] = [
  {
    key: 'protect',
    number: '01',
    verb: 'Protect',
    short: 'Digital protection',
    title: 'Cybersecurity & Digital Protection',
    description:
      'Strengthen digital resilience, reduce exposure and improve institutional readiness through practical security controls, monitoring and vulnerability management.',
    anchor: 'cybersecurity',
  },
  {
    key: 'build',
    number: '02',
    verb: 'Build',
    short: 'Systems & AI',
    title: 'Software Solutions & Systems Development',
    description:
      'Design systems around real operational requirements—from custom platforms and workflow automation to practical AI integration and intelligent assistants.',
    anchor: 'systems',
  },
  {
    key: 'empower',
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

function PillarArtwork({ pillar }: { pillar: PillarKey }) {
  return (
    <div className={`${styles.artwork} ${styles[`artwork_${pillar}`]}`} aria-hidden="true">
      <div className={styles.artGrid} />
      <div className={styles.artArcA} />
      <div className={styles.artArcB} />
      <div className={styles.artSignal}><i /></div>
      <div className={styles.artNodeA} />
      <div className={styles.artNodeB} />
      <div className={styles.artNodeC} />
    </div>
  );
}

export function ServicesPageExperience({ services }: ServicesPageExperienceProps) {
  const rootRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const [activePillar, setActivePillar] = useState<PillarKey>('protect');

  const grouped = useMemo(() => {
    const result: Record<PillarKey, ServiceItem[]> = { protect: [], build: [], empower: [] };
    services.forEach((service) => result[classifyService(service)].push(service));
    return result;
  }, [services]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-services-reveal]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      items.forEach((item) => { item.dataset.visible = 'true'; });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.visible = 'true';
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

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

  useEffect(() => {
    const section = processRef.current;
    if (!section) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.82;
      const end = viewport * 0.26;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / Math.max(start - end, 1)));
      section.style.setProperty('--process-progress', String(progress));
    };

    const request = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };
  }, []);

  const handleHeroPointer = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty('--hero-x', `${x}%`);
    event.currentTarget.style.setProperty('--hero-y', `${y}%`);
  };

  return (
    <main ref={rootRef} id="main-content" className={styles.page}>
      <section
        className={styles.hero}
        onPointerMove={handleHeroPointer}
        style={{ '--hero-x': '74%', '--hero-y': '42%' } as CSSProperties}
      >
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroArc} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Secure systems. Smarter operations. Stronger workforces.</p>
            <h1>Services that move institutions forward.</h1>
            <p className={styles.heroBody}>
              BRAINTEK connects cybersecurity, intelligent systems and workforce capability in one
              practical service model built around real institutional needs.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.primaryCta}>
                Request a Consultation <ArrowUpRight size={16} />
              </Link>
              <a href="#service-model" className={styles.secondaryCta}>
                Explore services <ArrowDown size={15} />
              </a>
            </div>
          </div>

          <div className={styles.heroModel} aria-label="BRAINTEK service model">
            <div className={styles.heroModelTop}><span>ONE CONNECTED MODEL</span><i /></div>
            {pillars.map((pillar) => (
              <a key={pillar.key} href={`#${pillar.anchor}`} className={styles.heroModelRow}>
                <span>{pillar.number}</span>
                <strong>{pillar.verb}</strong>
                <small>{pillar.short}</small>
                <ArrowRight size={17} />
              </a>
            ))}
            <div className={styles.heroModelFoot}>
              <span>Protection</span><i /><span>Systems</span><i /><span>Capability</span>
            </div>
          </div>
        </div>
      </section>

      <nav className={styles.jumpNav} aria-label="Service pillars">
        <div className={`container ${styles.jumpNavInner}`}>
          <span className={styles.jumpLabel}>Service model</span>
          <div className={styles.jumpLinks}>
            {pillars.map((pillar) => (
              <a
                key={pillar.key}
                href={`#${pillar.anchor}`}
                className={activePillar === pillar.key ? styles.jumpActive : ''}
              >
                <span>{pillar.number}</span>{pillar.verb}
              </a>
            ))}
          </div>
          <Link href="/contact" className={styles.jumpCta}>
            Start a conversation <ArrowUpRight size={14} />
          </Link>
        </div>
      </nav>

      <section id="service-model" className={styles.modelIntro}>
        <div className={`container ${styles.modelIntroGrid}`}>
          <p className={styles.sectionKicker} data-services-reveal>Three connected pillars</p>
          <div data-services-reveal>
            <h2>Protection, systems and people should reinforce one another.</h2>
            <p>
              BRAINTEK does not treat cybersecurity, technology delivery and capability development
              as isolated interventions. The service architecture is designed to connect all three.
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
            <div className={`container ${styles.pillarLayout}`}>
              <aside className={styles.pillarIntro}>
                <div className={styles.pillarIntroTop} data-services-reveal>
                  <span className={styles.pillarNumber}>{pillar.number}</span>
                  <p>{pillar.verb}</p>
                </div>
                <h2 data-services-reveal>{pillar.title}</h2>
                <p className={styles.pillarDescription} data-services-reveal>{pillar.description}</p>
                <div data-services-reveal><PillarArtwork pillar={pillar.key} /></div>
              </aside>

              <div className={styles.serviceList}>
                {items.length ? items.map((service, index) => (
                  <Link
                    href={`/services/${service.slug}`}
                    key={service.slug}
                    className={styles.serviceRow}
                    data-services-reveal
                  >
                    <span className={styles.serviceIndex}>{String(index + 1).padStart(2, '0')}</span>
                    <div className={styles.serviceCopy}>
                      <h3>{service.name}</h3>
                      {service.summary ? <p>{service.summary}</p> : null}
                    </div>
                    <span className={styles.serviceAction}>Explore <ArrowUpRight size={17} /></span>
                  </Link>
                )) : (
                  <div className={styles.emptyState}><p>Service content for this pillar is managed through the CMS.</p></div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className={styles.outcomes}>
        <div className={`container ${styles.outcomesInner}`}>
          <div className={styles.outcomesHeader}>
            <p className={styles.sectionKicker} data-services-reveal>Why the model matters</p>
            <h2 data-services-reveal>Different capabilities. One operational outcome.</h2>
          </div>
          <div className={styles.outcomesGrid}>
            {outcomes.map((outcome) => (
              <article key={outcome.number} data-services-reveal>
                <span>{outcome.number}</span>
                <h3>{outcome.label}</h3>
                <p>{outcome.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={processRef} className={styles.process}>
        <div className={`container ${styles.processInner}`}>
          <div className={styles.processHeading} data-services-reveal>
            <p className={styles.sectionKicker}>How we work</p>
            <h2>A disciplined path from diagnosis to improvement.</h2>
            <p>
              We begin with the operating context, design around real constraints, support implementation
              and evaluate what should improve next.
            </p>
          </div>
          <div className={styles.processTrack} data-services-reveal>
            <div className={styles.processBase} />
            <div className={styles.processProgress} />
            {process.map((step, index) => (
              <div className={styles.processStep} key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i><Check size={11} /></i>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalGrid} aria-hidden="true" />
        <div className={`container ${styles.finalCtaInner}`}>
          <p className={styles.finalKicker} data-services-reveal>Start a conversation</p>
          <h2 data-services-reveal>
            Build safer systems.<br />Smarter operations.<br />Stronger capability.
          </h2>
          <div className={styles.finalAside} data-services-reveal>
            <p>
              Tell us what needs to improve. We will help frame the right combination of protection,
              systems and capability.
            </p>
            <Link href="/contact" className={styles.finalButton}>
              Book a Consultation <span><ChevronRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
