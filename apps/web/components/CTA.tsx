import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export function CTA({ title = 'Let us help you build smarter systems, stronger protection, and stronger workforce capability.', body = 'Move from intention to implementation with a structured BRAINTEK consultation.', primary = 'Request a Strategic Consultation' }: { title?: string; body?: string; primary?: string }) {
  return <section className="cta-band"><div className="container cta-grid" data-reveal><div><p className="eyebrow light">NEXT STEP</p><h2>{title}</h2></div><div><p>{body}</p><Link className="button button-light" href="/contact">{primary}<ArrowUpRight size={17} /></Link></div></div></section>;
}
