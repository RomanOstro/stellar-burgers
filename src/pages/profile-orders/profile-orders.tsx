import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store/store';
import {
  gerUserOrdersSelector,
  getOrdersQuery
} from '../../services/slices/userSlice/userSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(gerUserOrdersSelector);

  useEffect(() => {
    dispatch(getOrdersQuery());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
