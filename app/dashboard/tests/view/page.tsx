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
import Toast03 from "@/app/components/toast-03";
import { ToastType } from "@/shared/types/toast";
import LoadingDots from "@/app/components/loading-dots";

export default function TestPage() {
  const { data: session, status } = useSession();
  const isLoadingAuth = useAuthCheck();
  const [theme, setTheme] = useState<string>("github_dark");
  const [userId, setUserId] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const {
    editorSettings,
    isLoading: isLoadingEditorSettings,
    allData,
  } = useUserData(session!, status);
  const [editorOptions, setEditorOptions] =
    useState<EditorOptions>(defaultEditorOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    type: ToastType;
    message: string;
  }>({
    open: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
      setUserToken(session.user.token);
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
    <div className="px-4 py-2">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
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
        className="loading-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoadingDots className="text-primary" text="Initializing..." />{" "}
      </div>
    );
  }

  if (!editorOptions) {
    return <LoadingDots className="text-primary" text="Initializing..." />;
  }

  if (!userId) {
    return (
      <div
        className="loading-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Initializing..</span>
        </Spinner>
      </div>
    );
  }

  if (!allData?.didUpload) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div
            className="user-action"
            onClick={() => (window.location.href = "/dashboard/openapi/upload")}
          >
            <p className="user-action-message">
              Upload a new file to generate tests.
            </p>
            <button className="user-action-button">Upload File</button>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="error-message">Error fetching tests</div>;
  }

  const testCode = data?.code || "";

  const handleTestsDownload = async () => {
    try {
      const response = await fetch(`/api/tests/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to download the file");
      }
      const data = await response.json();
      const blob = new Blob([data.code], { type: "text/plain" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = "testFile.ts";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);

      setToast({
        open: true,
        type: "success",
        message: "File is being downloaded.",
      });
    } catch (error) {
      console.error("Download error:", error);

      setToast({
        open: true,
        type: "error",
        message: "Error downloading the file. Please try again later.",
      });
    }
  };

  const handleOpenApiDownload = async () => {
    try {
      const response = await fetch(
        `https://api.testopenapi.com/backend/api/upload/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to download the file");
      }

      const data = await response.json();
      // Assuming data.uploads[0] is your JSON object and already parsed from JSON string to an object
      const blob = new Blob([JSON.stringify(data.uploads[0], null, 2)], {
        type: "application/json",
      });

      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = "openapi.json"; // Name of the file to be downloaded
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);

      setToast({
        open: true,
        type: "success",
        message: "File is being downloaded.",
      });
    } catch (error) {
      console.error("Download error:", error);

      setToast({
        open: true,
        type: "error",
        message: "Error downloading the file. Please try again later.",
      });
    }
  };

  return (
    <>
      <div
        className="editor-layout"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <div className="tabs-with-dropdowns" style={{ paddingLeft: "40px" }}>
          {" "}
          {/* Increased left padding */}
          <Menu as="div" className="relative inline-block text-left z-50">
            {" "}
            <Menu.Button className="text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap flex items-center">
              {/* Replace with File SVG icon */}
              <span>File</span>
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
              </svg>
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items
                as="ul"
                className="absolute z-10 mt-2 w-56 origin-top-right bg-white dark:bg-slate-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleTestsDownload}
                      className={`${
                        active ? "bg-gray-100 dark:bg-slate-600" : ""
                      } group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                    >
                      Download Tests
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleOpenApiDownload}
                      className={`${
                        active ? "bg-gray-100 dark:bg-slate-600" : ""
                      } group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                    >
                      Download OpenAPI
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
          <Menu as="div" className="relative inline-block text-left z-50">
            <Menu.Button className="text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center">
              Theme
            </Menu.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-125"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-125"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Menu.Items
                as="div"
                className="absolute z-10 mt-2 origin-top-right bg-white dark:bg-slate-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none min-w-max"
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
            className="preferences-button text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            onClick={() => setIsModalOpen(true)}
            style={{ marginLeft: "10px" }}
          >
            Preferences
          </button>
        </div>
        {/*position to the right*/}
        <div className="toast-container fixed top-16 right-0 z-50">
          <Toast03
            open={toast.open}
            setOpen={(open) => setToast({ ...toast, open })}
            type={toast.type}
          >
            {toast.message}
          </Toast03>
        </div>

        <div
          className="test-page-container"
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
    </>
  );
}
