'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
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

type PinBox = {
  top: number;
  left: number;
  width: number;
};

const localFallbacks: Record<string, string> = {
  psytest: '/home/platforms/psytest.png',
  pytest: '/home/platforms/psytest.png',

  ailex: '/home/platforms/ailex.png',

  scheduler: '/home/platforms/scheduler.png',

  skoolee: '/home/platforms/skoolee.png',

  // CMS may still return the old slug/key "opspilot".
  // The real platform name / asset is O-PILOT.
  opspilot: '/home/platforms/o-pilot.png',
  opilot: '/home/platforms/o-pilot.png',

  sentinelshield: '/home/platforms/sentinelshield.png',
  sentineshield: '/home/platforms/sentinelshield.png',
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


function displayProductName(product: Product) {
  const key = productKey(product.slug);
  const rawName = product.name.trim();

  if (
    key === 'opspilot' ||
    key === 'opilot' ||
    rawName.toLowerCase().replace(/[^a-z0-9]/g, '') === 'opspilot'
  ) {
    return 'O-PILOT';
  }

  return product.name;
}

function ProductVisual({ product }: { product: Product }) {
  const key = productKey(product.slug);

  const candidates = useMemo(
    () =>
      [localFallbacks[key], ...(product.screenshotUrls ?? [])].filter(
        (value, index, array): value is string =>
          !!value && array.indexOf(value) === index,
      ),
    [key, product.screenshotUrls],
  );

  const [candidateIndex, setCandidateIndex] = useState(0);
  const preferred = candidates[candidateIndex];

  return (
    <div className={styles.visual}>
      {preferred ? (
        <img
          src={preferred}
          alt=""
          loading="lazy"
          draggable={false}
          onError={() => setCandidateIndex((current) => current + 1)}
          className={styles.visualImage}
        />
      ) : (
        <div className={styles.visualFallback} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}

      <div className={styles.visualShade} aria-hidden="true" />
    </div>
  );
}

function PlatformIntro({ fixed = false }: { fixed?: boolean }) {
  return (
    <>
      <p className={styles.kicker}>Platforms &amp; products</p>

      <h2 id={fixed ? undefined : 'home-products-title'}>
        Platforms for real institutional work.
      </h2>

      <p>
        Assessment, leadership, scheduling, student services,
        workflow automation and digital protection—designed
        around real operational needs.
      </p>

      <Link className={styles.introLink} href="/platforms-products">
        View all platforms
        <ArrowUpRight size={16} />
      </Link>
    </>
  );
}

export function HomeProducts({ products }: HomeProductsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const introColumnRef = useRef<HTMLElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [pinBox, setPinBox] = useState<PinBox>({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  /*
    Reliable sticky behavior:
    while the Platforms section is active, render the left intro as a
    fixed portal attached to document.body.

    This completely avoids ancestor overflow / transform rules, which are
    what kept breaking native position: sticky and GSAP pinning.
  */
  useEffect(() => {
    const section = sectionRef.current;
    const column = introColumnRef.current;
    const content = introContentRef.current;

    if (!section || !column || !content || typeof window === 'undefined') {
      return;
    }

    let raf = 0;

    const updatePin = () => {
      raf = 0;

      if (window.innerWidth <= 1100) {
        setPinned(false);
        return;
      }

      const rootStyles = getComputedStyle(document.documentElement);
      const rawHeader = rootStyles.getPropertyValue('--header').trim();
      const parsedHeader = Number.parseFloat(rawHeader);
      const headerHeight = Number.isFinite(parsedHeader) ? parsedHeader : 184;
      const top = headerHeight + 24;

      const sectionRect = section.getBoundingClientRect();
      const columnRect = column.getBoundingClientRect();
      const contentHeight = content.offsetHeight;

      const shouldPin =
        sectionRect.top <= top &&
        sectionRect.bottom > top + contentHeight + 24;

      if (shouldPin) {
        setPinBox({
          top,
          left: columnRect.left,
          width: columnRect.width,
        });
      }

      setPinned(shouldPin);
    };

    const requestUpdate = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(updatePin);
    };

    updatePin();

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  /*
    Card/image motion stays independent from the pinned title.
  */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        '[data-product-card]',
      );

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 34, opacity: 0.62 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 94%',
              end: 'top 70%',
              scrub: 0.45,
            },
          },
        );

        const image = card.querySelector<HTMLElement>(
          '[data-platform-image]',
        );

        if (image) {
          gsap.fromTo(
            image,
            { yPercent: -1.25 },
            {
              yPercent: 1.25,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.75,
              },
            },
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const fixedStyle: CSSProperties = {
    position: 'fixed',
    top: pinBox.top,
    left: pinBox.left,
    width: pinBox.width,
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="home-products-title"
    >
      <div className={`container ${styles.layout}`}>
        <aside ref={introColumnRef} className={styles.intro}>
          <div
            ref={introContentRef}
            className={`${styles.introContent}${
              pinned ? ` ${styles.introContentHidden}` : ''
            }`}
          >
            <PlatformIntro />
          </div>
        </aside>

        <div className={styles.stack}>
          {products.map((product, index) => {
            const key = productKey(product.slug);
            const displayStatus =
              product.status || statusFallbacks[key];
            const displaySummary =
              summaryFallbacks[key] || product.summary;
            const displayName = displayProductName(product);

            return (
              <article
                className={styles.card}
                key={product.slug}
                id={product.slug}
                data-product-card
              >
                <div className={styles.cardHeading}>
                  <div className={styles.cardHeadingTop}>
                    <span className={styles.index}>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className={styles.meta}>
                      <span>{product.category}</span>
                      {displayStatus ? <i>{displayStatus}</i> : null}
                    </div>
                  </div>

                  <h3>{displayName}</h3>
                </div>

                <div
                  className={styles.visualWrap}
                  data-platform-image
                >
                  <ProductVisual product={product} />
                </div>

                <div className={styles.cardFooter}>
                  <p>{displaySummary}</p>

                  <Link
                    className={styles.cardLink}
                    href={`/platforms-products/${product.slug}`}
                  >
                    Explore {displayName}
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {mounted && pinned
        ? createPortal(
            <div
              className={`${styles.introContent} ${styles.fixedIntro}`}
              style={fixedStyle}
            >
              <PlatformIntro fixed />
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
