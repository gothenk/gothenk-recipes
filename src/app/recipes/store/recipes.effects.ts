import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as RecipesActions from './recipes.actions';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { selectRecipes } from './recipes.selectors';

@Injectable()
export class RecipesEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fecthRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://gthnk-recipes-db-default-rtdb.firebaseio.com/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return RecipesActions.setRecipes({ payload: recipes });
      })
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.storeRecipes),
        withLatestFrom(this.store.select(selectRecipes)),
        switchMap(([actionData, recipesState]) => {
          return this.http.put(
            'https://gthnk-recipes-db-default-rtdb.firebaseio.com/recipes.json',
            recipesState.recipes
          );
        })
      ),
    { dispatch: false }
  );
}
