/* eslint-disable import/no-cycle */
import {
  CATEGORIAS_GET_LIST,
  CATEGORIAS_GET_LIST_SUCCESS,
  CATEGORIAS_GET_LIST_ERROR,
  CATEGORIAS_ADD_ITEM,
  CATEGORIAS_ADD_ITEM_SUCCESS,
  CATEGORIAS_ADD_ITEM_ERROR,
  CATEGORIAS_UPD_ITEM,
  CATEGORIAS_UPD_ITEM_SUCCESS,
  CATEGORIAS_UPD_ITEM_ERROR,
  CATEGORIAS_ACTIVAS_GET_LIST,
  CATEGORIAS_ACTIVAS_GET_LIST_SUCCESS,
  CATEGORIAS_ACTIVAS_GET_LIST_ERROR,
  CATEGORIAS_TODAS_GET_LIST,
  CATEGORIAS_TODAS_GET_LIST_SUCCESS,
  CATEGORIAS_TODAS_GET_LIST_ERROR,
} from '../actions';

export const getCategorias = (params) => ({
  type: CATEGORIAS_GET_LIST,
  payload: params,
});

export const getCategoriasSuccess = (items) => ({
  type: CATEGORIAS_GET_LIST_SUCCESS,
  payload: items,
});

export const getCategoriasError = (error) => ({
  type: CATEGORIAS_GET_LIST_ERROR,
  payload: error,
});

export const insCategoria = (item) => ({
  type: CATEGORIAS_ADD_ITEM,
  payload: item,
});

export const insCategoriaSuccess = (items) => ({
  type: CATEGORIAS_ADD_ITEM_SUCCESS,
  payload: items,
});

export const insCategoriaError = (error) => ({
  type: CATEGORIAS_ADD_ITEM_ERROR,
  payload: error,
});

export const updCategoria = (item) => ({
  type: CATEGORIAS_UPD_ITEM,
  payload: item,
});

export const updCategoriaSuccess = (items) => ({
  type: CATEGORIAS_UPD_ITEM_SUCCESS,
  payload: items,
});

export const updCategoriaError = (error) => ({
  type: CATEGORIAS_UPD_ITEM_ERROR,
  payload: error,
});

export const getCategoriasActivas = (params) => ({
  type: CATEGORIAS_ACTIVAS_GET_LIST,
  payload: params,
});

export const getCategoriasActivasSuccess = (items) => ({
  type: CATEGORIAS_ACTIVAS_GET_LIST_SUCCESS,
  payload: items,
});

export const getCategoriasActivasError = (error) => ({
  type: CATEGORIAS_ACTIVAS_GET_LIST_ERROR,
  payload: error,
});

export const getCategoriasTodas = (params) => ({
  type: CATEGORIAS_TODAS_GET_LIST,
  payload: params,
});

export const getCategoriasTodasSuccess = (items) => ({
  type: CATEGORIAS_TODAS_GET_LIST_SUCCESS,
  payload: items,
});

export const getCategoriasTodasError = (error) => ({
  type: CATEGORIAS_TODAS_GET_LIST_ERROR,
  payload: error,
});
