"use client";

import Link from "next/link";
import React, { useState } from "react";
import AuthLogo from "../auth-logo";
import { useSignupUserMutation } from "@/redux/userSlice";
import { ToastType } from "@/shared/types/toast";
import Toast03 from "@/app/components/toast-03";
import Tooltip from "@/app/components/tooltip";

export default function SignUp() {
  const [signupUser, { isLoading }] = useSignupUserMutation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toast, setToast] = useState<{
    open: boolean;
    type: ToastType;
    message: string;
  }>({
    open: false,
    type: "",
    message: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setToast({
        open: true,
        type: "error",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const { message } = await signupUser({
        username,
        email,
        password,
      }).unwrap();

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setToast({
        open: true,
        type: "success",
        message: message,
      });
    } catch (error) {
      const errorMessage =
        // @ts-ignore
        error.data?.message || error.error || "An unexpected error occurred";
      setToast({
        open: true,
        type: "error",
        message: "Signup failed: " + errorMessage,
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
          Create your free account
        </h1>
      </div>

      {/* Form */}
      <div className="max-w-sm mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Username input */}
            <div>
              <label
                className="block text-sm text-slate-300 font-medium mb-1"
                htmlFor="username"
              >
                Username <span className="text-rose-500">*</span>
              </label>
              <input
                id="username"
                className="form-input w-full"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {/* Email input */}
            <div>
              <label
                className="block text-sm text-slate-300 font-medium mb-1"
                htmlFor="email"
              >
                Email <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                className="form-input w-full"
                type="email"
                placeholder="user@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Password input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  className="text-sm text-slate-300 font-medium"
                  htmlFor="password"
                >
                  Password <span className="text-rose-500">*</span>
                </label>
                <Tooltip size="lg" bg="dark" position="right">
                  <div className="text-sm font-medium text-slate-200">
                    Password must be at least 8 characters long, include
                    uppercase and lowercase letters, a number, and a special
                    character.
                  </div>
                </Tooltip>
              </div>
              <input
                id="password"
                className="form-input w-full"
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Confirm password input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  className="text-sm text-slate-300 font-medium"
                  htmlFor="confirmPassword"
                >
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
              </div>
              <input
                id="confirmPassword"
                className="form-input w-full"
                type="password"
                placeholder="Confirm your password"
                autoComplete="on"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Submit button */}
          <div className="mt-6">
            <button
              type="submit"
              className={`btn text-sm text-white bg-purple-500 hover:bg-purple-600 w-full shadow-sm group ${
                isLoading
                  ? "disabled:border-slate-200 dark:disabled:border-slate-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed"
                  : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                  </svg>
                  <span className="ml-2">Processing...</span>
                </>
              ) : (
                <>
                  Sign Up
                  <span className="tracking-normal text-purple-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    -&gt;
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <div className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              className="font-medium text-purple-500 hover:text-purple-400 transition duration-150 ease-in-out"
              href="/signin"
            >
              Sign in
            </Link>
          </div>
        </div>
        {/*Social login*/}
        {/*<div className="flex items-center my-6">*/}
        {/*  <div*/}
        {/*    className="border-t border-slate-800 grow mr-3"*/}
        {/*    aria-hidden="true"*/}
        {/*  />*/}
        {/*  <div className="text-sm text-slate-500 italic">or</div>*/}
        {/*  <div*/}
        {/*    className="border-t border-slate-800 grow ml-3"*/}
        {/*    aria-hidden="true"*/}
        {/*  />*/}
        {/*</div>*/}

        {/*<div className="flex space-x-3">*/}
        {/*  <button className="btn text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none h-9">*/}
        {/*    <span className="relative">*/}
        {/*      <span className="sr-only">Continue with Twitter</span>*/}
        {/*      <svg*/}
        {/*        className="w-8 h-8 fill-current"*/}
        {/*        viewBox="0 0 32 32"*/}
        {/*        xmlns="http://www.w3.org/2000/svg"*/}
        {/*      >*/}
        {/*        <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />*/}
        {/*      </svg>*/}
        {/*    </span>*/}
        {/*  </button>*/}

        {/*  <button className="btn text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none h-9">*/}
        {/*    <span className="relative">*/}
        {/*      <span className="sr-only">Continue with GitHub</span>*/}
        {/*      <svg*/}
        {/*        className="w-8 h-8 fill-current"*/}
        {/*        viewBox="0 0 32 32"*/}
        {/*        xmlns="http://www.w3.org/2000/svg"*/}
        {/*      >*/}
        {/*        <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />*/}
        {/*      </svg>*/}
        {/*    </span>*/}
        {/*  </button>*/}
        {/*  <button className="btn text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none h-9">*/}
        {/*    <span className="relative">*/}
        {/*      <span className="sr-only">Continue with Facebook</span>*/}
        {/*      <svg*/}
        {/*        className="w-8 h-8 fill-current"*/}
        {/*        viewBox="0 0 32 32"*/}
        {/*        xmlns="http://www.w3.org/2000/svg"*/}
        {/*      >*/}
        {/*        <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />*/}
        {/*      </svg>*/}
        {/*    </span>*/}
        {/*  </button>*/}
        {/*  <button className="btn text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none h-9">*/}
        {/*    <span className="relative">*/}
        {/*      <span className="sr-only">Continue with Instagram</span>*/}
        {/*      <svg*/}
        {/*        className="w-8 h-8 fill-current"*/}
        {/*        viewBox="0 0 32 32"*/}
        {/*        xmlns="http://www.w3.org/2000/svg"*/}
        {/*      >*/}
        {/*        <circle cx="20.145" cy="11.892" r="1" />*/}
        {/*        <path d="M16 20c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" />*/}
        {/*        <path d="M20 24h-8c-2.056 0-4-1.944-4-4v-8c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zm-8-14c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2v-8c0-.935-1.065-2-2-2h-8z" />*/}
        {/*      </svg>*/}
        {/*    </span>*/}
        {/*  </button>*/}
        {/*</div>*/}
      </div>
    </>
  );
}
