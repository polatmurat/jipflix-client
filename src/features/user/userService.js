import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userService = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users', 'Me', 'Preferences'],
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
    getPreferences: builder.query({
      query: () => ({ url: 'users/preferences', method: 'GET' }),
      providesTags: ['Preferences']
    }),
    updatePreferences: builder.mutation({
      query: (genreIds) => ({ url: 'users/preferences', method: 'PUT', body: genreIds }),
      invalidatesTags: ['Preferences']
    }),
    listUsers: builder.query({
      query: ({ page = 0, size = 20 } = {}) => ({ url: `users?page=${page}&size=${size}`, method: 'GET' }),
      providesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    searchUsers: builder.query({
      query: ({ term = '', page = 0, size = 20, sortBy, sortDir } = {}) => ({
        url: 'users/search',
        method: 'GET',
        params: { term, page, size, sortBy, sortDir }
      }),
      providesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    getProfile: builder.query({
      query: () => ({ url: 'users/profile', method: 'GET' }),
      providesTags: ['Me']
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `users/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    })
  })
});

export const { useGetPreferencesQuery, useUpdatePreferencesMutation, useListUsersQuery, useSearchUsersQuery, useGetProfileQuery, useDeleteUserMutation } = userService;
export default userService;


