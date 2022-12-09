/* eslint-disable import/no-cycle */
import {
  CLIENTE_GET_DETAILS,
  CLIENTE_GET_DETAILS_SUCCESS,
  CLIENTE_GET_DETAILS_ERROR,
  CLIENTE_ADD_PHOTO,
  CLIENTE_ADD_PHOTO_SUCCESS,
  CLIENTE_ADD_PHOTO_ERROR,
} from '../actions';

export const getCliente = (params) => ({
  type: CLIENTE_GET_DETAILS,
  payload: params,
});

export const getClienteSuccess = (items) => ({
  type: CLIENTE_GET_DETAILS_SUCCESS,
  payload: items,
});

export const getClienteError = (error) => ({
  type: CLIENTE_GET_DETAILS_ERROR,
  payload: error,
});

export const insFotoCliente = (item) => ({
  type: CLIENTE_ADD_PHOTO,
  payload: item,
});

export const insFotoClienteSuccess = (items) => ({
  type: CLIENTE_ADD_PHOTO_SUCCESS,
  payload: items,
});

export const insFotoClienteError = (error) => ({
  type: CLIENTE_ADD_PHOTO_ERROR,
  payload: error,
});
