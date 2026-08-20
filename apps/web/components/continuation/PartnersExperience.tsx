'use client';

import { useMemo, useState } from 'react';
import type { Partner } from '@/lib/content';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';
import styles from './PartnersExperience.module.css';

const localLogos: Record<string, string> = {
  adnoc: '/home/partners/adnoc.png',
  'white mountain technologies':
    '/home/partners/white-mountain-technologies.png',
  mbzuai: '/home/partners/mbzuai.png',
  'abu dhabi university': '/home/partners/abu-dhabi-university.png',
  'liwa university': '/home/partners/liwa-university.png',
  'trends research & advisory':
    '/home/partners/trends-research-advisory.png',
  'trends research and advisory':
    '/home/partners/trends-research-advisory.png',
};

function PartnerLogo({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);
  const src =
    partner.logoUrl ||
    localLogos[partner.name.trim().toLowerCase()];

  return src && !failed ? (
    <img
      src={src}
      alt={`${partner.name} logo`}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
    />
  ) : (
    <span>{partner.name}</span>
  );
}

export function PartnersExperience({
  partners,
}: {
  partners: Partner[];
}) {
  const repeated = useMemo(
    () => [...partners, ...partners, ...partners],
    [partners],
  );

  return (
    <div className="home-v2">
      <section id="partner-ecosystem" className={styles.ecosystem}>
        <div className={styles.pageFrame}>
          <p className={styles.kicker}>Connected ecosystem</p>

          <div className={styles.sectionHeading}>
            <h2>
              Relationships spanning institutions, academia, technology and
              research.
            </h2>

            <p>
              Each relationship is presented at the strength supported by the
              approved source material—without turning potential collaboration
              into unsupported delivery claims.
            </p>
          </div>
        </div>

        <div className={styles.marqueeShell}>
          <div className={styles.edgeLeft} />
          <div className={styles.edgeRight} />

          <div className={styles.track}>
            {repeated.map((partner, index) => (
              <article
                className={styles.mark}
                key={`${partner.name}-${index}`}
                aria-hidden={index >= partners.length || undefined}
              >
                <div className={styles.logo}>
                  <PartnerLogo partner={partner} />
                </div>

                <div className={styles.meta}>
                  <span>{partner.region}</span>
                  <i />
                  <span>{partner.type}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={`${styles.pageFrame} ${styles.marqueeFooter}`}>
          <span>Selected relationships</span>
          <i />
          <span>Hover to pause</span>
        </div>
      </section>

      <section className={styles.relationships}>
        <div className={styles.pageFrame}>
          <p className={styles.kicker}>Relationship context</p>

          <div className={styles.sectionHeading}>
            <h2>Complementary capability, described with restraint.</h2>

            <p>
              BRAINTEK presents each relationship according to the approved
              evidence available, keeping institutional relevance clear without
              overstating implementation or delivery.
            </p>
          </div>

          <div className={styles.grid}>
            {partners.map((partner, index) => (
              <article className={styles.card} key={partner.name}>
                <div className={styles.cardTop}>
                  <span>{String(index + 1).padStart(2, '0')}</span>

                  <div className={styles.cardLogo}>
                    <PartnerLogo partner={partner} />
                  </div>
                </div>

                <p className={styles.type}>
                  {partner.region} / {partner.type}
                </p>

                <p className={styles.description}>
                  {partner.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.model}>
        <div className={styles.pageFrame}>
          <div className={styles.darkHeading}>
            <p className={styles.kickerLight}>Collaboration model</p>

            <div>
              <h2>
                One ecosystem. Different forms of institutional relevance.
              </h2>

              <p>
                Relationships can contribute through institutional alignment,
                academic capability, technology complementarity or research
                and advisory value.
              </p>
            </div>
          </div>

          <div className={styles.modelGrid}>
            {[
              'Institutional alignment',
              'Academic capability',
              'Technology complementarity',
              'Research & advisory',
            ].map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Exact same fixed/curtain CTA used by Home + Expert Team. */}
      <HomeFinalCTA />
    </div>
  );
}
