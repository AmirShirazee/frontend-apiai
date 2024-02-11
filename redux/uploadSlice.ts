import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

// Type definitions
type ToastType = 'warning' | 'error' | 'success' | '';

const backendHost = 'http://localhost:1000/api/upload/';

interface ToastPayload {
  open: boolean;
  type: ToastType;
  message: string;
}

interface FileMetadata {
  name: string;
  size: number;
}

export interface FileUploadState {
  fileMetadata: FileMetadata | null;
  uploadProgress: number;
  isFileViewed: boolean;
  toast: {
    open: boolean;
    type: ToastType;
    message: string;
  };
}

// Initial state
const initialState: FileUploadState = {
  fileMetadata: null, // Updated to store only metadata
  uploadProgress: 0,
  isFileViewed: false,
  toast: {
    open: false,
    type: '',
    message: '',
  },
};

export const uploadApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: backendHost }),
  tagTypes: ['Upload'],
  reducerPath: 'upload',
  endpoints: (builder) => ({
    getUploads: builder.query({
      query: (userId) => ({
        url: userId,
      }),
    }),
    getUpload: builder.query({
      query: ({ userId, uploadId }) => ({
        url: `/${userId}/${uploadId}`,
      }),
    }),
    deleteUpload: builder.mutation({
      query: (userId: string) => ({
        url: userId,
        method: 'DELETE',
      }),
    }),
  }),
});

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setFileMetadata: (state, action: PayloadAction<FileMetadata | null>) => {
      state.fileMetadata = action.payload;
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    setIsFileViewed: (state, action: PayloadAction<boolean>) => {
      state.isFileViewed = action.payload;
    },
    setToast: (state, action: PayloadAction<ToastPayload>) => {
      state.toast = action.payload;
    },
  },
});

// Export actions
export const { setFileMetadata, setUploadProgress, setIsFileViewed, setToast } =
  uploadSlice.actions;

export const { useGetUploadsQuery, useGetUploadQuery, useDeleteUploadMutation } = uploadApi;

export default uploadSlice.reducer;
