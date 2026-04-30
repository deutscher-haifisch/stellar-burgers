import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../constructorSlice';
import { TConstructorIngredient } from '../../utils/types';

const bun: TConstructorIngredient = {
  _id: 'bun-1',
  id: 'bun-id-1',
  name: 'Краторная булка',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: '',
  image_large: '',
  image_mobile: ''
};

const mainIngredient: TConstructorIngredient = {
  _id: 'main-1',
  id: 'main-id-1',
  name: 'Биокотлета',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: '',
  image_large: '',
  image_mobile: ''
};

const sauceIngredient: TConstructorIngredient = {
  _id: 'sauce-1',
  id: 'sauce-id-1',
  name: 'Соус',
  type: 'sauce',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('constructorSlice', () => {
  test('добавляет булку в конструктор', () => {
    const state = constructorReducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([]);
  });

  test('добавляет ингредиент в начинку', () => {
    const state = constructorReducer(undefined, addIngredient(mainIngredient));

    expect(state.ingredients).toEqual([mainIngredient]);
  });

  test('удаляет ингредиент из начинки', () => {
    const initialState = {
      bun: null,
      ingredients: [mainIngredient, sauceIngredient]
    };

    const state = constructorReducer(
      initialState,
      removeIngredient(mainIngredient.id)
    );

    expect(state.ingredients).toEqual([sauceIngredient]);
  });

  test('изменяет порядок ингредиентов в начинке', () => {
    const initialState = {
      bun: null,
      ingredients: [mainIngredient, sauceIngredient]
    };

    const state = constructorReducer(
      initialState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.ingredients).toEqual([sauceIngredient, mainIngredient]);
  });
});
