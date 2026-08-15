'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { LandscapeExperience } from '@/components/landscape/LandscapeExperience';
import styles from './Hero.module.css';

type HeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  primary?: string;
  secondary?: string;
  primaryHref?: string;
  secondaryHref?: string;
  compact?: boolean;
};

const SIGNATURE_HEADLINE = 'Intelligence that moves institutions forward.';

export function Hero({
  eyebrow,
  title,
  body,
  primary = 'Book a Consultation',
  secondary = 'Explore Our Services',
  primaryHref = '/contact',
  secondaryHref = '/services',
  compact = false,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [headlineHover, setHeadlineHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    if (compact || reducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .fromTo(
          '[data-hero-line]',
          { yPercent: 118, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.02, stagger: 0.1, delay: 0.46 },
        )
        .fromTo(
          '[data-hero-cta]',
          { y: 18, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.72 },
          '-=0.42',
        )
        .fromTo(
          '[data-hero-scroll]',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.2',
        );
    }, heroRef);

    return () => ctx.revert();
  }, [compact, reducedMotion]);

  useEffect(() => {
    if (compact || reducedMotion || !heroRef.current || !cursorRef.current) return;

    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!media.matches) return;

    const hero = heroRef.current;
    const cursor = cursorRef.current;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.28, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.28, ease: 'power3.out' });

    const handleMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      xTo(x);
      yTo(y);

      hero.style.setProperty('--pointer-x', `${(x / rect.width) * 100}%`);
      hero.style.setProperty('--pointer-y', `${(y / rect.height) * 100}%`);

      const rotateX = gsap.utils.clamp(-8, 8, ((y / rect.height) - 0.5) * -7);
      const rotateY = gsap.utils.clamp(-8, 8, ((x / rect.width) - 0.5) * 7);
      hero.style.setProperty('--headline-rotate-x', `${rotateX}deg`);
      hero.style.setProperty('--headline-rotate-y', `${rotateY}deg`);
    };

    const enter = () => setCursorVisible(true);
    const leave = () => {
      setCursorVisible(false);
      hero.style.setProperty('--pointer-x', '50%');
      hero.style.setProperty('--pointer-y', '50%');
      hero.style.setProperty('--headline-rotate-x', '0deg');
      hero.style.setProperty('--headline-rotate-y', '0deg');
    };

    hero.addEventListener('pointermove', handleMove);
    hero.addEventListener('pointerenter', enter);
    hero.addEventListener('pointerleave', leave);

    return () => {
      hero.removeEventListener('pointermove', handleMove);
      hero.removeEventListener('pointerenter', enter);
      hero.removeEventListener('pointerleave', leave);
    };
  }, [compact, reducedMotion]);

  if (compact) {
    return (
      <section className="hero hero-compact">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="container hero-inner">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow light">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="hero-body">{body}</p>
            <div className="hero-actions">
              <Link className="button button-light" href={primaryHref}>{primary}<ArrowUpRight size={17} /></Link>
              <Link className="button button-ghost-light" href={secondaryHref}>{secondary}</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const scrollNext = () => {
    const next = heroRef.current?.nextElementSibling;
    if (next instanceof HTMLElement) {
      next.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const handleCtaMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || !ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
    gsap.to(ctaRef.current, { x, y, duration: 0.34, ease: 'power3.out', overwrite: true });
  };

  const resetCta = () => {
    if (!ctaRef.current) return;
    gsap.to(ctaRef.current, { x: 0, y: 0, duration: 0.5, ease: 'power3.out', overwrite: true });
  };

  return (
    <section ref={heroRef} className={styles.hero} aria-label="BRAINTEK introduction">
      <LandscapeExperience reducedMotion={reducedMotion} />
      <div className={styles.topShade} aria-hidden="true" />
      <div className={styles.centerVeil} aria-hidden="true" />
      <div className={styles.edgeShade} aria-hidden="true" />
      <div className={styles.pointerGlow} aria-hidden="true" />

      <div className={styles.content}>
        <div
          className={`${styles.headlineInteractive}${headlineHover ? ` ${styles.isHeadlineHover}` : ''}`}
          onPointerEnter={() => setHeadlineHover(true)}
          onPointerLeave={() => setHeadlineHover(false)}
        >
          <h1 className={styles.headline} aria-label={SIGNATURE_HEADLINE}>
            <span className={styles.lineMask}>
              <span data-hero-line>Intelligence that moves</span>
            </span>
            <span className={styles.lineMask}>
              <span data-hero-line>institutions forward.</span>
            </span>
          </h1>

          <div className={styles.headlineOverlay} aria-hidden="true">
            <span className={styles.lineMask}><span>Intelligence that moves</span></span>
            <span className={styles.lineMask}><span>institutions forward.</span></span>
          </div>
        </div>

        <div className={styles.ctaWrap} data-hero-cta>
          <Link
            ref={ctaRef}
            className={styles.cta}
            href={secondaryHref || '/services'}
            onPointerMove={handleCtaMove}
            onPointerLeave={resetCta}
            onBlur={resetCta}
          >
            <span>Explore BRAINTEK</span>
            <span className={styles.ctaArrow} aria-hidden="true"><ArrowUpRight size={16} /></span>
          </Link>
        </div>
      </div>

      {!reducedMotion && (
        <div
          ref={cursorRef}
          className={`${styles.cursor}${cursorVisible ? ` ${styles.cursorVisible}` : ''}${headlineHover ? ` ${styles.cursorActive}` : ''}`}
          aria-hidden="true"
        >
          <span>{headlineHover ? 'MOVE' : 'BRAIN'}</span>
        </div>
      )}

      <button
        type="button"
        className={styles.scrollCue}
        onClick={scrollNext}
        aria-label="Scroll to the next section"
        data-hero-scroll
      >
        <ArrowDown size={15} />
      </button>
    </section>
  );
}
