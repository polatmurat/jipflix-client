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
    }),
    softDeleteUser: builder.mutation({
      query: (id) => ({ url: `users/${id}/soft-delete`, method: 'PUT' }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    getDeletedUsers: builder.query({
      query: () => ({ url: 'users/deleted', method: 'GET' }),
      providesTags: [{ type: 'Users', id: 'DELETED' }]
    }),
    updateProfile: builder.mutation({
      query: (data) => ({ url: 'users/profile', method: 'PUT', body: data }),
      invalidatesTags: ['Me']
    }),
    adminUpdateUser: builder.mutation({
      query: ({ id, data }) => ({ url: `users/${id}`, method: 'PUT', body: data }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }, 'Me']
    })
  })
});

export const { 
  useGetPreferencesQuery, 
  useUpdatePreferencesMutation, 
  useListUsersQuery, 
  useSearchUsersQuery, 
  useGetProfileQuery, 
  useDeleteUserMutation,
  useSoftDeleteUserMutation,
  useGetDeletedUsersQuery,
  useUpdateProfileMutation,
  useAdminUpdateUserMutation
} = userService;
export default userService;


