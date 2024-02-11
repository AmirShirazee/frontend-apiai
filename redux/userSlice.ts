import { createApi, fetchBaseQuery, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { EditorOptions } from '@/shared/types/interfaces';

interface EditorSettingsUpdateRequest {
  userId: string;
  editorOptions: EditorOptions;
}

// Define types for requests and responses
interface UserSignup {
  username: string;
  email: string;
  password: string;
}
interface UserResponse {
  id: string;
  username: string;
  email: string;
  message: string;
}
interface PasswordResetRequest {
  email: string;
}

interface ApiResponse {
  message: string;
  user?: UserResponse;
  status?: number;
}

// Common function for response transformation
function transformApiResponse<T extends ApiResponse>(
  response: unknown,
  meta: FetchBaseQueryMeta | undefined,
): T {
  if (meta?.response?.status === 200 && typeof response === 'object' && response !== null) {
    if ('message' in response) {
      return response as T;
    }
    throw new Error('Invalid response structure');
  } else {
    let errorMessage = 'An unknown error occurred';
    if (typeof response === 'object' && response !== null && 'error' in response) {
      const errorResponse = response as { error: { message: string } };
      errorMessage = errorResponse.error.message || errorMessage;
    }
    throw new Error(errorMessage);
  }
}

// Define a response type for the password reset process
interface PasswordResetResponse {
  message: string;
}

// Define a response type for the signup process
interface SignupResponse {
  message: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation<SignupResponse, UserSignup>({
      query: (user) => ({
        url: '/users/register',
        method: 'POST',
        body: user,
      }),
      transformResponse: (response, meta) => transformApiResponse<ApiResponse>(response, meta),
    }),
    // Inside your userApi endpoints
    resetPassword: builder.mutation<PasswordResetResponse, PasswordResetRequest>({
      query: (data) => ({
        url: '/users/password-reset',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response, meta) => transformApiResponse<ApiResponse>(response, meta),
    }),
    fetchUser: builder.query<UserResponse, string>({
      query: (userId) => `/users/${userId}`,
    }),
    updateEditorSettings: builder.mutation<UserResponse, EditorSettingsUpdateRequest>({
      query: ({ userId, editorOptions }) => ({
        url: `/users/profile/${userId}`,
        method: 'PUT',
        body: { editorSettings: editorOptions },
      }),
      transformResponse: (response, meta) => transformApiResponse<UserResponse>(response, meta),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useFetchUserQuery,
  useResetPasswordMutation,
  useUpdateEditorSettingsMutation,
} = userApi;
