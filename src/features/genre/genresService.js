import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const genresService = createApi({
  reducerPath: 'genres',
  tagTypes: ['Genres'],
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
    getGenres: builder.query({
      query: () => ({ url: 'genres', method: 'GET' }),
      providesTags: () => [{ type: 'Genres', id: 'LIST' }]
    }),
    createGenre: builder.mutation({
      query: (body) => ({ url: 'genres', method: 'POST', body }),
      invalidatesTags: [{ type: 'Genres', id: 'LIST' }]
    }),
    updateGenre: builder.mutation({
      query: ({ id, body }) => ({ url: `genres/${id}`, method: 'PUT', body }),
      invalidatesTags: [{ type: 'Genres', id: 'LIST' }]
    }),
    deleteGenre: builder.mutation({
      query: (id) => ({ url: `genres/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Genres', id: 'LIST' }]
    })
  })
});

export const { useGetGenresQuery, useCreateGenreMutation, useUpdateGenreMutation, useDeleteGenreMutation } = genresService;
export default genresService;


