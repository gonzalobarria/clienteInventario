/* eslint-disable no-useless-catch */
/* eslint-disable no-param-reassign */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';
import { addEmpty } from '../../helpers/Utils';

import {
  CATEGORIAS_GET_LIST,
  CATEGORIAS_ADD_ITEM,
  CATEGORIAS_UPD_ITEM,
  CATEGORIAS_ACTIVAS_GET_LIST,
  CATEGORIAS_TODAS_GET_LIST,
} from '../actions';

import {
  getCategoriasSuccess,
  getCategoriasError,
  insCategoriaSuccess,
  insCategoriaError,
  updCategoriaSuccess,
  updCategoriaError,
  getCategoriasActivasSuccess,
  getCategoriasActivasError,
  getCategoriasTodasSuccess,
  getCategoriasTodasError,
} from './actions';

const MAIN_URI = '/api/app/categorias';

const getQuery = (query, paramQuery, value) => {
  if (value) {
    query += query.length > 0 ? '&' : '?';
    query += `${paramQuery}=${value}`;
  }
  return query;
};

const getCategoriasRequest = async (params) => {
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

function* getCategoriasItems({ payload }) {
  try {
    const res = yield call(getCategoriasRequest, payload);
    yield put(getCategoriasSuccess(res.data));
  } catch (error) {
    yield put(getCategoriasError(error));
  }
}

const insCategoriaRequest = async (item) => {
  const { data } = await API.post(MAIN_URI, item);

  return data;
};

function* insCategoria({ payload }) {
  try {
    const response = yield call(insCategoriaRequest, payload);
    yield put(insCategoriaSuccess(response));
  } catch (error) {
    yield put(insCategoriaError(error));
  }
}

const updCategoriaRequest = async (item) => {
  const { data } = await API.put(`${MAIN_URI}/${item.idCategoria}`, item);

  return data;
};

function* updCategoria({ payload }) {
  try {
    const response = yield call(updCategoriaRequest, payload);
    yield put(updCategoriaSuccess(response));
  } catch (error) {
    yield put(updCategoriaError(error));
  }
}

const getCategoriasActivasRequest = async () => {
  try {
    return await API.get(`${MAIN_URI}/activas`);
  } catch (error) {
    throw error;
  }
};

function* getCategoriasActivasItems({ payload }) {
  try {
    const res = yield call(getCategoriasActivasRequest, payload);
    const glosa = 'Sin Categoria';
    yield put(getCategoriasActivasSuccess(addEmpty(glosa, res.data)));
  } catch (error) {
    yield put(getCategoriasActivasError(error));
  }
}

const getCategoriasTodasRequest = async () => {
  try {
    return await API.get(`${MAIN_URI}/todas`);
  } catch (error) {
    throw error;
  }
};

function* getCategoriasTodasItems({ payload }) {
  try {
    const res = yield call(getCategoriasTodasRequest, payload);
    yield put(getCategoriasTodasSuccess(res.data));
  } catch (error) {
    yield put(getCategoriasTodasError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(CATEGORIAS_GET_LIST, getCategoriasItems);
}

export function* wathcAddItem() {
  yield takeEvery(CATEGORIAS_ADD_ITEM, insCategoria);
}

export function* wathcUpdItem() {
  yield takeEvery(CATEGORIAS_UPD_ITEM, updCategoria);
}

export function* watchActivasGetList() {
  yield takeEvery(CATEGORIAS_ACTIVAS_GET_LIST, getCategoriasActivasItems);
}

export function* watchTodasGetList() {
  yield takeEvery(CATEGORIAS_TODAS_GET_LIST, getCategoriasTodasItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(wathcAddItem),
    fork(wathcUpdItem),
    fork(watchActivasGetList),
    fork(watchTodasGetList),
  ]);
}
