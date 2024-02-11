'use client';

import { useEffect, useState } from 'react';
import { useAppProvider } from '@/app/app-provider';
import DropdownNotifications, { NotificationItem } from '../dropdown-notifications';
import DropdownProfile from '../dropdown-profile';
import getUser from '@/utils/getUser';

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useAppProvider();
  const { userData, isLoading, error } = getUser();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    // Create notifications based on userData
    if (!isLoading && !error && userData) {
      const newNotifications: NotificationItem[] = [];

      if (userData.data.didUpload) {
        newNotifications.push({
          message: 'You can view your generated tests!',
          date: userData.data.uploadedAtDate,
          link: '/dashboard/tests/view',
        });
      } else {
        newNotifications.push({
          message: 'Please upload a file to generate tests.',
          date: new Date().toLocaleDateString(),
          link: '/dashboard/openapi/upload',
        });
      }

      setNotifications(newNotifications);
    }
  }, [userData, isLoading, error]);

  return (
    <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <DropdownNotifications align="right" notifications={notifications} />
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            <DropdownProfile align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}
