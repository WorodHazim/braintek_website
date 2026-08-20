import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { ExpertTeamExperience } from '@/components/continuation/ExpertTeamExperience';

export const metadata: Metadata = {
  title: 'Expert Team',
  description:
    'Meet the BRAINTEK experts across leadership, software engineering, AI enablement, cybersecurity, cloud, APIs, data protection and workforce capability.',
  alternates: { canonical: '/expert-team' },
};

export default async function TeamPage() {
  const [page, team] = await Promise.all([
    cms.page('team', {
      page_type: 'team',
      hero_title:
        'One institutional challenge. Multiple disciplines working together.',
      hero_subtitle:
        'BRAINTEK brings together strategy, leadership, software engineering, AI enablement, cybersecurity, cloud, data protection and workforce-development expertise.',
    }),
    cms.team(),
  ]);

  return (
    <main id="main-content">
      <ExpertTeamExperience
        team={team}
        heroTitle={page.hero_title}
        heroBody={page.hero_subtitle || ''}
      />
    </main>
  );
}
