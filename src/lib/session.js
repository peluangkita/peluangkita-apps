import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function getCurrentUser(req, res) {
  const session = await getServerSession(authOptions);

  return session;
}