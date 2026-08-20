'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import styles from './HomeInsights.module.css';

type Resource = {
  slug: string;
  title: string;
  summary?: string | null;
  category?: string | null;
  format?: string | null;
  coverUrl?: string | null;
};

type HomeInsightsProps = {
  resources: Resource[];
};

const localCovers = [
  { match: ['ai integration', 'consistency in work'], src: '/home/insights/ai-integration-consistency.jpg' },
  { match: ['psychometric', 'training'], src: '/home/insights/psychometric-informed-training.jpg' },
  { match: ['sustainable productivity', 'intelligent automation'], src: '/home/insights/sustainable-productivity-automation.jpg' },
  { match: ['human capability', 'digital transformation'], src: '/home/insights/human-capability-digital-transformation.jpg' },
  { match: ['responsible', 'practical ai'], src: '/home/insights/responsible-practical-ai.jpg' },
  { match: ['training for performance', 'formality'], src: '/home/insights/training-for-performance.jpg' },
  { match: ['ai readiness'], src: '/home/insights/ai-readiness-checklist.jpg' },
  { match: ['workflow automation opportunity'], src: '/home/insights/workflow-automation-opportunity-map.jpg' },
];

function localCoverFor(resource: Resource) {
  const haystack = `${resource.title} ${resource.category || ''}`.toLowerCase();
  return localCovers.find((item) => item.match.some((token) => haystack.includes(token)))?.src;
}

function InsightCover({ resource, index }: { resource: Resource; index: number }) {
  const [failed, setFailed] = useState(false);
  const src = resource.coverUrl || localCoverFor(resource);

  return (
    <div className={styles.cover}>
      {src && !failed ? (
        <img
          src={src}
          alt=""
          loading={index < 3 ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={`${styles.fallback} ${styles[`fallback${(index % 3) + 1}`]}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
      <div className={styles.coverGrid} aria-hidden="true" />
      <div className={styles.coverOverlay} aria-hidden="true" />
      <span className={styles.coverIndex}>{String(index + 1).padStart(2, '0')}</span>
    </div>
  );
}

export function HomeInsights({ resources }: HomeInsightsProps) {
  const items = resources.filter(Boolean);

  return (
    <section className={styles.section} aria-labelledby="home-insights-title">
      <div className={`container ${styles.intro}`}>
        <div className={styles.headingSide}>
          <p className={styles.kicker}>Resources &amp; insights</p>
          <h2 id="home-insights-title">
            Applied thinking for leaders navigating transformation.
          </h2>
        </div>

        <div className={styles.introAside}>
          <p>
            Explore BRAINTEK perspectives on AI, automation, workforce
            capability and institutional performance.
          </p>

          <Link href="/insights-resources" className={styles.allLink}>
            View all insights <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className={`container ${styles.grid}`}>
        {items.map((resource, index) => (
          <Link
            key={resource.slug}
            href={`/insights-resources/${resource.slug}`}
            className={styles.card}
          >
            <InsightCover resource={resource} index={index} />

            <div className={styles.content}>
              <div className={styles.meta}>
                <span>{resource.category || 'Insight'}</span>
                <i />
                <span>{resource.format || 'Article'}</span>
              </div>

              <h3>{resource.title}</h3>

              {resource.summary ? <p>{resource.summary}</p> : null}

              <span className={styles.readLink}>
                Read insight <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
