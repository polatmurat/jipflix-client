import { configureStore } from '@reduxjs/toolkit';
import authService from '../features/auth/authService';
import authReducer from './reducers/authReducer';
import globalReducer from './reducers/globalReducer';
import genresService from '../features/genre/genresService';
import notificationService from '../features/notification/notificationService';
import movieService from '../features/movie/movieService';
import directorsService from '../features/director/directorsService';
import userService from '../features/user/userService';
import mediaService from '../features/media/mediaService';
import logService from '../features/log/logService';
import listService from '../features/list/listService';

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [genresService.reducerPath]: genresService.reducer,
    [notificationService.reducerPath]: notificationService.reducer,
    [movieService.reducerPath]: movieService.reducer,
    [directorsService.reducerPath]: directorsService.reducer,
    [userService.reducerPath]: userService.reducer,
    [mediaService.reducerPath]: mediaService.reducer,
    [logService.reducerPath]: logService.reducer,
    [listService.reducerPath]: listService.reducer,
    authReducer: authReducer, // hap info: no need to put this in brackets as it's a string identifier
    globalReducer: globalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authService.middleware)
    .concat(genresService.middleware)
    .concat(notificationService.middleware)
    .concat(movieService.middleware)
    .concat(directorsService.middleware)
    .concat(userService.middleware)
    .concat(mediaService.middleware)
    .concat(logService.middleware)
    .concat(listService.middleware)
});
