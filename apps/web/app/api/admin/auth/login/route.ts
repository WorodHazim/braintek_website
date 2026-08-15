import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, createAdminSession } from '@/lib/admin-session';
import { cmsInternalUrl } from '@/lib/admin-backend';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase().slice(0, 180) : '';
  const password = typeof body?.password === 'string' ? body.password.slice(0, 500) : '';
  if (!email || !password) return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  let response: Response;
  try {
    response = await fetch(`${cmsInternalUrl()}/admin/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }), cache: 'no-store' });
  } catch {
    return NextResponse.json({ error: 'CMS authentication service is unavailable.' }, { status: 503 });
  }
  if (!response.ok) return NextResponse.json({ error: 'Invalid BRAINTEK administrator credentials.' }, { status: 401 });
  const result = NextResponse.json({ ok: true });
  result.cookies.set(ADMIN_COOKIE, createAdminSession(email), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 8 * 60 * 60 });
  return result;
}
