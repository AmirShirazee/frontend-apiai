import type { NextRequest } from 'next/server';
import User from '@/shared/models/user.model';
import { errorResponse, successResponse } from '@/utils/responseMsgs';
import connectDB from '@/db/mongo';

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return new Response(null, {
      status: 405,
      headers: {
        Allow: 'GET',
      },
    });
  }

  await connectDB();

  try {
    const userId = req.nextUrl.pathname.split('/').pop();
    if (!userId) {
      return errorResponse('User ID not provided', 400);
    }
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return errorResponse('User not found', 404);
    }

    return successResponse(user, 200);
  } catch (error) {
    console.error(error);
    return errorResponse('Server error', 500);
  }
}
