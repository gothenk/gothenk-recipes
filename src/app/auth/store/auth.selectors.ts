import * as fromApp from '../../store/app.reducer';

export const selectAuth = (state: fromApp.AppState) => {
  return state.auth;
};
