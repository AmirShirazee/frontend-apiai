import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import updateUserNotificationsStatus from "@/utils/updateUserNotification";
import { useSession } from "next-auth/react";
import useUserData from "@/utils/useUserData";
import Spinner from "react-bootstrap/Spinner";

export type NotificationItem = {
  message: string;
  date: string;
  link?: string;
  isRead?: boolean;
};

export type DropdownNotificationsProps = {
  align?: "left" | "right";
  notifications: NotificationItem[];
};

export default function DropdownNotifications({
  align,
  notifications,
}: DropdownNotificationsProps) {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const { allData, isLoading } = useUserData(session!, status);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (!isLoading && allData) {
      setHasUnread(allData.hasUnreadNotifications);
    }
  }, [allData, isLoading]);

  if (!userId) {
    return (
      <div
        className='loading-container'
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner animation='border' role='status' variant='light'>
          <span className='visually-hidden'>Initializing..</span>
        </Spinner>
      </div>
    );
  }

  const markAsRead = async () => {
    if (userId) {
      try {
        const result = await updateUserNotificationsStatus(userId, false);
        setHasUnread(false);
      } catch (error) {
        console.error("Failed to update unread notifications status", error);
      }
    }
  };

  return (
    <Menu as='div' className='relative inline-flex'>
      {({ open }) => (
        <>
          <Menu.Button
            className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ${
              open && "bg-slate-200"
            }`}
          >
            <span className='sr-only'>Notifications</span>
            {/* Notification icon */}
            <svg
              className='w-4 h-4'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                className='fill-current text-slate-500 dark:text-slate-400'
                d='M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z'
              />
              <path
                className='fill-current text-slate-400 dark:text-slate-500'
                d='M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z'
              />
            </svg>
            {hasUnread && (
              <div className='absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-[#182235] rounded-full'></div>
            )}
          </Menu.Button>
          <Transition
            className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-[20rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
              align === "right" ? "right-0" : "left-0"
            }`}
            enter='transition ease-out duration-200 transform'
            enterFrom='opacity-0 -translate-y-2'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-out duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-4'>
              Notifications
            </div>

            {/* Notification list */}
            <Menu.Items as='ul' className='focus:outline-none'>
              {notifications.map((notification, index) => (
                <Menu.Item
                  as='li'
                  key={index}
                  className='border-b border-slate-200 dark:border-slate-700 last:border-0'
                >
                  {({ active }) => (
                    <Link href={notification.link || "#"} onClick={markAsRead}>
                      <div // Use div or another element as per your design needs, if not wrapping with <a>
                        className={`block py-2 px-4 ${
                          active ? "bg-slate-50 dark:bg-slate-700/20" : ""
                        }`} // Correctly closed template literal and braces
                      >
                        <span className='block text-sm mb-2'>
                          📣{" "}
                          <span className='font-medium text-slate-800 dark:text-slate-100'>
                            {notification.message}
                          </span>
                        </span>
                        <span className='block text-xs font-medium text-slate-400 dark:text-slate-500'>
                          {notification.date}
                        </span>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
