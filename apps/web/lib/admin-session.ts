import crypto from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'braintek_admin_session';

type AdminSession = { email: string; exp: number };

function getSecret() {
  const value = process.env.DASHBOARD_SESSION_SECRET;
  if (!value && process.env.NODE_ENV === 'production') throw new Error('DASHBOARD_SESSION_SECRET is required.');
  return value || 'braintek-local-session-secret-change-before-production';
}

function sign(payload: string) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

function equal(a: string, b: string) {
  const x = Buffer.from(a); const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export function createAdminSession(email: string) {
  const data: AdminSession = { email, exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60 };
  const payload = Buffer.from(JSON.stringify(data), 'utf8').toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(token?: string) {
  if (!token) return null;
  const [payload, supplied, extra] = token.split('.');
  if (!payload || !supplied || extra || !equal(supplied, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as AdminSession;
    if (!data.email || !data.exp || data.exp <= Math.floor(Date.now() / 1000)) return null;
    return data;
  } catch { return null; }
}

export async function currentAdminSession() {
  const store = await cookies();
  return verifyAdminSession(store.get(ADMIN_COOKIE)?.value);
}
