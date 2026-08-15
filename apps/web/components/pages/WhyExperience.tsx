'use client';

import { useEffect } from 'react';
import { EditorialPageHero } from './EditorialPageHero';
import { BluePageCTA } from './BluePageCTA';
import styles from './WhyExperience.module.css';

type CmsPage = { hero_title:string; hero_subtitle?:string|null };

const valueCards = [
  ['Protect', 'Operational trust', 'Strengthen digital trust through cybersecurity, monitoring, readiness and dependable protection practices.'],
  ['Build', 'Operational intelligence', 'Design systems, automation and AI-enabled workflows that fit actual institutional operations.'],
  ['Empower', 'Human capability', 'Strengthen leaders and teams through evidence-informed development, AI readiness and role-relevant growth.'],
];

export function WhyExperience({ page, whyPoints }: { page:CmsPage; whyPoints:readonly (readonly [string,string])[] }) {
  useEffect(()=>{
    const els=Array.from(document.querySelectorAll<HTMLElement>('[data-why-reveal]'));
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){els.forEach((el)=>el.dataset.visible='true');return;}
    const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(!entry.isIntersecting)return;(entry.target as HTMLElement).dataset.visible='true';observer.unobserve(entry.target);}),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
    els.forEach((el)=>observer.observe(el));return()=>observer.disconnect();
  },[]);

  const title = page.hero_title === 'Why leading institutions choose BRAINTEK'
    ? 'Why institutions choose a connected model.' : page.hero_title;

  return <main id="main-content" className={styles.page}>
    <EditorialPageHero variant="why" eyebrow="Why BRAINTEK" title={title} body={page.hero_subtitle} secondaryLabel="Explore our services" secondaryHref="/services" />

    <section className={styles.difference}>
      <div className={`container ${styles.differenceGrid}`}>
        <div data-why-reveal>
          <p className={styles.kicker}>The difference</p>
          <h2>Transformation breaks down when its parts are managed separately.</h2>
        </div>
        <div className={styles.notList}>
          <article data-why-reveal><span>01</span><h3>Not just protection.</h3><p>Cybersecurity works best when it is aligned to the operation it protects.</p></article>
          <article data-why-reveal><span>02</span><h3>Not just systems.</h3><p>Technology creates value when people can adopt, govern and sustain it.</p></article>
          <article data-why-reveal><span>03</span><h3>Not just training.</h3><p>Capability development matters when it is connected to real roles and measurable need.</p></article>
          <div className={styles.connection} data-why-reveal>BRAINTEK connects all three.</div>
        </div>
      </div>
    </section>

    <section className={styles.reasons}>
      <div className={`container ${styles.reasonsHeader}`} data-why-reveal>
        <p className={styles.kicker}>Core advantages</p>
        <h2>Eight reasons the integrated model creates stronger institutional value.</h2>
      </div>
      <div className={`container ${styles.reasonsGrid}`}>
        {whyPoints.map(([title,text],index)=><article key={title} data-why-reveal><span>{String(index+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
      </div>
    </section>

    <section className={styles.clientValue}>
      <div className={`container ${styles.clientHeader}`} data-why-reveal><p className={styles.kicker}>Client value</p><h2>Protect confidently. Build intelligently. Develop sustainably.</h2></div>
      <div className={styles.valueGrid}>
        {valueCards.map(([verb,title,text],index)=><article key={verb} data-why-reveal><div className={styles.valueTop}><span>0{index+1}</span><i/></div><p className={styles.verb}>{verb}</p><h3>{title}</h3><p>{text}</p><div className={styles.orbit} aria-hidden="true"/></article>)}
      </div>
    </section>

    <BluePageCTA title="Choose a transformation partner that understands security, systems and people." body="Move from intention to implementation with a structured BRAINTEK consultation." />
  </main>;
}
