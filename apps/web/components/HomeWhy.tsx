import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './HomeWhy.module.css';

const strengths = [
  {
    id: '01',
    verb: 'Protect',
    title: 'Security aligned to real operations.',
    text: 'Protection shaped around the institution, its workflows and the risks that matter.',
  },
  {
    id: '02',
    verb: 'Build',
    title: 'Systems designed around real work.',
    text: 'Technology structured around operational needs so teams can use and sustain it.',
  },
  {
    id: '03',
    verb: 'Empower',
    title: 'Capability connected to real roles.',
    text: 'Development tied to readiness, role requirements and measurable priorities.',
  },
];

export function HomeWhy() {
  return (
    <section className={styles.section} aria-labelledby="home-why-title">
      <div className={`container ${styles.heading}`} data-reveal>
        <p className={styles.kicker}>Why BRAINTEK</p>

        <div className={styles.headingMain}>
          <div>
            <h2 id="home-why-title">
              One model. Three connected advantages.
            </h2>

            <p>
              BRAINTEK connects protection, systems and human capability so
              transformation is easier to operate, adopt and sustain.
            </p>
          </div>

          <Link className={styles.headingLink} href="/about#why-braintek">
            About the BRAINTEK model <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className={`container ${styles.principles}`}>
        {strengths.map((item) => (
          <article className={styles.item} key={item.id} data-reveal>
            <div className={styles.itemMeta}>
              <span>{item.id}</span>
              <strong>{item.verb}</strong>
            </div>

            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className={`container ${styles.footer}`} data-reveal>
        <p>
          <strong>The advantage is the connection.</strong>{' '}
          One coordinated institutional model instead of isolated initiatives.
        </p>
      </div>
    </section>
  );
}
