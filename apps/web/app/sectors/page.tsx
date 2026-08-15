import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { SectorsLandingV3 } from '@/components/pages/SectorsLandingV3';

export const metadata: Metadata = {
  title: 'Sectors We Serve | Government, Education & Enterprise AI',
  description:
    'See how BRAINTEK supports government, education, enterprise, HR, training providers and institutional operations through secure systems, AI solutions and capability building.',
};

export default async function SectorsPage() {
  const sectors = await cms.sectors();

  return (
    <main id="main-content">
      <SectorsLandingV3 sectors={sectors} />
    </main>
  );
}
