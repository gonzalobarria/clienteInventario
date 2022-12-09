/* eslint-disable import/no-cycle */
import {
  ORDEN_GET_DETAILS,
  ORDEN_GET_DETAILS_SUCCESS,
  ORDEN_GET_DETAILS_ERROR,
  ORDEN_ADD_PHOTO,
  ORDEN_ADD_PHOTO_SUCCESS,
  ORDEN_ADD_PHOTO_ERROR,
  ORDEN_PRODUCTO_ADD_PHOTO,
  ORDEN_PRODUCTO_ADD_PHOTO_SUCCESS,
  ORDEN_PRODUCTO_ADD_PHOTO_ERROR,
  ORDEN_UPD_ESTADO,
  ORDEN_UPD_ESTADO_SUCCESS,
  ORDEN_UPD_ESTADO_ERROR,
} from '../actions';

export const getOrden = (params) => ({
  type: ORDEN_GET_DETAILS,
  payload: params,
});

export const getOrdenSuccess = (items) => ({
  type: ORDEN_GET_DETAILS_SUCCESS,
  payload: items,
});

export const getOrdenError = (error) => ({
  type: ORDEN_GET_DETAILS_ERROR,
  payload: error,
});

export const insFotoOrden = (item) => ({
  type: ORDEN_ADD_PHOTO,
  payload: item,
});

export const insFotoOrdenSuccess = (items) => ({
  type: ORDEN_ADD_PHOTO_SUCCESS,
  payload: items,
});

export const insFotoOrdenError = (error) => ({
  type: ORDEN_ADD_PHOTO_ERROR,
  payload: error,
});

export const insFotoProductoOrden = (item) => ({
  type: ORDEN_PRODUCTO_ADD_PHOTO,
  payload: item,
});

export const insFotoProductoOrdenSuccess = (items) => ({
  type: ORDEN_PRODUCTO_ADD_PHOTO_SUCCESS,
  payload: items,
});

export const insFotoProductoOrdenError = (error) => ({
  type: ORDEN_PRODUCTO_ADD_PHOTO_ERROR,
  payload: error,
});

export const updEstadoOrden = (item) => ({
  type: ORDEN_UPD_ESTADO,
  payload: item,
});

export const updEstadoOrdenSuccess = (items) => ({
  type: ORDEN_UPD_ESTADO_SUCCESS,
  payload: items,
});

export const updEstadoOrdenError = (error) => ({
  type: ORDEN_UPD_ESTADO_ERROR,
  payload: error,
});
