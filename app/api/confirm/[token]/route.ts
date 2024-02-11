import type { NextRequest } from 'next/server';
import TokenService from '@/shared/services/token.service';
import UserService from '@/shared/services/user.service';
import connectDB from '@/db/mongo';

export async function GET(req: NextRequest) {
  await connectDB();

  // Access the dynamic route parameter 'token'
  const token = req.nextUrl.pathname.split('/').pop();
  if (!token) {
    return new Response(JSON.stringify({ message: 'Token is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const tokenRecord = await TokenService.findTokenBy('token', token);

    if (!tokenRecord) {
      return new Response(
        JSON.stringify({
          message: 'We were unable to find a valid token. Your token may have expired.',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const user = await UserService.findUserById(tokenRecord._userId);
    if (!user) {
      return new Response(
        JSON.stringify({
          message: 'We were unable to find a user for this token.',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (user.isVerified) {
      return new Response(
        JSON.stringify({
          message: 'This user has already been verified. Please log in.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    await UserService.setUserVerified(user);
    await UserService.saveUser(user);

    return new Response(
      JSON.stringify({
        message: 'The account has been verified. Please log in.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
