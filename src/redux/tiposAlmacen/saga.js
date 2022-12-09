/* eslint-disable no-useless-catch */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { API } from '../../helpers/axios';

import { TIPOS_ALMACEN_GET_LIST, ALMACENES_ACTIVOS_GET_LIST } from '../actions';

import {
  getTiposAlmacenSuccess,
  getTiposAlmacenError,
  getAlmacenesActivosSuccess,
  getAlmacenesActivosError,
} from './actions';

const MAIN_URI = '/api/app/tiposalmacen';

const getTiposAlmacenRequest = async () => {
  try {
    return await API.get(MAIN_URI);
  } catch (error) {
    throw error;
  }
};

function* getTiposAlmacenItems() {
  try {
    const res = yield call(getTiposAlmacenRequest);
    yield put(getTiposAlmacenSuccess(res.data));
  } catch (error) {
    yield put(getTiposAlmacenError(error));
  }
}

const getAlmacenesActivosRequest = async (idTipoAlmacen) => {
  try {
    return await API.get(`${MAIN_URI}/${idTipoAlmacen}/activos`);
  } catch (error) {
    throw error;
  }
};

function* getAlmacenesActivosItems({ payload }) {
  try {
    const res = yield call(getAlmacenesActivosRequest, payload);
    yield put(getAlmacenesActivosSuccess(res.data));
  } catch (error) {
    yield put(getAlmacenesActivosError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(TIPOS_ALMACEN_GET_LIST, getTiposAlmacenItems);
}

export function* watchGetActivosList() {
  yield takeEvery(ALMACENES_ACTIVOS_GET_LIST, getAlmacenesActivosItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchGetActivosList)]);
}
