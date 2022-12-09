/* eslint-disable no-useless-catch */
/* eslint-disable no-param-reassign */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';
import { addEmpty } from '../../helpers/Utils';

import {
  MARCAS_GET_LIST,
  MARCAS_ADD_ITEM,
  MARCAS_UPD_ITEM,
  MARCAS_ACTIVAS_GET_LIST,
} from '../actions';

import {
  getMarcasSuccess,
  getMarcasError,
  insMarcaSuccess,
  insMarcaError,
  updMarcaSuccess,
  updMarcaError,
  getMarcasActivasSuccess,
  getMarcasActivasError,
} from './actions';

const MAIN_URI = '/api/app/marcas';

const getQuery = (query, paramQuery, value) => {
  if (value) {
    query += query.length > 0 ? '&' : '?';
    query += `${paramQuery}=${value}`;
  }
  return query;
};

const getMarcasRequest = async (params) => {
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

function* getMarcasItems({ payload }) {
  try {
    const res = yield call(getMarcasRequest, payload);
    yield put(getMarcasSuccess(res.data));
  } catch (error) {
    yield put(getMarcasError(error));
  }
}

const insMarcaRequest = async (item) => {
  const { data } = await API.post(MAIN_URI, item);

  return data;
};

function* insMarca({ payload }) {
  try {
    const response = yield call(insMarcaRequest, payload);
    yield put(insMarcaSuccess(response));
  } catch (error) {
    yield put(insMarcaError(error));
  }
}

const updMarcaRequest = async (item) => {
  const { data } = await API.put(`${MAIN_URI}/${item.idMarca}`, item);

  return data;
};

function* updMarca({ payload }) {
  try {
    const response = yield call(updMarcaRequest, payload);
    yield put(updMarcaSuccess(response));
  } catch (error) {
    yield put(updMarcaError(error));
  }
}

const getMarcasActivasRequest = async () => {
  try {
    return await API.get(`${MAIN_URI}/activas`);
  } catch (error) {
    throw error;
  }
};

function* getMarcasActivasItems({ payload }) {
  try {
    const res = yield call(getMarcasActivasRequest, payload);
    const glosa = 'Sin Marca';
    yield put(getMarcasActivasSuccess(addEmpty(glosa, res.data)));
  } catch (error) {
    yield put(getMarcasActivasError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(MARCAS_GET_LIST, getMarcasItems);
}

export function* wathcAddItem() {
  yield takeEvery(MARCAS_ADD_ITEM, insMarca);
}

export function* wathcUpdItem() {
  yield takeEvery(MARCAS_UPD_ITEM, updMarca);
}

export function* watchActivasGetList() {
  yield takeEvery(MARCAS_ACTIVAS_GET_LIST, getMarcasActivasItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(wathcAddItem),
    fork(wathcUpdItem),
    fork(watchActivasGetList),
  ]);
}
