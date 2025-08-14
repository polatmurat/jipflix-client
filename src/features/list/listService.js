import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const listService = createApi({
  reducerPath: 'lists',
  tagTypes: ['Watch', 'Favorite'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.jipflix.com/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('user-token') || localStorage.getItem('admin-token');
      if (token) headers.set('Authorization', `OBSS ${token}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    recommended: builder.query({
      query: ({ page = 0, size = 18, sortBy = 'id', sortDir = 'desc' } = {}) => ({
        url: `lists/recommended?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
        method: 'GET'
      })
    }),
    listWatch: builder.query({
      query: ({ page = 0, size = 12, sortBy = 'id', sortDir = 'desc' } = {}) => ({
        url: `lists/watch?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
        method: 'GET'
      }),
      providesTags: [{ type: 'Watch', id: 'LIST' }]
    }),
    listFavorite: builder.query({
      query: ({ page = 0, size = 12, sortBy = 'id', sortDir = 'desc' } = {}) => ({
        url: `lists/favorite?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
        method: 'GET'
      }),
      providesTags: [{ type: 'Favorite', id: 'LIST' }]
    }),
    addWatch: builder.mutation({
      query: ({ movieId }) => ({ url: `lists/watch`, method: 'POST', body: { movieId } }),
      invalidatesTags: [{ type: 'Watch', id: 'LIST' }]
    }),
    addFavorite: builder.mutation({
      query: ({ movieId }) => ({ url: `lists/favorite`, method: 'POST', body: { movieId } }),
      invalidatesTags: [{ type: 'Favorite', id: 'LIST' }]
    }),
    removeWatch: builder.mutation({
      query: ({ movieId }) => ({ url: `lists/watch?movieId=${movieId}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Watch', id: 'LIST' }]
    }),
    removeFavorite: builder.mutation({
      query: ({ movieId }) => ({ url: `lists/favorite?movieId=${movieId}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Favorite', id: 'LIST' }]
    })
  })
});

export const { useRecommendedQuery, useListWatchQuery, useListFavoriteQuery, useAddWatchMutation, useAddFavoriteMutation, useRemoveWatchMutation, useRemoveFavoriteMutation } = listService;
export default listService;


