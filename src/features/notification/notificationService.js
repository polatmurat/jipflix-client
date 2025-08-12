import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const notificationService = createApi({
  reducerPath: 'notifications',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.jipflix.com/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('user-token');
      if (token) headers.set('Authorization', `OBSS ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Notifications'],
  endpoints: (builder) => ({
    listNotifications: builder.query({
      query: ({ userId, page = 0, size = 20 }) => ({
        url: `notifications?userId=${userId}&page=${page}&size=${size}`,
        method: 'GET'
      }),
      providesTags: (result) =>
        result?.result?.items
          ? [
              ...result.result.items.map((n) => ({ type: 'Notifications', id: n.id })),
              { type: 'Notifications', id: 'LIST' }
            ]
          : [{ type: 'Notifications', id: 'LIST' }]
    }),
    markRead: builder.mutation({
      query: (id) => ({ url: `notifications/${id}/read`, method: 'POST' }),
      invalidatesTags: (r, e, id) => [{ type: 'Notifications', id }, { type: 'Notifications', id: 'LIST' }]
    }),
    createNotification: builder.mutation({
      query: (body) => ({ url: 'notifications', method: 'POST', body }),
      invalidatesTags: [{ type: 'Notifications', id: 'LIST' }]
    }),
    broadcastNotification: builder.mutation({
      query: (body) => ({ url: 'notifications/broadcast', method: 'POST', body }),
      invalidatesTags: [{ type: 'Notifications', id: 'LIST' }]
    })
  })
});

export const {
  useListNotificationsQuery,
  useMarkReadMutation,
  useCreateNotificationMutation,
  useBroadcastNotificationMutation
} = notificationService;

export default notificationService;


