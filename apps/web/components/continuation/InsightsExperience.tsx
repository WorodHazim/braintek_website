'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  FileText,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { ContinuationHero } from './ContinuationHero';
import styles from './InsightsExperience.module.css';

type SectorTag =
  | string
  | {
      slug?: string | null;
      name?: string | null;
      title?: string | null;
    };

type Resource = {
  slug: string;
  title: string;
  summary?: string | null;
  category?: string | null;
  format?: string | null;
  coverUrl?: string | null;
  publishDate?: string | null;
  publish_date?: string | null;
  featured?: boolean | null;
  featured_flag?: boolean | null;
  sectors?: SectorTag[] | null;
  sectorTags?: SectorTag[] | null;
};

type InsightsExperienceProps = {
  resources?: Resource[];
};

const categoryLabels: Record<string, string> = {
  ai_strategy: 'AI Strategy & Transformation',
  automation: 'Workflow Automation',
  psychometric_capability: 'Workforce Capability',
  training_development: 'Training & Development',
  institutional_excellence: 'Institutional Excellence',
  responsible_ai: 'Responsible AI',
};

const formatLabels: Record<string, string> = {
  article: 'Article',
  guide: 'Guide',
  white_paper: 'White Paper',
  checklist: 'Checklist',
  brief: 'Executive Brief',
  download: 'Download',
};

const localCovers = [
  {
    match: ['ai integration', 'consistency in work'],
    src: '/home/insights/ai-integration-consistency.jpg',
  },
  {
    match: ['psychometric', 'informed training'],
    src: '/home/insights/psychometric-informed-training.jpg',
  },
  {
    match: ['sustainable productivity', 'intelligent automation'],
    src: '/home/insights/sustainable-productivity-automation.jpg',
  },
  {
    match: ['human capability', 'digital transformation'],
    src: '/home/insights/human-capability-digital-transformation.jpg',
  },
  {
    match: ['responsible', 'practical ai'],
    src: '/home/insights/responsible-practical-ai.jpg',
  },
  {
    match: ['training for performance', 'not for formality'],
    src: '/home/insights/training-for-performance.jpg',
  },
  {
    match: ['ai readiness checklist', 'readiness checklist'],
    src: '/home/insights/ai-readiness-checklist.jpg',
  },
  {
    match: ['workflow automation opportunity map', 'automation opportunity map'],
    src: '/home/insights/workflow-automation-opportunity-map.jpg',
  },
];

function normalized(value: string | null | undefined) {
  return (value || '').trim().toLowerCase();
}

function pretty(value: string | null | undefined, labels: Record<string, string>) {
  if (!value) return '';

  const key = normalized(value).replace(/\s+/g, '_');

  return (
    labels[key] ||
    value
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

function localCoverFor(resource: Resource) {
  const haystack = `${resource.title} ${resource.category || ''}`.toLowerCase();

  return localCovers.find((item) =>
    item.match.some((token) => haystack.includes(token)),
  )?.src;
}

function sectorNames(resource: Resource) {
  const source = resource.sectors || resource.sectorTags || [];

  return source
    .map((item) => {
      if (typeof item === 'string') return item;
      return item.name || item.title || item.slug || '';
    })
    .filter(Boolean);
}

function Cover({
  resource,
  index,
}: {
  resource: Resource;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const src = resource.coverUrl || localCoverFor(resource);

  return (
    <div className={styles.cover}>
      {src && !failed ? (
        <img
          src={src}
          alt=""
          loading={index < 6 ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={styles.fallback} aria-hidden="true">
          <span />
          <span />
          <span />
          <FileText size={44} strokeWidth={1.1} />
        </div>
      )}

      <div className={styles.coverOverlay} aria-hidden="true" />
      <span className={styles.number}>
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  );
}

export function InsightsExperience({
  resources = [],
}: InsightsExperienceProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [format, setFormat] = useState('all');
  const [sector, setSector] = useState('all');

  const categories = useMemo(
    () =>
      Array.from(
        new Set(resources.map((item) => item.category).filter(Boolean)),
      ) as string[],
    [resources],
  );

  const formats = useMemo(
    () =>
      Array.from(
        new Set(resources.map((item) => item.format).filter(Boolean)),
      ) as string[],
    [resources],
  );

  const sectors = useMemo(
    () =>
      Array.from(
        new Set(resources.flatMap((item) => sectorNames(item))),
      ).sort((a, b) => a.localeCompare(b)),
    [resources],
  );

  const filtered = useMemo(() => {
    const search = normalized(query);

    return resources.filter((resource) => {
      const matchesSearch =
        !search ||
        `${resource.title} ${resource.summary || ''} ${resource.category || ''} ${resource.format || ''}`
          .toLowerCase()
          .includes(search);

      const matchesCategory =
        category === 'all' ||
        normalized(resource.category) === normalized(category);

      const matchesFormat =
        format === 'all' ||
        normalized(resource.format) === normalized(format);

      const matchesSector =
        sector === 'all' ||
        sectorNames(resource).some(
          (value) => normalized(value) === normalized(sector),
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFormat &&
        matchesSector
      );
    });
  }, [resources, query, category, format, sector]);

  const hasFilters =
    !!query ||
    category !== 'all' ||
    format !== 'all' ||
    sector !== 'all';

  const clearFilters = () => {
    setQuery('');
    setCategory('all');
    setFormat('all');
    setSector('all');
  };

  return (
    <main className={styles.page}>
      <ContinuationHero
        eyebrow="Insights & Resources"
        title="Applied thinking for institutions navigating transformation."
        body="BRAINTEK perspectives connect AI, automation, workforce capability, governance and institutional performance to practical implementation questions."
        primaryLabel="Explore insights"
        primaryHref="#knowledge-library"
        secondaryLabel="Request a consultation"
        secondaryHref="/contact"
      />

      <section
        id="page-content"
        className={styles.library}
        aria-labelledby="knowledge-library"
      >
        <div className={`container ${styles.libraryHead}`}>
          <div>
            <p className={styles.kicker}>Knowledge library</p>
            <h2 id="knowledge-library">
              Find the perspective that matches the question.
            </h2>
          </div>

          <div className={styles.count}>
            <strong>{filtered.length}</strong>
            <span>{filtered.length === 1 ? 'resource' : 'resources'}</span>
          </div>
        </div>

        <div className={`container ${styles.toolbar}`}>
          <label className={styles.search}>
            <Search size={17} />
            <span className="sr-only">Search insights and resources</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search insights and resources"
            />
          </label>

          <div className={styles.selectWrap}>
            <SlidersHorizontal size={15} aria-hidden="true" />
            <select
              value={format}
              onChange={(event) => setFormat(event.target.value)}
              aria-label="Filter by format"
            >
              <option value="all">All formats</option>
              {formats.map((item) => (
                <option key={item} value={item}>
                  {pretty(item, formatLabels)}
                </option>
              ))}
            </select>
          </div>

          {sectors.length ? (
            <div className={styles.selectWrap}>
              <select
                value={sector}
                onChange={(event) => setSector(event.target.value)}
                aria-label="Filter by sector"
              >
                <option value="all">All sectors</option>
                {sectors.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {hasFilters ? (
            <button
              type="button"
              className={styles.clear}
              onClick={clearFilters}
            >
              <X size={15} />
              Clear filters
            </button>
          ) : null}
        </div>

        <div className={`container ${styles.categoryBar}`}>
          <button
            type="button"
            className={category === 'all' ? styles.activeCategory : ''}
            onClick={() => setCategory('all')}
          >
            All topics
          </button>

          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? styles.activeCategory : ''}
              onClick={() => setCategory(item)}
            >
              {pretty(item, categoryLabels)}
            </button>
          ))}
        </div>

        {filtered.length ? (
          <div className={`container ${styles.grid}`}>
            {filtered.map((resource, index) => (
              /*
               * Intentionally using a normal <a> here rather than next/link.
               * This forces a real navigation to /insights-resources/[slug]
               * and avoids stale Turbopack client-router state.
               */
              <a
                href={`/insights-resources/${encodeURIComponent(resource.slug)}`}
                className={styles.card}
                key={resource.slug}
              >
                <Cover resource={resource} index={index} />

                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <span>
                      {pretty(resource.category, categoryLabels) || 'Insight'}
                    </span>
                    <i />
                    <span>
                      {pretty(resource.format, formatLabels) || 'Article'}
                    </span>
                  </div>

                  <h3>{resource.title}</h3>

                  {resource.summary ? <p>{resource.summary}</p> : null}

                  <span className={styles.read}>
                    Read {pretty(resource.format, formatLabels).toLowerCase() || 'insight'}
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className={`container ${styles.empty}`}>
            <p>No resources match the selected filters.</p>
            <button type="button" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className={styles.perspective}>
        <div className={`container ${styles.perspectiveInner}`}>
          <p className={styles.kickerLight}>BRAINTEK perspective</p>

          <div>
            <h2>
              Systems and people should be designed to reinforce one another.
            </h2>
            <p>
              Our published thinking focuses on practical institutional questions:
              how intelligent systems should be introduced, how work should be
              redesigned, how people should be prepared, and how progress can be
              sustained.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <p>Turn insight into action</p>
            <h2>Move from a useful idea to a practical implementation pathway.</h2>
          </div>

          <Link href="/contact">
            Book a Consultation
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
