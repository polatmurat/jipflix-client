import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const directorsService = createApi({
  reducerPath: 'directors',
  tagTypes: ['Directors'],
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
    getDirectors: builder.query({
      query: () => ({ url: 'directors', method: 'GET' }),
      providesTags: [{ type: 'Directors', id: 'LIST' }]
    }),
    getDirectorsPaged: builder.query({
      query: ({ term = '', page = 0, size = 20, sortBy = 'id', sortDir = 'asc' } = {}) => ({
        url: 'directors/paged',
        method: 'GET',
        params: { term, page, size, sortBy, sortDir }
      }),
      providesTags: [{ type: 'Directors', id: 'LIST' }]
    }),
    createDirector: builder.mutation({
      query: (body) => ({ url: 'directors', method: 'POST', body }),
      invalidatesTags: [{ type: 'Directors', id: 'LIST' }]
    }),
    updateDirector: builder.mutation({
      query: ({ id, body }) => ({ url: `directors/${id}`, method: 'PUT', body }),
      invalidatesTags: [{ type: 'Directors', id: 'LIST' }]
    }),
    deleteDirector: builder.mutation({
      query: (id) => ({ url: `directors/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Directors', id: 'LIST' }]
    })
  })
});

export const { useGetDirectorsQuery, useGetDirectorsPagedQuery, useCreateDirectorMutation, useUpdateDirectorMutation, useDeleteDirectorMutation } = directorsService;
export default directorsService;


