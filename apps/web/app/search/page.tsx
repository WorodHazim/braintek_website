import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { cms } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Search',
  robots: { index: false, follow: true },
};

type Result = {
  title: string;
  description: string;
  href: string;
  type: string;
};

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Services', value: 'service' },
  { label: 'Sectors', value: 'sector' },
  { label: 'Platforms', value: 'platform' },
  { label: 'Resources', value: 'resource' },
];

const directory = [
  { number: '01', label: 'Services', href: '/services', text: 'Cybersecurity, systems development, AI integration and workforce capability.' },
  { number: '02', label: 'Sectors', href: '/sectors', text: 'Institutional pathways for government, education, enterprise, HR and operations.' },
  { number: '03', label: 'Platforms', href: '/platforms-products', text: 'Assessment, leadership, scheduling, student services and emerging operational platforms.' },
  { number: '04', label: 'Insights & Resources', href: '/insights-resources', text: 'Applied perspectives, guides, briefs, checklists and institutional resources.' },
];

function normalizeSearchTerm(value: string) {
  return value
    .normalize('NFKC')
    .slice(0, 80)
    .replace(/[^\p{L}\p{N}\s&+._/-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeCategory(value: string) {
  const normalized = value.toLowerCase();
  return categories.some((category) => category.value === normalized) ? normalized : 'all';
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const displayTerm = normalizeSearchTerm(params.q ?? '');
  const term = displayTerm.toLowerCase();
  const selectedCategory = normalizeCategory(params.category ?? 'all');

  // Search data is fetched with static CMS calls and filtered in application memory.
  // The visitor's query is never interpolated into SQL, a database query, or a CMS API filter.
  const [services, sectors, products, resources] = await Promise.all([
    cms.services(),
    cms.sectors(),
    cms.products(),
    cms.resources(),
  ]);

  const all: Result[] = [
    ...services.map((item) => ({ title: item.name, description: item.summary, href: `/services/${item.slug}`, type: 'Service' })),
    ...sectors.map((item) => ({ title: item.name, description: item.summary, href: `/sectors/${item.slug}`, type: 'Sector' })),
    ...products.map((item) => ({ title: item.name, description: item.summary, href: `/platforms-products/${item.slug}`, type: 'Platform' })),
    ...resources.map((item) => ({ title: item.title, description: item.summary, href: `/insights-resources/${item.slug}`, type: 'Resource' })),
  ];

  const results = term
    ? all.filter((item) => {
        const matchesTerm = `${item.title} ${item.description} ${item.type}`.toLowerCase().includes(term);
        const matchesCategory = selectedCategory === 'all' || item.type.toLowerCase() === selectedCategory;
        return matchesTerm && matchesCategory;
      })
    : [];

  return (
    <main id="main-content" className="search-page">
      <section className="search-page-shell">
        <div className="container search-page-container">
          <div className="search-breadcrumb"><Link href="/">Home</Link><span>/</span><span>Search</span></div>

          <div className="search-page-title-row">
            <p className="search-page-kicker">Site Search</p>
            <h1>SEARCH</h1>
          </div>

          <form className="search-page-form" action="/search" method="get">
            <Search size={24} aria-hidden="true" />
            <label className="sr-only" htmlFor="site-query">Search BRAINTEK</label>
            <input
              id="site-query"
              name="q"
              type="search"
              inputMode="search"
              maxLength={80}
              autoComplete="off"
              spellCheck={false}
              defaultValue={displayTerm}
              placeholder="What are you looking for?"
            />
            <input type="hidden" name="category" value={selectedCategory} />
            <button type="submit" aria-label="Search"><ArrowUpRight size={20} /></button>
          </form>

          <div className="search-category-row" aria-label="Search categories">
            {categories.map((category) => {
              const href = displayTerm
                ? `/search?q=${encodeURIComponent(displayTerm)}&category=${category.value}`
                : `/search?category=${category.value}`;
              return (
                <Link
                  key={category.value}
                  href={href}
                  className={selectedCategory === category.value ? 'is-active' : ''}
                >
                  {category.label}
                </Link>
              );
            })}
          </div>

          {term ? (
            <section className="search-results-section" aria-live="polite">
              <div className="search-results-heading">
                <p>{results.length} result{results.length === 1 ? '' : 's'}</p>
                <span>for “{displayTerm}”</span>
              </div>

              <div className="search-results-v2">
                {results.map((item, index) => (
                  <Link key={`${item.type}-${item.href}`} href={item.href} className="search-result-v2">
                    <span className="search-result-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="search-result-type">{item.type}</span>
                    <span className="search-result-copy"><strong>{item.title}</strong><small>{item.description}</small></span>
                    <ArrowUpRight size={19} />
                  </Link>
                ))}
                {!results.length && (
                  <div className="search-empty-v2">
                    <h2>No matching results.</h2>
                    <p>Try a broader phrase such as cybersecurity, AI, automation, education or capability.</p>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <section className="search-directory-section">
              <div className="search-directory-heading">
                <p>Explore BRAINTEK</p>
                <h2>Start with a section.</h2>
              </div>
              <div className="search-directory-grid">
                {directory.map((item) => (
                  <Link href={item.href} key={item.href} className="search-directory-card">
                    <span>{item.number}</span>
                    <strong>{item.label}</strong>
                    <p>{item.text}</p>
                    <ArrowUpRight size={19} />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
