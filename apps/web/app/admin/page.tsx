import { redirect } from 'next/navigation';
import { currentAdminSession } from '@/lib/admin-session';
import { AdminApp } from '@/components/admin/AdminApp';
export const metadata = { title: 'Operational Dashboard | BRAINTEK', robots: { index: false, follow: false } };
export default async function Page() {
  const session = await currentAdminSession();
  if (!session) redirect('/admin/login');
  return <AdminApp email={session.email} />;
}
