import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

const SET_RECIPES = '[Recipes] Set Recipes';
const FETCH_RECIPES = '[Recipes] Fetch Recipes';
const ADD_RECIPE = '[Recipes] Add Recipe';
const UPDATE_RECIPE = '[Recipes] Update Recipe';
const DELETE_RECIPE = '[Recipes] Delete Recipe';
const STORE_RECIPES = '[Recipes] Store Recipes';

export const setRecipes = createAction(
  SET_RECIPES,
  props<{ payload: Recipe[] }>()
);

export const fecthRecipes = createAction(FETCH_RECIPES);

export const addRecipe = createAction(ADD_RECIPE, props<{ payload: Recipe }>());

export const updateRecipe = createAction(
  UPDATE_RECIPE,
  props<{ payload: { index: number; newRecipe: Recipe } }>()
);

export const deleteRecipe = createAction(
  DELETE_RECIPE,
  props<{ payload: number }>()
);

export const storeRecipes = createAction(STORE_RECIPES);
