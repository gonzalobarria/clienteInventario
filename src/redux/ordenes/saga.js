/* eslint-disable no-useless-catch */
/* eslint-disable no-param-reassign */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import {
  ORDENES_ALMACEN_GET_LIST,
  ORDENES_PROVEEDOR_GET_LIST,
  ORDENES_MARCA_GET_LIST,
} from '../actions';

import {
  getOrdenesAlmacenSuccess,
  getOrdenesAlmacenError,
  getOrdenesProveedorSuccess,
  getOrdenesProveedorError,
  getOrdenesMarcaSuccess,
  getOrdenesMarcaError,
} from './actions';

const MAIN_URI = '/api/app/ordenes';

const getQuery = (query, paramQuery, value) => {
  if (value) {
    query += query.length > 0 ? '&' : '?';
    query += `${paramQuery}=${value}`;
  }
  return query;
};

const getOrdenesAlmacenRequest = async (params) => {
  try {
    let query = '';
    query = getQuery(query, 'currentPage', params?.currentPage);
    query = getQuery(query, 'pageSize', params?.selectedPageSize);

    return await API.get(`${MAIN_URI}/almacen/${params.idAlmacen}${query}`);
  } catch (error) {
    throw error;
  }
};

function* getOrdenesAlmacenItems({ payload }) {
  try {
    const res = yield call(getOrdenesAlmacenRequest, payload);
    yield put(getOrdenesAlmacenSuccess(res.data));
  } catch (error) {
    yield put(getOrdenesAlmacenError(error));
  }
}

const getOrdenesProveedorRequest = async (params) => {
  try {
    let query = '';
    query = getQuery(query, 'currentPage', params?.currentPage);
    query = getQuery(query, 'pageSize', params?.selectedPageSize);

    return await API.get(`${MAIN_URI}/proveedor/${params.idProveedor}${query}`);
  } catch (error) {
    throw error;
  }
};

function* getOrdenesProveedorItems({ payload }) {
  try {
    const res = yield call(getOrdenesProveedorRequest, payload);
    yield put(getOrdenesProveedorSuccess(res.data));
  } catch (error) {
    yield put(getOrdenesProveedorError(error));
  }
}

const getOrdenesMarcaRequest = async (params) => {
  try {
    let query = '';
    query = getQuery(query, 'currentPage', params?.currentPage);
    query = getQuery(query, 'pageSize', params?.selectedPageSize);

    return await API.get(`${MAIN_URI}/marca/${params.idMarca}${query}`);
  } catch (error) {
    throw error;
  }
};

function* getOrdenesMarcaItems({ payload }) {
  try {
    const res = yield call(getOrdenesMarcaRequest, payload);
    yield put(getOrdenesMarcaSuccess(res.data));
  } catch (error) {
    yield put(getOrdenesMarcaError(error));
  }
}

export function* watchGetAlmacenList() {
  yield takeEvery(ORDENES_ALMACEN_GET_LIST, getOrdenesAlmacenItems);
}

export function* watchGetProveedorList() {
  yield takeEvery(ORDENES_PROVEEDOR_GET_LIST, getOrdenesProveedorItems);
}

export function* watchGetMarcaList() {
  yield takeEvery(ORDENES_MARCA_GET_LIST, getOrdenesMarcaItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAlmacenList),
    fork(watchGetProveedorList),
    fork(watchGetMarcaList),
  ]);
}
