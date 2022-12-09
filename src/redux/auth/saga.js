import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';
import { adminRoot } from '../../constants/defaultValues';
import { setCurrentUser } from '../../helpers/Utils';
import authService from '../../services/authService';

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  LOGIN_FACEBOOK,
  LOGIN_GOOGLE,
  CHECK_CODE,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  checkCodeSuccess,
  checkCodeError,
} from './actions';

const PA_URI = '/api/pre-auth';

const loginWithEmailPasswordAsync = async (formValues) => {
  try {
    return await authService.login(formValues);
  } catch (error) {
    return error;
  }
};

function* loginWithEmailPassword({ payload }) {
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, payload.user);
    if (!loginUser.message) {
      const item = {};
      if (loginUser.negociosUsuario.length === 1) {
        item.negocioActivo = loginUser.negociosUsuario[0].id_negocio;
        item.funcionalidades = loginUser.negociosUsuario[0].func;
        item.almacenes = loginUser.negociosUsuario[0].almacenes;
      }
      item.nombre = loginUser.nombre;
      item.imgURL = loginUser.imgURL;
      item.id = loginUser.id;

      setCurrentUser(item);
      yield put(loginUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

const registerWithEmailPasswordAsync = async (formValues) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await authService.registro(formValues);
  } catch (error) {
    throw error;
  }
};

function* registerWithEmailPassword({ payload }) {
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      payload.user
    );
    if (!registerUser.message) {
      localStorage.setItem('user_id', registerUser.id);
      yield put(registerUserSuccess(registerUser));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

const logoutAsync = async (history) => {
  history.push(adminRoot);
};

function* logout({ payload }) {
  setCurrentUser();

  yield call(logoutAsync, payload.history);
}

const forgotPasswordRequest = async (payload) => {
  // eslint-disable-next-line no-return-await
  return await API.patch(`${PA_URI}/olvido-password`, payload);
};

function* forgotPassword({ payload }) {
  try {
    const res = yield call(forgotPasswordRequest, payload);
    yield put(forgotPasswordSuccess(res.data));
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

const resetPasswordAsync = async (payload) => {
  // eslint-disable-next-line no-return-await
  return await API.patch(`${PA_URI}/cambia-clave`, payload);
};

function* resetPassword({ payload }) {
  try {
    const res = yield call(resetPasswordAsync, payload);
    yield put(resetPasswordSuccess(res.data));
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

const loginFacebookAsync = async (user) => {
  try {
    return await authService.facebookLogin(user);
  } catch (error) {
    return error;
  }
};

function* loginFacebook({ payload }) {
  const { history } = payload;
  try {
    const loginUser = yield call(loginFacebookAsync, payload.user);
    if (!loginUser.message) {
      localStorage.setItem('user_id', loginUser.id);
      yield put(loginUserSuccess(loginUser));
      history.push(adminRoot);
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

const loginGoogleAsync = async (user) => {
  try {
    return await authService.googleLogin(user);
  } catch (error) {
    return error;
  }
};

function* loginGoogle({ payload }) {
  const { history } = payload;
  try {
    const loginUser = yield call(loginGoogleAsync, payload.user);
    if (!loginUser.message) {
      localStorage.setItem('user_id', loginUser.id);
      yield put(loginUserSuccess(loginUser));
      history.push(adminRoot);
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

const checkCodeRequest = async (payload) => {
  // eslint-disable-next-line no-return-await
  return await API.post(`${PA_URI}/verifica-codigo`, payload);
};

function* checkCode({ payload }) {
  try {
    const res = yield call(checkCodeRequest, payload);
    yield put(checkCodeSuccess(res.data));
  } catch (error) {
    yield put(checkCodeError(error));
  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

export function* watchLoginFacebook() {
  yield takeEvery(LOGIN_FACEBOOK, loginFacebook);
}

export function* watchLoginGoogle() {
  yield takeEvery(LOGIN_GOOGLE, loginGoogle);
}

export function* watchCheckCode() {
  yield takeEvery(CHECK_CODE, checkCode);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchLoginFacebook),
    fork(watchLoginGoogle),
    fork(watchCheckCode),
  ]);
}
