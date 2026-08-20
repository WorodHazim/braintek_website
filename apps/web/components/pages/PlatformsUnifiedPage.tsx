import { InstitutionalHero } from '@/components/continuation/InstitutionalHero';
import { HomeProducts } from '@/components/HomeProducts';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';

type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  status?: string | null;
  screenshotUrls?: string[] | null;
};

export function PlatformsUnifiedPage({
  products,
}: {
  products: Product[];
}) {
  return (
    <main id="main-content" className="home-v2">
      <InstitutionalHero
        variant="platforms"
        eyebrow="Platforms & Products"
        title="Platforms built for real institutional work."
        body="BRAINTEK platforms translate real institutional requirements into structured tools for assessment, operations, automation and digital protection."
        modelLabel="Platform portfolio"
        rows={[
          { number: '01', title: 'Assess', note: 'Human capability' },
          { number: '02', title: 'Operate', note: 'Systems & workflow' },
          { number: '03', title: 'Protect', note: 'Digital resilience' },
        ]}
        primary={{
          label: 'Explore the portfolio',
          href: '#home-products-title',
        }}
        secondary={{
          label: 'Discuss your requirements',
          href: '/contact',
        }}
      />

      <HomeProducts products={products} />

      <HomeFinalCTA />
    </main>
  );
}
