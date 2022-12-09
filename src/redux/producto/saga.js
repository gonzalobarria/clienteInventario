/* eslint-disable no-useless-catch */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import { PRODUCTO_NEGOCIO_GET_DETAILS, PRODUCTO_ADD_PHOTO } from '../actions';

import {
  getProductoNegocioSuccess,
  getProductoNegocioError,
  insFotoProductoSuccess,
  insFotoProductoError,
} from './actions';

const MAIN_URI = '/api/app/productos';

const getProductoNegocioRequest = async (idProducto) => {
  try {
    return await API.get(`${MAIN_URI}/${idProducto}/negocio`);
  } catch (error) {
    throw error;
  }
};

function* getProductoNegocio({ payload }) {
  try {
    const res = yield call(getProductoNegocioRequest, payload);
    yield put(getProductoNegocioSuccess(res.data));
  } catch (error) {
    yield put(getProductoNegocioError(error));
  }
}

const insFotoProductoRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/uploadphoto`, item);

  return data;
};

function* insFotoProducto({ payload }) {
  try {
    const response = yield call(insFotoProductoRequest, payload);
    yield put(insFotoProductoSuccess(response));
  } catch (error) {
    yield put(insFotoProductoError(error));
  }
}

export function* watchGetProductNegocio() {
  yield takeEvery(PRODUCTO_NEGOCIO_GET_DETAILS, getProductoNegocio);
}

export function* watchAddPhotoProducto() {
  yield takeEvery(PRODUCTO_ADD_PHOTO, insFotoProducto);
}

export default function* rootSaga() {
  yield all([fork(watchGetProductNegocio), fork(watchAddPhotoProducto)]);
}
