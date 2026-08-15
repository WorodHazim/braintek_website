'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import styles from './HomeAbout.module.css';

export function HomeAbout() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-about-reveal]',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        '[data-about-rule]',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.05,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="home-about-title">
      <div className={`container ${styles.editorial}`}>
        <div className={styles.headingBlock}>
          <p className={styles.kicker} data-about-reveal>
            About BRAINTEK
          </p>

          <h2 id="home-about-title" data-about-reveal>
            Security, systems and people should move as one.
          </h2>
        </div>

        <div className={styles.bodyBlock}>
          <p data-about-reveal>
            BRAINTEK connects digital protection, intelligent systems and workforce capability
            into one coordinated model—helping institutions move from isolated initiatives to
            secure, usable progress.
          </p>

          <Link className={styles.link} href="/about" data-about-reveal>
            <span>Discover BRAINTEK</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className={`container ${styles.bottomRule}`} aria-hidden="true">
        <span data-about-rule />
      </div>
    </section>
  );
}
