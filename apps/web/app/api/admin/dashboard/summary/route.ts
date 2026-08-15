import { NextRequest } from 'next/server';
import { dashboardFetch } from '@/lib/admin-backend';
export async function GET(request: NextRequest) { return dashboardFetch(request, '/api/dashboard/summary'); }
