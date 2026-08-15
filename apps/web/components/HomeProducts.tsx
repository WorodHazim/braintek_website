'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HomeProducts.module.css';

type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  status?: string | null;
  screenshotUrls?: string[] | null;
};

type HomeProductsProps = {
  products: Product[];
};

const localFallbacks: Record<string, string> = {
  psytest: '/home/platforms/psytest.jpg',
  pytest: '/home/platforms/psytest.jpg',
  ailex: '/home/platforms/ailex.jpg',
  scheduler: '/home/platforms/scheduler.jpg',
  skoolee: '/home/platforms/skoolee.jpg',
  opspilot: '/home/platforms/opspilot.jpg',
  sentinelshield: '/home/platforms/sentinelshield.jpg',
  sentineshield: '/home/platforms/sentinelshield.jpg',
};

const statusFallbacks: Record<string, string> = {
  opspilot: 'Strategic Platform Direction',
  sentinelshield: 'Proposed Solution Concept',
  sentineshield: 'Proposed Solution Concept',
};

const summaryFallbacks: Record<string, string> = {
  sentinelshield:
    'A proposed cybersecurity and digital-protection concept for monitoring, risk detection, security visibility and institutional resilience.',
  sentineshield:
    'A proposed cybersecurity and digital-protection concept for monitoring, risk detection, security visibility and institutional resilience.',
};

function productKey(slug: string) {
  return slug.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function ProductVisual({ product }: { product: Product }) {
  const key = productKey(product.slug);
  const candidates = useMemo(
    () =>
      [localFallbacks[key], ...(product.screenshotUrls ?? [])].filter(
        (value, index, array): value is string => !!value && array.indexOf(value) === index,
      ),
    [key, product.screenshotUrls],
  );

  const [candidateIndex, setCandidateIndex] = useState(0);
  const preferred = candidates[candidateIndex];
  const showImage = !!preferred;

  return (
    <div className={styles.visual} aria-hidden="true">
      {showImage ? (
        <img
          src={preferred}
          alt=""
          loading="lazy"
          draggable={false}
          onError={() => setCandidateIndex((current) => current + 1)}
          className={styles.visualImage}
        />
      ) : (
        <div className={styles.visualFallback}>
          <div className={styles.visualChrome}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.visualGrid}>
            <aside>
              <i />
              <i />
              <i />
              <i />
            </aside>
            <main>
              <header>
                <span />
                <span />
              </header>
              <div className={styles.visualBlocks}>
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </main>
          </div>
        </div>
      )}

      <div className={styles.visualFrame} />
      <div className={styles.visualGlow} />
      <div className={styles.visualOverlay} />
      <div className={styles.visualMesh} />
    </div>
  );
}

export function HomeProducts({ products }: HomeProductsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-product-card]');

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 48, opacity: 0.55 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              end: 'top 62%',
              scrub: 0.65,
            },
          },
        );

        const visual = card.querySelector<HTMLElement>('[data-product-visual]');
        if (visual) {
          gsap.fromTo(
            visual,
            { yPercent: -2 },
            {
              yPercent: 2,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="home-products-title">
      <div className={`container ${styles.layout}`}>
        <aside className={styles.intro} data-reveal>
          <p className={styles.kicker}>Platforms & products</p>
          <h2 id="home-products-title">Platforms for real institutional work.</h2>
          <p>
            Assessment, leadership, scheduling, student services, workflow automation and digital
            protection—designed around real operational needs.
          </p>
          <Link className={styles.introLink} href="/platforms-products">
            View all platforms <ArrowUpRight size={16} />
          </Link>
        </aside>

        <div className={styles.stack}>
          {products.map((product, index) => {
            const key = productKey(product.slug);
            const displayStatus = product.status || statusFallbacks[key];
            const displaySummary = summaryFallbacks[key] || product.summary;

            return (
              <article className={styles.card} key={product.slug} id={product.slug} data-product-card>
                <div className={styles.cardMeta}>
                  <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                  <div className={styles.categoryWrap}>
                    <p className={styles.category}>{product.category}</p>
                    {displayStatus ? <span className={styles.status}>{displayStatus}</span> : null}
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.copy}>
                    <h3>{product.name}</h3>
                    <p>{displaySummary}</p>
                    <Link className={styles.cardLink} href={`/platforms-products/${product.slug}`}>
                      Explore {product.name} <ArrowUpRight size={16} />
                    </Link>
                  </div>

                  <div className={styles.visualWrap} data-product-visual>
                    <ProductVisual product={product} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
