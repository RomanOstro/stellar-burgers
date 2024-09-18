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
} from '@api';
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { access } from 'fs';
import { deleteCookie, setCookie } from '../../utils/cookie';
//  Запросы потом возможно лучше вынести в отдельный файл
//Запрос для получения истории заказов
export const getOrdersQuery = createAsyncThunk('user/orders', async () =>
  getOrdersApi()
);
// Запрос регистрации
export const registerUserQuery = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

// Запрос входа в приложение
export const loginUserQuery = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

// Запрос если забыли пароль
export const forgotPasswordQuery = createAsyncThunk(
  'user/fogotPass',
  async (data: { email: string }) => forgotPasswordApi(data)
);

// Запрос сброс пароля
export const resetPasswordQuery = createAsyncThunk(
  'user/resetPass',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

//Проверка авторизован ли пользователь или нет
export const getUserQuery = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

//Запрос обновления данных пользователя
export const updateUserQuery = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

// запрос - Выход из аккаунта
export const logoutQuery = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

type TUserState = {
  loading: boolean;
  error: string | null;
  userData: TUser;
  orders: TOrder[];
};

const initialState: TUserState = {
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
        state.error = action.error as string;
      })
      .addCase(registerUserQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      // Обработка запросапри вводе логина/пароля
      .addCase(loginUserQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(loginUserQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      // Обработка запроса получения данных пользователя
      .addCase(getUserQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
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
        state.error = action.error as string;
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
        state.error = action.error as string;
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
        state.error = action.error as string;
      })
      .addCase(logoutQuery.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.userData.email = '';
        state.userData.name = '';
        state.orders = [];
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const { getUserSelector, gerUserOrdersSelector } = userSlice.selectors;
