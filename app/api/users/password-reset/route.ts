import type { NextRequest } from 'next/server';
import User from '@/shared/models/user.model';
import { errorResponse } from '@/utils/responseMsgs';
import parseJSON from '@/shared/utils/parseJSON';
import { generateSecureToken } from '@/shared/utils/generateToken';
import { createResetPasswordEmail, sendEmail } from '@/shared/services/email.service';
import connectDB from '@/db/mongo';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return errorResponse('Invalid request method', 405);
  }

  if (!req.body) {
    return new Response(JSON.stringify({ message: 'No request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const requestBody = await parseJSON(req.body);
  const email = requestBody.email;

  if (!email) {
    return new Response(JSON.stringify({ message: 'Email is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({
          message: 'If the email exists, a reset email will be sent',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const oneHourAgo = new Date(Date.now() - 3600000);
    const { passwordResetAttempts } = user;

    if (passwordResetAttempts.lastEvaluated < oneHourAgo) {
      passwordResetAttempts.timestamps = [];
      passwordResetAttempts.count = 0;
    }

    if (passwordResetAttempts.count >= 2) {
      return new Response(JSON.stringify({ message: 'Reset limit reached. Try again later.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    passwordResetAttempts.timestamps.push(new Date());
    passwordResetAttempts.count += 1;
    passwordResetAttempts.lastEvaluated = new Date();
    await user.save();

    const resetToken = generateSecureToken();
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 1800000); // 30 minutes

    await user.save();

    const emailContent = createResetPasswordEmail(email, resetToken);
    await sendEmail(emailContent);

    return new Response(JSON.stringify({ message: 'Reset email sent successfully' }), {
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
