/* eslint-disable no-useless-catch */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import {
  ORDEN_VENTA_ADD_PHOTO,
  ORDEN_VENTA_GET_DETAILS,
  ORDEN_VENTA_PRODUCTO_ADD_PHOTO,
} from '../actions';

import {
  getOrdenVentaSuccess,
  getOrdenVentaError,
  insFotoOrdenVentaSuccess,
  insFotoOrdenVentaError,
  insFotoProductoOrdenVentaSuccess,
  insFotoProductoOrdenVentaError,
} from './actions';

const MAIN_URI = '/api/app/ordenes_venta';

const getOrdenVentaRequest = async (idOrdenVenta) => {
  try {
    return await API.get(`${MAIN_URI}/${idOrdenVenta}`);
  } catch (error) {
    throw error;
  }
};

function* getOrdenVenta({ payload }) {
  try {
    const res = yield call(getOrdenVentaRequest, payload);
    yield put(getOrdenVentaSuccess(res.data));
  } catch (error) {
    yield put(getOrdenVentaError(error));
  }
}

const insFotoOrdenVentaRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/uploadphoto`, item);

  return data;
};

function* insFotoOrdenVenta({ payload }) {
  try {
    const response = yield call(insFotoOrdenVentaRequest, payload);
    yield put(insFotoOrdenVentaSuccess(response));
  } catch (error) {
    yield put(insFotoOrdenVentaError(error));
  }
}

const insFotoProductoOrdenVentaRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/producto/uploadphoto`, item);

  return data;
};

function* insFotoProductoOrdenVenta({ payload }) {
  try {
    const response = yield call(insFotoProductoOrdenVentaRequest, payload);
    yield put(insFotoProductoOrdenVentaSuccess(response));
  } catch (error) {
    yield put(insFotoProductoOrdenVentaError(error));
  }
}

export function* watchGetOrdenVenta() {
  yield takeEvery(ORDEN_VENTA_GET_DETAILS, getOrdenVenta);
}

export function* watchAddPhotoOrdenVenta() {
  yield takeEvery(ORDEN_VENTA_ADD_PHOTO, insFotoOrdenVenta);
}

export function* watchAddPhotoProductoOrdenVenta() {
  yield takeEvery(ORDEN_VENTA_PRODUCTO_ADD_PHOTO, insFotoProductoOrdenVenta);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetOrdenVenta),
    fork(watchAddPhotoOrdenVenta),
    fork(watchAddPhotoProductoOrdenVenta),
  ]);
}
