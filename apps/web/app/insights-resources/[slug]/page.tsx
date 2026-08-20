import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { cms } from '@/lib/cms';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';
import styles from './InsightDetailPage.module.css';

export const dynamic = 'force-dynamic';

type ResourceRecord = {
  slug: string;
  title: string;
  summary?: string | null;
  category?: string | null;
  format?: string | null;
  coverUrl?: string | null;
  publish_date?: string | null;
  publishDate?: string | null;
  content_body?: unknown;
  contentBody?: unknown;
  content?: unknown;
  body?: unknown;
};

type Block = {
  type: 'heading' | 'paragraph' | 'quote' | 'list';
  level?: number;
  text?: string;
  items?: string[];
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

function pretty(value: string | null | undefined) {
  if (!value) return 'Insight';

  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function localCoverFor(resource: ResourceRecord) {
  const haystack = `${resource.title} ${resource.category || ''}`.toLowerCase();

  return localCovers.find((item) =>
    item.match.some((token) => haystack.includes(token)),
  )?.src;
}

function textFromNode(value: unknown): string {
  if (!value) return '';
  if (typeof value === 'string') return value;

  if (Array.isArray(value)) {
    return value.map((item) => textFromNode(item)).join('');
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;

    if (typeof record.text === 'string') return record.text;

    if (record.children) return textFromNode(record.children);
  }

  return '';
}

function blocksFrom(value: unknown): Block[] {
  if (!value) return [];

  if (typeof value === 'string') {
    return value
      .split(/\n{2,}/)
      .map((text) => text.trim())
      .filter(Boolean)
      .map((text) => ({
        type: 'paragraph' as const,
        text,
      }));
  }

  if (!Array.isArray(value)) return [];

  return value
    .map((entry): Block | null => {
      if (!entry || typeof entry !== 'object') return null;

      const record = entry as Record<string, unknown>;
      const type =
        typeof record.type === 'string'
          ? record.type.toLowerCase()
          : 'paragraph';

      if (type === 'heading') {
        return {
          type: 'heading',
          level: typeof record.level === 'number' ? record.level : 2,
          text: textFromNode(record.children),
        };
      }

      if (type === 'quote') {
        return {
          type: 'quote',
          text: textFromNode(record.children),
        };
      }

      if (type === 'list') {
        const children = Array.isArray(record.children)
          ? record.children
          : [];

        return {
          type: 'list',
          items: children
            .map((item) => textFromNode(item))
            .filter(Boolean),
        };
      }

      return {
        type: 'paragraph',
        text: textFromNode(record.children || record),
      };
    })
    .filter((item): item is Block => {
      if (!item) return false;
      return !!item.text || !!item.items?.length;
    });
}

async function getData(slug: string) {
  const resources = (await cms.resources()) as ResourceRecord[];
  const decodedSlug = decodeURIComponent(slug);
  const resource = resources.find((item) => item.slug === decodedSlug);

  if (!resource) return null;

  return { resource, resources };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data) {
    return {
      title: 'Insight | BRAINTEK',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${data.resource.title} | BRAINTEK`,
    description:
      data.resource.summary ||
      `Read ${data.resource.title} from BRAINTEK Insights & Resources.`,
    alternates: {
      canonical: `/insights-resources/${data.resource.slug}`,
    },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data) notFound();

  const { resource, resources } = data;
  const cover = resource.coverUrl || localCoverFor(resource);
  const body =
    resource.content_body ??
    resource.contentBody ??
    resource.content ??
    resource.body;

  const blocks = blocksFrom(body);
  const related = resources
    .filter((item) => item.slug !== resource.slug)
    .sort((a, b) => {
      const aScore = a.category === resource.category ? 1 : 0;
      const bScore = b.category === resource.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, 3);

  return (
    <main id="main-content" className={`home-v2 ${styles.page}`}>
      <section className={styles.hero}>
        {/*
          Keep the CURRENT insight cover as the hero background.
          No new hero image mapping is introduced here.
        */}
        {cover ? (
          <img
            className={styles.heroImage}
            src={cover}
            alt=""
            aria-hidden="true"
          />
        ) : (
          <div className={styles.heroFallback} aria-hidden="true" />
        )}

        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroTop}>
            <Link href="/insights-resources" className={styles.back}>
              <ArrowLeft size={15} />
              Insights & Resources
            </Link>

            <span className={styles.heroTag}>
              {pretty(resource.format || 'Article')}
            </span>
          </div>

          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <div className={styles.meta}>
                <span>{pretty(resource.category)}</span>
                <i />
                <span>BRAINTEK Perspective</span>
              </div>

              <h1>{resource.title}</h1>
            </div>

            <div className={styles.heroAside}>
              <p>
                {resource.summary ||
                  'A practical BRAINTEK perspective on institutional transformation, systems, capability and applied technology.'}
              </p>

              <Link href="/contact" className={styles.heroCta}>
                Discuss this perspective
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.strip} aria-hidden="true">
        <div>
          <span>Applied thinking</span><i />
          <span>Institutional relevance</span><i />
          <span>Practical implementation</span><i />
          <span>Responsible progress</span><i />
          <span>Applied thinking</span><i />
          <span>Institutional relevance</span><i />
          <span>Practical implementation</span><i />
          <span>Responsible progress</span>
        </div>
      </div>

      <section className={styles.article}>
        <div className={`container ${styles.articleShell}`}>
          <div className={styles.sectionKicker}>
            <span>01</span>
            <p>Reading perspective</p>
          </div>

          <div className={styles.articleHeading}>
            <div>
              <p className={styles.categoryLabel}>
                {pretty(resource.category)}
              </p>

              <h2>A practical perspective for institutional decision-making.</h2>
            </div>

            <p>
              BRAINTEK perspectives connect applied AI, automation,
              cybersecurity, capability and governance to practical
              institutional questions rather than abstract technology trends.
            </p>
          </div>

          <div className={styles.articleGrid}>
            <aside>
              <span className={styles.asideNumber}>READ</span>

              <strong>{pretty(resource.category)}</strong>

              <p>
                Use this perspective as a starting point for internal discussion,
                readiness review and implementation planning.
              </p>
            </aside>

            <article className={styles.content}>
              {blocks.length ? (
                blocks.map((block, index) => {
                  if (block.type === 'heading') {
                    return block.level === 3 ? (
                      <h3 key={index}>{block.text}</h3>
                    ) : (
                      <h2 key={index}>{block.text}</h2>
                    );
                  }

                  if (block.type === 'quote') {
                    return <blockquote key={index}>{block.text}</blockquote>;
                  }

                  if (block.type === 'list') {
                    return (
                      <ul key={index}>
                        {block.items?.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    );
                  }

                  return <p key={index}>{block.text}</p>;
                })
              ) : (
                <>
                  <h2>Overview</h2>

                  <p>
                    {resource.summary ||
                      'This resource examines a practical institutional transformation question.'}
                  </p>

                  <p>
                    The full editorial body can be managed through the resource
                    content field in Strapi. This page is prepared to render
                    headings, paragraphs, lists and quotations without changing
                    the public-page layout.
                  </p>
                </>
              )}
            </article>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className={styles.related}>
          <div className={`container ${styles.relatedInner}`}>
            <div className={styles.sectionKicker}>
              <span>02</span>
              <p>Continue reading</p>
            </div>

            <header className={styles.relatedHeader}>
              <h2>Related insights & resources.</h2>

              <p>
                Continue exploring BRAINTEK perspectives that connect
                technology, operating models, governance and human capability.
              </p>
            </header>

            <div className={styles.relatedGrid}>
              {related.map((item, index) => {
                const relatedCover =
                  item.coverUrl || localCoverFor(item);

                return (
                  <Link
                    href={`/insights-resources/${encodeURIComponent(item.slug)}`}
                    className={styles.relatedCard}
                    key={item.slug}
                  >
                    <div className={styles.relatedMedia}>
                      {relatedCover ? (
                        <img
                          src={relatedCover}
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        <div />
                      )}

                      <span className={styles.relatedIndex}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className={styles.relatedCopy}>
                      <p>
                        {pretty(item.category)} /{' '}
                        {pretty(item.format || 'Article')}
                      </p>

                      <h3>{item.title}</h3>

                      <span>
                        Read insight
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/*
        Remove the old electric-blue CTA.
        Use the same fixed / curtain CTA already approved on Home.
      */}
      <HomeFinalCTA />
    </main>
  );
}
