/* eslint-disable import/no-cycle */
import {
  MARCAS_GET_LIST,
  MARCAS_GET_LIST_SUCCESS,
  MARCAS_GET_LIST_ERROR,
  MARCAS_ADD_ITEM,
  MARCAS_ADD_ITEM_SUCCESS,
  MARCAS_ADD_ITEM_ERROR,
  MARCAS_UPD_ITEM,
  MARCAS_UPD_ITEM_SUCCESS,
  MARCAS_UPD_ITEM_ERROR,
  MARCAS_ACTIVAS_GET_LIST,
  MARCAS_ACTIVAS_GET_LIST_SUCCESS,
  MARCAS_ACTIVAS_GET_LIST_ERROR,
} from '../actions';

export const getMarcas = (params) => ({
  type: MARCAS_GET_LIST,
  payload: params,
});

export const getMarcasSuccess = (items) => ({
  type: MARCAS_GET_LIST_SUCCESS,
  payload: items,
});

export const getMarcasError = (error) => ({
  type: MARCAS_GET_LIST_ERROR,
  payload: error,
});

export const insMarca = (item) => ({
  type: MARCAS_ADD_ITEM,
  payload: item,
});

export const insMarcaSuccess = (items) => ({
  type: MARCAS_ADD_ITEM_SUCCESS,
  payload: items,
});

export const insMarcaError = (error) => ({
  type: MARCAS_ADD_ITEM_ERROR,
  payload: error,
});

export const updMarca = (item) => ({
  type: MARCAS_UPD_ITEM,
  payload: item,
});

export const updMarcaSuccess = (items) => ({
  type: MARCAS_UPD_ITEM_SUCCESS,
  payload: items,
});

export const updMarcaError = (error) => ({
  type: MARCAS_UPD_ITEM_ERROR,
  payload: error,
});

export const getMarcasActivas = (params) => ({
  type: MARCAS_ACTIVAS_GET_LIST,
  payload: params,
});

export const getMarcasActivasSuccess = (items) => ({
  type: MARCAS_ACTIVAS_GET_LIST_SUCCESS,
  payload: items,
});

export const getMarcasActivasError = (error) => ({
  type: MARCAS_ACTIVAS_GET_LIST_ERROR,
  payload: error,
});
