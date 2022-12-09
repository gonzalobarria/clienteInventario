/* eslint-disable no-useless-catch */
/* eslint-disable no-param-reassign */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { Funcionalidades } from '../../helpers/authHelper';
import { API } from '../../helpers/axios';
import { preValidation } from '../../helpers/Utils';

import {
  PRODUCTOS_ALMACEN_GET_LIST,
  PRODUCTOS_CLIENTE_GET_LIST,
  PRODUCTOS_NEGOCIO_GET_LIST,
  PRODUCTOS_NEGOCIO_ADD_ITEM,
  PRODUCTOS_CLIENTE_ADD_ITEM,
  PRODUCTOS_NEGOCIO_DELETE_ITEM,
  PRODUCTOS_PROVEEDOR_GET_LIST,
  PRODUCTOS_CLIENTE_DELETE_ITEM,
  PRODUCTOS_CLIENTE_UPD_ITEM,
  PRODUCTOS_NEGOCIO_GET_LIST_FREE,
  PRODUCTOS_ALMACEN_UPD_ITEM,
  PRODUCTOS_ALMACEN_DELETE_ITEM,
  PRODUCTOS_MARCA_GET_LIST,
  PRODUCTOS_NO_ESTAN_ALMACEN_GET_LIST,
  PRODUCTOS_ALMACEN_ADD_ITEM,
  PRODUCTOS_NO_ESTAN_ORDEN_GET_LIST,
  PRODUCTOS_ORDEN_GET_LIST,
  PRODUCTOS_ORDEN_UPD_ITEM,
  PRODUCTOS_ORDEN_ADD_ITEM,
  PRODUCTOS_CATEGORIA_GET_LIST,
  PRODUCTOS_ALMACEN_VENTA_GET_LIST,
  PRODUCTOS_ORDEN_VENTA_GET_LIST,
  PRODUCTOS_MEJOR_VENDIDOS_GET_LIST,
} from '../actions';

import {
  getProductosAlmacenSuccess,
  getProductosAlmacenError,
  getProductosClienteSuccess,
  getProductosClienteError,
  getProductosNegocioSuccess,
  getProductosNegocioError,
  insProductoNegocioSuccess,
  insProductoNegocioError,
  insProductoClienteSuccess,
  insProductoClienteError,
  delProductoNegocioSuccess,
  delProductoNegocioError,
  getProductosProveedorSuccess,
  getProductosProveedorError,
  delProductoClienteSuccess,
  delProductoClienteError,
  updProductoClienteSuccess,
  updProductoClienteError,
  getProductosNegocioLibresSuccess,
  getProductosNegocioLibresError,
  updProductoAlmacenSuccess,
  updProductoAlmacenError,
  delProductoAlmacenSuccess,
  delProductoAlmacenError,
  getProductosMarcaSuccess,
  getProductosMarcaError,
  getProductosNoEstanAlmacenSuccess,
  getProductosNoEstanAlmacenError,
  insProductoAlmacenSuccess,
  insProductoAlmacenError,
  getProductosNoEstanOrdenSuccess,
  getProductosNoEstanOrdenError,
  getProductosOrdenSuccess,
  getProductosOrdenError,
  updProductoOrdenSuccess,
  updProductoOrdenError,
  insProductoOrdenSuccess,
  insProductoOrdenError,
  getProductosCategoriaSuccess,
  getProductosCategoriaError,
  getProductosAlmacenVentaSuccess,
  getProductosAlmacenVentaError,
  getProductosOrdenVentaError,
  getProductosOrdenVentaSuccess,
  getProductosMejorVendidosSuccess,
  getProductosMejorVendidosError,
} from './actions';

const MAIN_URI = '/api/app/productos';

const getQuery = (query, paramQuery, value) => {
  if (value) {
    query += query.length > 0 ? '&' : '?';
    query += `${paramQuery}=${value}`;
  }
  return query;
};

const insProductoNegocioRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/negocio`, item);

  return data;
};

function* insProductoNegocio({ payload }) {
  try {
    const response = yield call(insProductoNegocioRequest, payload);
    yield put(insProductoNegocioSuccess(response));
  } catch (error) {
    yield put(insProductoNegocioError(error));
  }
}

const insProductoClienteRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/cliente`, item);

  return data;
};

function* insProductoCliente({ payload }) {
  try {
    const response = yield call(insProductoClienteRequest, payload);
    yield put(insProductoClienteSuccess(response));
  } catch (error) {
    yield put(insProductoClienteError(error));
  }
}

const getProductosAlmacenRequest = async (idAlmacen) => {
  try {
    return await API.get(`${MAIN_URI}/almacen/${idAlmacen}`);
  } catch (error) {
    throw error;
  }
};

function* getProductosAlmacenItems({ payload }) {
  try {
    preValidation([
      Funcionalidades.Ver_Producto_del_Almacén,
      Funcionalidades.Crear_Orden,
      // Funcionalidades.Agregar_Orden_Venta,
      Funcionalidades.Ver_Orden,
      Funcionalidades.Actualizar_Orden,
    ]);

    const res = yield call(getProductosAlmacenRequest, payload);
    yield put(getProductosAlmacenSuccess(res.data));
  } catch (error) {
    yield put(getProductosAlmacenError(error));
  }
}

const getProductosClienteRequest = async (params) => {
  try {
    return await API.get(`${MAIN_URI}/cliente/${params}`);
  } catch (error) {
    throw error;
  }
};

function* getProductosClienteItems({ payload }) {
  try {
    const res = yield call(getProductosClienteRequest, payload);
    yield put(getProductosClienteSuccess(res.data));
  } catch (error) {
    yield put(getProductosClienteError(error));
  }
}

const getProductosNegocioRequest = async (params) => {
  try {
    let query = '';
    query = getQuery(query, 'currentPage', params?.currentPage);
    query = getQuery(query, 'pageSize', params?.selectedPageSize);
    query = getQuery(query, 'orderBy', params?.selectedOrderOption?.id);
    query = getQuery(query, 'search', params?.search);

    return await API.get(`${MAIN_URI}/negocio${query}`);
  } catch (error) {
    throw error;
  }
};

function* getProductosNegocioItems({ payload }) {
  try {
    const res = yield call(getProductosNegocioRequest, payload);
    yield put(getProductosNegocioSuccess(res.data));
  } catch (error) {
    yield put(getProductosNegocioError(error));
  }
}

const getProductosAlmacenVentaRequest = async (params) => {
  try {
    preValidation([Funcionalidades.Agregar_Orden_Venta]);

    let query = '';
    query = getQuery(query, 'currentPage', params?.currentPage);
    query = getQuery(query, 'pageSize', params?.selectedPageSize);
    query = getQuery(query, 'orderBy', params?.selectedOrderOption?.id);
    query = getQuery(query, 'search', params?.search);
    query = getQuery(query, 'category', params?.categoria);

    return await API.get(
      `${MAIN_URI}/almacen/venta/${params.idAlmacenActivo}${query}`
    );
  } catch (error) {
    throw error;
  }
};

function* getProductosAlmacenVentaItems({ payload }) {
  try {
    const res = yield call(getProductosAlmacenVentaRequest, payload);
    yield put(getProductosAlmacenVentaSuccess(res.data));
  } catch (error) {
    yield put(getProductosAlmacenVentaError(error));
  }
}

const delProductoNegocioRequest = async (item) => {
  try {
    const { data } = await API.patch(`${MAIN_URI}/negocio/${item.data}`, item);

    return data;
  } catch (error) {
    throw error;
  }
};

function* delProductoNegocio({ payload }) {
  try {
    const res = yield call(delProductoNegocioRequest, payload);
    yield put(delProductoNegocioSuccess(res.data));
  } catch (error) {
    yield put(delProductoNegocioError(error));
  }
}

const delProductoClienteRequest = async (item) => {
  try {
    return await API.patch(`${MAIN_URI}/cliente/${item.idCliente}`, item);
  } catch (error) {
    throw error;
  }
};

function* delProductoCliente({ payload }) {
  try {
    const res = yield call(delProductoClienteRequest, payload);
    yield put(delProductoClienteSuccess(res.data));
  } catch (error) {
    yield put(delProductoClienteError(error));
  }
}

const updProductoClienteRequest = async (item) => {
  try {
    return await API.patch(`${MAIN_URI}/cliente/${item.idCliente}`, item);
  } catch (error) {
    throw error;
  }
};

function* updProductoCliente({ payload }) {
  try {
    const res = yield call(updProductoClienteRequest, payload);
    yield put(updProductoClienteSuccess(res.data));
  } catch (error) {
    yield put(updProductoClienteError(error));
  }
}

const getProductosProveedorRequest = async (idProveedor) => {
  try {
    return await API.get(`${MAIN_URI}/proveedor/${idProveedor}`);
  } catch (error) {
    throw error;
  }
};

function* getProductosProveedorItems({ payload }) {
  try {
    const res = yield call(getProductosProveedorRequest, payload);
    yield put(getProductosProveedorSuccess(res.data));
  } catch (error) {
    yield put(getProductosProveedorError(error));
  }
}

const getProductosNegocioLibresRequest = async (idCliente) => {
  try {
    return await API.get(`${MAIN_URI}/cliente/${idCliente}/libres`);
  } catch (error) {
    throw error;
  }
};

function* getProductosNegocioLibres({ payload }) {
  try {
    const res = yield call(getProductosNegocioLibresRequest, payload);
    yield put(getProductosNegocioLibresSuccess(res.data));
  } catch (error) {
    yield put(getProductosNegocioLibresError(error));
  }
}

const updProductoAlmacenRequest = async (item) => {
  try {
    return await API.patch(`${MAIN_URI}/almacen/${item.idAlmacen}`, item);
  } catch (error) {
    throw error;
  }
};

function* updProductoAlmacen({ payload }) {
  try {
    const res = yield call(updProductoAlmacenRequest, payload);
    yield put(updProductoAlmacenSuccess(res.data));
  } catch (error) {
    yield put(updProductoAlmacenError(error));
  }
}

const delProductoAlmacenRequest = async (item) => {
  try {
    return await API.patch(`${MAIN_URI}/almacen/${item.idAlmacen}`, item);
  } catch (error) {
    throw error;
  }
};

function* delProductoAlmacen({ payload }) {
  try {
    const res = yield call(delProductoAlmacenRequest, payload);
    yield put(delProductoAlmacenSuccess(res.data));
  } catch (error) {
    yield put(delProductoAlmacenError(error));
  }
}

const getProductosMarcaRequest = async (params) => {
  try {
    return await API.get(`${MAIN_URI}/marca/${params.idMarca}`);
  } catch (error) {
    throw error;
  }
};

function* getProductosMarcaItems({ payload }) {
  try {
    const res = yield call(getProductosMarcaRequest, payload);
    yield put(getProductosMarcaSuccess(res.data));
  } catch (error) {
    yield put(getProductosMarcaError(error));
  }
}

const getProductosNoEstanAlmacenRequest = async (params) => {
  try {
    return await API.get(`${MAIN_URI}/almacen/${params}/faltantes`);
  } catch (error) {
    throw error;
  }
};

function* getProductosNoEstanAlmacenItems({ payload }) {
  try {
    const res = yield call(getProductosNoEstanAlmacenRequest, payload);
    yield put(getProductosNoEstanAlmacenSuccess(res.data));
  } catch (error) {
    yield put(getProductosNoEstanAlmacenError(error));
  }
}

const insProductoAlmacenRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/almacen`, item);

  return data;
};

function* insProductoAlmacen({ payload }) {
  try {
    const response = yield call(insProductoAlmacenRequest, payload);
    yield put(insProductoAlmacenSuccess(response));
  } catch (error) {
    yield put(insProductoAlmacenError(error));
  }
}

const getProductosNoEstanOrdenRequest = async (idOrden) => {
  try {
    return await API.get(`${MAIN_URI}/orden/${idOrden}/faltantes`);
  } catch (error) {
    throw error;
  }
};

function* getProductosNoEstanOrdenItems({ payload }) {
  try {
    const res = yield call(getProductosNoEstanOrdenRequest, payload);
    yield put(getProductosNoEstanOrdenSuccess(res.data));
  } catch (error) {
    yield put(getProductosNoEstanOrdenError(error));
  }
}

const getProductosOrdenRequest = async (idOrden) => {
  try {
    return await API.get(`${MAIN_URI}/orden/${idOrden}`);
  } catch (error) {
    throw error;
  }
};

function* getProductosOrdenItems({ payload }) {
  try {
    const res = yield call(getProductosOrdenRequest, payload);
    yield put(getProductosOrdenSuccess(res.data));
  } catch (error) {
    yield put(getProductosOrdenError(error));
  }
}

const updProductoOrdenItemRequest = async (item) => {
  const { data } = await API.patch(`${MAIN_URI}/orden`, item);

  return data;
};

function* updProductoOrdenItem({ payload }) {
  try {
    const response = yield call(updProductoOrdenItemRequest, payload);
    yield put(updProductoOrdenSuccess(response));
  } catch (error) {
    yield put(updProductoOrdenError(error));
  }
}

const insProductoOrdenRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/orden`, item);

  return data;
};

function* insProductoOrden({ payload }) {
  try {
    const response = yield call(insProductoOrdenRequest, payload);
    yield put(insProductoOrdenSuccess(response));
  } catch (error) {
    yield put(insProductoOrdenError(error));
  }
}

const getProductosCategoriaRequest = async (params) => {
  try {
    return await API.get(`${MAIN_URI}/categoria/${params.idCategoria}`);
  } catch (error) {
    throw error;
  }
};

function* getProductosCategoriaItems({ payload }) {
  try {
    const res = yield call(getProductosCategoriaRequest, payload);
    yield put(getProductosCategoriaSuccess(res.data));
  } catch (error) {
    yield put(getProductosCategoriaError(error));
  }
}

const getProductosOrdenVentaRequest = async (idOrdenVenta) => {
  try {
    return await API.get(`${MAIN_URI}/orden_venta/${idOrdenVenta}`);
  } catch (error) {
    throw error;
  }
};

function* getProductosOrdenVentaItems({ payload }) {
  try {
    const res = yield call(getProductosOrdenVentaRequest, payload);
    yield put(getProductosOrdenVentaSuccess(res.data));
  } catch (error) {
    yield put(getProductosOrdenVentaError(error));
  }
}

const getProductosMejorVendidosRequest = async (idAlmacen) => {
  try {
    return await API.get(`${MAIN_URI}/bestsales/${idAlmacen}`);
  } catch (error) {
    throw error;
  }
};

function* getProductosMejorVendidosItems({ payload }) {
  try {
    const res = yield call(getProductosMejorVendidosRequest, payload);
    yield put(getProductosMejorVendidosSuccess(res.data));
  } catch (error) {
    yield put(getProductosMejorVendidosError(error));
  }
}

export function* watchGetProdAlmacenList() {
  yield takeEvery(PRODUCTOS_ALMACEN_GET_LIST, getProductosAlmacenItems);
}

export function* watchGetProdClienteList() {
  yield takeEvery(PRODUCTOS_CLIENTE_GET_LIST, getProductosClienteItems);
}

export function* watchGetProdNegocioList() {
  yield takeEvery(PRODUCTOS_NEGOCIO_GET_LIST, getProductosNegocioItems);
}

export function* watchGetProdAlmacenVentaList() {
  yield takeEvery(
    PRODUCTOS_ALMACEN_VENTA_GET_LIST,
    getProductosAlmacenVentaItems
  );
}

export function* watchGetProdProveedorList() {
  yield takeEvery(PRODUCTOS_PROVEEDOR_GET_LIST, getProductosProveedorItems);
}

export function* watchAddItemNegocio() {
  yield takeEvery(PRODUCTOS_NEGOCIO_ADD_ITEM, insProductoNegocio);
}

export function* watchAddItemCliente() {
  yield takeEvery(PRODUCTOS_CLIENTE_ADD_ITEM, insProductoCliente);
}

export function* watchDeleteItemNegocio() {
  yield takeEvery(PRODUCTOS_NEGOCIO_DELETE_ITEM, delProductoNegocio);
}

export function* watchDeleteProductoCliente() {
  yield takeEvery(PRODUCTOS_CLIENTE_DELETE_ITEM, delProductoCliente);
}

export function* watchUpdateProductoCliente() {
  yield takeEvery(PRODUCTOS_CLIENTE_UPD_ITEM, updProductoCliente);
}

export function* watchGetProdNegocioLibresList() {
  yield takeEvery(PRODUCTOS_NEGOCIO_GET_LIST_FREE, getProductosNegocioLibres);
}

export function* watchUpdateProductoAlmacen() {
  yield takeEvery(PRODUCTOS_ALMACEN_UPD_ITEM, updProductoAlmacen);
}

export function* watchDeleteProductoAlmacen() {
  yield takeEvery(PRODUCTOS_ALMACEN_DELETE_ITEM, delProductoAlmacen);
}

export function* watchGetProdMarcaList() {
  yield takeEvery(PRODUCTOS_MARCA_GET_LIST, getProductosMarcaItems);
}

export function* watchGetProdNoAlmacenList() {
  yield takeEvery(
    PRODUCTOS_NO_ESTAN_ALMACEN_GET_LIST,
    getProductosNoEstanAlmacenItems
  );
}

export function* watchAddItemAlmacen() {
  yield takeEvery(PRODUCTOS_ALMACEN_ADD_ITEM, insProductoAlmacen);
}

export function* watchGetProdNoOrdenList() {
  yield takeEvery(
    PRODUCTOS_NO_ESTAN_ORDEN_GET_LIST,
    getProductosNoEstanOrdenItems
  );
}

export function* watchGetProdOrdenList() {
  yield takeEvery(PRODUCTOS_ORDEN_GET_LIST, getProductosOrdenItems);
}

export function* watchUpdProductoItem() {
  yield takeEvery(PRODUCTOS_ORDEN_UPD_ITEM, updProductoOrdenItem);
}

export function* watchAddItemOrden() {
  yield takeEvery(PRODUCTOS_ORDEN_ADD_ITEM, insProductoOrden);
}

export function* watchGetProdCategoriaList() {
  yield takeEvery(PRODUCTOS_CATEGORIA_GET_LIST, getProductosCategoriaItems);
}

export function* watchGetProdOrdenVentaList() {
  yield takeEvery(PRODUCTOS_ORDEN_VENTA_GET_LIST, getProductosOrdenVentaItems);
}

export function* watchGetProdMejorVendidosList() {
  yield takeEvery(
    PRODUCTOS_MEJOR_VENDIDOS_GET_LIST,
    getProductosMejorVendidosItems
  );
}

export default function* rootSaga() {
  yield all([
    fork(watchAddItemNegocio),
    fork(watchAddItemCliente),
    fork(watchGetProdAlmacenList),
    fork(watchGetProdClienteList),
    fork(watchGetProdNegocioList),
    fork(watchGetProdProveedorList),
    fork(watchDeleteItemNegocio),
    fork(watchDeleteProductoCliente),
    fork(watchUpdateProductoCliente),
    fork(watchGetProdNegocioLibresList),
    fork(watchUpdateProductoAlmacen),
    fork(watchDeleteProductoAlmacen),
    fork(watchGetProdMarcaList),
    fork(watchGetProdNoAlmacenList),
    fork(watchAddItemAlmacen),
    fork(watchGetProdNoOrdenList),
    fork(watchGetProdOrdenList),
    fork(watchUpdProductoItem),
    fork(watchAddItemOrden),
    fork(watchGetProdCategoriaList),
    fork(watchGetProdAlmacenVentaList),
    fork(watchGetProdOrdenVentaList),
    fork(watchGetProdMejorVendidosList),
  ]);
}
