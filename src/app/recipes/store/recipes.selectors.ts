import * as fromApp from '../../store/app.reducer';

export const selectRecipes = (state: fromApp.AppState) => {
  return state.recipes;
};
