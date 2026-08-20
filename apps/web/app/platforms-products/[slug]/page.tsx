import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { cms } from '@/lib/cms';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';
import styles from './PlatformDetailPage.module.css';

type ProductRecord = {
  slug: string;
  name: string;
  category?: string | null;
  summary?: string | null;
  status?: string | null;
  screenshotUrls?: string[] | null;
};

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

type ProductExperience = {
  localImage: string;
  eyebrow: string;
  status?: string;
  heroLine: string;
  problem: string;
  positioning: string;
  merits: string[];
  fit: string;
  capabilityLine: string;
  serviceKeywords: string[];
  sectorKeywords: string[];
  motionWords: string[];
};

const PRODUCT_COPY: Record<string, ProductExperience> = {
  psytest: {
    localImage: '/home/platforms/psytest.png',
    eyebrow: 'Assessment & Human Capability',
    heroLine:
      'Psychometric-informed assessment for structured human analysis, capability diagnosis, talent visibility and evidence-informed development planning.',
    problem:
      'Organizations often make recruitment, development, placement and capability decisions with incomplete evidence. PSYTEST is designed to bring more structured human insight into those decisions.',
    positioning:
      'PSYTEST functions as a diagnostic engine that helps institutions move from assumption-based human decisions toward evidence-informed development planning across workforce, education and institutional settings.',
    merits: [
      'Brings structured psychometric intelligence into workforce and institutional decision-making.',
      'Supports clearer understanding of strengths, risks, development priorities and role suitability.',
      'Creates a stronger basis for targeted training, leadership preparation and capability-building.',
      'Can operate as a standalone assessment solution or within broader talent and transformation workflows.',
      'Connects human analysis to practical institutional action.',
    ],
    fit:
      'Government entities, corporations, HR and talent-development functions, education providers, leadership programs and workforce-empowerment initiatives.',
    capabilityLine:
      'A platform for institutions that need reliable evidence before deciding how people should be recruited, developed, placed or empowered.',
    serviceKeywords: ['psychometric', 'leadership', 'training', 'capability'],
    sectorKeywords: ['government', 'enterprise', 'human capital', 'education'],
    motionWords: ['Assessment intelligence', 'Capability diagnosis', 'Talent visibility', 'Development planning'],
  },

  ailex: {
    localImage: '/home/platforms/ailex.png',
    eyebrow: 'Leadership & AI Readiness',
    heroLine:
      'AI Leadership Excellence Assessment for leaders, managers and decision-makers operating in increasingly AI-enabled environments.',
    problem:
      'Basic AI awareness does not tell an institution whether its leadership pipeline is ready to use AI strategically, responsibly and productively in complex work environments.',
    positioning:
      'AILEX is designed as both an assessment and executive-development instrument, focusing on leadership-level application such as decision intelligence, prompt quality, policy awareness, risk understanding, scenario judgment and AI-enabled strategic performance.',
    merits: [
      'Measures executive and managerial readiness for AI-enabled environments.',
      'Identifies leadership strengths, blind spots and priority areas for development.',
      'Creates a structured basis for executive training and transformation-readiness programs.',
      'Supports governance-oriented capability building and responsible AI adoption.',
      'Strengthens confidence when preparing leaders for AI-driven change.',
    ],
    fit:
      'Senior management, executive teams, public-sector leaders, corporate decision-makers and organizations building AI-aware leadership cultures.',
    capabilityLine:
      'A leadership-intelligence platform for organizations that need more than generic AI-awareness training.',
    serviceKeywords: ['leadership', 'ai', 'consultancy', 'training'],
    sectorKeywords: ['government', 'enterprise', 'human capital'],
    motionWords: ['Leadership readiness', 'Responsible AI', 'Decision intelligence', 'Executive development'],
  },

  scheduler: {
    localImage: '/home/platforms/scheduler.png',
    eyebrow: 'Academic Operations',
    heroLine:
      'Institutional scheduling for timetables, examinations, session coordination and resource alignment across complex academic environments.',
    problem:
      'Academic scheduling becomes fragile when rooms, sessions, course demand, examinations and institutional dependencies are coordinated through fragmented tools or manual work.',
    positioning:
      'Scheduler is designed as an institutional operations solution rather than a narrow timetable utility. It supports more disciplined planning across academic units, registrars, examination bodies, administrative teams and institutional leadership.',
    merits: [
      'Improves timetable design and examination coordination through structured planning logic.',
      'Reduces scheduling conflicts, duplication and administrative friction.',
      'Improves visibility across rooms, sessions, course demand and dependencies.',
      'Strengthens planning discipline and institutional responsiveness.',
      'Can evolve into a broader academic-operations layer through integration.',
    ],
    fit:
      'Universities, colleges, academic institutes, professional academies and organizations managing complex educational schedules.',
    capabilityLine:
      'A scheduling platform designed around institutional coordination, not simply calendar placement.',
    serviceKeywords: ['workflow', 'custom', 'automation', 'integration'],
    sectorKeywords: ['education', 'academic'],
    motionWords: ['Academic planning', 'Scheduling logic', 'Resource alignment', 'Operational visibility'],
  },

  skoolee: {
    localImage: '/home/platforms/skoolee.png',
    eyebrow: 'Student Institutional Services',
    heroLine:
      'A student-centered operational platform for requests, records, communication, service coordination and institutional visibility.',
    problem:
      'Student services become inconsistent when requests, approvals, communication and records are spread across disconnected administrative channels.',
    positioning:
      'Skoolee is designed to organize student-related workflows into a more connected digital experience, helping institutions improve service responsiveness while giving administrative teams clearer visibility and coordination.',
    merits: [
      'Supports organized student-service workflows across institutional environments.',
      'Improves visibility, responsiveness and consistency in student-facing operations.',
      'Connects requests, communication, records and service processes.',
      'Improves the student experience while helping service teams work more efficiently.',
      'Can serve as a scalable operational layer within wider education-management ecosystems.',
    ],
    fit:
      'Schools, colleges, universities, institutes and student-service departments seeking stronger coordination and digital service maturity.',
    capabilityLine:
      'A service-operations platform that treats student support as a connected institutional experience.',
    serviceKeywords: ['workflow', 'custom', 'automation', 'ai integration'],
    sectorKeywords: ['education', 'academic'],
    motionWords: ['Student services', 'Connected workflows', 'Service visibility', 'Operational coordination'],
  },

  opspilot: {
    localImage: '/home/platforms/o-pilot.png',
    eyebrow: 'Workflow Automation & Operational Control',
    status: 'Strategic Platform Direction',
    heroLine:
      'A configurable platform direction for workflow orchestration, approvals, smart routing, process control and operational visibility.',
    problem:
      'Many institutions depend on fragmented approvals, siloed process management, inconsistent service execution and heavy manual administration.',
    positioning:
      'O-PILOT is presented as a strategic platform direction: a configurable and scalable workflow-automation architecture that can be adapted to institutional modules, permissions, dashboards, routing rules, forms, integrations and audit requirements.',
    merits: [
      'Creates a clearer branded platform direction for workflow automation and operational control.',
      'Can support approvals, cases, routing, escalations, tasks, forms and document flow.',
      'Can be configured for government, education, HR, enterprise and service operations.',
      'Supports staged implementation, enhancement, integration and analytics cycles.',
      'Provides a more structured platform framework than isolated one-off automation work.',
    ],
    fit:
      'Institutions seeking a configurable operational framework that can evolve around their own workflows, governance and service requirements.',
    capabilityLine:
      'A strategic platform direction intended to make customized institutional workflow systems more understandable, configurable and scalable.',
    serviceKeywords: ['workflow', 'automation', 'custom', 'ai integration'],
    sectorKeywords: ['government', 'enterprise', 'service', 'education'],
    motionWords: ['Workflow orchestration', 'Smart routing', 'Process control', 'Operational visibility'],
  },

  sentinelshield: {
    localImage: '/home/platforms/sentinelshield.png',
    eyebrow: 'Cybersecurity & Digital Protection',
    status: 'Proposed Solution Concept',
    heroLine:
      'A proposed cybersecurity governance and monitoring concept for security visibility, compliance support, risk awareness and institutional readiness.',
    problem:
      'Security information is often fragmented across technical tools, leaving institutional leaders without a practical, management-oriented view of cyber-readiness and risk.',
    positioning:
      'SentinelShield is a proposed solution concept for a cybersecurity governance and monitoring environment that could bring security-posture visibility, compliance support and actionable readiness intelligence into a clearer operational view.',
    merits: [
      'Creates a recognizable cybersecurity solution concept within the BRAINTEK portfolio.',
      'Frames cyber-readiness in practical executive language rather than technical jargon alone.',
      'Could support posture visibility, compliance checks, event awareness and management reporting.',
      'Can be developed modularly from lightweight visibility toward broader response coordination.',
      'Supports a more tangible pathway for cybersecurity proposals, readiness programs and recurring services.',
    ],
    fit:
      'Public entities, enterprises and regulated institutions that require visible, manageable and governance-aware cyber-readiness.',
    capabilityLine:
      'A proposed solution concept—not presented as a currently deployed product—for institutions seeking clearer cybersecurity governance and monitoring.',
    serviceKeywords: ['cyber', 'monitoring', 'compliance', 'penetration'],
    sectorKeywords: ['government', 'enterprise', 'service'],
    motionWords: ['Security visibility', 'Compliance support', 'Risk awareness', 'Cyber readiness'],
  },
};

function keyFor(slug: string, name: string) {
  const value = `${slug} ${name}`.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (value.includes('psytest') || value.includes('pytest')) return 'psytest';
  if (value.includes('ailex')) return 'ailex';
  if (value.includes('scheduler')) return 'scheduler';
  if (value.includes('skoolee')) return 'skoolee';
  if (value.includes('opspilot')) return 'opspilot';
  if (value.includes('sentinelshield') || value.includes('sentineshield')) return 'sentinelshield';

  return '';
}

function fallbackExperience(product: ProductRecord): ProductExperience {
  return {
    localImage: `/home/platforms/${product.slug}.png`,
    eyebrow: product.category || 'BRAINTEK Platform',
    heroLine:
      product.summary ||
      'A BRAINTEK platform designed around a clear institutional problem and practical operating context.',
    problem:
      'The platform is designed around a defined institutional requirement rather than generic software inventory.',
    positioning:
      product.summary ||
      'BRAINTEK platforms connect product design to operational relevance, institutional context and measurable value.',
    merits: [
      'Designed around a clear institutional need.',
      'Supports practical operating improvement.',
      'Can connect with broader BRAINTEK service pathways.',
      'Built with implementation context in mind.',
    ],
    fit: 'Institutions seeking a structured digital solution aligned with real operating priorities.',
    capabilityLine:
      'A practical BRAINTEK platform positioned around operational value rather than software features alone.',
    serviceKeywords: ['custom', 'workflow', 'ai'],
    sectorKeywords: ['government', 'enterprise', 'education'],
    motionWords: ['Institutional systems', 'Practical implementation', 'Operational value', 'Connected capability'],
  };
}


function displayProductName(product: ProductRecord) {
  const key = keyFor(product.slug, product.name);

  if (key === 'opspilot') return 'O-PILOT';

  return product.name;
}

function platformLogo(product: ProductRecord, experience: ProductExperience) {
  const key = keyFor(product.slug, product.name);

  const logos: Record<string, string> = {
    psytest: '/home/platforms/psytest.png',
    ailex: '/home/platforms/ailex.png',
    scheduler: '/home/platforms/scheduler.png',
    skoolee: '/home/platforms/skoolee.png',
    opspilot: '/home/platforms/o-pilot.png',
    sentinelshield: '/home/platforms/sentinelshield.png',
  };

  return logos[key] || experience.localImage;
}

function primaryScreenshot(product: ProductRecord) {
  return product.screenshotUrls?.find(Boolean) || null;
}

function normalize(value: string | null | undefined) {
  return (value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function rankByKeywords<T>(
  items: T[],
  keywords: string[],
  source: (item: T) => string,
  limit: number,
) {
  return [...items]
    .map((item) => {
      const haystack = normalize(source(item));
      const score = keywords.reduce(
        (total, keyword, index) =>
          total + (haystack.includes(normalize(keyword)) ? keywords.length - index : 0),
        0,
      );
      return { item, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)
    .slice(0, limit);
}

async function getPageData(slug: string) {
  const [products, sectors, services] = await Promise.all([
    cms.products(),
    cms.sectors(),
    cms.services(),
  ]);

  const typedProducts = products as ProductRecord[];
  const product = typedProducts.find((item) => item.slug === slug);

  if (!product) return null;

  return {
    product,
    products: typedProducts,
    sectors: sectors as SectorRecord[],
    services: services as ServiceRecord[],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPageData(slug);

  if (!data) {
    return {
      title: 'Platform | BRAINTEK',
      robots: { index: false, follow: false },
    };
  }

  const { product } = data;

  return {
    title: `${product.name} | BRAINTEK Platform`,
    description:
      product.summary ||
      `Explore ${product.name}, a BRAINTEK platform designed around practical institutional needs.`,
    alternates: {
      canonical: `/platforms-products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | BRAINTEK`,
      description:
        product.summary ||
        `Explore ${product.name}, a BRAINTEK platform designed around practical institutional needs.`,
      type: 'website',
    },
  };
}

export default async function PlatformDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPageData(slug);

  if (!data) notFound();

  const { product, products, sectors, services } = data;
  const key = keyFor(product.slug, product.name);
  const experience = PRODUCT_COPY[key] || fallbackExperience(product);
  const status = product.status || experience.status;

  const relatedSectors = rankByKeywords(
    sectors,
    experience.sectorKeywords,
    (sector) => `${sector.name} ${sector.summary}`,
    4,
  );

  const relatedServices = rankByKeywords(
    services,
    experience.serviceKeywords,
    (service) => `${service.name} ${service.pillar} ${service.summary}`,
    4,
  );

  const relatedProducts = products
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  const consultationHref = `/contact?platform=${encodeURIComponent(product.slug)}`;

  const productName = displayProductName(product);
  const logo = platformLogo(product, experience);
  const screenshot = primaryScreenshot(product);

  return (
    <main id="main-content" className={`home-v2 ${styles.page}`}>
      <section className={styles.hero}>
        <div className={styles.heroAtmosphere} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroTop}>
            <Link href="/platforms-products" className={styles.backLink}>
              <ArrowLeft size={15} />
              Platforms & Products
            </Link>

            {status ? (
              <span className={styles.statusTag}>{status}</span>
            ) : (
              <span className={styles.statusTag}>BRAINTEK Platform</span>
            )}
          </div>

          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{experience.eyebrow}</p>
              <h1>{productName}</h1>

              <p className={styles.heroSummary}>{experience.heroLine}</p>

              <div className={styles.heroActions}>
                <Link href={consultationHref} className={styles.primaryAction}>
                  Discuss this platform
                  <ArrowUpRight size={16} />
                </Link>

                <Link href="/platforms-products" className={styles.secondaryAction}>
                  View all platforms
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroVisualTop}>
                <span>Platform identity</span>
                <i />
              </div>

              <div className={styles.logoStage}>
                <img
                  src={logo}
                  alt={`${productName} logo`}
                />
              </div>

              <div className={styles.heroVisualFooter}>
                <span>BRAINTEK</span>
                <strong>{productName}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.motionStrip} aria-hidden="true">
        <div>
          {[
            ...experience.motionWords,
            productName,
            ...experience.motionWords,
            productName,
          ].map((word, index) => (
            <span key={`${word}-${index}`}>
              {word}
              <i />
            </span>
          ))}
        </div>
      </div>

      <section className={styles.role}>
        <div className={`container ${styles.sectionShell}`}>
          <div className={styles.sectionKicker}>
            <span>01</span>
            <p>Platform role</p>
          </div>

          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.contextLine}>{experience.capabilityLine}</p>
              <h2>
                Designed around a clear institutional problem and a practical
                operating context.
              </h2>
            </div>

            <div className={styles.sectionCopy}>
              <p>{experience.problem}</p>
              <p>{experience.positioning}</p>
              <p>
                <strong>Ideal fit.</strong> {experience.fit}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.merits}>
        <div className={`container ${styles.sectionShell}`}>
          <div className={`${styles.sectionKicker} ${styles.sectionKickerLight}`}>
            <span>02</span>
            <p>Core merits</p>
          </div>

          <div className={`${styles.sectionHeading} ${styles.sectionHeadingDark}`}>
            <h2>Why this platform matters in practice.</h2>

            <p>
              The value is not software ownership alone. It is the ability to
              improve decisions, coordination, capability or operational
              visibility in a real institutional setting.
            </p>
          </div>

          <div className={styles.meritGrid}>
            {experience.merits.map((merit, index) => (
              <article key={merit}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Check size={15} aria-hidden="true" />
                <h3>{merit}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.interface}>
        <div className={`container ${styles.sectionShell}`}>
          <div className={styles.sectionKicker}>
            <span>03</span>
            <p>Platform visual</p>
          </div>

          <div className={styles.sectionHeading}>
            <h2>
              A visual language ready to evolve with the product.
            </h2>

            <p>
              Real product screenshots can be managed through the CMS as they
              become available. Until then, the page uses the approved platform
              identity rather than a fake or broken interface placeholder.
            </p>
          </div>

          <div className={styles.interfaceCanvas}>
            {screenshot ? (
              <img
                className={styles.interfaceScreenshot}
                src={screenshot}
                alt={`${productName} interface`}
                loading="lazy"
              />
            ) : (
              <div className={styles.interfaceIdentity}>
                <img
                  src={logo}
                  alt={`${productName} logo`}
                  loading="lazy"
                />

                <div>
                  <span>{experience.eyebrow}</span>
                  <strong>{productName}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {relatedSectors.length ? (
        <section className={styles.sectors}>
          <div className={`container ${styles.sectionShell}`}>
            <div className={styles.sectionKicker}>
              <span>04</span>
              <p>Relevant environments</p>
            </div>

            <div className={styles.sectionHeading}>
              <h2>Where {productName} can create institutional value.</h2>

              <p>
                Sector relevance is framed around the operating need, not just
                the product category.
              </p>
            </div>

            <div className={styles.sectorGrid}>
              {relatedSectors.map((sector, index) => (
                <Link
                  href={`/sectors/${sector.slug}`}
                  className={styles.sectorCard}
                  key={sector.slug}
                >
                  <div className={styles.cardTop}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <ArrowUpRight size={16} />
                  </div>

                  <h3>{sector.name}</h3>
                  <p>{sector.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedServices.length ? (
        <section className={styles.services}>
          <div className={`container ${styles.sectionShell}`}>
            <div className={`${styles.sectionKicker} ${styles.sectionKickerLight}`}>
              <span>05</span>
              <p>Connected services</p>
            </div>

            <div className={`${styles.sectionHeading} ${styles.sectionHeadingDark}`}>
              <h2>
                Platforms work best when implementation capability sits around
                them.
              </h2>

              <div className={styles.darkHeadingAside}>
                <p>
                  Connect the platform discussion to the services needed for
                  readiness, integration, adoption, governance and measurable use.
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
                  <div className={styles.cardTopDark}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <ArrowRight size={16} />
                  </div>

                  <p>{service.pillar || 'BRAINTEK capability'}</p>
                  <h3>{service.name}</h3>
                  <small>{service.summary}</small>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedProducts.length ? (
        <section className={styles.related}>
          <div className={`container ${styles.sectionShell}`}>
            <div className={styles.sectionKicker}>
              <span>06</span>
              <p>Platform ecosystem</p>
            </div>

            <div className={styles.sectionHeading}>
              <h2>Continue through the BRAINTEK platform portfolio.</h2>

              <p>
                Explore assessment, leadership readiness, academic operations,
                workflow automation and digital protection through one connected
                platform portfolio.
              </p>
            </div>

            <div className={styles.relatedGrid}>
              {relatedProducts.map((item, index) => {
                const relatedKey = keyFor(item.slug, item.name);
                const relatedExperience =
                  PRODUCT_COPY[relatedKey] || fallbackExperience(item);
                const relatedLogo = platformLogo(item, relatedExperience);

                return (
                  <Link
                    href={`/platforms-products/${item.slug}`}
                    className={styles.relatedCard}
                    key={item.slug}
                  >
                    <div className={styles.relatedHead}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <p>{relatedExperience.eyebrow}</p>
                    </div>

                    <h3>{displayProductName(item)}</h3>

                    <div className={styles.relatedVisual}>
                      <img
                        src={relatedLogo}
                        alt={`${displayProductName(item)} logo`}
                        loading="lazy"
                      />
                    </div>

                    <div className={styles.relatedFooter}>
                      <p>{item.summary || relatedExperience.heroLine}</p>

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

      <HomeFinalCTA />
    </main>
  );
}
