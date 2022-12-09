/* eslint-disable import/no-cycle */
import {
  ORDENES_VENTA_GET_LIST,
  ORDENES_VENTA_GET_LIST_SUCCESS,
  ORDENES_VENTA_GET_LIST_ERROR,
  ORDENES_VENTA_ADD_ITEM,
  ORDENES_VENTA_ADD_ITEM_SUCCESS,
  ORDENES_VENTA_ADD_ITEM_ERROR,
  ORDENES_VENTA_ALMACEN_GET_LIST,
  ORDENES_VENTA_ALMACEN_GET_LIST_SUCCESS,
  ORDENES_VENTA_ALMACEN_GET_LIST_ERROR,
  ORDENES_VENTA_PROVEEDOR_GET_LIST,
  ORDENES_VENTA_PROVEEDOR_GET_LIST_SUCCESS,
  ORDENES_VENTA_PROVEEDOR_GET_LIST_ERROR,
  ORDENES_VENTA_MARCA_GET_LIST,
  ORDENES_VENTA_MARCA_GET_LIST_SUCCESS,
  ORDENES_VENTA_MARCA_GET_LIST_ERROR,
  ORDENES_VENTA_RECEPTOR_UPD_ITEM,
  ORDENES_VENTA_RECEPTOR_UPD_ITEM_SUCCESS,
  ORDENES_VENTA_RECEPTOR_UPD_ITEM_ERROR,
  ORDENES_VENTA_SEMANA_GET_LIST,
  ORDENES_VENTA_SEMANA_GET_LIST_SUCCESS,
  ORDENES_VENTA_SEMANA_GET_LIST_ERROR,
  ORDENES_VENTA_SEMANA_MONTO_GET_LIST,
  ORDENES_VENTA_SEMANA_MONTO_GET_LIST_SUCCESS,
  ORDENES_VENTA_SEMANA_MONTO_GET_LIST_ERROR,
} from '../actions';

export const getOrdenesVenta = (params) => ({
  type: ORDENES_VENTA_GET_LIST,
  payload: params,
});

export const getOrdenesVentaSuccess = (items) => ({
  type: ORDENES_VENTA_GET_LIST_SUCCESS,
  payload: items,
});

export const getOrdenesVentaError = (error) => ({
  type: ORDENES_VENTA_GET_LIST_ERROR,
  payload: error,
});

export const insOrdenVenta = (item) => ({
  type: ORDENES_VENTA_ADD_ITEM,
  payload: item,
});

export const insOrdenVentaSuccess = (items) => ({
  type: ORDENES_VENTA_ADD_ITEM_SUCCESS,
  payload: items,
});

export const insOrdenVentaError = (error) => ({
  type: ORDENES_VENTA_ADD_ITEM_ERROR,
  payload: error,
});

export const getOrdenesVentaAlmacen = (params) => ({
  type: ORDENES_VENTA_ALMACEN_GET_LIST,
  payload: params,
});

export const getOrdenesVentaAlmacenSuccess = (items) => ({
  type: ORDENES_VENTA_ALMACEN_GET_LIST_SUCCESS,
  payload: items,
});

export const getOrdenesVentaAlmacenError = (error) => ({
  type: ORDENES_VENTA_ALMACEN_GET_LIST_ERROR,
  payload: error,
});

export const getOrdenesVentaProveedor = (params) => ({
  type: ORDENES_VENTA_PROVEEDOR_GET_LIST,
  payload: params,
});

export const getOrdenesVentaProveedorSuccess = (items) => ({
  type: ORDENES_VENTA_PROVEEDOR_GET_LIST_SUCCESS,
  payload: items,
});

export const getOrdenesVentaProveedorError = (error) => ({
  type: ORDENES_VENTA_PROVEEDOR_GET_LIST_ERROR,
  payload: error,
});

export const getOrdenesVentaMarca = (params) => ({
  type: ORDENES_VENTA_MARCA_GET_LIST,
  payload: params,
});

export const getOrdenesVentaMarcaSuccess = (items) => ({
  type: ORDENES_VENTA_MARCA_GET_LIST_SUCCESS,
  payload: items,
});

export const getOrdenesVentaMarcaError = (error) => ({
  type: ORDENES_VENTA_MARCA_GET_LIST_ERROR,
  payload: error,
});

export const updOrdenVentaUsuarioReceptor = (item) => ({
  type: ORDENES_VENTA_RECEPTOR_UPD_ITEM,
  payload: item,
});

export const updOrdenVentaUsuarioReceptorSuccess = (items) => ({
  type: ORDENES_VENTA_RECEPTOR_UPD_ITEM_SUCCESS,
  payload: items,
});

export const updOrdenVentaUsuarioReceptorError = (error) => ({
  type: ORDENES_VENTA_RECEPTOR_UPD_ITEM_ERROR,
  payload: error,
});

export const getOrdenesVentaSemana = (params) => ({
  type: ORDENES_VENTA_SEMANA_GET_LIST,
  payload: params,
});

export const getOrdenesVentaSemanaSuccess = (items) => ({
  type: ORDENES_VENTA_SEMANA_GET_LIST_SUCCESS,
  payload: items,
});

export const getOrdenesVentaSemanaError = (error) => ({
  type: ORDENES_VENTA_SEMANA_GET_LIST_ERROR,
  payload: error,
});

export const getOrdenesVentaSemanaMonto = (params) => ({
  type: ORDENES_VENTA_SEMANA_MONTO_GET_LIST,
  payload: params,
});

export const getOrdenesVentaSemanaMontoSuccess = (items) => ({
  type: ORDENES_VENTA_SEMANA_MONTO_GET_LIST_SUCCESS,
  payload: items,
});

export const getOrdenesVentaSemanaMontoError = (error) => ({
  type: ORDENES_VENTA_SEMANA_MONTO_GET_LIST_ERROR,
  payload: error,
});
