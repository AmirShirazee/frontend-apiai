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

        {/* Divider */}
        <div className="flex items-center my-6">
          <div
            className="border-t border-slate-800 grow mr-3"
            aria-hidden="true"
          />
          <div className="text-sm text-slate-500 italic">or</div>
          <div
            className="border-t border-slate-800 grow ml-3"
            aria-hidden="true"
          />
        </div>

        {/* Social login */}
        {/*<div className="flex space-x-3">*/}
        {/*  <button className="btn text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none h-9">*/}
        {/*    <span className="relative">*/}
        {/*      <span className="sr-only">Continue with Twitter</span>*/}
        {/*      <svg*/}
        {/*        className="fill-current"*/}
        {/*        xmlns="http://www.w3.org/2000/svg"*/}
        {/*        width="14"*/}
        {/*        height="12"*/}
        {/*      >*/}
        {/*        <path d="m4.34 0 2.995 3.836L10.801 0h2.103L8.311 5.084 13.714 12H9.482L6.169 7.806 2.375 12H.271l4.915-5.436L0 0h4.34Zm-.635 1.155H2.457l7.607 9.627h1.165L3.705 1.155Z" />*/}
        {/*      </svg>*/}
        {/*    </span>*/}
        {/*  </button>*/}
        {/*  <button className="btn text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none h-9">*/}
        {/*    <span className="relative">*/}
        {/*      <span className="sr-only">Continue with GitHub</span>*/}
        {/*      <svg*/}
        {/*        className="fill-current"*/}
        {/*        xmlns="http://www.w3.org/2000/svg"*/}
        {/*        width="16"*/}
        {/*        height="15"*/}
        {/*      >*/}
        {/*        <path d="M7.488 0C3.37 0 0 3.37 0 7.488c0 3.276 2.153 6.084 5.148 7.113.374.094.468-.187.468-.374v-1.31c-2.06.467-2.527-.936-2.527-.936-.375-.843-.843-1.124-.843-1.124-.655-.468.094-.468.094-.468.749.094 1.123.75 1.123.75.655 1.216 1.778.842 2.153.654.093-.468.28-.842.468-1.03-1.685-.186-3.37-.842-3.37-3.743 0-.843.281-1.498.75-1.966-.094-.187-.375-.936.093-1.965 0 0 .655-.187 2.059.749a6.035 6.035 0 0 1 1.872-.281c.655 0 1.31.093 1.872.28 1.404-.935 2.059-.748 2.059-.748.374 1.03.187 1.778.094 1.965.468.562.748 1.217.748 1.966 0 2.901-1.778 3.463-3.463 3.65.281.375.562.843.562 1.498v2.059c0 .187.093.468.561.374 2.996-1.03 5.148-3.837 5.148-7.113C14.976 3.37 11.606 0 7.488 0Z" />*/}
        {/*      </svg>*/}
        {/*    </span>*/}
        {/*  </button>*/}
        {/*</div>*/}
      </div>
    </>
  );
}
