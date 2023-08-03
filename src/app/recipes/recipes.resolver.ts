import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, of, switchMap, take } from 'rxjs';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipes.actions';
import { selectRecipes } from './store/recipes.selectors';

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const store: Store<fromApp.AppState> = inject(Store);
  const actions$: Actions = inject(Actions);

  // const recipes = recipesService.getRecipes();

  return store.select(selectRecipes).pipe(
    map((recipesState) => recipesState.recipes),
    switchMap((recipes) => {
      if (recipes.length === 0) {
        store.dispatch(RecipesActions.fecthRecipes());
        return actions$.pipe(
          ofType(RecipesActions.setRecipes),
          take(1),
          map((recipesAction) => recipesAction.payload)
        );
      } else {
        return of(recipes);
      }
    })
  );
};
