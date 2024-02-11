'use client';
import React, { useState } from 'react';
import { useResetPasswordMutation } from '@/redux/userSlice';
import AuthLogo from '../auth-logo';
import { ToastType } from '@/shared/types/toast';
import Toast03 from '@/app/components/toast-03';

export default function ResetPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState<{
    open: boolean;
    type: ToastType;
    message: string;
  }>({
    open: false,
    type: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { message } = await resetPassword({ email }).unwrap();
      setToast({
        open: true,
        type: 'success',
        message: message || 'Password reset email sent',
      });
    } catch (error) {
      const errorMessage =
        // @ts-ignore
        error.data?.message || error.error || 'An unexpected error occurred';
      setToast({
        open: true,
        type: 'error',
        message: 'Reset failed: ' + errorMessage,
      });
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto text-center pb-12">
        <div className="toast-container">
          <Toast03
            open={toast.open}
            setOpen={(open) => setToast({ ...toast, open })}
            type={toast.type}
          >
            {toast.message}
          </Toast03>
        </div>
        <AuthLogo />
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Reset your password
        </h1>
      </div>

      <div className="max-w-sm mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="form-input w-full"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 w-full shadow-sm group"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                    <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                  </svg>
                  <span className="ml-2">Processing...</span>
                </>
              ) : (
                'Reset Password →'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
