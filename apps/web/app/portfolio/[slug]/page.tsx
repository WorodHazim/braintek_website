import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Quote } from 'lucide-react';
import { fetchCaseStudies } from '@/lib/marketing-cms';
import styles from './PortfolioDetail.module.css';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const items = await fetchCaseStudies();
  const item = items.find((entry) => entry.slug === slug);

  if (!item) {
    return { title: 'Case Study' };
  }

  return {
    title: item.meta_title || item.title,
    description:
      item.meta_description ||
      item.project_summary ||
      `BRAINTEK case study: ${item.title}`,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const items = await fetchCaseStudies();
  const item = items.find((entry) => entry.slug === slug);

  if (!item) notFound();

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.media}>
          {item.coverUrl ? <img src={item.coverUrl} alt="" /> : null}
          <div className={styles.overlay} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <Link href="/portfolio">
            <ArrowLeft size={14} />
            Portfolio
          </Link>
          <p>{item.client_type || 'Case study'}</p>
          <h1>{item.title}</h1>
          {item.project_summary ? <span>{item.project_summary}</span> : null}

          <div className={styles.meta}>
            {item.client_name ? <span><small>Client</small>{item.client_name}</span> : null}
            {item.project_date ? <span><small>Date</small>{item.project_date}</span> : null}
          </div>
        </div>
      </section>

      <section className={`container ${styles.story}`}>
        <aside>
          <p>Case study</p>
          <span>Challenge → Solution → Outcome</span>
        </aside>

        <div>
          {item.challenge ? (
            <article>
              <small>01 / Challenge</small>
              <h2>The institutional context.</h2>
              <p>{item.challenge}</p>
            </article>
          ) : null}

          {item.solution ? (
            <article>
              <small>02 / Solution</small>
              <h2>How the work was approached.</h2>
              <p>{item.solution}</p>
            </article>
          ) : null}

          {item.outcome_summary ? (
            <article>
              <small>03 / Outcome</small>
              <h2>What the engagement produced.</h2>
              <p>{item.outcome_summary}</p>
            </article>
          ) : null}
        </div>
      </section>

      {item.galleryUrls?.length ? (
        <section className={styles.gallery} aria-label="Project imagery">
          {item.galleryUrls.map((url, index) => (
            <figure key={url}>
              <img src={url} alt={`Project image ${index + 1}`} />
            </figure>
          ))}
        </section>
      ) : null}

      {item.client_review ? (
        <section className={styles.review}>
          <div className="container">
            <Quote size={28} />
            <blockquote>{item.client_review}</blockquote>
            {item.client_review_name ? <p>{item.client_review_name}</p> : null}
          </div>
        </section>
      ) : null}

      <section className={styles.next}>
        <div className="container">
          <p>Start a relevant conversation</p>
          <h2>Discuss a similar institutional challenge with BRAINTEK.</h2>
          <Link href="/contact">
            Book a consultation
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
