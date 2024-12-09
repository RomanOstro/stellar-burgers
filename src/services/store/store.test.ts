import { rootReducer } from "./store";
import { configureStore } from '@reduxjs/toolkit';


describe('[rootReducer] - тест корневого редьюсера', ()=> {
  it('проверка состояния редьюсера', ()=> {
    // dвызываем редьюсер с состоянием-undefined и экшеном который ни обрабатывается ни одним хранилищем
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' })

    // делаем с ним стор
    const store = configureStore({reducer: rootReducer})

    expect(initialState.constructorSlice).toEqual(store.getState().constructorSlice)
    expect(initialState).toEqual(store.getState())
  })
})