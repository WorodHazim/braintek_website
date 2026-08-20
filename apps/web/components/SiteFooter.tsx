import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import styles from './SiteFooter.module.css';

const exploreLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Platforms & Products', href: '/platforms-products' },
  { label: 'Insights & Resources', href: '/insights-resources' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Why BRAINTEK', href: '/about#why-braintek' },
  { label: 'Expert Team', href: '/expert-team' },
  { label: 'Partners', href: '/partners' },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer} aria-label="BRAINTEK footer">
      <div className={styles.grid} aria-hidden="true" />

      <div className={`container ${styles.main}`}>
        <div className={styles.brandBlock}>
          <Link href="/" className={styles.brand} aria-label="BRAINTEK home">
            <Image
              src="/brand/braintek-logo.png"
              alt="BRAINTEK"
              width={210}
              height={52}
            />
          </Link>

          <p className={styles.tagline}>
            Security. Systems. Capability.
          </p>

          <a className={styles.email} href="mailto:info@braintek.ae">
            <Mail size={14} />
            <span>info@braintek.ae</span>
          </a>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <div className={styles.group}>
            <p>Explore</p>
            {exploreLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <span>{item.label}</span>
                <ArrowUpRight size={13} />
              </Link>
            ))}
          </div>

          <div className={styles.group}>
            <p>Company</p>
            {companyLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <span>{item.label}</span>
                <ArrowUpRight size={13} />
              </Link>
            ))}
          </div>

          <div className={styles.group}>
            <p>Contact</p>
            <Link href="/contact">
              <span>Book a Consultation</span>
              <ArrowUpRight size={13} />
            </Link>
            <span className={styles.location}>Abu Dhabi, UAE</span>
          </div>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© 2026 BRAINTEK AI Solutions & Consultancies</span>

        <div className={styles.legal}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>

        <a className={styles.backTop} href="#main-content" aria-label="Back to top">
          <span>Back to top</span>
          <i><ArrowUp size={14} /></i>
        </a>
      </div>
    </footer>
  );
}
