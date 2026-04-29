import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrderByNumber } from '../../services/orderSlice';

type TIngredientsWithCount = {
  [key: string]: TIngredient & { count: number };
};

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();

  const ingredients = useSelector((state) => state.ingredients.items);
  const feedOrders = useSelector((state) => state.feed.orders);
  const userOrders = useSelector((state) => state.order.orders);
  const orderData = useSelector((state) => state.order.orderData);

  const orderNumber = Number(number);

  const currentOrder =
    feedOrders.find((order) => order.number === orderNumber) ||
    userOrders.find((order) => order.number === orderNumber) ||
    orderData;

  useEffect(() => {
    if (!currentOrder && orderNumber) {
      dispatch(fetchOrderByNumber(orderNumber));
    }
  }, [currentOrder, dispatch, orderNumber]);

  const orderInfo = useMemo(() => {
    if (!currentOrder || !ingredients.length) return null;

    const date = new Date(currentOrder.createdAt);

    const ingredientsInfo =
      currentOrder.ingredients.reduce<TIngredientsWithCount>((acc, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);

          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      }, {});

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...currentOrder,
      ingredientsInfo,
      date,
      total
    };
  }, [currentOrder, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
