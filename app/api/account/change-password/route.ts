import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import parseJSON from '@/shared/utils/parseJSON';
import User from '@/shared/models/user.model';
import connectDB from '@/db/mongo';

interface ChangePasswordPayload {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export async function PUT(req: NextRequest) {
  await connectDB();

  if (!req.body) {
    return new Response(JSON.stringify({ message: 'Request body is missing' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const requestBody: ChangePasswordPayload = await parseJSON(req.body);

  const { email, oldPassword, newPassword } = requestBody;

  if (!email || !oldPassword || !newPassword) {
    return new Response(
      JSON.stringify({
        message: 'Email, old password, and new password are required',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Compare the old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Incorrect old password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash the new password and update user
    user.password = newPassword;
    await user.hashPassword();
    await user.save();

    return new Response(JSON.stringify({ message: 'Password successfully changed' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
