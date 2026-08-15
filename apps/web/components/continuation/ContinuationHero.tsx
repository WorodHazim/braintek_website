'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import styles from './ContinuationHero.module.css';

type ActionValue =
  | string
  | {
      label?: string;
      text?: string;
      href?: string;
      url?: string;
    }
  | null
  | undefined;

type ContinuationHeroProps = {
  eyebrow?: string;
  title?: string;
  headline?: string;
  body?: string;
  description?: string;
  intro?: string;

  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;

  primary?: ActionValue;
  secondary?: ActionValue;
  primaryCta?: ActionValue;
  secondaryCta?: ActionValue;

  image?: string;
  backgroundImage?: string;
  showScrollCue?: boolean;

  [key: string]: unknown;
};

type FocusItem = {
  number: string;
  title: string;
  text: string;
};

function asText(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function actionFrom(
  directLabel: string | undefined,
  directHref: string | undefined,
  ...values: ActionValue[]
) {
  if (directLabel) {
    return {
      label: directLabel,
      href: directHref || '/contact',
    };
  }

  for (const value of values) {
    if (!value) continue;

    if (typeof value === 'string') {
      return {
        label: value,
        href: directHref || '/contact',
      };
    }

    const label = value.label || value.text;
    if (!label) continue;

    return {
      label,
      href: value.href || value.url || directHref || '/contact',
    };
  }

  return null;
}

function heroContext(source: string): {
  label: string;
  items: FocusItem[];
} {
  const normalized = source.toLowerCase();

  if (normalized.includes('partner') || normalized.includes('relationship')) {
    return {
      label: 'Relationship ecosystem',
      items: [
        {
          number: '01',
          title: 'Institutions',
          text: 'Relationships that support institutional relevance and complementary capability.',
        },
        {
          number: '02',
          title: 'Academia',
          text: 'Academic connections aligned with learning, research and capability development.',
        },
        {
          number: '03',
          title: 'Technology',
          text: 'Technology relationships that complement systems and implementation capability.',
        },
        {
          number: '04',
          title: 'Research',
          text: 'Research-oriented connections that strengthen applied thinking and knowledge exchange.',
        },
      ],
    };
  }

  if (
    normalized.includes('insight') ||
    normalized.includes('resource') ||
    normalized.includes('thinking')
  ) {
    return {
      label: 'Knowledge focus',
      items: [
        {
          number: '01',
          title: 'Applied AI',
          text: 'Practical perspectives on responsible adoption and institutional implementation.',
        },
        {
          number: '02',
          title: 'Automation',
          text: 'Workflow design, intelligent operations and sustainable productivity.',
        },
        {
          number: '03',
          title: 'Capability',
          text: 'Psychometric-informed development, leadership and workforce readiness.',
        },
        {
          number: '04',
          title: 'Governance',
          text: 'Disciplined implementation, accountability and long-term institutional value.',
        },
      ],
    };
  }

  if (
    normalized.includes('contact') ||
    normalized.includes('consultation') ||
    normalized.includes('challenge')
  ) {
    return {
      label: 'Consultation flow',
      items: [
        {
          number: '01',
          title: 'Understand',
          text: 'Clarify the challenge, operating context and outcome that matters.',
        },
        {
          number: '02',
          title: 'Align',
          text: 'Connect the requirement to the right service, sector or platform pathway.',
        },
        {
          number: '03',
          title: 'Shape',
          text: 'Define a practical scope, priorities and implementation direction.',
        },
        {
          number: '04',
          title: 'Move',
          text: 'Turn the conversation into a clear next step for implementation.',
        },
      ],
    };
  }

  if (normalized.includes('team') || normalized.includes('expert')) {
    return {
      label: 'Expertise behind delivery',
      items: [
        { number: '01', title: 'Strategy', text: 'Institutional direction and transformation framing.' },
        { number: '02', title: 'Engineering', text: 'Software, platforms, integration and automation.' },
        { number: '03', title: 'Security', text: 'Cybersecurity, resilience and digital protection.' },
        { number: '04', title: 'Capability', text: 'Human capital, assessment and development.' },
      ],
    };
  }

  return {
    label: 'BRAINTEK model',
    items: [
      { number: '01', title: 'Protect', text: 'Strengthen security, trust and institutional resilience.' },
      { number: '02', title: 'Build', text: 'Create practical systems and intelligent workflows.' },
      { number: '03', title: 'Empower', text: 'Strengthen people, leadership and capability.' },
      { number: '04', title: 'Improve', text: 'Measure outcomes and refine institutional performance.' },
    ],
  };
}

export function ContinuationHero(props: ContinuationHeroProps) {
  const eyebrow =
    props.eyebrow ||
    asText(props.label) ||
    asText(props.kicker) ||
    'BRAINTEK';

  const title =
    props.title ||
    props.headline ||
    asText(props.heading) ||
    'Applied capability for institutions ready to move forward.';

  const body =
    props.body ||
    props.description ||
    props.intro ||
    asText(props.subtitle) ||
    '';

  const primary = actionFrom(
    props.primaryLabel,
    props.primaryHref,
    props.primary,
    props.primaryCta,
  );

  const secondary = actionFrom(
    props.secondaryLabel,
    props.secondaryHref,
    props.secondary,
    props.secondaryCta,
  );

  const image =
    props.image ||
    props.backgroundImage ||
    asText(props.heroImage) ||
    '/services/services-hero.jpg';

  const context = heroContext(`${eyebrow} ${title}`);

  return (
    <section className={styles.hero}>
      <img className={styles.background} src={image} alt="" aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>

          {body ? <p className={styles.body}>{body}</p> : null}

          {(primary || secondary) && (
            <div className={styles.actions}>
              {primary ? (
                <Link href={primary.href} className={styles.primary}>
                  {primary.label}
                  <ArrowUpRight size={16} />
                </Link>
              ) : null}

              {secondary ? (
                <Link href={secondary.href} className={styles.secondary}>
                  {secondary.label}
                  <ArrowUpRight size={15} />
                </Link>
              ) : null}
            </div>
          )}
        </div>

        <aside className={styles.context} aria-label={context.label}>
          <div className={styles.contextHeader}>
            <p>{context.label}</p>
            <span>BRAINTEK / ABU DHABI</span>
          </div>

          <div className={styles.contextList}>
            {context.items.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>

      {props.showScrollCue !== false ? (
        <a className={styles.scrollCue} href="#page-content" aria-label="Continue to page content">
          <ArrowDown size={18} />
        </a>
      ) : null}
    </section>
  );
}
