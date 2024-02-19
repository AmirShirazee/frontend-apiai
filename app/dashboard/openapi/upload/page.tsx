"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFileMetadata,
  setToast,
  setUploadProgress,
} from "@/redux/uploadSlice";
import useAuthCheck from "@/utils/useAuth";
import {
  FileState,
  MultiFileDropzone,
} from "@/app/components/multi-file-dropzone";
import Toast03 from "@/app/components/toast-03";
import LoadingButton from "@/app/components/LoadingButton";
import updateUserNotificationsStatus from "@/utils/updateUserNotification";
import { backendHost } from "@/utils/backendHost";

const FileUploadComponent: React.FC = () => {
  const isLoadingAuth = useAuthCheck();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const uploadState = useSelector((state: any) => state.upload);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session, status]);

  const updateToastState = (newState: typeof uploadState.toast) => {
    dispatch(setToast(newState));
  };

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find((fs) => fs.key === key);
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const handleUploadClick = async () => {
    if (fileStates.length === 0) {
      return;
    }

    setIsSubmitted(true);
    setIsUploading(true);

    for (const fileState of fileStates) {
      if (
        fileState.progress !== "UPLOADING" &&
        fileState.progress !== "COMPLETE"
      ) {
        updateFileProgress(fileState.key, "UPLOADING");
        await handleFileUpload(fileState);
      }
    }

    setIsUploading(false);
    setIsSubmitted(false);
  };

  const showSuccessToast = () => {
    dispatch(
      setToast({
        open: true,
        type: "success",
        message:
          "File uploaded successfully! You will be redirected shortly. Please wait...",
      })
    );
  };
  async function handleFileUpload(fileState: FileState) {
    if (!userId) {
      console.error("User ID is not set. Cannot proceed with file upload.");
      return;
    }
    updateFileProgress(fileState.key, "PENDING");

    const formData = new FormData();
    formData.append("file", fileState.file);

    dispatch(
      setFileMetadata({ name: fileState.file.name, size: fileState.file.size })
    );

    try {
      const response = await fetch(`${backendHost}/api/upload/${userId}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await response.json();
        dispatch(setUploadProgress(100));

        await updateUserNotificationsStatus(userId, true);

        showSuccessToast();
        setFileStates((currentFiles) =>
          currentFiles.filter((fs) => fs.key !== fileState.key)
        );
        updateFileProgress(fileState.key, "COMPLETE");
        setTimeout(() => {
          window.location.href = "/dashboard/tests/view";
        }, 3000);
      } else {
        await response.text();
        dispatch(
          setToast({
            open: true,
            type: "error",
            message: "File upload failed.",
          })
        );
        updateFileProgress(fileState.key, "ERROR");
      }
    } catch (error) {
      dispatch(
        setToast({ open: true, type: "error", message: "File upload failed." })
      );
      updateFileProgress(fileState.key, "ERROR");
    }
  }

  if (isLoadingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-3xl mx-auto text-center pb-12'>
      <div className='toast-container fixed top-16 right-0 z-50'>
        <Toast03
          open={uploadState.toast.open}
          setOpen={() =>
            updateToastState({ ...uploadState.toast, open: false })
          }
          type={uploadState.toast.type}
        >
          {uploadState.toast.message}
        </Toast03>
      </div>
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <MultiFileDropzone
            value={fileStates}
            onChange={(files) => {
              setFileStates(files);
            }}
            onFilesAdded={(addedFiles) => {
              setFileStates((currentFiles) => [...currentFiles, ...addedFiles]);
            }}
          />
          <LoadingButton
            onClick={handleUploadClick}
            initialText='Upload file'
            loadingText='Processing'
          />
        </div>
      </div>
    </div>
  );
};

export default FileUploadComponent;
