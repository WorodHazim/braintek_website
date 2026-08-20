import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './HomeSectors.module.css';

type Sector = {
  slug: string;
  name: string;
  summary?: string | null;
};

type HomeSectorsProps = {
  sectors: Sector[];
};

type SectorVisual = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
};

const visuals: Record<string, SectorVisual> = {
  government: {
    image: '/home/sectors/government-public-institutions.jpg',
    eyebrow: 'Government & Public Institutions',
    title: 'Government',
    subtitle: 'Public Institutions',
  },
  education: {
    image: '/home/sectors/education-academic-institutions.jpg',
    eyebrow: 'Education & Academic Institutions',
    title: 'Education',
    subtitle: 'Academic Institutions',
  },
  enterprise: {
    image: '/home/sectors/corporate-enterprise-organizations.jpg',
    eyebrow: 'Corporate & Enterprise Organizations',
    title: 'Enterprise',
    subtitle: 'Corporate Organizations',
  },
  humanCapital: {
    image: '/home/sectors/sector-human-capital.jpg',
    eyebrow: 'Human Capital / HR / Talent Development',
    title: 'Human Capital',
    subtitle: 'HR & Talent',
  },
  training: {
    image: '/home/sectors/sector-training.jpg',
    eyebrow: 'Training / Consulting / Professional Development',
    title: 'Professional Development',
    subtitle: 'Training & Consulting',
  },
  operations: {
    image: '/home/sectors/institutional-service-operations.jpg',
    eyebrow: 'Institutional & Service Operations',
    title: 'Service Operations',
    subtitle: 'Institutional Services',
  },
};

function fallbackVisual(sector: Sector): SectorVisual {
  return {
    image: `/home/sectors/${sector.slug}.jpg`,
    eyebrow: sector.name,
    title: sector.name,
    subtitle: '',
  };
}

function visualFor(sector: Sector): SectorVisual {
  const slug = sector.slug.toLowerCase();

  if (slug.includes('government') || slug.includes('public-institution')) {
    return visuals.government;
  }
  if (slug.includes('education') || slug.includes('academic')) {
    return visuals.education;
  }
  if (slug.includes('corporate') || slug.includes('enterprise')) {
    return visuals.enterprise;
  }
  if (
    slug.includes('human-capital') ||
    slug.includes('hr-talent') ||
    (slug.includes('talent') && slug.includes('development'))
  ) {
    return visuals.humanCapital;
  }
  if (
    slug.includes('training') ||
    slug.includes('consulting') ||
    slug.includes('professional-development')
  ) {
    return visuals.training;
  }
  if (
    slug.includes('institutional-service') ||
    slug.includes('service-operation') ||
    slug.includes('operations')
  ) {
    return visuals.operations;
  }

  return fallbackVisual(sector);
}

export function HomeSectors({ sectors }: HomeSectorsProps) {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.heading}`}>
        <p className={styles.kicker}>Sector pathways</p>

        <div className={styles.headingMain}>
          <div>
            <h2>
              Different environments.
              <br />
              One integrated approach.
            </h2>

            <p>
              Protection, systems and capability are adapted to the mandates,
              service models and operating realities of each sector.
            </p>
          </div>

          <span className={styles.gridLabel}>03 columns / structured view</span>
        </div>
      </div>

      <div className={`container ${styles.grid}`}>
        {sectors.map((sector, index) => {
          const visual = visualFor(sector);

          return (
            <Link
              href={`/sectors/${sector.slug}`}
              className={styles.card}
              key={sector.slug}
            >
              <img className={styles.image} src={visual.image} alt="" />
              <div className={styles.overlay} aria-hidden="true" />

              <div className={styles.cardTop}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i aria-hidden="true" />
              </div>

              <div className={styles.cardCopy}>
                <p className={styles.eyebrow}>{visual.eyebrow}</p>

                <h3>
                  {visual.title}
                  {visual.subtitle ? <small>{visual.subtitle}</small> : null}
                </h3>

                {sector.summary ? (
                  <p className={styles.summary}>{sector.summary}</p>
                ) : null}

                <span className={styles.explore}>
                  Explore pathway <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
