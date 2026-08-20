import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './BluePageCTA.module.css';

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export function BluePageCTA({
  eyebrow = 'Next step',
  title,
  body,
  buttonLabel = 'Request a Strategic Consultation',
  buttonHref = '/contact',
}: Props) {
  return (
    <section className={`${styles.section} brand-conversion-section`}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className={styles.aside}>
          {body ? <p>{body}</p> : null}
          <Link href={buttonHref} className={styles.button}>
            {buttonLabel}<ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
