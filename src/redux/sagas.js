import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import productosSaga from './productos/saga';
import productoSaga from './producto/saga';
import proveedoresSaga from './proveedores/saga';
import proveedorSaga from './proveedor/saga';
import marcasSaga from './marcas/saga';
import marcaSaga from './marca/saga';
import categoriasSaga from './categorias/saga';
import categoriaSaga from './categoria/saga';
import ordenesSaga from './ordenes/saga';
import ordenSaga from './orden/saga';
import ordenesVentaSaga from './ordenesVenta/saga';
import ordenVentaSaga from './ordenVenta/saga';
import tiposAlmacenSaga from './tiposAlmacen/saga';
import clientesSaga from './clientes/saga';
import clienteSaga from './cliente/saga';
import usuarioSaga from './usuario/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    productosSaga(),
    productoSaga(),
    proveedoresSaga(),
    proveedorSaga(),
    marcasSaga(),
    marcaSaga(),
    categoriasSaga(),
    categoriaSaga(),
    ordenesSaga(),
    ordenSaga(),
    ordenesVentaSaga(),
    ordenVentaSaga(),
    tiposAlmacenSaga(),
    clientesSaga(),
    clienteSaga(),
    usuarioSaga(),
  ]);
}
