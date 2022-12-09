/* eslint-disable import/no-cycle */
import {
  PROVEEDORES_GET_LIST,
  PROVEEDORES_GET_LIST_SUCCESS,
  PROVEEDORES_GET_LIST_ERROR,
  PROVEEDORES_ADD_ITEM,
  PROVEEDORES_ADD_ITEM_SUCCESS,
  PROVEEDORES_ADD_ITEM_ERROR,
  PROVEEDORES_ACTIVOS_GET_LIST,
  PROVEEDORES_ACTIVOS_GET_LIST_SUCCESS,
  PROVEEDORES_ACTIVOS_GET_LIST_ERROR,
  PROVEEDORES_UPD_ITEM,
  PROVEEDORES_UPD_ITEM_SUCCESS,
  PROVEEDORES_UPD_ITEM_ERROR,
} from '../actions';

export const getProveedores = (params) => ({
  type: PROVEEDORES_GET_LIST,
  payload: params,
});

export const getProveedoresSuccess = (items) => ({
  type: PROVEEDORES_GET_LIST_SUCCESS,
  payload: items,
});

export const getProveedoresError = (error) => ({
  type: PROVEEDORES_GET_LIST_ERROR,
  payload: error,
});

export const getProveedoresActivos = (params) => ({
  type: PROVEEDORES_ACTIVOS_GET_LIST,
  payload: params,
});

export const getProveedoresActivosSuccess = (items) => ({
  type: PROVEEDORES_ACTIVOS_GET_LIST_SUCCESS,
  payload: items,
});

export const getProveedoresActivosError = (error) => ({
  type: PROVEEDORES_ACTIVOS_GET_LIST_ERROR,
  payload: error,
});

export const insProveedor = (item) => ({
  type: PROVEEDORES_ADD_ITEM,
  payload: item,
});

export const insProveedorSuccess = (items) => ({
  type: PROVEEDORES_ADD_ITEM_SUCCESS,
  payload: items,
});

export const insProveedorError = (error) => ({
  type: PROVEEDORES_ADD_ITEM_ERROR,
  payload: error,
});

export const updProveedor = (item) => ({
  type: PROVEEDORES_UPD_ITEM,
  payload: item,
});

export const updProveedorSuccess = (items) => ({
  type: PROVEEDORES_UPD_ITEM_SUCCESS,
  payload: items,
});

export const updProveedorError = (error) => ({
  type: PROVEEDORES_UPD_ITEM_ERROR,
  payload: error,
});
