'use client';

import { useState } from 'react';
import type { FormOption } from '@/lib/cms';

type Status = { type: 'idle' | 'success' | 'error'; message?: string };

export function ConsultationForm({ inquiryTypes, serviceOptions, sectorOptions, productOptions, followupOptions }: { inquiryTypes:FormOption[]; serviceOptions:FormOption[]; sectorOptions:FormOption[]; productOptions:FormOption[]; followupOptions:FormOption[] }) {
  const [status, setStatus] = useState<Status>({ type: 'idle' });
  const [pending, setPending] = useState(false);

  async function submit(formData: FormData) {
    setPending(true);
    setStatus({ type: 'idle' });
    const payload = { ...Object.fromEntries(formData.entries()), source_url: window.location.href };
    try {
      const endpoint = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT || 'http://localhost:1337/api/inquiries';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus({ type: 'success', message: 'Thank you. Your inquiry has been received and stored for follow-up.' });
      (document.getElementById('consultation-form') as HTMLFormElement | null)?.reset();
    } catch {
      setStatus({ type: 'error', message: 'We could not submit the form. Please email info@braintek.ae while the issue is resolved.' });
    } finally {
      setPending(false);
    }
  }

  return (
    <form id="consultation-form" className="consultation-form" action={submit}>
      <p className="eyebrow">Structured inquiry</p>
      <h3>Discuss your needs with BRAINTEK</h3>
      <div className="form-grid" style={{ marginTop: 26 }}>
        <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div className="field"><label htmlFor="full_name">Full name *</label><input id="full_name" name="full_name" required maxLength={120} autoComplete="name" /></div>
        <div className="field"><label htmlFor="organization">Organization *</label><input id="organization" name="organization" required maxLength={180} autoComplete="organization" /></div>
        <div className="field"><label htmlFor="role_title">Role / position</label><input id="role_title" name="role_title" maxLength={160} autoComplete="organization-title" /></div>
        <div className="field"><label htmlFor="email">Business email *</label><input id="email" name="email" type="email" required maxLength={180} autoComplete="email" /></div>
        <div className="field"><label htmlFor="phone">Phone / mobile</label><input id="phone" name="phone" type="tel" maxLength={60} autoComplete="tel" /></div>
        <div className="field"><label htmlFor="form_type">Inquiry type *</label><select id="form_type" name="form_type" required defaultValue={inquiryTypes[0]?.value || 'consultation'}>{inquiryTypes.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select></div>
        <div className="field"><label htmlFor="sector_interest">Sector</label><select id="sector_interest" name="sector_interest" defaultValue=""><option value="">Select a sector</option>{sectorOptions.map(x => <option key={x.value} value={x.value}>{x.label}</option>)}</select></div>
        <div className="field"><label htmlFor="service_interest">Service interest</label><select id="service_interest" name="service_interest" defaultValue=""><option value="">Select a service</option>{serviceOptions.map(x => <option key={x.value} value={x.value}>{x.label}</option>)}</select></div>
        <div className="field"><label htmlFor="product_interest">Product interest</label><select id="product_interest" name="product_interest" defaultValue=""><option value="">Select a platform</option>{productOptions.map(x => <option key={x.value} value={x.value}>{x.label}</option>)}</select></div>
        <div className="field"><label htmlFor="preferred_followup">Preferred follow-up</label><select id="preferred_followup" name="preferred_followup" defaultValue={followupOptions[0]?.value || 'email'}>{followupOptions.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select></div>
        <div className="field full"><label htmlFor="message">Brief description of need *</label><textarea id="message" name="message" required maxLength={4000} placeholder="Tell us about the context, challenge, goal, or transformation priority." /></div>
      </div>
      <p className="form-note">By submitting this form, you are asking BRAINTEK to contact you about this inquiry. Final legal/privacy language should be approved before production go-live.</p>
      <button className="button" type="submit" disabled={pending}>{pending ? 'Submitting…' : 'Submit Inquiry'}</button>
      {status.type !== 'idle' && <div className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</div>}
    </form>
  );
}
