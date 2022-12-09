/* eslint-disable import/no-cycle */
import {
  ORDENES_ALMACEN_GET_LIST,
  ORDENES_ALMACEN_GET_LIST_SUCCESS,
  ORDENES_ALMACEN_GET_LIST_ERROR,
  ORDENES_PROVEEDOR_GET_LIST,
  ORDENES_PROVEEDOR_GET_LIST_SUCCESS,
  ORDENES_PROVEEDOR_GET_LIST_ERROR,
  ORDENES_MARCA_GET_LIST,
  ORDENES_MARCA_GET_LIST_SUCCESS,
  ORDENES_MARCA_GET_LIST_ERROR,
} from '../actions';

export const getOrdenesAlmacen = (params) => ({
  type: ORDENES_ALMACEN_GET_LIST,
  payload: params,
});

export const getOrdenesAlmacenSuccess = (items) => ({
  type: ORDENES_ALMACEN_GET_LIST_SUCCESS,
  payload: items,
});

export const getOrdenesAlmacenError = (error) => ({
  type: ORDENES_ALMACEN_GET_LIST_ERROR,
  payload: error,
});

export const getOrdenesProveedor = (params) => ({
  type: ORDENES_PROVEEDOR_GET_LIST,
  payload: params,
});

export const getOrdenesProveedorSuccess = (items) => ({
  type: ORDENES_PROVEEDOR_GET_LIST_SUCCESS,
  payload: items,
});

export const getOrdenesProveedorError = (error) => ({
  type: ORDENES_PROVEEDOR_GET_LIST_ERROR,
  payload: error,
});

export const getOrdenesMarca = (params) => ({
  type: ORDENES_MARCA_GET_LIST,
  payload: params,
});

export const getOrdenesMarcaSuccess = (items) => ({
  type: ORDENES_MARCA_GET_LIST_SUCCESS,
  payload: items,
});

export const getOrdenesMarcaError = (error) => ({
  type: ORDENES_MARCA_GET_LIST_ERROR,
  payload: error,
});
