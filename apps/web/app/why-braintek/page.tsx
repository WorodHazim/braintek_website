import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { whyPoints } from '@/lib/content';
import { WhyExperience } from '@/components/pages/WhyExperience';

export const metadata: Metadata = {
  title: 'Why BRAINTEK',
  description: 'Discover why institutions choose BRAINTEK for integrated cybersecurity, systems development, AI enablement and workforce capability.',
  alternates: { canonical: '/why-braintek' },
};

export default async function WhyPage() {
  const page = await cms.page('why_braintek', {
    page_type: 'why_braintek',
    hero_title: 'Why leading institutions choose BRAINTEK',
    hero_subtitle: 'We do not treat transformation as a software purchase, a security control, or a training event in isolation. BRAINTEK aligns digital protection, intelligent systems, workflows and workforce capability so improvement is practical, measurable and sustainable.',
  });

  return <WhyExperience page={page} whyPoints={whyPoints} />;
}
