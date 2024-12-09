import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingridientSlice } from '../slices/ingredientsSlice/ingredientsSlice';
import { constructorSlice } from '../slices/burgerConstructorSlice/burgerConstructorSlice';
import { ordersSlice } from '../slices/ordersSlice/ordersSlice';
import { userSlice } from '../slices/userSlice/userSlice';

export const rootReducer = combineSlices(
  ingridientSlice,
  constructorSlice,
  ordersSlice,
  userSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
