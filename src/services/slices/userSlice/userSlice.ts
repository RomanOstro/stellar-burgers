import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../utils/cookie';
//  Запросы потом возможно лучше вынести в отдельный файл
//Запрос для получения истории заказов
export const getOrdersQuery = createAsyncThunk('user/orders', getOrdersApi);

// Запрос регистрации
export const registerUserQuery = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const dataResponce = await registerUserApi(data);
    if (!dataResponce.success) {
      return Promise.reject(dataResponce);
    }
    setCookie('accessToken', dataResponce.accessToken);
    localStorage.setItem('refreshToken', dataResponce.refreshToken);
    return dataResponce;
  }
);

// Запрос входа в приложение
export const loginUserQuery = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const dataResponce = await loginUserApi(data);
    if (!dataResponce.success) {
      return Promise.reject(dataResponce);
    }
    setCookie('accessToken', dataResponce.accessToken);
    localStorage.setItem('refreshToken', dataResponce.refreshToken);
    return dataResponce;
  }
);

// Запрос если забыли пароль
export const forgotPasswordQuery = createAsyncThunk(
  'user/fogotPass',
  forgotPasswordApi
);

// Запрос сброс пароля
export const resetPasswordQuery = createAsyncThunk(
  'user/resetPass',
  resetPasswordApi
);

//Проверка авторизован ли пользователь или нет
export const getUserQuery = createAsyncThunk('user/getUser', getUserApi);

//Запрос обновления данных пользователя
export const updateUserQuery = createAsyncThunk(
  'user/updateUser',
  updateUserApi
);

// запрос - Выход из аккаунта
export const logoutQuery = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

type TUserState = {
  loading: boolean;
  error: string | null;
  userData: TUser;
  orders: TOrder[];
};

export const initialState: TUserState = {
  loading: false,
  error: null,
  userData: {
    name: '',
    email: ''
  },
  orders: []
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  selectors: {
    getUserSelector: (state) => state.userData,
    gerUserOrdersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      // Обработка запроса при регистрации
      .addCase(registerUserQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message as string;
      })
      .addCase(registerUserQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload.user;
      })
      // Обработка запросапри вводе логина/пароля
      .addCase(loginUserQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUserQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload.user;
      })
      // Обработка запроса получения данных пользователя
      .addCase(getUserQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getUserQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload.user;
      })
      // Обработка запроса обновления данных пользователя
      .addCase(updateUserQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUserQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload.user;
      })
      // Обработка запроса получения истории заказов зарегистрированного пользователя
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
        state.orders = action.payload;
      })
      // Обработка запроса выхода из учетной записи
      .addCase(logoutQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(logoutQuery.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.userData.email = '';
        state.userData.name = '';
        state.orders = [];
      });
  }
});

export const { getUserSelector, gerUserOrdersSelector } = userSlice.selectors;
