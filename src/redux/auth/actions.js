// eslint-disable-next-line import/no-cycle
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  CHECK_CODE,
  CHECK_CODE_SUCCESS,
  CHECK_CODE_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  LOGIN_FACEBOOK,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_ERROR,
  LOGIN_GOOGLE,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_ERROR,
} from '../actions';

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history },
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR,
  payload: { message },
});

export const forgotPassword = (params) => ({
  type: FORGOT_PASSWORD,
  payload: params,
});
export const forgotPasswordSuccess = (items) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: items,
});
export const forgotPasswordError = (error) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: error,
});

export const checkCode = (params) => ({
  type: CHECK_CODE,
  payload: params,
});
export const checkCodeSuccess = (items) => ({
  type: CHECK_CODE_SUCCESS,
  payload: items,
});
export const checkCodeError = (error) => ({
  type: CHECK_CODE_ERROR,
  payload: error,
});

export const resetPassword = (params) => ({
  type: RESET_PASSWORD,
  payload: params,
});
export const resetPasswordSuccess = (items) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: items,
});
export const resetPasswordError = (error) => ({
  type: RESET_PASSWORD_ERROR,
  payload: error,
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history },
});
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});
export const registerUserError = (message) => ({
  type: REGISTER_USER_ERROR,
  payload: { message },
});

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: { history },
});

export const loginFacebook = (user, history) => ({
  type: LOGIN_FACEBOOK,
  payload: { user, history },
});
export const loginFacebookSuccess = (user) => ({
  type: LOGIN_FACEBOOK_SUCCESS,
  payload: user,
});
export const loginFacebookError = (message) => ({
  type: LOGIN_FACEBOOK_ERROR,
  payload: { message },
});

export const loginGoogle = (user, history) => ({
  type: LOGIN_GOOGLE,
  payload: { user, history },
});
export const loginGoogleSuccess = (user) => ({
  type: LOGIN_GOOGLE_SUCCESS,
  payload: user,
});
export const loginGoogleError = (message) => ({
  type: LOGIN_GOOGLE_ERROR,
  payload: { message },
});
