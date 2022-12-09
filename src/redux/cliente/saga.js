/* eslint-disable no-useless-catch */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import { CLIENTE_ADD_PHOTO, CLIENTE_GET_DETAILS } from '../actions';

import {
  getClienteSuccess,
  getClienteError,
  insFotoClienteSuccess,
  insFotoClienteError,
} from './actions';

const MAIN_URI = '/api/app/clientes';

const getClienteRequest = async (idCliente) => {
  try {
    return await API.get(`${MAIN_URI}/${idCliente}`);
  } catch (error) {
    throw error;
  }
};

function* getCliente({ payload }) {
  try {
    const res = yield call(getClienteRequest, payload);
    yield put(getClienteSuccess(res.data));
  } catch (error) {
    yield put(getClienteError(error));
  }
}

const insFotoClienteRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/uploadphoto`, item);

  return data;
};

function* insFotoCliente({ payload }) {
  try {
    const response = yield call(insFotoClienteRequest, payload);
    yield put(insFotoClienteSuccess(response));
  } catch (error) {
    yield put(insFotoClienteError(error));
  }
}

export function* watchGetClient() {
  yield takeEvery(CLIENTE_GET_DETAILS, getCliente);
}

export function* watchAddPhotoCliente() {
  yield takeEvery(CLIENTE_ADD_PHOTO, insFotoCliente);
}

export default function* rootSaga() {
  yield all([fork(watchGetClient), fork(watchAddPhotoCliente)]);
}
