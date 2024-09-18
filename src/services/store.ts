import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingridientSlice } from './slices/ingredientsSlice';
import { constructorSlice } from './slices/burgerConstructorSlice';
import { ordersSlice } from './slices/ordersSlice';
import { userSlice } from './slices/userSlice';

const rootReducer = combineSlices(
  ingridientSlice,
  constructorSlice,
  ordersSlice,
  userSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
