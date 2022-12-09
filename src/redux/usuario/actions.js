/* eslint-disable import/no-cycle */
import {
  USUARIO_GET_DETAILS,
  USUARIO_GET_DETAILS_SUCCESS,
  USUARIO_GET_DETAILS_ERROR,
  USUARIO_ADD_PHOTO,
  USUARIO_ADD_PHOTO_SUCCESS,
  USUARIO_ADD_PHOTO_ERROR,
} from '../actions';

export const getUsuario = (params) => ({
  type: USUARIO_GET_DETAILS,
  payload: params,
});

export const getUsuarioSuccess = (items) => ({
  type: USUARIO_GET_DETAILS_SUCCESS,
  payload: items,
});

export const getUsuarioError = (error) => ({
  type: USUARIO_GET_DETAILS_ERROR,
  payload: error,
});

export const insFotoUsuario = (item) => ({
  type: USUARIO_ADD_PHOTO,
  payload: item,
});

export const insFotoUsuarioSuccess = (items) => ({
  type: USUARIO_ADD_PHOTO_SUCCESS,
  payload: items,
});

export const insFotoUsuarioError = (error) => ({
  type: USUARIO_ADD_PHOTO_ERROR,
  payload: error,
});
