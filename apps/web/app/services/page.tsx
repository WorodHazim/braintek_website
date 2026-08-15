import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { ServicesPageExperience } from '@/components/services/ServicesPageExperience';

export const metadata: Metadata = {
  title: 'Cybersecurity, Software Solutions, and Workforce Empowerment Services',
  description:
    'Explore BRAINTEK services in cybersecurity and digital protection, customized software solutions, workflow automation, AI integration, psychometric-informed development, AI leadership readiness, and workforce empowerment.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'BRAINTEK Services',
    description:
      'Cybersecurity, intelligent systems, AI-enabled operations, and workforce capability development designed around real institutional needs.',
  },
};

export default async function ServicesPage() {
  const services = await cms.services();
  return <ServicesPageExperience services={services} />;
}
