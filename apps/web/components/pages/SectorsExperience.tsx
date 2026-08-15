'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import styles from './SectorsExperience.module.css';

type Sector = {
  slug: string;
  name: string;
  summary?: string | null;
};

type SectorsExperienceProps = {
  sectors: Sector[];
};

type SectorVisual = {
  images: string[];
  title: string;
  subtitle: string;
};

const VISUALS: SectorVisual[] = [
  {
    images: ['/home/sectors/government-public-institutions.jpg'],
    title: 'Government',
    subtitle: 'Public Institutions',
  },
  {
    images: ['/home/sectors/education-academic-institutions.jpg'],
    title: 'Education',
    subtitle: 'Academic Institutions',
  },
  {
    images: ['/home/sectors/corporate-enterprise-organizations.jpg'],
    title: 'Enterprise',
    subtitle: 'Corporate Organizations',
  },
  {
    images: ['/home/sectors/human-capital-hr-talent-development.jpg'],
    title: 'Human Capital',
    subtitle: 'HR & Talent',
  },
  {
    images: [
      '/home/sectors/training-professional-development.jpg',
      '/home/sectors/training-consulting-professional-development.jpg',
    ],
    title: 'Professional Development',
    subtitle: 'Training & Consulting',
  },
  {
    images: ['/home/sectors/institutional-service-operations.jpg'],
    title: 'Service Operations',
    subtitle: 'Institutional Services',
  },
];

function visualFor(sector: Sector, index: number): SectorVisual {
  const name = sector.name.toLowerCase();

  if (name.includes('government') || name.includes('public institution')) return VISUALS[0];
  if (name.includes('education') || name.includes('academic')) return VISUALS[1];
  if (name.includes('corporate') || name.includes('enterprise')) return VISUALS[2];
  if (name.includes('human capital') || name.includes('talent') || name.includes('hr')) return VISUALS[3];
  if (
    name.includes('training') ||
    name.includes('consulting') ||
    name.includes('professional development')
  ) {
    return VISUALS[4];
  }
  if (name.includes('service operation') || name.includes('institutional service')) return VISUALS[5];

  return VISUALS[index % VISUALS.length];
}

function SectorImage({
  images,
  index,
}: {
  images: string[];
  index: number;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const src = images[imageIndex];

  if (!src) return <div className={styles.imageFallback} aria-hidden="true" />;

  return (
    <img
      className={styles.image}
      src={src}
      alt=""
      draggable={false}
      loading={index < 3 ? 'eager' : 'lazy'}
      onError={() => setImageIndex((current) => current + 1)}
    />
  );
}

export function SectorsExperience({ sectors }: SectorsExperienceProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const pointerRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    didDrag: false,
    captured: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  const items = useMemo(
    () =>
      sectors.slice(0, 6).map((sector, index) => ({
        sector,
        visual: visualFor(sector, index),
      })),
    [sectors],
  );

  const updateRail = () => {
    const rail = railRef.current;
    if (!rail) return;

    const maxScroll = Math.max(rail.scrollWidth - rail.clientWidth, 1);
    setProgress(Math.min(1, Math.max(0, rail.scrollLeft / maxScroll)));

    const cards = Array.from(
      rail.querySelectorAll<HTMLElement>('[data-sector-page-card]'),
    );
    if (!cards.length) return;

    const railRect = rail.getBoundingClientRect();
    const target = railRect.left + Math.min(railRect.width * 0.28, 390);

    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width * 0.18 - target);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    setActiveIndex(nearest);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onScroll = () => updateRail();
    const onResize = () => updateRail();

    rail.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    updateRail();

    return () => {
      rail.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [items.length]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || event.pointerType === 'touch' || event.button !== 0) return;

    pointerRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
      didDrag: false,
      captured: false,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const state = pointerRef.current;

    if (!rail || !state.active || state.pointerId !== event.pointerId) return;

    const distance = event.clientX - state.startX;

    // A normal press/click stays a click.
    // Dragging only starts after a deliberate horizontal movement.
    if (!state.didDrag && Math.abs(distance) > 7) {
      state.didDrag = true;
      setDragging(true);

      if (!state.captured) {
        try {
          rail.setPointerCapture(event.pointerId);
          state.captured = true;
        } catch {
          state.captured = false;
        }
      }
    }

    if (!state.didDrag) return;

    rail.scrollLeft = state.startScrollLeft - distance * 1.05;
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const state = pointerRef.current;

    if (!rail || state.pointerId !== event.pointerId) return;

    state.active = false;
    setDragging(false);

    if (state.captured && rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }

    state.captured = false;
  };

  const handleCardClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!pointerRef.current.didDrag) return;

    event.preventDefault();
    pointerRef.current.didDrag = false;
  };

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: rail.clientWidth * 0.74 * direction,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section} aria-labelledby="sector-pathways-title">
      <div className={`container ${styles.intro}`}>
        <p className={styles.kicker}>Sector Pathways</p>

        <div className={styles.introCopy}>
          <h2 id="sector-pathways-title">
            Different environments.
            <br />
            One integrated approach.
          </h2>

          <div className={styles.introBottom}>
            <p>
              Protection, systems and capability are adapted to the mandates, service models and
              operating realities of each sector.
            </p>

            <div className={styles.controls} aria-label="Sector carousel controls">
              <button type="button" onClick={() => moveRail(-1)} aria-label="Previous sectors">
                <ArrowLeft size={18} />
              </button>
              <button type="button" onClick={() => moveRail(1)} aria-label="Next sectors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className={`${styles.rail}${dragging ? ` ${styles.dragging}` : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        aria-label="BRAINTEK sector pathways"
      >
        {items.map(({ sector, visual }, index) => (
          <Link
            href={`/sectors/${sector.slug}`}
            className={`${styles.card}${activeIndex === index ? ` ${styles.active}` : ''}`}
            key={sector.slug}
            data-sector-page-card
            onClick={handleCardClick}
            aria-label={`Explore ${sector.name}`}
          >
            <SectorImage images={visual.images} index={index} />

            <div className={styles.imageGrid} aria-hidden="true" />
            <div className={styles.overlay} aria-hidden="true" />

            <div className={styles.top}>
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.signal} aria-hidden="true">
                <i />
              </span>
            </div>

            <div className={styles.copy}>
              <p className={styles.officialName}>{sector.name}</p>

              <h3>
                <span>{visual.title}</span>
                <small>{visual.subtitle}</small>
              </h3>

              {sector.summary ? <p className={styles.summary}>{sector.summary}</p> : null}

              <span className={styles.link}>
                Explore pathway
                <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className={`container ${styles.footer}`}>
        <div className={styles.position}>
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <i />
          <span>{String(items.length).padStart(2, '0')}</span>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(progress, 0.025)})` }} />
        </div>

        <p>Drag horizontally to explore</p>
      </div>
    </section>
  );
}
