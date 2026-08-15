import { NextRequest } from 'next/server';
import { dashboardFetch } from '@/lib/admin-backend';
export async function POST(request: NextRequest, { params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  return dashboardFetch(request, `/api/dashboard/submissions/${encodeURIComponent(documentId)}/log`, { method: 'POST', body: await request.text() });
}
