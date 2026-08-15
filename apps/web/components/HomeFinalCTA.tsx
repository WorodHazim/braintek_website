'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import styles from './HomeFinalCTA.module.css';

export function HomeFinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !panelRef.current || typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const panel = panelRef.current;

    if (reducedMotion) {
      panel.style.opacity = '1';
      panel.style.visibility = 'visible';
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // The panel is fixed behind the rest of the homepage. It only becomes
      // visible when the final spacer reaches the viewport, so no blue layer
      // leaks through earlier transparent areas.
      gsap.set(panel, { autoAlpha: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => gsap.set(panel, { autoAlpha: 1 }),
        onEnterBack: () => gsap.set(panel, { autoAlpha: 1 }),
        onLeaveBack: () => gsap.set(panel, { autoAlpha: 0 }),
        onLeave: () => gsap.set(panel, { autoAlpha: 0 }),
      });

      // Content reveals gently while the previous section moves away like a curtain.
      gsap.fromTo(
        '[data-final-line]',
        { yPercent: 42, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 92%',
            end: 'top 34%',
            scrub: 0.7,
          },
        },
      );

      gsap.fromTo(
        '[data-final-meta]',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
            end: 'top 38%',
            scrub: 0.65,
          },
        },
      );

      gsap.fromTo(
        '[data-final-grid]',
        { yPercent: 3 },
        {
          yPercent: -2,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      );

      gsap.to('[data-final-orbit]', {
        yPercent: -5,
        rotate: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} home-final-reveal-anchor`}
      aria-labelledby="home-final-cta-title"
    >
      <div ref={panelRef} className={styles.panel}>
        <div className={styles.grid} data-final-grid aria-hidden="true" />
        <div className={styles.orbit} data-final-orbit aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.edgeGlow} aria-hidden="true" />

        <div className={`container ${styles.inner}`}>
          <div className={styles.kickerWrap} data-final-meta>
            <p>Start a conversation</p>
            <span />
          </div>

          <h2 id="home-final-cta-title" className={styles.headline}>
            <span className={styles.mask}><span data-final-line>Build smarter systems.</span></span>
            <span className={styles.mask}><span data-final-line>Protect what matters.</span></span>
            <span className={styles.mask}><span data-final-line>Strengthen capability.</span></span>
          </h2>

          <div className={styles.bottom} data-final-meta>
            <p>
              Move from intention to implementation with a partner that connects security,
              systems and people.
            </p>

            <Link className={styles.button} href="/contact">
              <span>Book a Consultation</span>
              <span className={styles.buttonIcon} aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </div>

          <div className={styles.signature} data-final-meta aria-hidden="true">
            <span>SECURITY</span>
            <i />
            <span>SYSTEMS</span>
            <i />
            <span>CAPABILITY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
