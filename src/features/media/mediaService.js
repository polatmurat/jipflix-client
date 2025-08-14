import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mediaService = createApi({
  reducerPath: 'media',
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
    uploadMedia: builder.mutation({
      query: ({ file, type = 'IMAGE', bucket, region }) => {
        const formData = new FormData();
        formData.append('file', file);
        const params = new URLSearchParams();
        if (type) params.append('type', type);
        if (bucket) params.append('bucket', bucket);
        if (region) params.append('region', region);
        return {
          url: `media/upload?${params.toString()}`,
          method: 'POST',
          body: formData
        };
      }
    }),
    myMedia: builder.query({
      query: () => ({ url: 'media/me', method: 'GET' })
    })
  })
});

export const { useUploadMediaMutation, useMyMediaQuery } = mediaService;
export default mediaService;


