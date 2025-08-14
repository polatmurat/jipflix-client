import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const logService = createApi({
  reducerPath: 'logs',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.jipflix.com/api/',
    prepareHeaders: (headers) => {
      const admin = localStorage.getItem('admin-token');
      const user = localStorage.getItem('user-token');
      const token = admin || user;
      if (token) headers.set('Authorization', `OBSS ${token}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    listErrors: builder.query({
      query: (params) => ({ url: 'logs/errors', method: 'GET', params }),
    }),
    listAudits: builder.query({
      query: (params) => ({ url: 'logs/audits', method: 'GET', params }),
    })
  })
});

export const { useListErrorsQuery, useListAuditsQuery } = logService;
export default logService;


