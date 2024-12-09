import { getFeedsApi, getOrderByNumberApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

// Запрос истории заказов
export const getOrdersQuery = createAsyncThunk('feeds/api', getFeedsApi);
//  запрос выбора заказа по id в истории заказов
export const getOrderInfo = createAsyncThunk('order/info', getOrderByNumberApi);

type IOrdersState = {
  orderData: TOrder | null;
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

export const initialState: IOrdersState = {
  orderData: null,
  orders: [],
  loading: false,
  error: null,
  total: 0,
  totalToday: 0
};

export const ordersSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  selectors: {
    getOrdersInfoSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getOrdersQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })

      .addCase(getOrdersQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })

      .addCase(getOrderInfo.fulfilled, (state, action) => {
        state.orderData = action.payload.orders[0];
      });
  }
});

export const { getOrdersInfoSelector } = ordersSlice.selectors;
