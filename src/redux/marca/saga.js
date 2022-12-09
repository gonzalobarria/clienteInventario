/* eslint-disable no-useless-catch */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import { MARCA_GET_DETAILS, MARCA_ADD_PHOTO } from '../actions';

import {
  getMarcaSuccess,
  getMarcaError,
  insFotoMarcaSuccess,
  insFotoMarcaError,
} from './actions';

const MAIN_URI = '/api/app/marcas';

const getMarcaRequest = async (idMarca) => {
  try {
    return await API.get(`${MAIN_URI}/${idMarca}`);
  } catch (error) {
    throw error;
  }
};

function* getMarca({ payload }) {
  try {
    const res = yield call(getMarcaRequest, payload);
    yield put(getMarcaSuccess(res.data));
  } catch (error) {
    yield put(getMarcaError(error));
  }
}

const insFotoMarcaRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/uploadphoto`, item);

  return data;
};

function* insFotoMarca({ payload }) {
  try {
    const response = yield call(insFotoMarcaRequest, payload);
    yield put(insFotoMarcaSuccess(response));
  } catch (error) {
    yield put(insFotoMarcaError(error));
  }
}

export function* watchGetProduct() {
  yield takeEvery(MARCA_GET_DETAILS, getMarca);
}

export function* watchAddPhotoMarca() {
  yield takeEvery(MARCA_ADD_PHOTO, insFotoMarca);
}

export default function* rootSaga() {
  yield all([fork(watchGetProduct), fork(watchAddPhotoMarca)]);
}
