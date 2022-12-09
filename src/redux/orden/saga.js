/* eslint-disable no-useless-catch */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import {
  ORDEN_ADD_PHOTO,
  ORDEN_GET_DETAILS,
  ORDEN_PRODUCTO_ADD_PHOTO,
  ORDEN_UPD_ESTADO,
} from '../actions';

import {
  getOrdenSuccess,
  getOrdenError,
  insFotoOrdenSuccess,
  insFotoOrdenError,
  insFotoProductoOrdenSuccess,
  insFotoProductoOrdenError,
  updEstadoOrdenSuccess,
  updEstadoOrdenError,
} from './actions';

const MAIN_URI = '/api/app/ordenes';

const getOrdenRequest = async (idOrden) => {
  try {
    return await API.get(`${MAIN_URI}/${idOrden}`);
  } catch (error) {
    throw error;
  }
};

function* getOrden({ payload }) {
  try {
    const res = yield call(getOrdenRequest, payload);
    yield put(getOrdenSuccess(res.data));
  } catch (error) {
    yield put(getOrdenError(error));
  }
}

const insFotoOrdenRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/uploadphoto`, item);

  return data;
};

function* insFotoOrden({ payload }) {
  try {
    const response = yield call(insFotoOrdenRequest, payload);
    yield put(insFotoOrdenSuccess(response));
  } catch (error) {
    yield put(insFotoOrdenError(error));
  }
}

const insFotoProductoOrdenRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/producto/uploadphoto`, item);

  return data;
};

function* insFotoProductoOrden({ payload }) {
  try {
    const response = yield call(insFotoProductoOrdenRequest, payload);
    yield put(insFotoProductoOrdenSuccess(response));
  } catch (error) {
    yield put(insFotoProductoOrdenError(error));
  }
}

const updEstadoOrdenItemRequest = async (item) => {
  const { data } = await API.patch(`${MAIN_URI}/${item.idOrden}/estado`, item);

  return data;
};

function* updEstadoOrdenItem({ payload }) {
  try {
    const response = yield call(updEstadoOrdenItemRequest, payload);
    yield put(updEstadoOrdenSuccess(response));
  } catch (error) {
    yield put(updEstadoOrdenError(error));
  }
}

export function* watchGetOrden() {
  yield takeEvery(ORDEN_GET_DETAILS, getOrden);
}

export function* watchAddPhotoOrden() {
  yield takeEvery(ORDEN_ADD_PHOTO, insFotoOrden);
}

export function* watchAddPhotoProductoOrden() {
  yield takeEvery(ORDEN_PRODUCTO_ADD_PHOTO, insFotoProductoOrden);
}

export function* watchUpdEstadoOrden() {
  yield takeEvery(ORDEN_UPD_ESTADO, updEstadoOrdenItem);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetOrden),
    fork(watchAddPhotoOrden),
    fork(watchAddPhotoProductoOrden),
    fork(watchUpdEstadoOrden),
  ]);
}
