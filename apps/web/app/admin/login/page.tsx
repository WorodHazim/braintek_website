import { redirect } from 'next/navigation';
import { currentAdminSession } from '@/lib/admin-session';
import { AdminLogin } from '@/components/admin/AdminLogin';
export const metadata = { title: 'Admin Login | BRAINTEK', robots: { index: false, follow: false } };
export default async function Page() {
  if (await currentAdminSession()) redirect('/admin');
  return <AdminLogin />;
}
