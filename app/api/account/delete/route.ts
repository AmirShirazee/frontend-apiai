import type { NextRequest } from 'next/server';
import { DeleteResult } from 'mongodb';
import User from '@/shared/models/user.model';
import validateToken from '@/utils/validateToken';
import secret from '@/shared/config/secret';

export async function DELETE(req: NextRequest) {
  const token = await validateToken(req, secret);
  const requestClone = req.clone();
  const requestBody = await requestClone.json();
  const emailToDelete = requestBody.email;

  // Ensure that the email matches the authenticated user's email
  if (token!.email !== emailToDelete) {
    return new Response(
      JSON.stringify({
        message: 'Unauthorized: You can only delete your own account.',
      }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  try {
    // @ts-ignore
    await deleteUserRelatedData(token?.user);
    const deleteResult: DeleteResult = await User.deleteOne({
      email: token!.email,
    });

    if (!deleteResult.deletedCount) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Account deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
