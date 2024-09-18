import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi, TNewOrderResponse } from '../../../utils/burger-api';

export const orderBurgerQuery = createAsyncThunk(
  'order/burger',
  orderBurgerApi
);

type IConstructorState = {
  orderRequest: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderModalData: TOrder | null;
  error: string | null;
};

// Экспортируем для теста
export const initialState: IConstructorState = {
  orderRequest: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderModalData: null,
  error: null
};

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  selectors: {
    getConstructorSelector: (state) => state.constructorItems,
    getOrderRequestSelector: (state) => state.orderRequest,
    getOrderModalDataSelector: (state) => state.orderModalData
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },

    moveUpIngredient: (state, actyon: PayloadAction<number>) => {
      const ingredients = [...state.constructorItems.ingredients];
      ingredients.splice(
        actyon.payload,
        0,
        ...ingredients.splice(actyon.payload - 1, 1)
      );
      state.constructorItems.ingredients = ingredients;
    },

    moveDownIngredient: (state, actyon: PayloadAction<number>) => {
      const ingredients = [...state.constructorItems.ingredients];
      ingredients.splice(
        actyon.payload,
        0,
        ...ingredients.splice(actyon.payload + 1, 1)
      );
      state.constructorItems.ingredients = ingredients;
    },

    resetOrder: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerQuery.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })

      .addCase(orderBurgerQuery.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || `error`;
      })

      .addCase(orderBurgerQuery.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
      });
  }
});

export const {
  getConstructorSelector,
  getOrderRequestSelector,
  getOrderModalDataSelector
} = constructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  resetOrder
} = constructorSlice.actions;
