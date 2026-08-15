'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import styles from './HomePartners.module.css';

type Partner = {
  name: string;
  region?: string | null;
  type?: string | null;
  logoUrl?: string | null;
};

type HomePartnersProps = {
  partners: Partner[];
};

const localLogos: Record<string, string> = {
  'adnoc': '/home/partners/adnoc.png',
  'white mountain technologies': '/home/partners/white-mountain-technologies.png',
  'mbzuai': '/home/partners/mbzuai.png',
  'abu dhabi university': '/home/partners/abu-dhabi-university.png',
  'liwa university': '/home/partners/liwa-university.png',
  'trends research & advisory': '/home/partners/trends-research-advisory.png',
  'trends research and advisory': '/home/partners/trends-research-advisory.png',
};

function getLocalLogo(name: string) {
  return localLogos[name.trim().toLowerCase()];
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);
  const src = partner.logoUrl || getLocalLogo(partner.name);

  if (!src || failed) {
    return <span className={styles.wordmark}>{partner.name}</span>;
  }

  return (
    <img
      className={styles.logo}
      src={src}
      alt={`${partner.name} logo`}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}

export function HomePartners({ partners }: HomePartnersProps) {
  const items = useMemo(() => partners.slice(0, 6), [partners]);
  const repeated = useMemo(() => [...items, ...items, ...items], [items]);

  return (
    <section className={styles.section} aria-labelledby="home-partners-title">
      <div className={styles.signalField} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className={`container ${styles.intro}`}>
        <div>
          <p className={styles.kicker}>Partners</p>
          <h2 id="home-partners-title">Connected through technology, academia and institutional capability.</h2>
        </div>

        <div className={styles.introAside}>
          <p>
            A selected ecosystem of institutional, academic and technology relationships supporting complementary capability and collaboration.
          </p>
          <Link className={styles.link} href="/partners">
            View partners <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className={styles.marqueeShell}>
        <div className={styles.edgeLeft} aria-hidden="true" />
        <div className={styles.edgeRight} aria-hidden="true" />

        <div className={styles.marquee}>
          <div className={styles.track}>
            {repeated.map((partner, index) => (
              <article
                className={styles.partner}
                key={`${partner.name}-${index}`}
                aria-hidden={index >= items.length ? true : undefined}
              >
                <div className={styles.logoStage}>
                  <PartnerLogo partner={partner} />
                  <span className={styles.scan} aria-hidden="true" />
                </div>

                <div className={styles.meta}>
                  <span>{partner.region || 'Institutional'}</span>
                  <i />
                  <span>{partner.type || 'Partner'}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className={`container ${styles.footer}`}>
        <span>Selected relationships</span>
        <div className={styles.footerLine}><i /></div>
        <span>Hover to pause</span>
      </div>
    </section>
  );
}
