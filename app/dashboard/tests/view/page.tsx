"use client";

import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { useGetTestsQuery } from "@/redux/testSlice";
import useAuthCheck from "@/utils/useAuth";
import useUserData from "@/utils/useUserData";
import { defaultEditorOptions } from "@/utils/editorOptions";
import { themes } from "@/utils/themes";
import CodeDisplay from "@/app/components/CodeDisplay";
import EditorSettingsModal from "@/app/components/EditorSettings";
import { EditorOptions } from "@/shared/types/interfaces";

export default function TestPage() {
  const { data: session, status } = useSession();
  const isLoadingAuth = useAuthCheck();
  const [theme, setTheme] = useState<string>("github_dark");
  const [userId, setUserId] = useState<string | null>(null);
  const {
    editorSettings,
    isLoading: isLoadingEditorSettings,
    allData,
  } = useUserData(session!, status);
  const [editorOptions, setEditorOptions] =
    useState<EditorOptions>(defaultEditorOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
      setEditorOptions(editorSettings || defaultEditorOptions);
    }
  }, [session, editorSettings]);

  useEffect(() => {
    const fetchAndApplyUserSettings = async () => {
      if (session?.user?.id && session?.user.token) {
        setEditorOptions(editorSettings!);
      } else {
        setEditorOptions(defaultEditorOptions);
      }
    };

    fetchAndApplyUserSettings();
  }, [editorSettings, session]);

  const { data, isLoading, isError } = useGetTestsQuery(userId!, {
    skip: !userId,
  });

  const renderThemeButtons = (themeList: string[], label: string) => (
    <div className='px-4 py-2'>
      <p className='text-xs uppercase tracking-wide text-gray-500'>{label}</p>
      {themeList.map((themeOption) => (
        <button
          key={themeOption}
          className={`text-gray-700 dark:text-gray-200 group flex w-full items-center px-4 py-2 text-sm`}
          onClick={() => {
            setTheme(themeOption);
            setIsModalOpen(false);
          }}
        >
          {themeOption}
        </button>
      ))}
    </div>
  );

  if (isLoadingAuth || isLoading || isLoadingEditorSettings) {
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
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    );
  }

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

  if (!allData?.didUpload) {
    return (
      <div className='dashboard-container'>
        <div className='dashboard-content'>
          <div
            className='user-action'
            onClick={() => (window.location.href = "/dashboard/openapi/upload")}
          >
            <p className='user-action-message'>
              Upload a new file to generate tests.
            </p>
            <button className='user-action-button'>Upload File</button>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className='error-message'>Error fetching tests</div>;
  }

  const testCode = data?.code || "";

  return (
    <div
      className='editor-layout'
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div className='tabs-with-dropdowns' style={{ paddingLeft: "40px" }}>
        {" "}
        {/* Increased left padding */}
        <Menu as='div' className='relative inline-block text-left z-50'>
          {" "}
          <Menu.Button className='text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap flex items-center'>
            {/* Replace with File SVG icon */}
            <span>File</span>
            <svg
              className='w-4 h-4 ml-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
            </svg>
          </Menu.Button>
          <Transition
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Menu.Items
              as='ul'
              className='absolute z-10 mt-2 w-56 origin-top-right bg-white dark:bg-slate-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            >
              <Menu.Item>
                {({ active }) => (
                  <a
                    href='#download'
                    className={`${
                      active ? "bg-gray-100 dark:bg-slate-600" : ""
                    } group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                  >
                    Download
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href='#openapi'
                    className={`${
                      active ? "bg-gray-100 dark:bg-slate-600" : ""
                    } group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                  >
                    View OpenAPI
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as='div' className='relative inline-block text-left z-50'>
          <Menu.Button className='text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center'>
            Theme
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter='transition ease-out duration-125'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='transition ease-in duration-125'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Menu.Items
              as='div'
              className='absolute z-10 mt-2 origin-top-right bg-white dark:bg-slate-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none min-w-max'
              style={{
                left: "150%",
                top: "100%",
                transform: "translateX(-50%)",
              }}
            >
              {renderThemeButtons(themes.dark, "Dark Themes")}
              {renderThemeButtons(themes.light, "Light Themes")}
            </Menu.Items>
          </Transition>
        </Menu>
        <button
          className='preferences-button text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          onClick={() => setIsModalOpen(true)}
          style={{ marginLeft: "10px" }}
        >
          Preferences
        </button>
      </div>

      <div
        className='test-page-container'
        style={{
          flexGrow: 1,
          padding: "20px",
          overflow: "auto",
          marginLeft: "20px",
        }}
      >
        <CodeDisplay
          code={testCode}
          darkMode={true}
          editorOptions={editorOptions!}
          theme={theme}
        />
      </div>
      <EditorSettingsModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        editorOptions={editorOptions!}
        setEditorOptions={setEditorOptions}
        userId={userId}
      />
    </div>
  );
}
