import {
  userSlice,
  registerUserQuery,
  initialState,
  loginUserQuery,
  getUserQuery,
  updateUserQuery,
  getOrdersQuery,
  logoutQuery
} from '../userSlice/userSlice';
import { TOrder } from '@utils-types';

describe('[userSlice] - тест слайса', () => {
  const mockAllOrders: TOrder[] = [
    {
      ingredients: ['bun', 'main', 'bun'],
      _id: '66e45dba119d45001b506b9f',
      status: 'done',
      createdAt: '2024-09-13T15:43:54.410Z',
      updatedAt: '2024-09-13T15:43:55.227Z',
      number: 52934,
      name: 'Краторный био-марсианский бургер'
    },
    {
      ingredients: ['bun2', 'main2', 'bun2'],
      _id: '66e45dba119d45001b506b9f',
      status: 'done',
      createdAt: '2022-09-13T15:43:54.410Z',
      updatedAt: '2022-09-13T15:43:55.227Z',
      number: 524,
      name: 'Краторный био бургер'
    }
  ];

  it('registerUserQuery - тест экшена регистрации', () => {
    const state = {
      ...initialState,
      userData: {
        email: 'tesa@email.com',
        name: 'testName'
      }
    };

    const action = {
      type: registerUserQuery.fulfilled.type,
      payload: { user: { email: 'tesa@email.com', name: 'testName' } }
    };
    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  it('registerUserQuery - pending', () => {
    const state = {
      ...initialState,
      loading: true
    };

    const newState = userSlice.reducer(state, {
      type: registerUserQuery.pending.type,
      payload: null
    });

    expect(state.loading).toEqual(newState.loading);
    expect(state).toEqual(newState);
  });

  it('registerUserQuery - rejected', () => {
    const state = {
      ...initialState,
      error: 'registerUserQuery - Error'
    };

    const action = {
      type: registerUserQuery.rejected.type,
      error: new Error('registerUserQuery - Error')
    };
    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  it('loginUserQuery - fulfilled тест экшена входа в приложение', () => {
    const state = {
      ...initialState,
      userData: {
        email: 'tesa@email.com',
        name: 'testName'
      }
    };

    const action = {
      type: loginUserQuery.fulfilled.type,
      payload: { user: { email: 'tesa@email.com', name: 'testName' } }
    };
    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  it('loginUserQuery - pending', () => {
    const state = {
      ...initialState,
      loading: true
    };

    const newState = userSlice.reducer(state, {
      type: loginUserQuery.pending.type,
      payload: null
    });

    expect(state.loading).toEqual(newState.loading);
    expect(state).toEqual(newState);
  });

  it('loginUserQuery - rejected', () => {
    const state = {
      ...initialState,
      error: 'loginUserQuery - Error'
    };

    const action = {
      type: loginUserQuery.rejected.type,
      error: new Error('loginUserQuery - Error')
    };
    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  it('getUserQuery - fulfilled тест экшена проверки авторизации', () => {
    const state = {
      ...initialState,
      userData: {
        email: 'tesa@email.com',
        name: 'testName'
      }
    };

    const action = {
      type: getUserQuery.fulfilled.type,
      payload: { user: { email: 'tesa@email.com', name: 'testName' } }
    };
    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  it('getUserQuery - pending', () => {
    const state = {
      ...initialState,
      loading: true
    };

    const newState = userSlice.reducer(state, {
      type: getUserQuery.pending.type,
      payload: null
    });

    expect(state.loading).toEqual(newState.loading);
    expect(state).toEqual(newState);
  });

  it('getUserQuery - rejected', () => {
    const state = {
      ...initialState,
      error: 'getUserQuery - Error'
    };

    const action = {
      type: getUserQuery.rejected.type,
      error: new Error('getUserQuery - Error')
    };
    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  it('updateUserQuery - fulfilled тест экшена обновление данных пользователя', () => {
    const state = {
      ...initialState,
      userData: {
        email: 'tesa@email.com',
        name: 'testName'
      }
    };

    const action = {
      type: updateUserQuery.fulfilled.type,
      payload: { user: { email: 'tesa@email.com', name: 'testName' } }
    };
    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  it('updateUserQuery - pending', () => {
    const state = {
      ...initialState,
      loading: true
    };

    const newState = userSlice.reducer(state, {
      type: updateUserQuery.pending.type,
      payload: null
    });

    expect(state.loading).toEqual(newState.loading);
    expect(state).toEqual(newState);
  });

  it('updateUserQuery - rejected', () => {
    const state = {
      ...initialState,
      error: 'updateUserQuery - Error'
    };

    const action = {
      type: updateUserQuery.rejected.type,
      error: new Error('updateUserQuery - Error')
    };
    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  it('getOrdersQuery - fulfilled получение истории заказов пользователя', () => {
    const state = {
      ...initialState,
      orders: mockAllOrders
    };

    const action = {
      type: getOrdersQuery.fulfilled.type,
      payload: mockAllOrders
    };

    const newState = userSlice.reducer(state, action);
    expect(state).toEqual(newState);
  });

  it('getOrdersQuery - pending', () => {
    const state = {
      ...initialState,
      loading: true
    };

    const newState = userSlice.reducer(state, {
      type: getOrdersQuery.pending.type,
      payload: null
    });

    expect(state.loading).toEqual(newState.loading);
    expect(state).toEqual(newState);
  });

  it('getOrdersQuery - rejected', () => {
    const state = {
      ...initialState,
      error: 'getOrdersQuery - Error'
    };

    const action = {
      type: getOrdersQuery.rejected.type,
      error: new Error('getOrdersQuery - Error')
    };
    const newState = userSlice.reducer(state, action);

    expect(state).toEqual(newState);
  });

  it('logoutQuery - выход из учетной записи', () => {
    const newState = userSlice.reducer(initialState, {
      type: logoutQuery.fulfilled.type
    });

    expect(newState.error).toBe(null);
    expect(newState.loading).toBe(false);
    expect(newState.userData.email).toBe('');
    expect(newState.userData.name).toBe('');
    expect(newState.orders).toEqual([]);
  });
});
