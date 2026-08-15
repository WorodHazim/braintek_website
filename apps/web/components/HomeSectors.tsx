'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './HomeSectors.module.css';

type Sector = {
  slug: string;
  name: string;
  summary?: string | null;
};

type HomeSectorsProps = {
  sectors: Sector[];
};

const visuals: Record<
  string,
  {
    image: string;
    eyebrow: string;
    title: string;
    subtitle?: string;
  }
> = {
  'government-public-institutions': {
    image: '/home/sectors/government-public-institutions.jpg',
    eyebrow: 'Government & Public Institutions',
    title: 'Government',
    subtitle: 'Public Institutions',
  },
  'education-academic-institutions': {
    image: '/home/sectors/education-academic-institutions.jpg',
    eyebrow: 'Education & Academic Institutions',
    title: 'Education',
    subtitle: 'Academic Institutions',
  },
  'corporate-enterprise-organizations': {
    image: '/home/sectors/corporate-enterprise-organizations.jpg',
    eyebrow: 'Corporate & Enterprise Organizations',
    title: 'Enterprise',
    subtitle: 'Corporate Organizations',
  },
  'human-capital-hr-talent-development': {
    image: '/home/sectors/human-capital-hr-talent-development.jpg',
    eyebrow: 'Human Capital / HR / Talent Development',
    title: 'Human Capital',
    subtitle: 'HR & Talent',
  },
  'training-professional-development': {
    image: '/home/sectors/training-professional-development.jpg',
    eyebrow: 'Training / Consulting / Professional Development',
    title: 'Professional Development',
    subtitle: 'Training & Consulting',
  },
  'institutional-service-operations': {
    image: '/home/sectors/institutional-service-operations.jpg',
    eyebrow: 'Institutional & Service Operations',
    title: 'Service Operations',
    subtitle: 'Institutional Services',
  },
};

function fallbackVisual(sector: Sector) {
  return {
    image: `/home/sectors/${sector.slug}.jpg`,
    eyebrow: sector.name,
    title: sector.name,
    subtitle: '',
  };
}

export function HomeSectors({ sectors }: HomeSectorsProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const didDragRef = useRef(false);
  const draggingRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const items = useMemo(
    () =>
      sectors.map((sector) => ({
        sector,
        visual: visuals[sector.slug] || fallbackVisual(sector),
      })),
    [sectors],
  );

  const updateProgress = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const max = viewport.scrollWidth - viewport.clientWidth;
    setProgress(max > 0 ? viewport.scrollLeft / max : 0);
  };

  useEffect(() => {
    updateProgress();

    const viewport = viewportRef.current;
    if (!viewport) return;

    const onScroll = () => updateProgress();
    const onResize = () => updateProgress();

    viewport.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      viewport.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [items.length]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startScrollLeftRef.current = viewport.scrollLeft;
    didDragRef.current = false;
    draggingRef.current = false;
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const deltaX = event.clientX - startXRef.current;

    // Important: a normal click remains a click.
    // Only become "dragging" after a real movement threshold.
    if (!draggingRef.current && Math.abs(deltaX) >= 8) {
      draggingRef.current = true;
      didDragRef.current = true;
      setIsDragging(true);

      try {
        viewport.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is only a usability enhancement.
      }
    }

    if (!draggingRef.current) return;

    viewport.scrollLeft = startScrollLeftRef.current - deltaX;
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const viewport = viewportRef.current;

    if (viewport?.hasPointerCapture(event.pointerId)) {
      try {
        viewport.releasePointerCapture(event.pointerId);
      } catch {
        // No-op.
      }
    }

    pointerIdRef.current = null;
    draggingRef.current = false;
    setIsDragging(false);

    // Keep didDrag true through the synthetic click event.
    if (didDragRef.current) {
      window.setTimeout(() => {
        didDragRef.current = false;
      }, 0);
    }
  };

  const preventClickAfterDrag = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!didDragRef.current) return;

    event.preventDefault();
    event.stopPropagation();
  };

  const scrollByCard = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const card = viewport.querySelector<HTMLElement>(
      `.${styles.card}`,
    );

    const amount =
      card?.getBoundingClientRect().width ||
      viewport.clientWidth * 0.72;

    viewport.scrollBy({
      left: direction * (amount + 14),
      behavior: 'smooth',
    });
  };

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
              Protection, systems and capability are adapted to the
              mandates, service models and operating realities of each
              sector.
            </p>
          </div>

          <div className={styles.arrows}>
            <button
              type="button"
              aria-label="Previous sectors"
              onClick={() => scrollByCard(-1)}
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              aria-label="Next sectors"
              onClick={() => scrollByCard(1)}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={`${styles.viewport} ${
          isDragging ? styles.dragging : ''
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        onClickCapture={preventClickAfterDrag}
      >
        <div className={styles.track}>
          {items.map(({ sector, visual }, index) => (
            <Link
              href={`/sectors/${sector.slug}`}
              className={styles.card}
              key={sector.slug}
              draggable={false}
            >
              <img
                className={styles.image}
                src={visual.image}
                alt=""
                draggable={false}
              />

              <div className={styles.overlay} aria-hidden="true" />

              <div className={styles.cardTop}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i aria-hidden="true">
                  <b />
                </i>
              </div>

              <div className={styles.cardCopy}>
                <p className={styles.eyebrow}>
                  {visual.eyebrow}
                </p>

                <h3>
                  {visual.title}
                  {visual.subtitle ? (
                    <small>{visual.subtitle}</small>
                  ) : null}
                </h3>

                {sector.summary ? (
                  <p className={styles.summary}>{sector.summary}</p>
                ) : null}

                <span className={styles.explore}>
                  Explore pathway
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={`container ${styles.progressRow}`}>
        <div className={styles.progressNumbers}>
          <span>
            {String(
              Math.min(
                items.length,
                Math.max(
                  1,
                  Math.round(progress * Math.max(items.length - 1, 0)) +
                    1,
                ),
              ),
            ).padStart(2, '0')}
          </span>
          <i />
          <span>{String(items.length).padStart(2, '0')}</span>
        </div>

        <div className={styles.progressTrack}>
          <span
            style={{
              transform: `scaleX(${Math.max(
                0.08,
                Math.min(1, progress),
              )})`,
            }}
          />
        </div>

        <p>Drag horizontally to explore</p>
      </div>
    </section>
  );
}
