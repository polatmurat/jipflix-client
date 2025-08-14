import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const healthService = createApi({
  reducerPath: 'healthApi',
  tagTypes: ['Health'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.jipflix.com/',
    prepareHeaders: (headers) => {
      const admin = localStorage.getItem('admin-token');
      if (admin) headers.set('Authorization', `OBSS ${admin}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getSystemHealth: builder.query({
      query: () => ({ url: 'health/aggregate', method: 'GET' }),
      providesTags: ['Health'],
      // Cache for 30 seconds
      keepUnusedDataFor: 30,
    })
  })
});

export const { 
  useGetSystemHealthQuery
} = healthService;

export default healthService;
