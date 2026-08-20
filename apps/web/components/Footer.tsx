import Link from 'next/link';
import {
  ArrowUp,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import styles from './Footer.module.css';

const exploreLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Platforms', href: '/platforms-products' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Insights & Resources', href: '/insights-resources' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Expert Team', href: '/expert-team' },
  { label: 'Partners', href: '/partners' },
];

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/braintek-ai-solutions-and-consultancies/home/',
    icon: Linkedin,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/braintekai/',
    icon: Instagram,
  },
];

const mapUrl = 'https://maps.app.goo.gl/sbwTMivzVrJFMoL5A';

export function Footer() {
  return (
    <footer className={styles.footer} aria-label="BRAINTEK footer">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.orbit} aria-hidden="true" />

      <div className={`container ${styles.main}`}>
        <div className={styles.brandBlock}>
          <Link href="/" className={styles.brand} aria-label="BRAINTEK home">
            <img src="/brand/braintek-logo.png" alt="" aria-hidden="true" />
            <strong>BRAINTEK</strong>
          </Link>

          <p className={styles.tagline}>
            Security. Systems. Capability.
          </p>

          <p className={styles.brandCopy}>
            Applied technology and institutional capability for organizations
            that need secure, usable and sustainable progress.
          </p>

          <div className={styles.socials} aria-label="BRAINTEK social media">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`BRAINTEK on ${label}`}
                title={label}
              >
                <Icon size={17} />
              </a>
            ))}

            <a
              href="https://x.com/braintekai"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="BRAINTEK on X"
              title="X"
              className={styles.xSocial}
            >
              <span>X</span>
            </a>
          </div>
        </div>

        <nav className={styles.navigation} aria-label="Footer navigation">
          <div className={styles.linkGroup}>
            <p>Explore</p>
            {exploreLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <span>{item.label}</span>
                <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>

          <div className={styles.linkGroup}>
            <p>BRAINTEK</p>
            {companyLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <span>{item.label}</span>
                <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.contactBlock}>
          <p className={styles.contactLabel}>Contact</p>

          <a href="mailto:info@braintek.ae" className={styles.contactItem}>
            <i><Mail size={15} /></i>
            <span>
              <small>Email</small>
              info@braintek.ae
            </span>
          </a>

          <a href="tel:+97122341190" className={styles.contactItem}>
            <i><Phone size={15} /></i>
            <span>
              <small>Phone</small>
              02 234 1190
            </span>
          </a>

          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.contactItem}
          >
            <i><MapPin size={15} /></i>
            <span>
              <small>Office</small>
              Al Khalidiyah — Beside Khalidiyah Mall
              <em>Abu Dhabi, UAE · Open in Google Maps</em>
            </span>
          </a>

          <Link href="/contact" className={styles.consultation}>
            <span>Book a Consultation</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
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
