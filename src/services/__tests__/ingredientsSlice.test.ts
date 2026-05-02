import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: 'ingredient-1',
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
  }
];

describe('ingredientsSlice', () => {
  test('pending устанавливает isLoading в true', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('fulfilled записывает ингредиенты и выключает isLoading', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );

    expect(state.items).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
  });

  test('rejected записывает ошибку и выключает isLoading', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.rejected(new Error('Ошибка загрузки'), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
