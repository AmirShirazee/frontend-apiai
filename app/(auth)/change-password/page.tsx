'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLogo from '../auth-logo';
import { ToastType } from '@/shared/types/toast';
import { isStrongPassword } from '@/shared/models/validations/user.validation';
import Toast03 from '@/app/components/toast-03';
import Tooltip from '@/app/components/tooltip';

export default function ChangePassword() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [data, setData] = useState({
    email: '',
    oldPassword: '',
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

  const navigateToMyAccount = () => {
    router.push('/dashboard/settings/account');
  };

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, oldPassword, newPassword, confirmPassword } = data;

    if (!email.includes('@')) {
      setError('Invalid email');
      return;
    }

    if (newPassword === oldPassword) {
      setError('New password must be different from the old password');
      return;
    }

    if (!isStrongPassword(newPassword)) {
      setError('Password does not meet strength requirements');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/account/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      });

      const messageData = await response.json();

      if (!response.ok) {
        setToast({
          open: true,
          type: 'error',
          message: messageData.message || 'Failed to change password',
        });
        return;
      }

      setToast({
        open: true,
        type: 'success',
        message: messageData.message || 'Password successfully changed',
      });
      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    } catch (error) {
      setToast({
        open: true,
        type: 'error',
        message: 'Failed to change password',
      });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 p-4">
        <button
          onClick={navigateToMyAccount}
          className="text-sm bg-slate-300 hover:bg-slate-400 text-slate-800 py-2 px-4 rounded-md shadow-lg"
        >
          ← Return to My Account
        </button>
      </div>
      <div className="fixed top-0 right-0 p-4">
        <Toast03
          open={toast.open}
          setOpen={(open) => setToast({ ...toast, open })}
          type={toast.type}
        >
          {toast.message}
        </Toast03>
      </div>
      <div className="max-w-3xl mx-auto text-center pb-12">
        <AuthLogo />
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Change your password
        </h1>
      </div>

      <div className="max-w-sm mx-auto">
        <form onSubmit={changePassword}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-slate-300 font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input w-full"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm text-slate-300 font-medium mb-1"
              >
                Old Password
              </label>
              <input
                id="oldPassword"
                type="password"
                className="form-input w-full"
                required
                value={data.oldPassword}
                onChange={(e) => setData({ ...data, oldPassword: e.target.value })}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="newPassword" className="block text-sm text-slate-300 font-medium">
                  New Password
                </label>
                <Tooltip size="lg" bg="dark">
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
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-slate-300 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="form-input w-full"
                required
                value={data.confirmPassword}
                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
              />
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 w-full shadow-sm group"
            >
              Change Password{' '}
              <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
