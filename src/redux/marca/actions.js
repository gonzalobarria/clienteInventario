/* eslint-disable import/no-cycle */
import {
  MARCA_GET_DETAILS,
  MARCA_GET_DETAILS_SUCCESS,
  MARCA_GET_DETAILS_ERROR,
  MARCA_ADD_PHOTO,
  MARCA_ADD_PHOTO_SUCCESS,
  MARCA_ADD_PHOTO_ERROR,
} from '../actions';

export const getMarca = (params) => ({
  type: MARCA_GET_DETAILS,
  payload: params,
});

export const getMarcaSuccess = (items) => ({
  type: MARCA_GET_DETAILS_SUCCESS,
  payload: items,
});

export const getMarcaError = (error) => ({
  type: MARCA_GET_DETAILS_ERROR,
  payload: error,
});

export const insFotoMarca = (item) => ({
  type: MARCA_ADD_PHOTO,
  payload: item,
});

export const insFotoMarcaSuccess = (items) => ({
  type: MARCA_ADD_PHOTO_SUCCESS,
  payload: items,
});

export const insFotoMarcaError = (error) => ({
  type: MARCA_ADD_PHOTO_ERROR,
  payload: error,
});
