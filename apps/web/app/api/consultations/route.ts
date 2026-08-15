import { NextRequest, NextResponse } from 'next/server';
import { cmsInternalUrl } from '@/lib/admin-backend';
function clean(value: unknown, max: number) { return typeof value === 'string' ? value.normalize('NFKC').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max) : ''; }
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  const payload = {
    form_type: clean(body.form_type, 40) || 'consultation', full_name: clean(body.full_name, 120), organization: clean(body.organization, 180), role_title: clean(body.role_title, 160), email: clean(body.email, 180).toLowerCase(), phone: clean(body.phone, 60), sector_interest: clean(body.sector_interest, 180), service_interest: clean(body.service_interest, 220), product_interest: clean(body.product_interest, 160), preferred_followup: clean(body.preferred_followup, 80), message: clean(body.message, 4000), website: clean(body.website, 180), source_url: clean(request.headers.get('referer'), 500),
  };
  const response = await fetch(`${cmsInternalUrl()}/api/inquiries`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload), cache: 'no-store' });
  return new NextResponse(await response.text(), { status: response.status, headers: { 'content-type': response.headers.get('content-type') || 'application/json' } });
}
