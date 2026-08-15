import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import '@/app/globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { Footer } from '@/components/Footer';
import { MotionLayer } from '@/components/MotionLayer';
import { StructuredData } from '@/components/StructuredData';
import { MobileConsultationCTA } from '@/components/MobileConsultationCTA';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://braintek.ae'),
  title: {
    default: 'BRAINTEK AI Solutions & Consultancies | Cybersecurity, AI Systems, and Workforce Development UAE',
    template: '%s | BRAINTEK'
  },
  description: 'BRAINTEK delivers cybersecurity, software systems development, workflow automation, AI integration, psychometric-informed training, and workforce capability solutions for institutions in the UAE.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'BRAINTEK AI Solutions & Consultancies',
    title: 'BRAINTEK AI Solutions & Consultancies',
    description: 'Applied AI, cybersecurity, systems development and strategic capability development for institutions.'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <StructuredData data={[
          {
            '@context':'https://schema.org',
            '@type':'Organization',
            name:'BRAINTEK AI Solutions & Consultancies',
            url:process.env.NEXT_PUBLIC_SITE_URL || 'https://braintek.ae',
            logo:new URL('/brand/braintek-logo.png', process.env.NEXT_PUBLIC_SITE_URL || 'https://braintek.ae').toString(),
            email:'info@braintek.ae',
            address:{ '@type':'PostalAddress', addressLocality:'Abu Dhabi', addressCountry:'AE' }
          },
          {
            '@context':'https://schema.org',
            '@type':'WebSite',
            name:'BRAINTEK AI Solutions & Consultancies',
            url:process.env.NEXT_PUBLIC_SITE_URL || 'https://braintek.ae'
          }
        ]} />
        <MotionLayer />
        <SiteHeader />
        {children}
        <MobileConsultationCTA />
        <Footer />
      </body>
    </html>
  );
}
