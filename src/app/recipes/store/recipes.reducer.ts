import { createReducer, on } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.actions';

export type State = {
  recipes: Recipe[];
};
// private recipes: Recipe[] = [
//   new Recipe(
//     'Tasty Schnitzel',
//     'A super-tasty Schnitzel - just awesome!',
//     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
//     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
//   ),
//   new Recipe(
//     'Big Fat Burger',
//     'What else you need to say?',
//     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
//     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
//   ),
// ];
const initialState: State = {
  recipes: [],
};

export const recipesReducer = createReducer(
  initialState,
  on(RecipesActions.setRecipes, (state, action) => {
    return {
      ...state,
      recipes: [...action.payload],
    };
  }),
  on(RecipesActions.addRecipe, (state, action) => {
    return {
      ...state,
      recipes: [...state.recipes, action.payload],
    };
  }),
  on(RecipesActions.updateRecipe, (state, action) => {
    const updatedRecipe = {
      ...state.recipes[action.payload.index],
      ...action.payload.newRecipe,
    };

    const updatedRecipes = [...state.recipes];
    updatedRecipes[action.payload.index] = updatedRecipe;

    return {
      ...state,
      recipes: updatedRecipes,
    };
  }),
  on(RecipesActions.deleteRecipe, (state, action) => {
    return {
      ...state,
      recipes: state.recipes.filter((_, index) => {
        return index !== action.payload;
      }),
    };
  })
);
