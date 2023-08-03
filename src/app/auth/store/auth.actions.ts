import { createAction, props } from '@ngrx/store';

const LOGIN_START = '[Auth] Login Start';
const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
const SIGNUP_START = '[Auth] Signup Start';
const CLEAR_ERROR = '[Auth] Clear Error';
const AUTO_LOGIN = '[Auth] Auto Login';
const LOGOUT = '[Auth] Logout';

export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    };
  }>()
);

export const logout = createAction(LOGOUT);

export const loginStart = createAction(
  LOGIN_START,
  props<{
    payload: {
      email: string;
      password: string;
    };
  }>()
);

export const authenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{
    payload: string;
  }>()
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{
    payload: {
      email: string;
      password: string;
    };
  }>()
);

export const clearError = createAction(CLEAR_ERROR);

export const autoLogin = createAction(AUTO_LOGIN);
