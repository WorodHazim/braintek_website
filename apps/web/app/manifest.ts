import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BRAINTEK AI Solutions & Consultancies',
    short_name: 'BRAINTEK',
    description: 'Applied AI, cybersecurity, systems development and workforce capability for institutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFBFC',
    theme_color: '#0B1F3A',
    icons: [
      { src: '/icon.png', sizes: '256x256', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  };
}
