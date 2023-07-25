import { ResolveFn } from '@angular/router';
import { Recipe } from './recipe.model';
import { inject } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipesService } from './recipes.service';

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const dsService: DataStorageService = inject(DataStorageService);
  const recipesService: RecipesService = inject(RecipesService);

  const recipes = recipesService.getRecipes();

  if (recipes.length === 0) {
    return dsService.fetchRecipes();
  } else {
    return recipes;
  }
};
