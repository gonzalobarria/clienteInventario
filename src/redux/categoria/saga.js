/* eslint-disable no-useless-catch */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import { CATEGORIA_GET_DETAILS, CATEGORIA_ADD_PHOTO } from '../actions';

import {
  getCategoriaSuccess,
  getCategoriaError,
  insFotoCategoriaSuccess,
  insFotoCategoriaError,
} from './actions';

const MAIN_URI = '/api/app/categorias';

const getCategoriaRequest = async (idCategoria) => {
  try {
    return await API.get(`${MAIN_URI}/${idCategoria}`);
  } catch (error) {
    throw error;
  }
};

function* getCategoria({ payload }) {
  try {
    const res = yield call(getCategoriaRequest, payload);
    yield put(getCategoriaSuccess(res.data));
  } catch (error) {
    yield put(getCategoriaError(error));
  }
}

const insFotoCategoriaRequest = async (item) => {
  const { data } = await API.post(`${MAIN_URI}/uploadphoto`, item);

  return data;
};

function* insFotoCategoria({ payload }) {
  try {
    const response = yield call(insFotoCategoriaRequest, payload);
    yield put(insFotoCategoriaSuccess(response));
  } catch (error) {
    yield put(insFotoCategoriaError(error));
  }
}

export function* watchGetProduct() {
  yield takeEvery(CATEGORIA_GET_DETAILS, getCategoria);
}

export function* watchAddPhotoCategoria() {
  yield takeEvery(CATEGORIA_ADD_PHOTO, insFotoCategoria);
}

export default function* rootSaga() {
  yield all([fork(watchGetProduct), fork(watchAddPhotoCategoria)]);
}
