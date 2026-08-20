import Link from 'next/link';

export function MobileConsultationCTA() {
  return (
    <Link
      className="mobile-consultation-cta"
      href="/contact"
      aria-label="Book a consultation with BRAINTEK"
      style={{
        background: '#0B7C7A',
        boxShadow: '0 14px 38px rgba(11, 124, 122, 0.24)',
      }}
    >
      Book a Consultation
    </Link>
  );
}
