/* eslint-disable import/no-cycle */
import {
  CLIENTES_GET_LIST,
  CLIENTES_GET_LIST_SUCCESS,
  CLIENTES_GET_LIST_ERROR,
  CLIENTES_ADD_ITEM,
  CLIENTES_ADD_ITEM_SUCCESS,
  CLIENTES_ADD_ITEM_ERROR,
  CLIENTES_UPD_ITEM,
  CLIENTES_UPD_ITEM_SUCCESS,
  CLIENTES_UPD_ITEM_ERROR,
} from '../actions';

export const getClientes = (params) => ({
  type: CLIENTES_GET_LIST,
  payload: params,
});

export const getClientesSuccess = (items) => ({
  type: CLIENTES_GET_LIST_SUCCESS,
  payload: items,
});

export const getClientesError = (error) => ({
  type: CLIENTES_GET_LIST_ERROR,
  payload: error,
});

export const insCliente = (item) => ({
  type: CLIENTES_ADD_ITEM,
  payload: item,
});

export const insClienteSuccess = (items) => ({
  type: CLIENTES_ADD_ITEM_SUCCESS,
  payload: items,
});

export const insClienteError = (error) => ({
  type: CLIENTES_ADD_ITEM_ERROR,
  payload: error,
});

export const updCliente = (item) => ({
  type: CLIENTES_UPD_ITEM,
  payload: item,
});

export const updClienteSuccess = (items) => ({
  type: CLIENTES_UPD_ITEM_SUCCESS,
  payload: items,
});

export const updClienteError = (error) => ({
  type: CLIENTES_UPD_ITEM_ERROR,
  payload: error,
});
