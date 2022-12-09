/* eslint-disable no-useless-catch */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import { USUARIO_GET_DETAILS, USUARIO_ADD_PHOTO } from '../actions';

import {
  getUsuarioSuccess,
  getUsuarioError,
  insFotoUsuarioSuccess,
  insFotoUsuarioError,
} from './actions';

const MAIN_URI = '/api/app/usuarios';

const getUsuarioRequest = async (idUsuario) => {
  try {
    return await API.get(`${MAIN_URI}/${idUsuario}`);
  } catch (error) {
    throw error;
  }
};

function* getUsuario({ payload }) {
  try {
    const res = yield call(getUsuarioRequest, payload);
    yield put(getUsuarioSuccess(res.data));
  } catch (error) {
    yield put(getUsuarioError(error));
  }
}

const insFotoUsuarioRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/uploadphoto`, item);

  return data;
};

function* insFotoUsuario({ payload }) {
  try {
    const response = yield call(insFotoUsuarioRequest, payload);
    yield put(insFotoUsuarioSuccess(response));
  } catch (error) {
    yield put(insFotoUsuarioError(error));
  }
}

export function* watchGetProduct() {
  yield takeEvery(USUARIO_GET_DETAILS, getUsuario);
}

export function* watchAddPhotoUsuario() {
  yield takeEvery(USUARIO_ADD_PHOTO, insFotoUsuario);
}

export default function* rootSaga() {
  yield all([fork(watchGetProduct), fork(watchAddPhotoUsuario)]);
}
