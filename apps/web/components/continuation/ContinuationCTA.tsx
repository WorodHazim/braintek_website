import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './ContinuationCTA.module.css';

export function ContinuationCTA({ eyebrow='Next step', title, body, button='Request a Strategic Consultation', href='/contact' }:{ eyebrow?:string; title:string; body?:string; button?:string; href?:string }){
  return <section className={styles.section}>
    <div className={styles.grid} aria-hidden="true" />
    <div className={`container ${styles.inner}`}>
      <div><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2></div>
      <div className={styles.aside}>{body&&<p>{body}</p>}<Link href={href}>{button}<ArrowUpRight size={16}/></Link></div>
    </div>
  </section>
}
