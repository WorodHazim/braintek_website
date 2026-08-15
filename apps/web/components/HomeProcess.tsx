'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HomeProcess.module.css';

const steps = [
  {
    number: '01',
    verb: 'Diagnose',
    eyebrow: 'Understand the real condition',
    text: 'Clarify the operating environment, risks, constraints and capability gaps before deciding what should change.',
    focus: 'Context, exposure and capability',
  },
  {
    number: '02',
    verb: 'Secure',
    eyebrow: 'Strengthen the foundation',
    text: 'Address protection, control maturity and implementation risk so transformation starts from a more resilient base.',
    focus: 'Protection and operational trust',
  },
  {
    number: '03',
    verb: 'Design',
    eyebrow: 'Shape the right solution',
    text: 'Translate institutional priorities into practical systems, workflows, governance and capability requirements.',
    focus: 'Architecture and operating logic',
  },
  {
    number: '04',
    verb: 'Implement',
    eyebrow: 'Put the model into operation',
    text: 'Build, configure and introduce the solution around real users, processes and institutional operating conditions.',
    focus: 'Delivery and integration',
  },
  {
    number: '05',
    verb: 'Enable',
    eyebrow: 'Prepare people to sustain it',
    text: 'Equip leaders and teams with the guidance, capability and operating clarity needed to adopt and own the change.',
    focus: 'Adoption and capability',
  },
  {
    number: '06',
    verb: 'Evaluate',
    eyebrow: 'Measure, refine and improve',
    text: 'Review outcomes, identify what needs refinement and create a stronger basis for the next cycle of institutional progress.',
    focus: 'Evidence and continuous improvement',
  },
] as const;

export function HomeProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.82;
      const end = viewport * 0.22;
      const travel = Math.max(rect.height + start - end, 1);
      const progress = Math.min(1, Math.max(0, (start - rect.top) / travel));
      const next = Math.min(steps.length - 1, Math.floor(progress * steps.length));

      setActiveIndex((current) => (current === next ? current : next));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const active = steps[activeIndex];

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="home-process-title">
      <div className={`container ${styles.frame}`}>
        <header className={styles.header}>
          <p className={styles.kicker}>How we work</p>
          <div>
            <h2 id="home-process-title">From understanding to measurable progress.</h2>
            <p>
              A disciplined six-stage engagement model that connects protection, systems,
              implementation and human capability.
            </p>
          </div>
        </header>

        <div className={styles.tabs} role="tablist" aria-label="BRAINTEK engagement stages">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className={`${styles.tab}${index === activeIndex ? ` ${styles.activeTab}` : ''}${index < activeIndex ? ` ${styles.completeTab}` : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <span>{step.number}</span>
              <strong>{step.verb}</strong>
            </button>
          ))}
        </div>

        <div className={styles.stage} aria-live="polite">
          <div className={styles.bigNumber} aria-hidden="true">{active.number}</div>

          <div className={styles.activeCopy} key={active.number}>
            <p>{active.eyebrow}</p>
            <h3>{active.verb}</h3>
            <span>{active.text}</span>
          </div>

          <div className={styles.focus}>
            <span>Primary focus</span>
            <strong>{active.focus}</strong>
            <i aria-hidden="true" />
            <small>{active.number} / 06</small>
          </div>
        </div>
      </div>
    </section>
  );
}
