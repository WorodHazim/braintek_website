import { NextRequest } from 'next/server';
import { dashboardFetch } from '@/lib/admin-backend';
export async function GET(request: NextRequest, { params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  return dashboardFetch(request, `/api/dashboard/submissions/${encodeURIComponent(documentId)}`);
}
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  return dashboardFetch(request, `/api/dashboard/submissions/${encodeURIComponent(documentId)}`, { method: 'PATCH', body: await request.text() });
}
