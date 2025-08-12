import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productService = createApi({
    reducerPath: 'products',
    tagTypes: ['products'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/',
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            // console.log(token);
            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: 'create-product',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['products']
        }),
        updateProduct: builder.mutation({
            query: data => {
                return {
                    url: 'product',
                    method: 'PUT',
                    body: data
                }
            },
            invalidatesTags: ['products']
        }),
        deleteProduct: builder.mutation({
            query: id => {
                return {
                    url: `delete-product/${id}`,
                    method: 'DELETE',

                }
            },
            invalidatesTags: ['products']
        }),
        getProducts: builder.query({
            query: (page) => ({
                url: `products/${page}`,
                method: 'GET'
            }),
            providesTags: ['products']
        }),
        fetchProduct: builder.query({
            query: (id) => ({
                url: `product/${id}`,
                method: 'GET'
            }),
            providesTags: ['products']
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetProductsQuery,
    useFetchProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productService;
export default productService;