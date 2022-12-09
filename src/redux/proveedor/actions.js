/* eslint-disable import/no-cycle */
import {
  PROVEEDOR_GET_DETAILS,
  PROVEEDOR_GET_DETAILS_SUCCESS,
  PROVEEDOR_GET_DETAILS_ERROR,
  PROVEEDOR_ADD_PHOTO,
  PROVEEDOR_ADD_PHOTO_SUCCESS,
  PROVEEDOR_ADD_PHOTO_ERROR,
} from '../actions';

export const getProveedor = (params) => ({
  type: PROVEEDOR_GET_DETAILS,
  payload: params,
});

export const getProveedorSuccess = (items) => ({
  type: PROVEEDOR_GET_DETAILS_SUCCESS,
  payload: items,
});

export const getProveedorError = (error) => ({
  type: PROVEEDOR_GET_DETAILS_ERROR,
  payload: error,
});

export const insFotoProveedor = (item) => ({
  type: PROVEEDOR_ADD_PHOTO,
  payload: item,
});

export const insFotoProveedorSuccess = (items) => ({
  type: PROVEEDOR_ADD_PHOTO_SUCCESS,
  payload: items,
});

export const insFotoProveedorError = (error) => ({
  type: PROVEEDOR_ADD_PHOTO_ERROR,
  payload: error,
});
