import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { ExpertTeamExperience } from '@/components/continuation/ExpertTeamExperience';

export const metadata: Metadata = {
  title: 'Expert Team | BRAINTEK',
  description:
    'Meet the BRAINTEK expert team across strategic leadership, software engineering, AI enablement, cybersecurity, cloud, data protection and workforce development.',
};

export default async function ExpertTeamPage() {
  const team = await cms.team();

  return (
    <main id="main-content">
      <ExpertTeamExperience team={team} />
    </main>
  );
}
