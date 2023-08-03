import * as fromApp from '../../store/app.reducer';

export const selectShoppingList = (state: fromApp.AppState) => {
  return state.shoppingList;
};
