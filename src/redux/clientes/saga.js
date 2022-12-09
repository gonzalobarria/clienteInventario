/* eslint-disable no-useless-catch */
/* eslint-disable no-param-reassign */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import {
  CLIENTES_GET_LIST,
  CLIENTES_ADD_ITEM,
  CLIENTES_UPD_ITEM,
} from '../actions';

import {
  getClientesSuccess,
  getClientesError,
  insClienteSuccess,
  insClienteError,
  updClienteSuccess,
  updClienteError,
} from './actions';

const MAIN_URI = '/api/app/clientes';

const getQuery = (query, paramQuery, value) => {
  if (value) {
    query += query.length > 0 ? '&' : '?';
    query += `${paramQuery}=${value}`;
  }
  return query;
};

const getClientesRequest = async (params) => {
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

function* getClientesItems({ payload }) {
  try {
    const res = yield call(getClientesRequest, payload);
    yield put(getClientesSuccess(res.data));
  } catch (error) {
    yield put(getClientesError(error));
  }
}

const insClienteRequest = async (item) => {
  const { data } = await API.post(MAIN_URI, item);

  return data;
};

function* insCliente({ payload }) {
  try {
    const response = yield call(insClienteRequest, payload);
    yield put(insClienteSuccess(response));
  } catch (error) {
    yield put(insClienteError(error));
  }
}

const updClienteRequest = async (item) => {
  const { data } = await API.put(`${MAIN_URI}/${item.idCliente}`, item);

  return data;
};

function* updCliente({ payload }) {
  try {
    const response = yield call(updClienteRequest, payload);
    yield put(updClienteSuccess(response));
  } catch (error) {
    yield put(updClienteError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(CLIENTES_GET_LIST, getClientesItems);
}

export function* wathcAddItem() {
  yield takeEvery(CLIENTES_ADD_ITEM, insCliente);
}

export function* wathcUpdItem() {
  yield takeEvery(CLIENTES_UPD_ITEM, updCliente);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem), fork(wathcUpdItem)]);
}
