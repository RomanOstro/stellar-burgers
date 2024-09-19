import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store/store';
import {
  getConstructorSelector,
  getOrderRequestSelector,
  getOrderModalDataSelector
} from '../../services/slices/burgerConstructorSlice/burgerConstructorSlice';
import {
  orderBurgerQuery,
  resetOrder
} from '../../services/slices/burgerConstructorSlice/burgerConstructorSlice';
import { useDispatch } from '../../services/store/store';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorSelector);
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  const navigate = useNavigate();

  const orderRequest = useSelector(getOrderRequestSelector);
  const orderModalData = useSelector(getOrderModalDataSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const res = [];
    res.push(constructorItems.bun._id);
    constructorItems.ingredients.forEach((item) => res.push(item._id));
    res.push(constructorItems.bun._id);
    // Если токен есть(пользователь авторизирован) даем оформить заказ или направляем на страничку ввода логина
    if (accessToken) dispatch(orderBurgerQuery(res));
    else navigate('/login');
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
