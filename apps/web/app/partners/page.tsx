import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { PartnersHero } from '@/components/continuation/PartnersHero';
import { PartnersExperience } from '@/components/continuation/PartnersExperience';

export const metadata: Metadata = {
  title: 'Partners',
  description:
    'Selected BRAINTEK partners and institutional collaborators, presented with restrained, source-aligned collaboration language.',
  alternates: { canonical: '/partners' },
};

export default async function PartnersPage() {
  const [page, partners] = await Promise.all([
    cms.page('partners', {
      page_type: 'partners',
      hero_title:
        'Institutional relationships built around complementary capability.',
      hero_subtitle:
        'BRAINTEK operates within an ecosystem of institutional, academic, technology and research relationships, described with the same discipline applied across the rest of the platform.',
    }),
    cms.partners(),
  ]);

  return (
    <main id="main-content">
      <PartnersHero
        title={page.hero_title}
        body={page.hero_subtitle || ''}
      />
      <PartnersExperience partners={partners} />
    </main>
  );
}
