import Link from 'next/link';
import type { NewsItem } from '@/lib/marketing-cms';
import styles from './HomeNewsTicker.module.css';

const fallbackItems: NewsItem[] = [
  {
    documentId: 'fallback-1',
    label: 'BRAINTEK',
    headline: 'News, insights and institutional updates',
    link_url: '/insights-resources',
  },
  {
    documentId: 'fallback-2',
    label: 'Explore',
    headline: 'Applied AI, security, systems and capability',
    link_url: '/services',
  },
];

export function HomeNewsTicker({ items }: { items: NewsItem[] }) {
  const source = items.length ? items : fallbackItems;

  return (
    <section className={styles.strip} aria-label="BRAINTEK news and updates">
      <div className={styles.label}>
        <span />
        NEWS &amp; UPDATES
      </div>

      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div className={styles.set} key={copy} aria-hidden={copy === 1}>
              {source.map((item) => {
                const content = (
                  <>
                    <small>{item.label || 'Update'}</small>
                    <strong>{item.headline}</strong>
                    <i aria-hidden="true" />
                  </>
                );

                return item.link_url ? (
                  <Link href={item.link_url} key={`${copy}-${item.documentId}`}>
                    {content}
                  </Link>
                ) : (
                  <span key={`${copy}-${item.documentId}`}>{content}</span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
