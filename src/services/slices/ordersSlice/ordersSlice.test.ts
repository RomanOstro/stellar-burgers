import { TFeedsResponse, TOrderResponse } from '@api';
import {
  initialState,
  getOrdersQuery,
  ordersSlice,
  getOrderInfo
} from '../ordersSlice/ordersSlice';

describe('[ordersSlice] - тест слайса', () => {
  const mockOrderInfo: TFeedsResponse = {
    orders: [
      {
        ingredients: ['bun', 'main', 'bun'],
        _id: '66e45dba119d45001b506b9f',
        status: 'done',
        createdAt: '2024-09-13T15:43:54.410Z',
        updatedAt: '2024-09-13T15:43:55.227Z',
        number: 52934,
        name: 'Краторный био-марсианский бургер'
      }
    ],
    total: 200,
    totalToday: 110,
    success: true
  };

  const orderResponse: TOrderResponse = {
    success: true,
    orders: [
      {
        ingredients: ['bun', 'main', 'bun'],
        _id: '66e45dba119d45001b506b9f',
        status: 'done',
        createdAt: '2024-09-13T15:43:54.410Z',
        updatedAt: '2024-09-13T15:43:55.227Z',
        number: 52934,
        name: 'Краторный био-марсианский бургер'
      }
    ]
  };

  it('[getOrdersQuery] - тест: история заказов pending', () => {
    //Стейт который получится в статусе pending, поле loading изменится на true
    const state = {
      ...initialState,
      loading: true
    };

    const newState = ordersSlice.reducer(
      state,
      getOrdersQuery.pending('unknown')
    );

    expect(state).toEqual(newState);
    expect(newState.loading).toBeTruthy();
  });

  it('[getOrdersQuery] - тест: история заказов rejected', () => {
    const state = {
      ...initialState,
      error: '[getOrdersQuery] - error'
    };

    const newState = ordersSlice.reducer(
      state,
      getOrdersQuery.rejected(new Error('[getOrdersQuery] - error'), 'error')
    );

    expect(state).toEqual(newState);
  });

  it('[getOrdersQuery] - тест: история заказов fulfilled ', () => {
    const state = {
      ...initialState,
      orders: [
        {
          ingredients: ['bun', 'main', 'bun'],
          _id: '66e45dba119d45001b506b9f',
          status: 'done',
          createdAt: '2024-09-13T15:43:54.410Z',
          updatedAt: '2024-09-13T15:43:55.227Z',
          number: 52934,
          name: 'Краторный био-марсианский бургер'
        }
      ],
      total: 200,
      totalToday: 110
    };

    const newState = ordersSlice.reducer(
      state,
      getOrdersQuery.fulfilled(mockOrderInfo, '')
    );

    expect(state).toEqual(newState);
    expect(newState.orders).toEqual(mockOrderInfo.orders);
    expect(newState.total).toBe(200);
    expect(newState.totalToday).toBe(110);
  });

  it('[getOrderInfo] - тест fulfilled получение информации о заказе по id', () => {
    const state = {
      ...initialState,
      orderData: mockOrderInfo.orders[0]
    };

    const newState = ordersSlice.reducer(
      state,
      getOrderInfo.fulfilled(orderResponse, 'unknown', 0)
    );

    expect(state).toEqual(newState);
  });
});
