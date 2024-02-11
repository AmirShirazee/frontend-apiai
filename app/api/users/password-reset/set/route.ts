import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/shared/models/user.model';
import parseJSON from '@/shared/utils/parseJSON';
import connectDB from '@/db/mongo';
import { createResetConfirmationEmail, sendEmail } from '@/shared/services/email.service';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Invalid request method' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!req.body) {
    return new Response(JSON.stringify({ message: 'No request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { token, newPassword } = await parseJSON(req.body);

  if (!token || !newPassword) {
    return new Response(JSON.stringify({ message: 'Token and new password are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await connectDB();
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid or expired token' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash the new password
    const salt: string = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);
    user.passwordResetToken = '';
    user.passwordResetExpires = null;
    await user.save();

    // Send password reset confirmation email
    const confirmationEmail = createResetConfirmationEmail(user.email);
    await sendEmail(confirmationEmail);

    return new Response(JSON.stringify({ message: 'Password has been successfully reset' }), {
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
