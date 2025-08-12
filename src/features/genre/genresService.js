import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const genresService = createApi({
  reducerPath: 'genres',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.jipflix.com/api/'
  }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => ({ url: 'genres', method: 'GET' })
    })
  })
});

export const { useGetGenresQuery } = genresService;
export default genresService;


