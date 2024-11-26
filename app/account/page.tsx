import Account from './components/account';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/authOptions';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/login');
  }

  return <Account />;
}
