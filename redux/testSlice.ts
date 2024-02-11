import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetTestsResponse {
  code: string;
}

export const testApi = createApi({
  reducerPath: 'test',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Test'],
  endpoints: (builder) => ({
    getTests: builder.query<GetTestsResponse, string | undefined>({
      query: (userId) => `/tests/${userId}`,
    }),
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
});

export const { useGetTestsQuery } = testApi;
