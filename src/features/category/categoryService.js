import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryService = createApi({
  reducerPath: 'category',
  tagTypes: ['categories'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/',
    prepareHeaders: (headers, { getState }) => {
      const { authReducer } = getState();
      const token = authReducer?.adminToken;
      headers.set('authorization', token ? `Bearer ${token}` : '');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (data) => {
        return {
          url: 'create-category',
          method: 'POST',
          body: { name: data.name },
        };
      },
      
      
      invalidatesTags: ['categories'],
    }),
    updateCategory: builder.mutation({
      query: (data) => {
        return {
          url: `update-category/${data.id}`,
          method: 'PUT',
          body: {name : data.name}
        }
      },
      invalidatesTags: ['categories']
    }),
    get: builder.query({
      query: (page) => {
        return {
          url: `categories/${page}`,
          method: 'GET',
        };
      },
      providesTags: ['categories'],
    }),
    deleteCategory: builder.mutation({
      query: (data) => {
        return {
          url: `delete-category/${data}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['categories']
    }),
    fetchCategory: builder.query({
      query: (id) => {
        return {
          url: `fetch-category/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['categories']
    }),
    allCategories: builder.query({
      query: () => {
        return {
          url: 'all-categories',
          method: 'GET'
        }
      }
    }),
    randomCategories: builder.query({
      query: () => {
        return {
          url: 'random-categories',
          method: 'GET',
        }
      }
    })
  }), // Close parenthese for endpoints object
});

export const { useCreateMutation, useGetQuery, useFetchCategoryQuery, useUpdateCategoryMutation, useDeleteCategoryMutation, useAllCategoriesQuery, useRandomCategoriesQuery } = categoryService;
export default categoryService;