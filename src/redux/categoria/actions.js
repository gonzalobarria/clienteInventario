/* eslint-disable import/no-cycle */
import {
  CATEGORIA_GET_DETAILS,
  CATEGORIA_GET_DETAILS_SUCCESS,
  CATEGORIA_GET_DETAILS_ERROR,
  CATEGORIA_ADD_PHOTO,
  CATEGORIA_ADD_PHOTO_SUCCESS,
  CATEGORIA_ADD_PHOTO_ERROR,
} from '../actions';

export const getCategoria = (params) => ({
  type: CATEGORIA_GET_DETAILS,
  payload: params,
});

export const getCategoriaSuccess = (items) => ({
  type: CATEGORIA_GET_DETAILS_SUCCESS,
  payload: items,
});

export const getCategoriaError = (error) => ({
  type: CATEGORIA_GET_DETAILS_ERROR,
  payload: error,
});

export const insFotoCategoria = (item) => ({
  type: CATEGORIA_ADD_PHOTO,
  payload: item,
});

export const insFotoCategoriaSuccess = (items) => ({
  type: CATEGORIA_ADD_PHOTO_SUCCESS,
  payload: items,
});

export const insFotoCategoriaError = (error) => ({
  type: CATEGORIA_ADD_PHOTO_ERROR,
  payload: error,
});
