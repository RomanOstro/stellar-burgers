import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getOrdersQuery,
  getOrdersInfoSelector
} from '../../services/slices/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const { orders } = useSelector(getOrdersInfoSelector);
  useEffect(() => {
    dispatch(getOrdersQuery());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getOrdersQuery())} />
  );
};
