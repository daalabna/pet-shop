import { configureStore } from '@reduxjs/toolkit';
import petsReducer from './slices/petsSlice';
import ordersReducer from './slices/ordersSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    pets: petsReducer,
    orders: ordersReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;