/* eslint-disable import/no-cycle */
import {
  PRODUCTO_NEGOCIO_GET_DETAILS,
  PRODUCTO_NEGOCIO_GET_DETAILS_SUCCESS,
  PRODUCTO_NEGOCIO_GET_DETAILS_ERROR,
  PRODUCTO_ADD_PHOTO,
  PRODUCTO_ADD_PHOTO_SUCCESS,
  PRODUCTO_ADD_PHOTO_ERROR,
} from '../actions';

export const getProductoNegocio = (params) => ({
  type: PRODUCTO_NEGOCIO_GET_DETAILS,
  payload: params,
});

export const getProductoNegocioSuccess = (items) => ({
  type: PRODUCTO_NEGOCIO_GET_DETAILS_SUCCESS,
  payload: items,
});

export const getProductoNegocioError = (error) => ({
  type: PRODUCTO_NEGOCIO_GET_DETAILS_ERROR,
  payload: error,
});

export const insFotoProducto = (item) => ({
  type: PRODUCTO_ADD_PHOTO,
  payload: item,
});

export const insFotoProductoSuccess = (items) => ({
  type: PRODUCTO_ADD_PHOTO_SUCCESS,
  payload: items,
});

export const insFotoProductoError = (error) => ({
  type: PRODUCTO_ADD_PHOTO_ERROR,
  payload: error,
});
