'use client';

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLogo from '../auth-logo';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const [error, setError] = useState('');
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [sessionStatus, router]);

  const loginUser = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || username.length < 4) {
      setError('Username is invalid');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password is invalid');
      return;
    }

    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError('Invalid username or password');
      if (res?.url) router.replace('/dashboard');
    } else {
      setError('');
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto text-center pb-12">
        <AuthLogo />
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Sign in to your account
        </h1>
      </div>

      <div className="max-w-sm mx-auto">
        <form onSubmit={loginUser}>
          <div className="space-y-4">
            {/* Username input */}
            <div>
              <label htmlFor="username" className="block text-sm text-slate-300 font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                className="form-input w-full"
                type="text"
                required
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>
            {/* Password input */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm text-slate-300 font-medium mb-1">
                  Password
                </label>
                <Link
                  href="/reset-password"
                  className="text-sm font-medium text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out ml-2"
                >
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                className="form-input w-full"
                type="password"
                autoComplete="on"
                required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            {/* Error message display */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </div>

          {/* Sign In button with loading state */}
          <div className="mt-6">
            <button
              className={`btn text-sm text-white bg-purple-500 hover:bg-purple-600 w-full shadow-sm group ${
                isLoading
                  ? 'disabled:border-slate-200 dark:disabled:border-slate-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed'
                  : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                    <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                  </svg>
                  <span className="ml-2">Loading</span>
                </>
              ) : (
                <>
                  Sign In
                  <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    -&gt;
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Sign up link */}
        <div className="text-center mt-4">
          <div className="text-sm text-slate-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
