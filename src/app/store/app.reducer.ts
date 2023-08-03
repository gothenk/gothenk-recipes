import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppinglist from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipes.reducer';

export type AppState = {
  shoppingList: fromShoppinglist.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
};

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppinglist.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipesReducer,
};
