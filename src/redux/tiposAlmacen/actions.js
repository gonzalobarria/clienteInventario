/* eslint-disable import/no-cycle */
import {
  TIPOS_ALMACEN_GET_LIST,
  TIPOS_ALMACEN_GET_LIST_SUCCESS,
  TIPOS_ALMACEN_GET_LIST_ERROR,
  ALMACENES_ACTIVOS_GET_LIST,
  ALMACENES_ACTIVOS_GET_LIST_SUCCESS,
  ALMACENES_ACTIVOS_GET_LIST_ERROR,
} from '../actions';

export const getTiposAlmacen = (params) => ({
  type: TIPOS_ALMACEN_GET_LIST,
  payload: params,
});

export const getTiposAlmacenSuccess = (items) => ({
  type: TIPOS_ALMACEN_GET_LIST_SUCCESS,
  payload: items,
});

export const getTiposAlmacenError = (error) => ({
  type: TIPOS_ALMACEN_GET_LIST_ERROR,
  payload: error,
});

export const getAlmacenesActivos = (params) => ({
  type: ALMACENES_ACTIVOS_GET_LIST,
  payload: params,
});

export const getAlmacenesActivosSuccess = (items) => ({
  type: ALMACENES_ACTIVOS_GET_LIST_SUCCESS,
  payload: items,
});

export const getAlmacenesActivosError = (error) => ({
  type: ALMACENES_ACTIVOS_GET_LIST_ERROR,
  payload: error,
});
