'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Search,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import styles from './SiteHeaderHeroTheme.module.css';

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Expert Team', href: '/expert-team' },
  { label: 'Partners', href: '/partners' },
];

const primaryLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Platforms', href: '/platforms-products' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Insights', href: '/insights-resources' },
  { label: 'Contact', href: '/contact' },
];

const capabilities = [
  'AI Integration',
  'Customized Systems Development',
  'Automation',
  'Psychometric Assessment',
];

const megaGroups = [
  {
    label: 'BRAINTEK',
    links: companyLinks,
  },
  {
    label: 'Capabilities',
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Sectors', href: '/sectors' },
      { label: 'Platforms', href: '/platforms-products' },
      { label: 'Portfolio', href: '/portfolio' },
    ],
  },
  {
    label: 'Knowledge',
    links: [
      { label: 'Insights & Resources', href: '/insights-resources' },
      { label: 'Contact', href: '/contact' },
      { label: 'Search', href: '/search' },
    ],
  },
];

export function SiteHeader() {
  const [companyOpen, setCompanyOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const panelOpen = megaOpen || searchOpen;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCompanyOpen(false);
        setMegaOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = panelOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [panelOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const timer = window.setTimeout(() => searchRef.current?.focus(), 180);
    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  function closeAll() {
    setCompanyOpen(false);
    setMegaOpen(false);
    setSearchOpen(false);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    const input = event.currentTarget.elements.namedItem('q') as HTMLInputElement | null;
    if (!input?.value.trim()) event.preventDefault();
  }

  return (
    <header className={styles.header}>
      <div className={styles.identityLine}>
        <div className={styles.identityInner}>
          <Link href="/" className={styles.brand} aria-label="BRAINTEK home" onClick={closeAll}>
            <span className={styles.brandIcon}>
              <img src="/brand/braintek-logo.png" alt="" aria-hidden="true" />
            </span>
            <span className={styles.brandWords}>
              <strong>BRAINTEK</strong>
              <small>AI SOLUTIONS &amp; CONSULTANCIES</small>
            </span>
          </Link>

          <div className={styles.institutionName} aria-label="BRAINTEK Artificial Intelligence">
            <span>BRAINTEK</span>
            <i aria-hidden="true" />
            <strong>ARTIFICIAL INTELLIGENCE</strong>
          </div>

          <div className={styles.utility}>
            <div className={styles.languages} aria-label="Language">
              <button type="button" className={styles.languageActive}>EN</button>
              <span />
              <button type="button" lang="ar" dir="rtl" title="Arabic coming soon">ع</button>
            </div>

            <button
              type="button"
              className={styles.utilityButton}
              aria-label={searchOpen ? 'Close search' : 'Search BRAINTEK'}
              aria-expanded={searchOpen}
              onClick={() => {
                setMegaOpen(false);
                setCompanyOpen(false);
                setSearchOpen((value) => !value);
              }}
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.capabilityLine}>
        <div className={styles.capabilityInner}>
          <span className={styles.capabilityLead}>APPLIED INTELLIGENCE</span>
          <div className={styles.capabilityList}>
            {capabilities.map((item, index) => (
              <span key={item}>
                {item}
                {index < capabilities.length - 1 ? <i aria-hidden="true" /> : null}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.navigationLine}>
        <div className={styles.navigationInner}>
          <nav className={styles.primaryNav} aria-label="Primary navigation">
            <div
              className={styles.companyNav}
              onMouseLeave={() => setCompanyOpen(false)}
            >
              <button
                type="button"
                aria-expanded={companyOpen}
                onClick={() => setCompanyOpen((value) => !value)}
                onMouseEnter={() => setCompanyOpen(true)}
              >
                BRAINTEK
                <ChevronDown size={13} />
              </button>

              <AnimatePresence>
                {companyOpen ? (
                  <motion.div
                    className={styles.companyDropdown}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p>Inside BRAINTEK</p>
                    {companyLinks.map((item) => (
                      <Link href={item.href} key={item.href} onClick={closeAll}>
                        <span>{item.label}</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {primaryLinks.map((item) => (
              <Link href={item.href} key={item.href} onClick={closeAll}>
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={megaOpen}
            onClick={() => {
              setSearchOpen(false);
              setCompanyOpen(false);
              setMegaOpen((value) => !value);
            }}
          >
            <span>{megaOpen ? 'Close' : 'Menu'}</span>
            {megaOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {panelOpen ? (
          <motion.button
            className={styles.scrim}
            type="button"
            aria-label="Close panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAll}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {megaOpen ? (
          <motion.section
            className={styles.megaPanel}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.36, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className={styles.megaInner}>
              <div className={styles.megaIntro}>
                <p>Explore BRAINTEK</p>
                <h2>Security. Systems. Capability.</h2>
                <span>
                  Applied AI, institutional systems, digital protection and human capability
                  in one connected model.
                </span>
              </div>

              <div className={styles.megaGroups}>
                {megaGroups.map((group) => (
                  <div key={group.label}>
                    <p>{group.label}</p>
                    {group.links.map((item) => (
                      <Link href={item.href} key={item.href} onClick={closeAll}>
                        <span>{item.label}</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <Link href="/contact" className={styles.megaCta} onClick={closeAll}>
                <span>Start a conversation</span>
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </motion.section>
        ) : null}

        {searchOpen ? (
          <motion.section
            className={styles.searchPanel}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
          >
            <form action="/search" method="get" onSubmit={submitSearch}>
              <Search size={22} />
              <input
                ref={searchRef}
                name="q"
                type="search"
                placeholder="Search BRAINTEK"
                maxLength={80}
                autoComplete="off"
                aria-label="Search BRAINTEK"
              />
              <button type="submit" aria-label="Submit search">
                <ArrowUpRight size={17} />
              </button>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
