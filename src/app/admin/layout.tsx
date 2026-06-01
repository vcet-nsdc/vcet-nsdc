import { auth } from '@/auth';
import AdminNav from '@/components/admin/AdminNav';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Login page (and any unauthenticated view) renders without the dashboard nav.
  if (!session?.user) return <>{children}</>;

  return (
    <div className="min-h-full w-full">
      <AdminNav role={session.user.role} name={session.user.name ?? 'Admin'} />
      {children}
    </div>
  );
}
