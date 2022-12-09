/* eslint-disable no-useless-catch */
/* eslint-disable no-param-reassign */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import {
  ORDENES_VENTA_GET_LIST,
  ORDENES_VENTA_ADD_ITEM,
  ORDENES_VENTA_ALMACEN_GET_LIST,
  ORDENES_VENTA_PROVEEDOR_GET_LIST,
  ORDENES_VENTA_MARCA_GET_LIST,
  ORDENES_VENTA_RECEPTOR_UPD_ITEM,
  ORDENES_VENTA_SEMANA_GET_LIST,
  getOrdenesVentaSemanaError,
  getOrdenesVentaSemanaSuccess,
  ORDENES_VENTA_SEMANA_MONTO_GET_LIST,
} from '../actions';

import {
  getOrdenesVentaSuccess,
  getOrdenesVentaError,
  insOrdenVentaSuccess,
  insOrdenVentaError,
  getOrdenesVentaAlmacenSuccess,
  getOrdenesVentaAlmacenError,
  getOrdenesVentaProveedorSuccess,
  getOrdenesVentaProveedorError,
  getOrdenesVentaMarcaSuccess,
  getOrdenesVentaMarcaError,
  updOrdenVentaUsuarioReceptorError,
  updOrdenVentaUsuarioReceptorSuccess,
  getOrdenesVentaSemanaMontoSuccess,
  getOrdenesVentaSemanaMontoError,
} from './actions';

const MAIN_URI = '/api/app/ordenes_venta';

const getQuery = (query, paramQuery, value) => {
  if (value) {
    query += query.length > 0 ? '&' : '?';
    query += `${paramQuery}=${value}`;
  }
  return query;
};

const getOrdenesVentaRequest = async (params) => {
  try {
    let query = '';
    query = getQuery(query, 'currentPage', params?.currentPage);
    query = getQuery(query, 'pageSize', params?.selectedPageSize);
    query = getQuery(query, 'orderBy', params?.selectedOrderOption?.id);
    query = getQuery(query, 'search', params?.search);
    query = getQuery(query, 'idOrdenVenta', params?.idOrdenVenta);
    query = getQuery(query, 'fechaDesde', params?.fechaDesde);
    query = getQuery(query, 'fechaHasta', params?.fechaHasta);

    return await API.get(`${MAIN_URI}${query}`);
  } catch (error) {
    throw error;
  }
};

function* getOrdenesVentaItems({ payload }) {
  try {
    const res = yield call(getOrdenesVentaRequest, payload);
    yield put(getOrdenesVentaSuccess(res.data));
  } catch (error) {
    yield put(getOrdenesVentaError(error));
  }
}

const insOrdenVentaRequest = async (item) => {
  const { data } = await API.post(MAIN_URI, item);

  return data;
};

function* insOrdenVenta({ payload }) {
  try {
    const response = yield call(insOrdenVentaRequest, payload);
    yield put(insOrdenVentaSuccess(response));
  } catch (error) {
    yield put(insOrdenVentaError(error));
  }
}

const getOrdenesVentaAlmacenRequest = async (params) => {
  try {
    let query = '';
    query = getQuery(query, 'currentPage', params?.currentPage);
    query = getQuery(query, 'pageSize', params?.selectedPageSize);

    return await API.get(`${MAIN_URI}/almacen/${params.idAlmacen}${query}`);
  } catch (error) {
    throw error;
  }
};

function* getOrdenesVentaAlmacenItems({ payload }) {
  try {
    const res = yield call(getOrdenesVentaAlmacenRequest, payload);
    yield put(getOrdenesVentaAlmacenSuccess(res.data));
  } catch (error) {
    yield put(getOrdenesVentaAlmacenError(error));
  }
}

const getOrdenesVentaProveedorRequest = async (params) => {
  try {
    let query = '';
    query = getQuery(query, 'currentPage', params?.currentPage);
    query = getQuery(query, 'pageSize', params?.selectedPageSize);

    return await API.get(`${MAIN_URI}/proveedor/${params.idProveedor}${query}`);
  } catch (error) {
    throw error;
  }
};

function* getOrdenesVentaProveedorItems({ payload }) {
  try {
    const res = yield call(getOrdenesVentaProveedorRequest, payload);
    yield put(getOrdenesVentaProveedorSuccess(res.data));
  } catch (error) {
    yield put(getOrdenesVentaProveedorError(error));
  }
}

const getOrdenesVentaMarcaRequest = async (params) => {
  try {
    let query = '';
    query = getQuery(query, 'currentPage', params?.currentPage);
    query = getQuery(query, 'pageSize', params?.selectedPageSize);

    return await API.get(`${MAIN_URI}/marca/${params.idMarca}${query}`);
  } catch (error) {
    throw error;
  }
};

function* getOrdenesVentaMarcaItems({ payload }) {
  try {
    const res = yield call(getOrdenesVentaMarcaRequest, payload);
    yield put(getOrdenesVentaMarcaSuccess(res.data));
  } catch (error) {
    yield put(getOrdenesVentaMarcaError(error));
  }
}

const updReceptorOrdenRequest = async (item) => {
  const { data } = await API.patch(`${MAIN_URI}/usuarioreceptor`, item);

  return data;
};

function* updReceptorOrden({ payload }) {
  try {
    const response = yield call(updReceptorOrdenRequest, payload);
    yield put(updOrdenVentaUsuarioReceptorSuccess(response));
  } catch (error) {
    yield put(updOrdenVentaUsuarioReceptorError(error));
  }
}

const getOrdenesVentaSemanaRequest = async (idAlmacen) => {
  try {
    return await API.get(`${MAIN_URI}/semana/${idAlmacen}`);
  } catch (error) {
    throw error;
  }
};

function* getOrdenesVentaSemanaItems({ payload }) {
  try {
    const res = yield call(getOrdenesVentaSemanaRequest, payload);
    yield put(getOrdenesVentaSemanaSuccess(res.data));
  } catch (error) {
    yield put(getOrdenesVentaSemanaError(error));
  }
}

const getOrdenesVentaSemanaMontoRequest = async () => {
  try {
    return await API.get(`${MAIN_URI}/semana`);
  } catch (error) {
    throw error;
  }
};

function* getOrdenesVentaSemanaMontoItems({ payload }) {
  try {
    const res = yield call(getOrdenesVentaSemanaMontoRequest, payload);
    yield put(getOrdenesVentaSemanaMontoSuccess(res.data));
  } catch (error) {
    yield put(getOrdenesVentaSemanaMontoError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ORDENES_VENTA_GET_LIST, getOrdenesVentaItems);
}

export function* wathcAddItem() {
  yield takeEvery(ORDENES_VENTA_ADD_ITEM, insOrdenVenta);
}

export function* watchGetAlmacenList() {
  yield takeEvery(ORDENES_VENTA_ALMACEN_GET_LIST, getOrdenesVentaAlmacenItems);
}

export function* watchGetProveedorList() {
  yield takeEvery(
    ORDENES_VENTA_PROVEEDOR_GET_LIST,
    getOrdenesVentaProveedorItems
  );
}

export function* watchGetMarcaList() {
  yield takeEvery(ORDENES_VENTA_MARCA_GET_LIST, getOrdenesVentaMarcaItems);
}

export function* watchUpdReceptorOrdenList() {
  yield takeEvery(ORDENES_VENTA_RECEPTOR_UPD_ITEM, updReceptorOrden);
}

export function* watchGetSemanaList() {
  yield takeEvery(ORDENES_VENTA_SEMANA_GET_LIST, getOrdenesVentaSemanaItems);
}

export function* watchGetSemanaMontoList() {
  yield takeEvery(
    ORDENES_VENTA_SEMANA_MONTO_GET_LIST,
    getOrdenesVentaSemanaMontoItems
  );
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(wathcAddItem),
    fork(watchGetAlmacenList),
    fork(watchGetProveedorList),
    fork(watchGetMarcaList),
    fork(watchUpdReceptorOrdenList),
    fork(watchGetSemanaList),
    fork(watchGetSemanaMontoList),
  ]);
}
