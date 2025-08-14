import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const movieService = createApi({
  reducerPath: 'movies',
  tagTypes: ['Movies', 'Movie'],
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
    listMovies: builder.query({
      query: ({ page = 0, size = 20, sortBy = 'id', sortDir = 'desc' } = {}) => ({
        url: `movies?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
        method: 'GET'
      }),
      providesTags: (result) => [{ type: 'Movies', id: 'LIST' }]
    }),
    getMovie: builder.query({
      query: (id) => ({ url: `movies/${id}`, method: 'GET' }),
      providesTags: (r, e, id) => [{ type: 'Movie', id }]
    }),
    createMovie: builder.mutation({
      query: (body) => ({ url: 'movies', method: 'POST', body }),
      invalidatesTags: [{ type: 'Movies', id: 'LIST' }]
    }),
    updateMovie: builder.mutation({
      query: ({ id, body }) => ({ url: `movies/${id}`, method: 'PUT', body }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Movie', id }, { type: 'Movies', id: 'LIST' }]
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({ url: `movies/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Movies', id: 'LIST' }]
    }),
    searchMovies: builder.query({
      query: (params) => ({ url: 'movies/search', method: 'GET', params }),
      providesTags: [{ type: 'Movies', id: 'LIST' }]
    }),
    listComments: builder.query({
      query: (movieId) => ({ url: `movies/${movieId}/comments`, method: 'GET' })
    }),
    addComment: builder.mutation({
      query: ({ movieId, body }) => ({ url: `movies/${movieId}/comments`, method: 'POST', body })
    }),
    rateMovie: builder.mutation({
      query: ({ movieId, score }) => ({ url: `movies/${movieId}/rating`, method: 'POST', body: { score } })
    }),
    recommendByGenres: builder.query({
      query: ({ preferredGenreIds = [], page = 0, size = 20, sortBy = 'id', sortDir = 'desc' } = {}) => ({
        url: 'recommendations/by-genres',
        method: 'GET',
        params: { preferredGenreIds, page, size, sortBy, sortDir }
      })
    })
  })
});

export const {
  useListMoviesQuery,
  useGetMovieQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useSearchMoviesQuery,
  useListCommentsQuery,
  useAddCommentMutation,
  useRateMovieMutation,
  useRecommendByGenresQuery
} = movieService;

export default movieService;


