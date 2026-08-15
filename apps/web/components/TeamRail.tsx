'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import styles from './TeamRail.module.css';

export type TeamMember = {
  name: string;
  initials?: string | null;
  portraitUrl?: string | null;
  role?: string | null;
  contribution?: string | null;
};

type TeamRailProps = {
  members: TeamMember[];
  compact?: boolean;
};

const LOCAL_PORTRAITS: Record<string, string> = {
  'Prof. Fawzi Alghazali': '/home/team/prof-fawzi-alghazali.jpg',
  'Eng. Ahmed Ali Anwar': '/home/team/eng-ahmed-ali-anwar.jpg',
  'MOIZ HASSAN': '/home/team/moiz-hassan.jpg',
  'Cetin Erdem': '/home/team/cetin-erdem.jpg',
  'Nisreen Khambaty': '/home/team/nisreen-khambaty.jpg',
  'Princess Clark Tabar': '/home/team/princess-clark-tabar.jpg',
  'LAUD ZION C. CASCALLA': '/home/team/laud-zion-c-cascalla.jpg',
  'Akmal Xudayberdiyev': '/home/team/akmal-xudayberdiyev.jpg',
  'Maduranga Senadheera': '/home/team/maduranga-senadheera.jpg',
  'DILSHAN MUNASINGHE': '/home/team/dilshan-munasinghe.jpg',
};

function initialsFor(member: TeamMember) {
  if (member.initials?.trim()) return member.initials.trim();

  return member.name
    .replace(/\b(Prof|Eng)\.?\s*/gi, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function Portrait({ member }: { member: TeamMember }) {
  const candidates = useMemo(
    () =>
      [LOCAL_PORTRAITS[member.name], member.portraitUrl]
        .filter((value, index, array): value is string => !!value && array.indexOf(value) === index),
    [member.name, member.portraitUrl],
  );

  const [candidateIndex, setCandidateIndex] = useState(0);
  const src = candidates[candidateIndex];

  if (!src) {
    return (
      <div className={styles.fallback} aria-hidden="true">
        <span>{initialsFor(member)}</span>
        <i />
      </div>
    );
  }

  return (
    <img
      className={styles.portrait}
      src={src}
      alt=""
      draggable={false}
      loading="lazy"
      onError={() => setCandidateIndex((current) => current + 1)}
    />
  );
}

export function TeamRail({ members, compact = false }: TeamRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
    moved: false,
  });

  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const update = () => {
      const max = Math.max(rail.scrollWidth - rail.clientWidth, 1);
      setProgress(Math.min(1, Math.max(0, rail.scrollLeft / max)));
    };

    update();
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      rail.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [members.length]);

  const move = (direction: -1 | 1) => {
    railRef.current?.scrollBy({
      left: railRef.current.clientWidth * 0.72 * direction,
      behavior: 'smooth',
    });
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || event.pointerType === 'touch') return;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startScroll: rail.scrollLeft,
      moved: false,
    };

    setDragging(true);
    rail.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !dragRef.current.active) return;

    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 6) dragRef.current.moved = true;

    rail.scrollLeft = dragRef.current.startScroll - distance;
  };

  const stop = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;

    dragRef.current.active = false;
    setDragging(false);

    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className={`${styles.shell}${compact ? ` ${styles.compact}` : ''}`}>
      <div className={styles.controls}>
        <p>Drag to explore</p>
        <div>
          <button type="button" onClick={() => move(-1)} aria-label="Previous experts">
            <ArrowLeft size={16} />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next experts">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className={`${styles.rail}${dragging ? ` ${styles.dragging}` : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        onPointerLeave={(event) => {
          if (dragRef.current.active) stop(event);
        }}
        aria-label="BRAINTEK expert team"
      >
        {members.map((member, index) => (
          <article className={styles.card} key={member.name}>
            <div className={styles.media}>
              <Portrait member={member} />
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
            </div>

            <div className={styles.copy}>
              <h3>{member.name}</h3>
              {member.role ? <p className={styles.role}>{member.role}</p> : null}
              {member.contribution ? (
                <p className={styles.contribution}>{member.contribution}</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className={styles.progress} aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(progress, .025)})` }} />
      </div>
    </div>
  );
}
