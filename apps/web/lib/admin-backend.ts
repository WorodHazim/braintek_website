import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifyAdminSession } from './admin-session';

export function cmsInternalUrl() {
  return (process.env.CMS_INTERNAL_URL || process.env.CMS_URL || 'http://cms:1337').replace(/\/$/, '');
}

function dashboardKey() {
  const value = process.env.DASHBOARD_API_KEY;
  if (!value && process.env.NODE_ENV === 'production') throw new Error('DASHBOARD_API_KEY is required.');
  return value || 'braintek-local-dashboard-key-change-before-production';
}

export function sessionFromRequest(request: NextRequest) {
  return verifyAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);
}

export async function dashboardFetch(request: NextRequest, path: string, init: RequestInit = {}) {
  const session = sessionFromRequest(request);
  if (!session) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  const headers = new Headers(init.headers);
  headers.set('x-braintek-dashboard-key', dashboardKey());
  headers.set('x-braintek-dashboard-user', session.email);
  if (init.body && !headers.has('content-type')) headers.set('content-type', 'application/json');
  const response = await fetch(`${cmsInternalUrl()}${path}`, { ...init, headers, cache: 'no-store' });
  const text = await response.text();
  return new NextResponse(text, { status: response.status, headers: { 'content-type': response.headers.get('content-type') || 'application/json' } });
}
