"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 min-w-[15rem] md:space-y-3">
      {/* Group 1 */}
      <div>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-3">
          Business settings
        </div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <Link
              href="/settings/account"
              className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${
                pathname.includes("/settings/account") &&
                "bg-indigo-50 dark:bg-indigo-500/30"
              }`}
            >
              <svg
                className={`w-4 h-4 shrink-0 fill-current mr-2 ${
                  pathname.includes("/settings/account")
                    ? "text-indigo-500 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500"
                }`}
                viewBox="0 0 16 16"
              >
                <path d="M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z" />
              </svg>
              <span
                className={`text-sm font-medium ${
                  pathname.includes("/settings/account")
                    ? "text-indigo-500 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                My Account
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
