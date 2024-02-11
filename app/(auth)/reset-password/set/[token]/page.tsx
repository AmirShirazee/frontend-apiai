'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AuthLogo from '../../../auth-logo';
import { ToastType } from '@/shared/types/toast';
import { isStrongPassword } from '@/shared/models/validations/user.validation';
import Tooltip from '@/app/components/tooltip';
import Toast03 from '@/app/components/toast-03';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [toast, setToast] = useState<{
    open: boolean;
    type: ToastType;
    message: string;
  }>({
    open: false,
    type: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      setToast({
        open: true,
        type: 'error',
        message: 'Passwords do not match',
      });
      return;
    }

    if (!isStrongPassword(newPassword)) {
      setToast({
        open: true,
        type: 'error',
        message: 'Password does not meet strength requirements',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/users/password-reset/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token, newPassword }),
      });

      const messageData = await response.json();
      setLoading(false);

      if (!response.ok) {
        setToast({
          open: true,
          type: 'error',
          message: messageData.message || 'Failed to reset password',
        });
        return;
      }

      setToast({
        open: true,
        type: 'success',
        message: messageData.message || 'Password successfully reset',
      });
      setTimeout(() => router.push('/signin'), 3000);
    } catch (error) {
      setLoading(false);
      setToast({
        open: true,
        type: 'error',
        message: 'Failed to reset password',
      });
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto text-center pb-12">
        <AuthLogo />
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Reset your password
        </h1>
      </div>
      <div className="max-w-sm mx-auto">
        <form onSubmit={resetPassword}>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="newPassword" className="text-sm text-slate-300 font-medium">
                  New Password
                </label>
                <Tooltip size="lg" bg="dark" position={'right'}>
                  <div className="text-sm font-medium text-slate-200">
                    Password must be at least 8 characters long, include uppercase and lowercase
                    letters, a number, and a special character.
                  </div>
                </Tooltip>
              </div>
              <input
                id="newPassword"
                type="password"
                className="form-input w-full"
                required
                value={data.newPassword}
                onChange={(e) => setData({ ...data, newPassword: e.target.value })}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="confirmPassword" className="text-sm text-slate-300 font-medium">
                  Confirm Password
                </label>
              </div>
              <input
                id="confirmPassword"
                type="password"
                className="form-input w-full"
                required
                value={data.confirmPassword}
                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 w-full shadow-sm group"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Reset Password →'}
            </button>
          </div>
        </form>
      </div>

      {toast.open && (
        <div className="fixed top-0 right-0 p-4">
          <Toast03
            open={toast.open}
            setOpen={(open) => setToast({ ...toast, open })}
            type={toast.type}
          >
            {toast.message}
          </Toast03>
        </div>
      )}
    </>
  );
}
