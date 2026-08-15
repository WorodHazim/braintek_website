'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Search, X } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { nav } from '@/lib/content';
import styles from './SiteHeaderHeroTheme.module.css';

const menuGroups = [
  {
    label: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Why BRAINTEK', href: '/why-braintek' },
      { label: 'Expert Team', href: '/expert-team' },
      { label: 'Partners', href: '/partners' },
    ],
  },
  {
    label: 'Capabilities',
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Sectors', href: '/sectors' },
      { label: 'Platforms', href: '/platforms-products' },
    ],
  },
  {
    label: 'Knowledge',
    links: [
      { label: 'Resources & Insights', href: '/insights-resources' },
      { label: 'Search', href: '/search' },
    ],
  },
];

const modelRows = [
  { verb: 'Protect', label: 'Digital protection' },
  { verb: 'Build', label: 'Systems & AI' },
  { verb: 'Empower', label: 'Human capability' },
];

const searchSections = [
  { label: 'Services', href: '/services', text: 'Protection, systems, AI and workforce capability.' },
  { label: 'Sectors', href: '/sectors', text: 'Government, education, enterprise and institutional pathways.' },
  { label: 'Platforms', href: '/platforms-products', text: 'PSYTEST, AILEX, Scheduler, Skoolee and emerging platforms.' },
  { label: 'Insights', href: '/insights-resources', text: 'Articles, briefs, guides and implementation resources.' },
];

const popularSearches = ['Cybersecurity', 'AI integration', 'Workflow automation', 'Workforce development'];

export function SiteHeader() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const overlayOpen = megaOpen || searchOpen;
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMegaOpen(false);
        setSearchOpen(false);
        setLanguageOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [overlayOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 260);
    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  const closeAll = () => {
    setMegaOpen(false);
    setSearchOpen(false);
    setLanguageOpen(false);
  };

  const toggleMega = () => {
    setSearchOpen(false);
    setLanguageOpen(false);
    setMegaOpen((current) => !current);
  };

  const toggleSearch = () => {
    setMegaOpen(false);
    setLanguageOpen(false);
    setSearchOpen((current) => !current);
  };

  const submitHeaderSearch = (event: FormEvent<HTMLFormElement>) => {
    const input = event.currentTarget.elements.namedItem('q') as HTMLInputElement | null;
    if (!input?.value.trim()) event.preventDefault();
  };

  return (
    <header className={`site-header site-header-v2 ${isHome ? `home-hero ${styles.homeHeroPatch}` : ''}${scrolled ? ' is-scrolled' : ''}${overlayOpen ? ' has-panel-open' : ''}`}>
      <div className="nav-shell nav-shell-v2">
        <Link href="/" className="brand brand-v2" aria-label="BRAINTEK home" onClick={closeAll}>
          <Image src="/brand/braintek-logo.png" alt="BRAINTEK" width={215} height={48} priority />
        </Link>

        <nav className="desktop-nav desktop-nav-v2" aria-label="Primary navigation">
          {nav.slice(1, 6).map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <div className="nav-actions nav-actions-v2">
          <div className="language-control">
            <button
              type="button"
              className="language-trigger"
              aria-expanded={languageOpen}
              aria-haspopup="menu"
              aria-label="Choose language"
              onClick={() => {
                setMegaOpen(false);
                setSearchOpen(false);
                setLanguageOpen((current) => !current);
              }}
            >
              <span className="language-current">EN</span>
              <span className="language-separator" aria-hidden="true" />
              <span className="language-alt" lang="ar" dir="rtl">ع</span>
              <ChevronDown size={13} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  className="language-menu"
                  role="menu"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="language-menu-label">Language</p>
                  <button type="button" className="language-option is-active" role="menuitem" onClick={() => setLanguageOpen(false)}>
                    <span>English</span><small>Current</small>
                  </button>
                  <button type="button" className="language-option" role="menuitem" onClick={() => setLanguageOpen(false)}>
                    <span lang="ar" dir="rtl">العربية</span><small>Coming soon</small>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="header-icon-button"
            type="button"
            aria-label={searchOpen ? 'Close search' : 'Search BRAINTEK'}
            aria-expanded={searchOpen}
            onClick={toggleSearch}
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          <Link className="header-consultation-cta" href="/contact" onClick={closeAll}>
            <span>Book a Consultation</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>

          <button
            className={`menu-button menu-button-v2${megaOpen ? ' is-open' : ''}`}
            type="button"
            aria-label={megaOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={megaOpen}
            onClick={toggleMega}
          >
            <span className="menu-button-label">{megaOpen ? 'Close' : 'Menu'}</span>
            <span className="menu-glyph" aria-hidden="true"><span /><span /></span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {overlayOpen && (
          <motion.button
            type="button"
            className="header-panel-scrim"
            aria-label="Close open panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={closeAll}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {megaOpen && (
          <motion.section
            key="mega-menu"
            className={`mega-menu-panel ${styles.megaPanel}`}
            aria-label="Expanded navigation"
            initial={{ opacity: 0, y: -12, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className={`mega-menu-inner ${styles.megaInner}`}>
              <div className={`mega-menu-intro ${styles.megaIntro}`}>
                <p className="mega-kicker">Explore BRAINTEK</p>
                <h2>Explore BRAINTEK.</h2>
                <p>Protection, systems and capability—organized around real institutional needs.</p>
                <Link href="/contact" className="mega-text-cta" onClick={closeAll}>
                  Start a conversation <ArrowUpRight size={15} />
                </Link>
              </div>

              <div className={`mega-menu-groups ${styles.megaGroups}`}>
                {menuGroups.map((group, groupIndex) => (
                  <motion.div
                    className="mega-menu-group"
                    key={group.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + groupIndex * 0.05, duration: 0.3 }}
                  >
                    <p>{group.label}</p>
                    <div>
                      {group.links.map((item) => (
                        <Link href={item.href} key={item.href} onClick={closeAll}>
                          <span>{item.label}</span><ArrowUpRight size={14} />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.aside
                className={styles.model}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <p>One connected model</p>
                <h3>Protect. Build. Empower.</h3>
                <div className={styles.modelRows}>
                  {modelRows.map((row, index) => (
                    <div key={row.verb}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{row.verb}</strong>
                      <small>{row.label}</small>
                    </div>
                  ))}
                </div>
              </motion.aside>
            </div>
          </motion.section>
        )}

        {searchOpen && (
          <motion.section
            key="search-panel"
            className="header-search-panel"
            aria-label="Search BRAINTEK"
            initial={{ opacity: 0, y: -18, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: -12, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.46, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="header-search-inner">
              <div className="header-search-title-row">
                <div>
                  <p className="search-kicker">Discover BRAINTEK</p>
                  <h2>What are you looking for?</h2>
                </div>
                <p className="search-hint">Search across capabilities, sectors, platforms and BRAINTEK thinking.</p>
              </div>

              <form action="/search" method="get" className="header-search-form" onSubmit={submitHeaderSearch}>
                <Search size={21} aria-hidden="true" />
                <input ref={searchInputRef} name="q" type="search" maxLength={80} autoComplete="off" placeholder="Search BRAINTEK" aria-label="Search BRAINTEK" />
                <button type="submit" aria-label="Submit search"><ArrowUpRight size={18} /></button>
              </form>

              <div className="search-discovery-layout">
                <div>
                  <p className="search-panel-label">Explore by area</p>
                  <div className="search-section-grid">
                    {searchSections.map((section) => (
                      <Link href={section.href} className="search-section-link" key={section.href} onClick={closeAll}>
                        <span><strong>{section.label}</strong><small>{section.text}</small></span>
                        <ArrowUpRight size={16} />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="search-panel-label">Popular topics</p>
                  <div className="search-topic-list">
                    {popularSearches.map((topic) => (
                      <Link key={topic} href={`/search?q=${encodeURIComponent(topic)}`} onClick={closeAll}>{topic}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </header>
  );
}
