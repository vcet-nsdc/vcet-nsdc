import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import LoginForm from '@/components/admin/LoginForm';

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) redirect('/admin');

  return <LoginForm />;
}
