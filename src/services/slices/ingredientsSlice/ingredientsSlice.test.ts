import { TIngredient } from '@utils-types';
import {
  initialState,
  getIngredients,
  ingridientSlice
} from '../ingredientsSlice/ingredientsSlice';

describe('[ingridientSlice] - тест слайса', () => {

  const mocIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    }
  ];

  it('[getIngredients] тест экшена - статус pending', () => {
    // Стейт который должен получиться, после работы редьюсера - loading нового стейта изменится на true
    const state = {
      ...initialState,
      loading: true
    };

    const newState = ingridientSlice.reducer(state, {
      type: getIngredients.pending.type
    });

    expect(state).toEqual(newState);
    expect(newState.loading).toBeTruthy();
  });

  it('[getIngredients] тест экшена - статус reject', () => {
    const state = {
      ...initialState,
      error: 'getIngredients - error'
    };

    const newState = ingridientSlice.reducer(
      state,
      getIngredients.rejected(new Error('getIngredients - error'), 'unknown')
    );

    expect(state).toEqual(newState);
  });
  it('[getIngredients] тест экшена - статус fulfilled', () => {
    const state = {
      ...initialState,
      ingredients: mocIngredients
    };

    const newState = ingridientSlice.reducer(
      state,
      getIngredients.fulfilled(mocIngredients, 'fulfilled')
    );

    expect(state).toEqual(newState);
  });
});
