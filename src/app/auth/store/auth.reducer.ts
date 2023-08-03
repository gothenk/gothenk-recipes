import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { User } from '../user.model';

export type State = {
  user: User;
  authError: string;
  loading: boolean;
};

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authenticateSuccess, (state, action) => {
    const user = new User(
      action.payload.email,
      action.payload.userId,
      action.payload.token,
      action.payload.expirationDate
    );

    return { ...state, authError: null, user: user, loading: false };
  }),
  on(AuthActions.logout, (state, _) => {
    return { ...state, user: null };
  }),
  on(AuthActions.loginStart, AuthActions.signupStart, (state, _) => {
    return { ...state, authError: null, loading: true };
  }),
  on(AuthActions.authenticateFail, (state, action) => {
    return { ...state, authError: action.payload, user: null, loading: false };
  }),
  on(AuthActions.clearError, (state, _) => {
    return { ...state, authError: null };
  })
);
