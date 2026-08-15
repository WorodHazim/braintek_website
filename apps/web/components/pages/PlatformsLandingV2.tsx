import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { PlatformCover } from './PlatformCover';
import styles from './PlatformsLandingV2.module.css';

type Product = {
  slug: string;
  name: string;
  category?: string | null;
  summary?: string | null;
  status?: string | null;
  screenshotUrls?: string[] | null;
};

type PlatformsLandingV2Props = {
  products: Product[];
};

const benefits: Record<string, string[]> = {
  psytest: [
    'Structured psychometric intelligence',
    'Evidence-informed development planning',
    'Role and capability visibility',
    'Broader transformation workflow support',
  ],
  ailex: [
    'Leadership-level AI readiness',
    'Executive development insight',
    'Decision-oriented capability building',
    'Structured readiness mapping',
  ],
  scheduler: [
    'Reduced scheduling conflicts',
    'Improved visibility',
    'Stronger academic planning discipline',
    'Operational coordination',
  ],
  skoolee: [
    'Organized student workflows',
    'Improved responsiveness',
    'Connected service processes',
    'Stronger institutional visibility',
  ],
  opspilot: [
    'Configurable workflow architecture',
    'Cross-sector process orchestration',
    'Audit and routing capability',
    'Scalable operational model',
  ],
  sentinelshield: [
    'Executive-readable cyber visibility',
    'Structured risk posture framing',
    'Practical security outlook',
    'Operational governance orientation',
  ],
};

const statusFallbacks: Record<string, string> = {
  opspilot: 'Strategic Platform Direction',
  sentinelshield: 'Proposed Solution Concept',
};

function productKey(product: Product) {
  const source = `${product.slug} ${product.name}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  if (source.includes('psytest') || source.includes('pytest')) return 'psytest';
  if (source.includes('ailex')) return 'ailex';
  if (source.includes('scheduler')) return 'scheduler';
  if (source.includes('skoolee')) return 'skoolee';
  if (source.includes('opspilot')) return 'opspilot';
  if (source.includes('sentinelshield') || source.includes('sentineshield')) {
    return 'sentinelshield';
  }

  return product.slug;
}

export function PlatformsLandingV2({
  products,
}: PlatformsLandingV2Props) {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src="/services/services-hero.jpg"
          alt=""
          aria-hidden="true"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Platforms & products</p>
            <h1>Platforms built for real institutional work.</h1>
            <p className={styles.heroBody}>
              BRAINTEK&apos;s platform portfolio translates strategy into recognizable
              solution assets for assessment intelligence, leadership readiness,
              academic operations, student services, workflow automation and
              cybersecurity visibility.
            </p>

            <div className={styles.heroActions}>
              <Link href="#platform-portfolio" className={styles.primaryButton}>
                Meet the platforms
                <ChevronRight size={16} />
              </Link>
              <Link href="/contact" className={styles.secondaryButton}>
                Request a discussion
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <aside className={styles.heroModel}>
            <p>Platform portfolio</p>
            <article>
              <span>01</span>
              <div>
                <strong>Assess</strong>
                <small>People & capability</small>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <strong>Operate</strong>
                <small>Systems & workflows</small>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <strong>Protect</strong>
                <small>Digital environments</small>
              </div>
            </article>
          </aside>
        </div>
      </section>

      <div className={styles.motionStrip} aria-hidden="true">
        <div>
          <span>Assessment intelligence</span><i />
          <span>Leadership readiness</span><i />
          <span>Academic operations</span><i />
          <span>Student services</span><i />
          <span>Workflow automation</span><i />
          <span>Digital protection</span><i />
          <span>Assessment intelligence</span><i />
          <span>Leadership readiness</span><i />
          <span>Academic operations</span>
        </div>
      </div>

      <section id="platform-portfolio" className={styles.portfolio}>
        <div className={`container ${styles.portfolioLayout}`}>
          <aside className={styles.portfolioIntro}>
            <p className={styles.sectionKicker}>Portfolio logic</p>
            <h2>Purpose-built platforms. Clear institutional use.</h2>
            <p>
              Each platform is framed around a recognizable operating need rather
              than presented as a disconnected product label.
            </p>
            <span>{String(products.length).padStart(2, '0')} platform directions</span>
          </aside>

          <div className={styles.stack}>
            {products.map((product, index) => {
              const key = productKey(product);
              const items = benefits[key] || [
                'Clear institutional use case',
                'Practical operating value',
                'Connected service support',
                'Scalable implementation direction',
              ];
              const status = product.status || statusFallbacks[key];

              return (
                <article className={styles.card} key={product.slug}>
                  <div className={styles.cardTop}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{product.category || 'BRAINTEK platform'}</p>
                    {status ? <em>{status}</em> : null}
                  </div>

                  <div className={styles.cardMain}>
                    <div className={styles.cardCopy}>
                      <h3>{product.name}</h3>
                      <p>
                        {product.summary ||
                          'A BRAINTEK platform designed around a specific institutional need.'}
                      </p>
                      <Link href={`/platforms-products/${product.slug}`}>
                        Explore {product.name}
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>

                    <div className={styles.cover}>
                      <PlatformCover
                        slug={product.slug}
                        name={product.name}
                        screenshots={product.screenshotUrls}
                      />
                      <div className={styles.coverOverlay} aria-hidden="true" />
                      <div className={styles.coverFrame} aria-hidden="true" />
                    </div>
                  </div>

                  <div className={styles.benefitGrid}>
                    {items.map((item, itemIndex) => (
                      <div key={item}>
                        <span>{String(itemIndex + 1).padStart(2, '0')}</span>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaGrid} aria-hidden="true" />
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <p>Next step</p>
            <h2>Explore the platform architecture that fits your institution.</h2>
          </div>

          <div>
            <p>
              Discuss assessment, leadership readiness, academic operations,
              workflow automation or cybersecurity requirements with BRAINTEK.
            </p>
            <Link href="/contact">
              Request a Strategic Consultation
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
