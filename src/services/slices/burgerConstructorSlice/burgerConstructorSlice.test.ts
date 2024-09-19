import {
  addIngredient,
  constructorSlice,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  orderBurgerQuery,
  resetOrder
} from '../../slices/burgerConstructorSlice/burgerConstructorSlice';
import { initialState } from '../../slices/burgerConstructorSlice/burgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { TNewOrderResponse } from '@api';


afterEach(() => {
  jest.restoreAllMocks();
});

describe('[constructorSlice] - test', () => {
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
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    }
  ];

  const mocConstructorIngredients: TConstructorIngredient[] = [
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
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: '111'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: '222'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      id: '333'
    }
  ];

  const mockOrderBurgerData: TNewOrderResponse = {
    success: true,
    order: {
      ingredients: ['bun', 'main', 'bun'],
      _id: '66e45dba119d45001b506b9f',
      status: 'done',
      createdAt: '2024-09-13T15:43:54.410Z',
      updatedAt: '2024-09-13T15:43:55.227Z',
      number: 52934,
      name: 'Краторный био-марсианский бургер'
    },
    name: 'Краторный  бургер'
  };

  test('тест экшена - addIngredient добавление bun', () => {
    //Начальный тестовый стейт (initialState импортирован из слайса)
    const state = {
      ...initialState
    };

    // Экшен
    const actionAddItem = {
      type: addIngredient.type,
      payload: {
        ...mocIngredients[0],
        id: '111'
      }
    };
    //  редьюсер
    const reduser = constructorSlice.reducer(state, actionAddItem);
    const { constructorItems } = reduser;

    // Сравниваем стейт
    expect(reduser).toEqual({
      ...initialState,
      constructorItems: {
        bun: mocConstructorIngredients[0],
        ingredients: []
      }
    });
    // Сравниваем поле bun в стейте
    expect(constructorItems.bun).toEqual(mocConstructorIngredients[0]);
  });

  test('тест экшена - addIngredient добавление main', () => {
    const state = {
      ...initialState
    };

    const actionAddItem = {
      type: addIngredient.type,
      payload: {
        ...mocIngredients[1],
        id: '222'
      }
    };

    const reducer = constructorSlice.reducer(state, actionAddItem);
    const { constructorItems } = reducer;

    expect(constructorItems.ingredients).toEqual([
      mocConstructorIngredients[1]
    ]);
    expect(constructorItems.ingredients).toHaveLength(1);
  });

  test('тест экшена - addIngredient добавление sauce', () => {
    const state = {
      ...initialState
    };

    const actionAddItem = {
      type: addIngredient.type,
      payload: {
        ...mocIngredients[2],
        id: '333'
      }
    };

    const reducer = constructorSlice.reducer(state, actionAddItem);
    const { constructorItems } = reducer;

    expect(constructorItems.ingredients).toEqual([
      mocConstructorIngredients[2]
    ]);
    expect(constructorItems.ingredients).toHaveLength(1);
  });

  test('тест экшена - removeIngredient удаление ингредиента', () => {
    const state = {
      ...initialState,
      constructorItems: {
        bun: mocConstructorIngredients[0],
        ingredients: [
          mocConstructorIngredients[1],
          mocConstructorIngredients[2]
        ]
      }
    };

    const action = { type: removeIngredient.type, payload: '333' };
    const reduser = constructorSlice.reducer(state, action);
    const { constructorItems } = reduser;

    expect(constructorItems.ingredients).toEqual([
      mocConstructorIngredients[1]
    ]);
    expect(constructorItems.ingredients).toHaveLength(1);
  });

  test('тест экшена - moveUpIngredient перпемещение элемента вверх', () => {
    const state = {
      ...initialState,
      constructorItems: {
        bun: mocConstructorIngredients[0],
        ingredients: [
          mocConstructorIngredients[1],
          mocConstructorIngredients[2]
        ]
      }
    };

    const action = { type: moveUpIngredient.type, payload: 1 };
    const reduser = constructorSlice.reducer(state, action);
    const { constructorItems } = reduser;

    expect(constructorItems.ingredients).toEqual([
      mocConstructorIngredients[2],
      mocConstructorIngredients[1]
    ]);
    expect(constructorItems.ingredients).toHaveLength(2);
  });

  test('тест экшена - moveDownIngredient перпемещение элемента вниз', () => {
    const state = {
      ...initialState,
      constructorItems: {
        bun: mocConstructorIngredients[0],
        ingredients: [
          mocConstructorIngredients[1],
          mocConstructorIngredients[2]
        ]
      }
    };

    const action = { type: moveDownIngredient.type, payload: 0 };
    const reduser = constructorSlice.reducer(state, action);
    const { constructorItems } = reduser;

    expect(constructorItems.ingredients).toEqual([
      mocConstructorIngredients[2],
      mocConstructorIngredients[1]
    ]);
    expect(constructorItems.ingredients).toHaveLength(2);
  });

  test('тест  orderBurgerQuery.pending получение информации о заказе - загрузка', () => {
    const state = initialState;

    const action = {
      type: orderBurgerQuery.pending.type,
      payload: { orderRequest: true }
    };
    const reduser = constructorSlice.reducer(state, action);
    const { orderRequest, orderModalData } = reduser;

    expect(orderRequest).toBeTruthy();
    expect(orderModalData).toBeNull();
  });

  test('тест orderBurgerQuery.rejected получение информации о заказе - ошибка', async () => {
    const state = {
      ...initialState,
      error: 'Error'
    };

    const newState = constructorSlice.reducer(
      initialState,
      orderBurgerQuery.rejected(new Error('Error'), 'unknown', [])
    );

    expect(state.error).toEqual(newState.error);
  });

  test('тест orderBurgerQuery.fulfilled получение информации о заказе - запрос завершон успешно', () => {
    const state = {
      ...initialState,
      orderRequest: true,
      constructorItems: {
        bun: mocConstructorIngredients[0],
        ingredients: [
          mocConstructorIngredients[1],
          mocConstructorIngredients[2]
        ]
      }
    };

    const newState = constructorSlice.reducer(
      state,
      orderBurgerQuery.fulfilled(mockOrderBurgerData, 'unknown', [])
    );
    const { orderModalData, orderRequest, constructorItems } = newState;

    expect(orderModalData).toEqual(mockOrderBurgerData.order);
    expect(orderRequest).toBe(false);
    expect(constructorItems).toEqual(initialState.constructorItems);
  });

  test('тест resetOrder - сборс полей сделанного заказа', () => {
    const state = {
      ...initialState,
      orderModalData: mockOrderBurgerData.order,
      orderRequest: true
    };

    const newState = constructorSlice.reducer(state, resetOrder());
    const { orderModalData, orderRequest } = newState;

    expect(orderModalData).toBeNull();
    expect(orderRequest).toBe(false);
  });
});
