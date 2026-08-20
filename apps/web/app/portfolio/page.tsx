import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { fetchCaseStudies } from '@/lib/marketing-cms';
import { InstitutionalHero } from '@/components/continuation/InstitutionalHero';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';
import styles from './PortfolioPage.module.css';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Selected BRAINTEK case studies, client-approved project stories and implementation work.',
};

export default async function PortfolioPage() {
  const caseStudies = await fetchCaseStudies();

  return (
    <main id="main-content" className={`home-v2 ${styles.page}`}>
      <InstitutionalHero
        variant="portfolio"
        eyebrow="Portfolio / Case Studies"
        title="Work that can be examined, not just described."
        body="Client-approved project stories showing the challenge, implementation approach, visual evidence and outcomes behind BRAINTEK work."
        modelLabel="Evidence-led project stories"
        rows={[
          { number: '01', title: 'Challenge', note: 'Operating context' },
          { number: '02', title: 'Approach', note: 'Implementation logic' },
          { number: '03', title: 'Evidence', note: 'Approved outcomes' },
        ]}
        primary={{ label: 'Explore selected work', href: '#portfolio-work' }}
        secondary={{ label: 'Discuss an engagement', href: '/contact' }}
      />

      <section id="portfolio-work" className={styles.workSection}>
        <div className={styles.pageFrame}>
          <p className={styles.kicker}>Selected work</p>

          <div className={styles.sectionHeading}>
            <h2>
              Institutional work, published with the right level of evidence.
            </h2>

            <p>
              Portfolio entries are managed in BRAINTEK CMS. Projects only
              appear here after they have been published and approved for
              external presentation.
            </p>
          </div>

          {caseStudies.length ? (
            <div className={styles.grid}>
              {caseStudies.map((item, index) => (
                <Link
                  href={`/portfolio/${item.slug}`}
                  className={styles.card}
                  key={item.documentId}
                >
                  <div className={styles.media}>
                    {item.coverUrl ? (
                      <img src={item.coverUrl} alt="" />
                    ) : (
                      <div className={styles.placeholder}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <strong>BRAINTEK</strong>
                      </div>
                    )}
                  </div>

                  <div className={styles.cardCopy}>
                    <div className={styles.cardMeta}>
                      <small>{item.client_type || 'Case study'}</small>
                      <span>{item.project_date || 'Published work'}</span>
                    </div>

                    <h3>{item.title}</h3>

                    <p>
                      {item.project_summary ||
                        'Open the case study to explore the project context and implementation.'}
                    </p>

                    <strong>
                      View case study
                      <ArrowUpRight size={15} />
                    </strong>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <span>Portfolio publishing</span>

              <div>
                <h3>Case studies are being prepared for publication.</h3>

                <p>
                  BRAINTEK will publish project stories as client-approved
                  material, imagery and case-study evidence become available.
                  No placeholder clients or fabricated project outcomes are
                  shown.
                </p>

                <Link href="/contact">
                  Discuss a relevant engagement
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <HomeFinalCTA />
    </main>
  );
}
