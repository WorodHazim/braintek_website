import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { cms } from '@/lib/cms';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';
import styles from './SectorDetailPage.module.css';

type SectorRecord = {
  slug: string;
  name: string;
  summary?: string | null;
};

type ServiceRecord = {
  slug: string;
  name: string;
  summary?: string | null;
  pillar?: string | null;
};

type ProductRecord = {
  slug: string;
  name: string;
  category?: string | null;
  summary?: string | null;
  status?: string | null;
  screenshotUrls?: string[] | null;
};

type SectorExperience = {
  image: string;
  displayTitle: string;
  displaySubtitle: string;
  audience: string;
  narrative: string;
  value: string;
  priorities: string[];
  serviceKeywords: string[];
  productKeywords: string[];
};

const SECTOR_COPY: Record<string, SectorExperience> = {
  government: {
    // EXACT SAME COVER used by the Government card on the Sectors page.
    image: '/home/sectors/government-public-institutions.jpg',
    displayTitle: 'Government',
    displaySubtitle: 'Public Institutions',
    audience:
      'For ministries, authorities, municipalities, public entities and government-linked institutions seeking structured modernization, stronger digital protection and workforce capability.',
    narrative:
      'Public-sector transformation must protect continuity, reinforce accountability and remain aligned with policy and procedural realities. Technology cannot operate as a loose innovation layer; it needs to support service quality, implementation control, institutional resilience and public trust.',
    value:
      'BRAINTEK connects secure digital thinking, workflow redesign, custom systems, operational automation and leadership capability so modernization can move forward in a controlled and sustainable way.',
    priorities: [
      'Cybersecurity and digital protection for public-facing and internal systems',
      'Workflow automation that improves turnaround time, coordination and service reliability',
      'Custom systems aligned with institutional mandates and operating requirements',
      'Capability-building for leaders, managers and operational teams',
      'Responsible AI implementation that supports governance and accountability',
    ],
    serviceKeywords: [
      'cyber',
      'monitoring',
      'compliance',
      'workflow',
      'custom',
      'ai integration',
      'psychometric',
    ],
    productKeywords: ['psytest', 'ailex', 'scheduler', 'opspilot'],
  },

  education: {
    // EXACT SAME COVER used by the Education card.
    image: '/home/sectors/education-academic-institutions.jpg',
    displayTitle: 'Education',
    displaySubtitle: 'Academic Institutions',
    audience:
      'For universities, schools, colleges, academic centres and education providers seeking smarter operations, stronger academic support systems and more capable professional ecosystems.',
    narrative:
      'Education environments require more than administrative digitization. They need systems that improve coordination, responsiveness and service delivery while strengthening the people who lead, teach, manage and support learning.',
    value:
      'BRAINTEK combines software platforms, intelligent workflow support, cybersecurity-conscious digital protection and psychometric-informed capability development around the realities of academic operations.',
    priorities: [
      'Student and academic workflow systems, scheduling and operational support',
      'Capability development for academic leaders, faculty, trainers and support staff',
      'Psychometric-informed diagnostics that guide development pathways',
      'AI-enabled support and automation for educational operations',
      'Digital protection and continuity for education environments',
    ],
    serviceKeywords: [
      'workflow',
      'custom',
      'ai integration',
      'psychometric',
      'teacher',
      'training',
    ],
    productKeywords: ['psytest', 'ailex', 'scheduler', 'skoolee'],
  },

  enterprise: {
    // EXACT SAME COVER used by the Enterprise card.
    image: '/home/sectors/corporate-enterprise-organizations.jpg',
    displayTitle: 'Enterprise',
    displaySubtitle: 'Corporate Organizations',
    audience:
      'For private-sector companies and enterprises seeking secure digital environments, operational efficiency, intelligent automation and stronger workforce execution.',
    narrative:
      'Enterprise performance depends on speed, reliability, security, coordination and the ability to scale without sacrificing quality. Digital systems and human capability need to improve together rather than as separate initiatives.',
    value:
      'BRAINTEK supports enterprises through cybersecurity, custom systems, workflow automation, AI-enabled operational support and leadership development tied to real performance needs.',
    priorities: [
      'Cloud, network and identity-security support',
      'Workflow automation and operational optimization across business functions',
      'Custom platforms and intelligent assistants aligned with business context',
      'Leadership and workforce development linked to real capability requirements',
      'AI enablement for teams operating in modern performance environments',
    ],
    serviceKeywords: [
      'cyber',
      'workflow',
      'custom',
      'ai integration',
      'consultancy',
      'leadership',
    ],
    productKeywords: ['ailex', 'opspilot', 'sentinelshield', 'psytest'],
  },

  human: {
    // These are the SAME renamed cover files now used by HomeSectors.
    image: '/home/sectors/sector-human-capital.jpg',
    displayTitle: 'Human Capital',
    displaySubtitle: 'HR & Talent',
    audience:
      'For organizations responsible for recruitment, development, performance, leadership pipelines and workforce planning.',
    narrative:
      'Human-capital environments require sound diagnosis, role-relevant development and measurable improvement. Assessment should lead to clearer development decisions rather than remain an isolated activity.',
    value:
      'BRAINTEK combines psychometric-informed assessment, structured capability development and AI-oriented readiness building to support more strategic and evidence-informed workforce growth.',
    priorities: [
      'Psychometric assessment and capability diagnosis for talent decisions',
      'Leadership readiness, management development and capability planning',
      'Evidence-informed training pathways for teams and functions',
      'AI enablement pathways for HR and learning functions',
      'Workforce development aligned with organizational priorities',
    ],
    serviceKeywords: [
      'psychometric',
      'leadership',
      'training',
      'capability',
      'ai',
    ],
    productKeywords: ['psytest', 'ailex'],
  },

  training: {
    // EXACT SAME renamed cover used by Professional Development card.
    image: '/home/sectors/sector-training.jpg',
    displayTitle: 'Professional Development',
    displaySubtitle: 'Training & Consulting',
    audience:
      'For training institutes, consultancy firms and professional-development providers seeking more intelligent, differentiated and evidence-based service models.',
    narrative:
      'Learning and consulting markets increasingly demand relevance, personalization and usable value. Development programmes need stronger diagnosis, modern delivery models and clearer evidence of impact.',
    value:
      'BRAINTEK helps providers enrich their offers through psychometric-informed design, AI enablement, human-capital development models and more structured evaluation of learning value.',
    priorities: [
      'Assessment-informed training and consulting design frameworks',
      'AI enablement strategies for modernized delivery and learner support',
      'Leadership and human-capital development models for client interventions',
      'Evaluation approaches that improve evidence of value, quality and impact',
      'Platform-linked development pathways where suitable',
    ],
    serviceKeywords: [
      'psychometric',
      'training',
      'leadership',
      'teacher',
      'ai',
    ],
    productKeywords: ['psytest', 'ailex'],
  },

  operations: {
    // EXACT SAME COVER used by Service Operations card.
    image: '/home/sectors/institutional-service-operations.jpg',
    displayTitle: 'Service Operations',
    displaySubtitle: 'Institutional Services',
    audience:
      'For organizations whose performance depends on coordination, consistency, service quality and dependable operational execution.',
    narrative:
      'Service-driven institutions need to improve operations while building a more capable and responsive workforce. Secure systems, workflows and people capability have to reinforce one another.',
    value:
      'BRAINTEK connects workflow redesign, automation, systems development, cybersecurity-conscious protection and workforce interventions to improve quality of execution and institutional resilience.',
    priorities: [
      'Operational workflow improvement across service-centred environments',
      'Automation and system integration for consistency and coordination',
      'Capability-building that improves staff effectiveness and execution quality',
      'Digital protection and continuity measures for service operations',
      'Longer-term improvement models that support sustainability and resilience',
    ],
    serviceKeywords: [
      'workflow',
      'custom',
      'ai integration',
      'cyber',
      'training',
    ],
    productKeywords: ['opspilot', 'scheduler', 'sentinelshield'],
  },
};

function sectorKey(sector: SectorRecord): keyof typeof SECTOR_COPY {
  const source = `${sector.slug} ${sector.name}`.toLowerCase();

  if (source.includes('government') || source.includes('public')) {
    return 'government';
  }

  if (source.includes('education') || source.includes('academic')) {
    return 'education';
  }

  if (source.includes('corporate') || source.includes('enterprise')) {
    return 'enterprise';
  }

  if (
    source.includes('human') ||
    source.includes('talent') ||
    source.includes('hr')
  ) {
    return 'human';
  }

  if (
    source.includes('training') ||
    source.includes('consulting') ||
    source.includes('professional')
  ) {
    return 'training';
  }

  return 'operations';
}

function normalize(value: string | null | undefined) {
  return (value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function productKey(slug: string) {
  return slug.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function displayProductName(product: ProductRecord) {
  const key = productKey(product.slug);
  const rawName = product.name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  if (key === 'opspilot' || key === 'opilot' || rawName === 'opspilot') {
    return 'O-PILOT';
  }

  return product.name;
}

function rankedServices(services: ServiceRecord[], keywords: string[]) {
  return [...services]
    .map((service) => {
      const source = normalize(
        `${service.name} ${service.pillar} ${service.summary}`,
      );

      const score = keywords.reduce(
        (total, keyword, index) =>
          total +
          (source.includes(normalize(keyword))
            ? keywords.length - index
            : 0),
        0,
      );

      return { service, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ service }) => service)
    .slice(0, 6);
}

function rankedProducts(products: ProductRecord[], keywords: string[]) {
  return [...products]
    .map((product) => {
      const source = normalize(
        `${product.slug} ${product.name} ${product.category} ${product.summary}`,
      );

      const score = keywords.reduce(
        (total, keyword, index) =>
          total +
          (source.includes(normalize(keyword))
            ? keywords.length - index
            : 0),
        0,
      );

      return { product, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product)
    .slice(0, 3);
}

/*
  Same transparent PNG assets used by the approved Home Platforms section.
  This fixes the blank / broken dark platform image blocks visible in the
  previous sector-detail design.
*/
function productImage(product: ProductRecord) {
  const key = productKey(product.slug);

  const local: Record<string, string> = {
    psytest: '/home/platforms/psytest.png',
    pytest: '/home/platforms/psytest.png',
    ailex: '/home/platforms/ailex.png',
    scheduler: '/home/platforms/scheduler.png',
    skoolee: '/home/platforms/skoolee.png',
    opspilot: '/home/platforms/o-pilot.png',
    opilot: '/home/platforms/o-pilot.png',
    sentinelshield: '/home/platforms/sentinelshield.png',
    sentineshield: '/home/platforms/sentinelshield.png',
  };

  return local[key] || product.screenshotUrls?.[0] || null;
}

async function getSectorPage(slug: string) {
  const [sectors, services, products] = await Promise.all([
    cms.sectors(),
    cms.services(),
    cms.products(),
  ]);

  const typedSectors = sectors as SectorRecord[];
  const sector = typedSectors.find((item) => item.slug === slug);

  if (!sector) return null;

  return {
    sector,
    services: services as ServiceRecord[],
    products: products as ProductRecord[],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getSectorPage(slug);

  if (!data) {
    return {
      title: 'Sector | BRAINTEK',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${data.sector.name} | BRAINTEK`,
    description:
      data.sector.summary ||
      `Explore how BRAINTEK applies cybersecurity, intelligent systems and workforce capability to ${data.sector.name}.`,
    alternates: {
      canonical: `/sectors/${data.sector.slug}`,
    },
  };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getSectorPage(slug);

  if (!data) notFound();

  const { sector, services, products } = data;
  const experience = SECTOR_COPY[sectorKey(sector)];

  const relatedServices = rankedServices(
    services,
    experience.serviceKeywords,
  );

  const relatedProducts = rankedProducts(
    products,
    experience.productKeywords,
  );

  const consultationHref =
    `/contact?sector=${encodeURIComponent(sector.slug)}`;

  return (
    <main id="main-content" className={`home-v2 ${styles.page}`}>
      <section className={styles.hero}>
        {/*
          The hero deliberately uses experience.image:
          the exact same cover image used by the matching sector card.
        */}
        <div
          className={styles.heroImage}
          style={{ backgroundImage: `url("${experience.image}")` }}
          aria-hidden="true"
        />

        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroTop}>
            <Link href="/sectors" className={styles.backLink}>
              <ArrowLeft size={15} />
              All sectors
            </Link>

            <span className={styles.heroTag}>Sector pathway</span>
          </div>

          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>
                {experience.displayTitle}
                <span>{experience.displaySubtitle}</span>
              </p>

              <h1>{sector.name}</h1>
            </div>

            <div className={styles.heroAside}>
              <p>{sector.summary || experience.audience}</p>

              <Link
                href={consultationHref}
                className={styles.heroCta}
              >
                Discuss this sector
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.motionStrip} aria-hidden="true">
        <div>
          <span>{experience.displayTitle}</span><i />
          <span>Protect</span><i />
          <span>Build</span><i />
          <span>Empower</span><i />
          <span>Institutional performance</span><i />
          <span>{experience.displayTitle}</span><i />
          <span>Protect</span><i />
          <span>Build</span><i />
          <span>Empower</span><i />
          <span>Institutional performance</span>
        </div>
      </div>

      <section className={styles.reality}>
        <div className={`container ${styles.sectionShell}`}>
          <div className={styles.sectionKicker}>
            <span>01</span>
            <p>Sector reality</p>
          </div>

          <div className={styles.sectionHeading}>
            <h2>
              Solutions shaped around how this environment actually operates.
            </h2>

            <div className={styles.sectionCopy}>
              <p className={styles.audience}>{experience.audience}</p>
              <p>{experience.narrative}</p>
              <p>{experience.value}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.priorities}>
        <div className={`container ${styles.sectionShell}`}>
          <div
            className={`${styles.sectionKicker} ${styles.sectionKickerLight}`}
          >
            <span>02</span>
            <p>Operational priorities</p>
          </div>

          <div
            className={`${styles.sectionHeading} ${styles.sectionHeadingDark}`}
          >
            <h2>Where BRAINTEK can create practical value.</h2>

            <p>
              The exact scope is shaped during discovery. These are the
              priority areas most relevant to this sector.
            </p>
          </div>

          <div className={styles.priorityGrid}>
            {experience.priorities.map((priority, index) => (
              <article key={priority}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Check size={15} aria-hidden="true" />
                <h3>{priority}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.capabilities}>
        <div className={`container ${styles.sectionShell}`}>
          <div className={styles.sectionKicker}>
            <span>03</span>
            <p>Relevant capabilities</p>
          </div>

          <div className={styles.sectionHeading}>
            <h2>Cross-functional support from security to capability.</h2>

            <div className={styles.headingAside}>
              <p>
                Services are selected around the sector context rather
                than presented as disconnected offers.
              </p>

              <Link href="/services">
                Explore all services
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div className={styles.serviceGrid}>
            {relatedServices.map((service, index) => (
              <Link
                href={`/services/${service.slug}`}
                className={styles.serviceCard}
                key={service.slug}
              >
                <div className={styles.serviceTop}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <ArrowUpRight size={16} />
                </div>

                <p>{service.pillar || 'BRAINTEK capability'}</p>
                <h3>{service.name}</h3>
                <small>{service.summary}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className={styles.platforms}>
          <div className={`container ${styles.sectionShell}`}>
            <div className={styles.sectionKicker}>
              <span>04</span>
              <p>Connected platforms</p>
            </div>

            <div className={styles.sectionHeading}>
              <h2>Platforms that can reinforce the sector pathway.</h2>

              <p>
                Product relevance depends on the operating need. These
                platforms align most closely with this sector&apos;s current
                pathway.
              </p>
            </div>

            <div className={styles.platformGrid}>
              {relatedProducts.map((product, index) => {
                const image = productImage(product);

                return (
                  <Link
                    href={`/platforms-products/${product.slug}`}
                    className={styles.platformCard}
                    key={product.slug}
                  >
                    <div className={styles.platformHead}>
                      <span>{String(index + 1).padStart(2, '0')}</span>

                      <p>
                        {product.category || 'BRAINTEK platform'}
                      </p>
                    </div>

                    <h3>{displayProductName(product)}</h3>

                    <div className={styles.platformVisual}>
                      {image ? (
                        <img
                          src={image}
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className={styles.platformFallback}
                          aria-hidden="true"
                        >
                          <span />
                          <span />
                          <span />
                        </div>
                      )}
                    </div>

                    <div className={styles.platformFooter}>
                      <p>{product.summary}</p>

                      <strong>
                        Explore platform
                        <ArrowUpRight size={15} />
                      </strong>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className={styles.model}>
        <div className={`container ${styles.sectionShell}`}>
          <div
            className={`${styles.sectionKicker} ${styles.sectionKickerLight}`}
          >
            <span>05</span>
            <p>Engagement model</p>
          </div>

          <div
            className={`${styles.sectionHeading} ${styles.sectionHeadingDark}`}
          >
            <h2>One disciplined path from context to improvement.</h2>

            <p>
              Diagnose the operating reality, strengthen protection,
              shape the right solution, implement it, enable the people
              around it and evaluate progress.
            </p>
          </div>

          <div className={styles.modelSteps}>
            {[
              'Diagnose',
              'Secure',
              'Design',
              'Implement',
              'Enable',
              'Evaluate',
            ].map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i aria-hidden="true" />
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/*
        Same fixed / curtain CTA used on the Home page.
        The old electric-blue sector CTA is intentionally removed.
      */}
      <HomeFinalCTA />
    </main>
  );
}
