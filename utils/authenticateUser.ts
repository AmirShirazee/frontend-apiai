import type { NextRequest } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';
import secret from '../shared/config/secret';

export default async function authenticateUser(req: NextRequest): Promise<JWT | null> {
  try {
    return await getToken({ req, secret });
  } catch (error) {
    console.error('Error during authentication:', error);
    return null;
  }
}
