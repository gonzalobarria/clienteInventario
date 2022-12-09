/* eslint-disable no-useless-catch */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import { PROVEEDOR_GET_DETAILS, PROVEEDOR_ADD_PHOTO } from '../actions';

import {
  getProveedorSuccess,
  getProveedorError,
  insFotoProveedorSuccess,
  insFotoProveedorError,
} from './actions';

const MAIN_URI = '/api/app/proveedores';

const getProveedorRequest = async (idProveedor) => {
  try {
    return await API.get(`${MAIN_URI}/${idProveedor}`);
  } catch (error) {
    throw error;
  }
};

function* getProveedor({ payload }) {
  try {
    const res = yield call(getProveedorRequest, payload);
    yield put(getProveedorSuccess(res.data));
  } catch (error) {
    yield put(getProveedorError(error));
  }
}

const insFotoProveedorRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/uploadphoto`, item);

  return data;
};

function* insFotoProveedor({ payload }) {
  try {
    const response = yield call(insFotoProveedorRequest, payload);
    yield put(insFotoProveedorSuccess(response));
  } catch (error) {
    yield put(insFotoProveedorError(error));
  }
}

export function* watchGetProduct() {
  yield takeEvery(PROVEEDOR_GET_DETAILS, getProveedor);
}

export function* watchAddPhotoProveedor() {
  yield takeEvery(PROVEEDOR_ADD_PHOTO, insFotoProveedor);
}

export default function* rootSaga() {
  yield all([fork(watchGetProduct), fork(watchAddPhotoProveedor)]);
}
