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
import styles from './HomeInsights.module.css';

type Resource = {
  slug: string;
  title: string;
  summary?: string | null;
  category?: string | null;
  format?: string | null;
  coverUrl?: string | null;
};

type HomeInsightsProps = {
  resources: Resource[];
};

const localCovers = [
  {
    match: ['ai integration', 'consistency in work'],
    src: '/home/insights/ai-integration-consistency.jpg',
  },
  {
    match: ['psychometric', 'training'],
    src: '/home/insights/psychometric-informed-training.jpg',
  },
  {
    match: ['sustainable productivity', 'intelligent automation'],
    src: '/home/insights/sustainable-productivity-automation.jpg',
  },
  {
    match: ['human capability', 'digital transformation'],
    src: '/home/insights/human-capability-digital-transformation.jpg',
  },
  {
    match: ['responsible', 'practical ai'],
    src: '/home/insights/responsible-practical-ai.jpg',
  },
  {
    match: ['training for performance', 'formality'],
    src: '/home/insights/training-for-performance.jpg',
  },
];

function localCoverFor(resource: Resource) {
  const haystack = `${resource.title} ${resource.category || ''}`.toLowerCase();
  return localCovers.find((item) => item.match.some((token) => haystack.includes(token)))?.src;
}

function InsightCover({ resource, index }: { resource: Resource; index: number }) {
  const [failed, setFailed] = useState(false);
  const src = resource.coverUrl || localCoverFor(resource);

  return (
    <div className={styles.cover}>
      {src && !failed ? (
        <img
          src={src}
          alt=""
          draggable={false}
          loading={index < 3 ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={`${styles.fallback} ${styles[`fallback${(index % 3) + 1}`]}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
      <div className={styles.coverGrid} aria-hidden="true" />
      <div className={styles.coverOverlay} aria-hidden="true" />
      <span className={styles.coverIndex}>{String(index + 1).padStart(2, '0')}</span>
    </div>
  );
}

export function HomeInsights({ resources }: HomeInsightsProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, startScrollLeft: 0, moved: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  const items = useMemo(() => resources.filter(Boolean), [resources]);

  const updateRail = () => {
    const rail = railRef.current;
    if (!rail) return;

    const maxScroll = Math.max(rail.scrollWidth - rail.clientWidth, 1);
    setProgress(Math.min(1, Math.max(0, rail.scrollLeft / maxScroll)));

    const cards = Array.from(rail.querySelectorAll<HTMLElement>('[data-insight-card]'));
    if (!cards.length) return;

    const railRect = rail.getBoundingClientRect();
    const targetX = railRect.left + Math.min(railRect.width * 0.27, 360);
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const value = Math.abs(rect.left + rect.width * 0.14 - targetX);
      if (value < distance) {
        distance = value;
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

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || event.pointerType === 'touch' || event.button !== 0) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !dragState.current.active) return;

    const distance = event.clientX - dragState.current.startX;

    if (!dragState.current.moved && Math.abs(distance) > 7) {
      dragState.current.moved = true;
      setDragging(true);
      rail.setPointerCapture(event.pointerId);
    }

    if (!dragState.current.moved) return;

    event.preventDefault();
    rail.scrollLeft = dragState.current.startScrollLeft - distance * 1.06;
  };

  const stopDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;

    dragState.current.active = false;
    setDragging(false);

    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }

    window.setTimeout(() => {
      dragState.current.moved = false;
    }, 0);
  };

  const onCardClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!dragState.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
  };

  const move = (direction: -1 | 1) => {
    railRef.current?.scrollBy({
      left: (railRef.current?.clientWidth || 0) * 0.72 * direction,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section} aria-labelledby="home-insights-title">
      <div className={`container ${styles.intro}`}>
        <p className={styles.kicker}>Resources & insights</p>
        <div className={styles.introCopy}>
          <h2 id="home-insights-title">Applied thinking for leaders navigating transformation.</h2>
          <div className={styles.introBottom}>
            <p>Explore BRAINTEK perspectives on AI, automation, workforce capability and institutional performance.</p>
            <div className={styles.controls}>
              <button type="button" onClick={() => move(-1)} aria-label="Previous insights"><ArrowLeft size={17} /></button>
              <button type="button" onClick={() => move(1)} aria-label="Next insights"><ArrowRight size={17} /></button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className={`${styles.rail}${dragging ? ` ${styles.dragging}` : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onPointerLeave={(event) => {
          if (dragState.current.active) stopDrag(event);
        }}
        aria-label="Insights carousel"
      >
        {items.map((resource, index) => (
          <Link
            key={resource.slug}
            href={`/insights-resources/${resource.slug}`}
            className={`${styles.card}${activeIndex === index ? ` ${styles.active}` : ''}`}
            data-insight-card
            onClick={onCardClick}
            onDragStart={(event) => event.preventDefault()}
            draggable={false}
          >
            <InsightCover resource={resource} index={index} />
            <div className={styles.content}>
              <div className={styles.meta}>
                <span>{resource.category || 'Insight'}</span>
                <i />
                <span>{resource.format || 'Article'}</span>
              </div>
              <h3>{resource.title}</h3>
              {resource.summary ? <p>{resource.summary}</p> : null}
              <span className={styles.readLink}>Read insight <ArrowUpRight size={16} /></span>
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
        <div className={styles.progress} aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(progress, 0.025)})` }} /></div>
        <Link href="/insights-resources" className={styles.allLink}>View all insights <ArrowUpRight size={15} /></Link>
      </div>
    </section>
  );
}
