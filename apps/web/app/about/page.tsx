import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { AboutLandingV2 } from '@/components/pages/AboutLandingV2';

export const metadata: Metadata = {
  title: 'About BRAINTEK | AI Solutions, Training & Consultancy UAE',
  description:
    'Learn how BRAINTEK combines secure digital foundations, intelligent systems and workforce capability to strengthen institutional performance.',
};

export default async function AboutPage() {
  const page = await cms.page('about', {
    page_type: 'about',
    hero_title: 'Built to connect security, systems and human capability.',
    hero_subtitle:
      'BRAINTEK helps institutions protect, modernize and strengthen the way they operate through cybersecurity and digital protection, software solutions and systems development, and manpower development and workforce empowerment.',
  });

  return (
    <main id="main-content">
      <AboutLandingV2
        heroTitle={page.hero_title}
        heroBody={page.hero_subtitle || ''}
      />
    </main>
  );
}
