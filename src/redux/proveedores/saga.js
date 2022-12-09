/* eslint-disable no-useless-catch */
/* eslint-disable no-param-reassign */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import {
  PROVEEDORES_GET_LIST,
  PROVEEDORES_ACTIVOS_GET_LIST,
  PROVEEDORES_ADD_ITEM,
  PROVEEDORES_UPD_ITEM,
} from '../actions';

import {
  getProveedoresSuccess,
  getProveedoresError,
  getProveedoresActivosSuccess,
  getProveedoresActivosError,
  insProveedorSuccess,
  insProveedorError,
  updProveedorSuccess,
  updProveedorError,
} from './actions';

const MAIN_URI = '/api/app/proveedores';

const getQuery = (query, paramQuery, value) => {
  if (value) {
    query += query.length > 0 ? '&' : '?';
    query += `${paramQuery}=${value}`;
  }
  return query;
};

const getProveedoresRequest = async (params) => {
  try {
    let query = '';
    query = getQuery(query, 'currentPage', params?.currentPage);
    query = getQuery(query, 'pageSize', params?.selectedPageSize);
    query = getQuery(query, 'orderBy', params?.selectedOrderOption?.id);
    query = getQuery(query, 'search', params?.search);

    return await API.get(`${MAIN_URI}${query}`);
  } catch (error) {
    throw error;
  }
};

function* getProveedoresItems({ payload }) {
  try {
    const res = yield call(getProveedoresRequest, payload);
    yield put(getProveedoresSuccess(res.data));
  } catch (error) {
    yield put(getProveedoresError(error));
  }
}

const getProveedoresActivosRequest = async () => {
  try {
    return await API.get(`${MAIN_URI}/activos`);
  } catch (error) {
    throw error;
  }
};

function* getProveedoresActivosItems({ payload }) {
  try {
    const res = yield call(getProveedoresActivosRequest, payload);
    yield put(getProveedoresActivosSuccess(res.data));
  } catch (error) {
    yield put(getProveedoresActivosError(error));
  }
}

const insProveedorRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}`, item);

  return data;
};

function* insProveedor({ payload }) {
  try {
    const response = yield call(insProveedorRequest, payload);
    yield put(insProveedorSuccess(response));
  } catch (error) {
    yield put(insProveedorError(error));
  }
}

const updProveedorRequest = async (item) => {
  const { data } = await API.put(`${MAIN_URI}/${item.idProveedor}`, item);

  return data;
};

function* updProveedor({ payload }) {
  try {
    const response = yield call(updProveedorRequest, payload);
    yield put(updProveedorSuccess(response));
  } catch (error) {
    yield put(updProveedorError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(PROVEEDORES_GET_LIST, getProveedoresItems);
}
export function* watchActivoGetList() {
  yield takeEvery(PROVEEDORES_ACTIVOS_GET_LIST, getProveedoresActivosItems);
}

export function* watchAddItem() {
  yield takeEvery(PROVEEDORES_ADD_ITEM, insProveedor);
}

export function* watchUpdItem() {
  yield takeEvery(PROVEEDORES_UPD_ITEM, updProveedor);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchActivoGetList),
    fork(watchAddItem),
    fork(watchUpdItem),
  ]);
}
