/* eslint-disable import/no-cycle */
import {
  ORDEN_VENTA_GET_DETAILS,
  ORDEN_VENTA_GET_DETAILS_SUCCESS,
  ORDEN_VENTA_GET_DETAILS_ERROR,
  ORDEN_VENTA_ADD_PHOTO,
  ORDEN_VENTA_ADD_PHOTO_SUCCESS,
  ORDEN_VENTA_ADD_PHOTO_ERROR,
  ORDEN_VENTA_PRODUCTO_ADD_PHOTO,
  ORDEN_VENTA_PRODUCTO_ADD_PHOTO_SUCCESS,
  ORDEN_VENTA_PRODUCTO_ADD_PHOTO_ERROR,
} from '../actions';

export const getOrdenVenta = (params) => ({
  type: ORDEN_VENTA_GET_DETAILS,
  payload: params,
});

export const getOrdenVentaSuccess = (items) => ({
  type: ORDEN_VENTA_GET_DETAILS_SUCCESS,
  payload: items,
});

export const getOrdenVentaError = (error) => ({
  type: ORDEN_VENTA_GET_DETAILS_ERROR,
  payload: error,
});

export const insFotoOrdenVenta = (item) => ({
  type: ORDEN_VENTA_ADD_PHOTO,
  payload: item,
});

export const insFotoOrdenVentaSuccess = (items) => ({
  type: ORDEN_VENTA_ADD_PHOTO_SUCCESS,
  payload: items,
});

export const insFotoOrdenVentaError = (error) => ({
  type: ORDEN_VENTA_ADD_PHOTO_ERROR,
  payload: error,
});

export const insFotoProductoOrdenVenta = (item) => ({
  type: ORDEN_VENTA_PRODUCTO_ADD_PHOTO,
  payload: item,
});

export const insFotoProductoOrdenVentaSuccess = (items) => ({
  type: ORDEN_VENTA_PRODUCTO_ADD_PHOTO_SUCCESS,
  payload: items,
});

export const insFotoProductoOrdenVentaError = (error) => ({
  type: ORDEN_VENTA_PRODUCTO_ADD_PHOTO_ERROR,
  payload: error,
});
