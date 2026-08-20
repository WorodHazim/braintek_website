'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
} from 'motion/react';
import {
  useEffect,
  useState,
} from 'react';
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

const slides = [
  {
    image: '/home/hero/hero-01.jpg',
    fallback: '/home/sectors/government-public-institutions.jpg',
    titleTop: 'Secure what matters.',
    titleBottom: 'Move with confidence.',
    cta: 'Explore cybersecurity',
    href: '/services',
  },
  {
    image: '/home/hero/hero-02.jpg',
    fallback: '/home/sectors/institutional-service-operations.jpg',
    titleTop: 'Intelligence built into',
    titleBottom: 'the way you work.',
    cta: 'Explore systems & AI',
    href: '/services',
  },
  {
    image: '/home/hero/hero-03.jpg',
    fallback: '/home/sectors/education-academic-institutions.jpg',
    titleTop: 'Human insight.',
    titleBottom: 'Measurable capability.',
    cta: 'Explore human capability',
    href: '/services',
  },
];

function HeroImage({
  src,
  fallback,
}: {
  src: string;
  fallback: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const current = failedSrc === src ? fallback : src;

  return (
    <img
      src={current}
      alt=""
      draggable={false}
      onError={() => {
        if (current !== fallback) setFailedSrc(src);
      }}
    />
  );
}

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
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    if (compact || reducedMotion || paused) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6800);

    return () => window.clearInterval(timer);
  }, [compact, reducedMotion, paused]);

  if (compact) {
    return (
      <section className="hero hero-compact">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow light">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="hero-body">{body}</p>

            <div className="hero-actions">
              <Link className="button button-light" href={primaryHref}>
                {primary}
                <ArrowUpRight size={17} />
              </Link>

              <Link
                className="button button-ghost-light"
                href={secondaryHref}
              >
                {secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const current = slides[active];

  const previous = () =>
    setActive((value) => (value - 1 + slides.length) % slides.length);

  const next = () =>
    setActive((value) => (value + 1) % slides.length);

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="BRAINTEK introduction"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.media}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={current.image}
            className={styles.slideImage}
            initial={
              reducedMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    scale: 1.03,
                    clipPath: 'inset(0 0 0 9%)',
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              clipPath: 'inset(0 0 0 0%)',
            }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 1.01,
                    clipPath: 'inset(0 9% 0 0)',
                  }
            }
            transition={{
              duration: reducedMotion ? 0 : 1.05,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <HeroImage src={current.image} fallback={current.fallback} />
          </motion.div>
        </AnimatePresence>

        <div className={styles.imageTone} aria-hidden="true" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          className={styles.content}
          key={active}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.42,
            delay: reducedMotion ? 0 : 0.12,
          }}
        >
          <motion.span
            className={styles.accent}
            initial={reducedMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 0.55,
              delay: reducedMotion ? 0 : 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          <h1 aria-label={`${current.titleTop} ${current.titleBottom}`}>
            <span className={styles.titleMask}>
              <motion.span
                initial={reducedMotion ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.72,
                  delay: reducedMotion ? 0 : 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {current.titleTop}
              </motion.span>
            </span>

            <span className={styles.titleMask}>
              <motion.span
                initial={reducedMotion ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.74,
                  delay: reducedMotion ? 0 : 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {current.titleBottom}
              </motion.span>
            </span>
          </h1>

          <motion.div
            className={styles.actionRow}
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.48,
              delay: reducedMotion ? 0 : 0.42,
            }}
          >
            <Link className={styles.cta} href={current.href}>
              <span>{current.cta}</span>
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className={styles.sliderUi}>
        <div className={styles.dots} aria-label="Hero slides">
          {slides.map((slide, index) => (
            <button
              key={`${slide.titleTop}-${index}`}
              type="button"
              className={index === active ? styles.dotActive : ''}
              onClick={() => setActive(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === active ? 'true' : undefined}
            >
              <span />
            </button>
          ))}
        </div>

        <div className={styles.controls}>
          <button type="button" onClick={previous} aria-label="Previous hero slide">
            <ArrowLeft size={15} />
            <span>Prev</span>
          </button>
          <i aria-hidden="true" />
          <button type="button" onClick={next} aria-label="Next hero slide">
            <span>Next</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
