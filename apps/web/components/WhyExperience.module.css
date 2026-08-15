'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { EditorialPageHero } from './EditorialPageHero';
import { BluePageCTA } from './BluePageCTA';
import styles from './PlatformsExperience.module.css';

type CmsPage = { hero_title: string; hero_subtitle?: string | null };
type Product = { slug:string; name:string; category:string; summary:string; merits:string[]; audience:string; status?:string; screenshotUrls?:string[] };

const localImages: Record<string,string> = {
  pytest:'/home/platforms/pytest.jpg', ailex:'/home/platforms/ailex.jpg', scheduler:'/home/platforms/scheduler.jpg', skoolee:'/home/platforms/skoolee.jpg', opspilot:'/home/platforms/opspilot.jpg', sentinelshield:'/home/platforms/sentinelshield.jpg',
};

export function PlatformsExperience({ page, products }: { page: CmsPage; products: Product[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reveal = Array.from(document.querySelectorAll<HTMLElement>('[data-platform-reveal]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) reveal.forEach((el) => (el.dataset.visible='true'));
    const revealObserver = reduce ? null : new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) return; (entry.target as HTMLElement).dataset.visible='true'; revealObserver?.unobserve(entry.target); }), {threshold:.12,rootMargin:'0px 0px -8% 0px'});
    reveal.forEach((el) => revealObserver?.observe(el));

    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-platform-card]'));
    const cardObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((e)=>e.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top-innerHeight*.22)-Math.abs(b.boundingClientRect.top-innerHeight*.22));
      if (visible[0]) setActive(Number((visible[0].target as HTMLElement).dataset.index || 0));
    }, {threshold:.48,rootMargin:'-12% 0px -35% 0px'});
    cards.forEach((el)=>cardObserver.observe(el));
    return()=>{revealObserver?.disconnect();cardObserver.disconnect();};
  },[]);

  const title = page.hero_title === 'Structured Platforms for Security, Capability, and Institutional Performance'
    ? 'Platforms built for real institutional work.' : page.hero_title;

  return <main id="main-content" className={styles.page}>
    <EditorialPageHero variant="platforms" eyebrow="Platforms & Products" title={title} body={page.hero_subtitle} secondaryLabel="Explore the portfolio" secondaryHref="#platform-portfolio" />

    <section id="platform-portfolio" className={styles.portfolio}>
      <div className={`container ${styles.layout}`}>
        <aside className={styles.stickyIntro} data-platform-reveal>
          <p className={styles.kicker}>Portfolio logic</p>
          <h2>Purpose-built platforms. Clear institutional use.</h2>
          <p>A focused product layer for assessment, leadership readiness, academic operations, workflow orchestration and digital protection.</p>
          <div className={styles.counter}><span>{String(active+1).padStart(2,'0')}</span><i/><span>{String(products.length).padStart(2,'0')}</span></div>
        </aside>

        <div className={styles.cards}>
          {products.map((product,index)=>{
            const image = product.screenshotUrls?.[0] || localImages[product.slug] || '';
            return <article key={product.slug} data-platform-card data-index={index} className={`${styles.card}${active===index?` ${styles.cardActive}`:''}`} data-platform-reveal>
              <div className={styles.cardMeta}><span>{String(index+1).padStart(2,'0')}</span><p>{product.category}</p>{product.status?<b>{product.status}</b>:null}</div>
              <div className={styles.cardGrid}>
                <div className={styles.cardCopy}>
                  <h3>{product.name}</h3>
                  <p>{product.summary}</p>
                  <Link href={`/platforms-products/${product.slug}`}>Explore {product.name} <ArrowUpRight size={15}/></Link>
                </div>
                <div className={styles.preview} style={{'--product-image':image?`url("${image}")`:'none'} as CSSProperties}>
                  <div className={styles.previewFrame}><span/><span/><span/></div>
                  <div className={styles.previewGrid}/>
                </div>
              </div>
              <div className={styles.merits}>{product.merits.slice(0,4).map((merit,i)=><div key={merit}><span>0{i+1}</span><p>{merit}</p></div>)}</div>
            </article>;
          })}
        </div>
      </div>
    </section>

    <BluePageCTA title="Explore the platform architecture that fits your institution." body="Discuss assessment, leadership readiness, academic operations, workflow automation or cybersecurity requirements with BRAINTEK." />
  </main>;
}
