'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './HomeServices.module.css';

type ServiceItem = {
  slug: string;
  name: string;
  summary?: string | null;
  pillar?: string | null;
};

type HomeServicesProps = {
  services: ServiceItem[];
};

export function HomeServices({ services }: HomeServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-services-intro]',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        '[data-service-row]',
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.68,
          stagger: 0.065,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-service-list]',
            start: 'top 84%',
            once: true,
          },
        },
      );

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.08, yPercent: -2 },
          {
            scale: 1.02,
            yPercent: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const spotY =
    services.length <= 1 ? 64 : 54 + (activeIndex / Math.max(services.length - 1, 1)) * 28;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="home-services-title"
      style={{ '--service-spot-y': `${spotY}%` } as CSSProperties}
    >
      <div className={styles.media} aria-hidden="true">
        <Image
          ref={imageRef}
          src="/services-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className={styles.bgImage}
        />
      </div>

      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={styles.gridTexture} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker} data-services-intro>
              Core Services
            </p>

            <h2 id="home-services-title" data-services-intro>
              Focused capabilities for real institutional work.
            </h2>
          </div>

          <div className={styles.headerAside}>
            <p data-services-intro>
              A concise view of the capabilities BRAINTEK brings together across protection,
              systems, AI and workforce development.
            </p>

            <Link className={styles.allLink} href="/services" data-services-intro>
              <span>Explore all services</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </header>

        <div className={styles.list} data-service-list>
          {services.slice(0, 6).map((service, index) => (
            <Link
              href={`/services/${service.slug}`}
              className={`${styles.row}${activeIndex === index ? ` ${styles.active}` : ''}`}
              key={service.slug}
              data-service-row
              onPointerEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>

              <span className={styles.pillar}>
                {service.pillar || 'BRAINTEK capability'}
              </span>

              <h3>{service.name}</h3>

              <span className={styles.summary}>
                {service.summary || 'Explore this BRAINTEK capability and its practical application.'}
              </span>

              <span className={styles.arrow} aria-hidden="true">
                <ArrowUpRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
