import { TConstructorIngredient, TIngredient } from '@utils-types';

type OrderModalData = {
  number: number;
};

export type BurgerConstructorUIProps = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  price: number;
  orderModalData: OrderModalData | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
