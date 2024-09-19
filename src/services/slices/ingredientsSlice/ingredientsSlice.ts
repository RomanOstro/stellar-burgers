import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../utils/burger-api';
import { TIngredient } from '@utils-types';

//Асинхронная функция для запроса ингредиентов с сервера
export const getIngredients = createAsyncThunk('getIngredients', async () =>
  getIngredientsApi()
);

type IIngridientState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: IIngridientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingridientSlice = createSlice({
  name: 'ingredientsGetAll',
  initialState,
  reducers: {},
  selectors: {
    ingredientSelector: (state) => state.ingredients,
    isLoadingIngredientSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || `[getIngredients] data request error`;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { ingredientSelector, isLoadingIngredientSelector } =
  ingridientSlice.selectors;
