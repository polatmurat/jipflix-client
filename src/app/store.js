import { configureStore } from '@reduxjs/toolkit';
import authService from '../features/auth/authService';
import authReducer from './reducers/authReducer';
import categoryService from '../features/category/categoryService';
import globalReducer from './reducers/globalReducer';
import productService from '../features/product/productService';
import homeProducts from '../features/product/homeProductsService';
import genresService from '../features/genre/genresService';
import notificationService from '../features/notification/notificationService';

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    [homeProducts.reducerPath]: homeProducts.reducer,
    [genresService.reducerPath]: genresService.reducer,
    [notificationService.reducerPath]: notificationService.reducer,
    authReducer: authReducer, // hap info: no need to put this in brackets as it's a string identifier
    globalReducer: globalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authService.middleware)
    .concat(categoryService.middleware)
    .concat(productService.middleware)
    .concat(homeProducts.middleware)
    .concat(genresService.middleware)
    .concat(notificationService.middleware)
});
