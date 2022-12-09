import {
  ORDENES_PRODUCTO_GET_LIST,
  ORDENES_PRODUCTO_GET_LIST_SUCCESS,
  ORDENES_PRODUCTO_GET_LIST_ERROR,
  ORDENES_ALMACEN_GET_LIST,
  ORDENES_ALMACEN_GET_LIST_SUCCESS,
  ORDENES_ALMACEN_GET_LIST_ERROR,
  ORDENES_PROVEEDOR_GET_LIST,
  ORDENES_PROVEEDOR_GET_LIST_SUCCESS,
  ORDENES_PROVEEDOR_GET_LIST_ERROR,
  ORDENES_MARCA_GET_LIST,
  ORDENES_MARCA_GET_LIST_SUCCESS,
  ORDENES_MARCA_GET_LIST_ERROR,
} from '../actions';

const INIT_STATE = {
  ordenes: null,
  ordenesProducto: null,
  ordenesAlmacen: null,
  ordenesProveedor: null,
  ordenesMarca: null,
  error: '',
  loading: false,
  loadingOP: false,
  loadingOA: false,
  loadingOPr: false,
  loadingOM: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ORDENES_PRODUCTO_GET_LIST:
      return { ...state, loadingOP: false };

    case ORDENES_PRODUCTO_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingOP: true,
        ordenesProducto: action.payload,
      };

    case ORDENES_PRODUCTO_GET_LIST_ERROR:
      return { ...state, loadingOP: true, error: action.payload };

    case ORDENES_ALMACEN_GET_LIST:
      return { ...state, loadingOA: false };

    case ORDENES_ALMACEN_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingOA: true,
        ordenesAlmacen: action.payload,
      };

    case ORDENES_ALMACEN_GET_LIST_ERROR:
      return { ...state, loadingOA: true, error: action.payload };

    case ORDENES_PROVEEDOR_GET_LIST:
      return { ...state, loadingOPr: false };

    case ORDENES_PROVEEDOR_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingOPr: true,
        ordenesProveedor: action.payload,
      };

    case ORDENES_PROVEEDOR_GET_LIST_ERROR:
      return { ...state, loadingOPr: true, error: action.payload };

    case ORDENES_MARCA_GET_LIST:
      return { ...state, loadingOM: false };

    case ORDENES_MARCA_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingOM: true,
        ordenesMarca: action.payload,
      };

    case ORDENES_MARCA_GET_LIST_ERROR:
      return { ...state, loadingOM: true, error: action.payload };

    default:
      return { ...state };
  }
};
