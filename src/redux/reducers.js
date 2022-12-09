import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import productosApp from './productos/reducer';
import productoApp from './producto/reducer';
import proveedoresApp from './proveedores/reducer';
import proveedorApp from './proveedor/reducer';
import marcasApp from './marcas/reducer';
import marcaApp from './marca/reducer';
import categoriasApp from './categorias/reducer';
import categoriaApp from './categoria/reducer';
import ordenesApp from './ordenes/reducer';
import ordenApp from './orden/reducer';
import ordenesVentaApp from './ordenesVenta/reducer';
import ordenVentaApp from './ordenVenta/reducer';
import tiposAlmacenApp from './tiposAlmacen/reducer';
import clientesApp from './clientes/reducer';
import clienteApp from './cliente/reducer';
import usuarioApp from './usuario/reducer';
import { LOGOUT_USER } from './actions';

const appReducer = combineReducers({
  menu,
  settings,
  authUser,
  productosApp,
  productoApp,
  proveedoresApp,
  proveedorApp,
  marcasApp,
  marcaApp,
  categoriasApp,
  categoriaApp,
  ordenesApp,
  ordenApp,
  ordenesVentaApp,
  ordenVentaApp,
  tiposAlmacenApp,
  clientesApp,
  clienteApp,
  usuarioApp,
});

const reducers = (stateIn, action) => {
  const state = action.type === LOGOUT_USER ? undefined : stateIn;

  return appReducer(state, action);
};

export default reducers;
