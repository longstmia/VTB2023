import { configureStore } from '@reduxjs/toolkit';
import routeTypeSlice from './redux/slices/routeTypeSlice';


export const store = configureStore({
  reducer: {
    routes: routeTypeSlice,
  },
})