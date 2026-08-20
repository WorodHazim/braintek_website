import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { InsightsExperience } from '@/components/continuation/InsightsExperience';

export const metadata: Metadata = {
  title: 'Insights & Resources',
  description:
    'Explore BRAINTEK insights on AI integration, workflow automation, workforce capability, responsible AI and sustainable institutional performance.',
  alternates: { canonical: '/insights-resources' },
};

export default async function InsightsPage() {
  const [page, resources] = await Promise.all([
    cms.page('insights', {
      page_type: 'insights',
      hero_title:
        'Applied thinking for institutions navigating transformation.',
      hero_subtitle:
        'BRAINTEK perspectives connect AI, automation, workforce capability, governance and institutional performance to practical implementation questions.',
    }),
    cms.resources(),
  ]);

  return (
    <InsightsExperience
      heroTitle={page.hero_title}
      heroBody={page.hero_subtitle || ''}
      resources={resources}
    />
  );
}
