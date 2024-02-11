//@ts-nocheck
"use client";

import { useState } from "react";

const LoadingButton = ({ initialText, loadingText, onClick, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async (event: any) => {
    setIsLoading(true);
    if (!isLoading) {
      await onClick(event);
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`btn text-sm text-white bg-purple-500 hover:bg-purple-600 w-full shadow-sm group ${
        isLoading
          ? "disabled:border-slate-200 dark:disabled:border-slate-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed"
          : ""
      }`}
      disabled={isLoading}
      type="submit"
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin w-4 h-4 fill-current shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
          </svg>
          <span className="ml-2">{loadingText}</span>
        </>
      ) : (
        <>{initialText}</>
      )}
    </button>
  );
};

export default LoadingButton;
