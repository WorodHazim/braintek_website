import { InstitutionalHero } from '@/components/continuation/InstitutionalHero';
import { HomeProducts } from '@/components/HomeProducts';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';

type CmsPage = {
  hero_title: string;
  hero_subtitle?: string | null;
};

type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  status?: string | null;
  screenshotUrls?: string[] | null;
};

export function PlatformsExperience({
  page,
  products,
}: {
  page: CmsPage;
  products: Product[];
}) {
  const heroTitle =
    page.hero_title ===
    'Structured Platforms for Security, Capability, and Institutional Performance'
      ? 'Platforms built for real institutional work.'
      : page.hero_title;

  return (
    <main id="main-content" className="home-v2">
      <InstitutionalHero
        variant="platforms"
        eyebrow="Platforms & Products"
        title={heroTitle}
        body={page.hero_subtitle}
        modelLabel="Platform portfolio"
        rows={[
          { number: '01', title: 'Assess', note: 'Human capability' },
          { number: '02', title: 'Operate', note: 'Systems & workflow' },
          { number: '03', title: 'Protect', note: 'Digital resilience' },
        ]}
        primary={{ label: 'Explore the portfolio', href: '#home-products-title' }}
        secondary={{ label: 'Discuss your requirements', href: '/contact' }}
      />

      {/* Exact same card design + sticky left title used on the homepage. */}
      <HomeProducts products={products} />

      <HomeFinalCTA />
    </main>
  );
}
