import { NextRequest } from 'next/server';
import { dashboardFetch } from '@/lib/admin-backend';
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.toString();
  return dashboardFetch(request, `/api/dashboard/submissions${q ? `?${q}` : ''}`);
}
