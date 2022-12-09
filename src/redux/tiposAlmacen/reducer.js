import {
  TIPOS_ALMACEN_GET_LIST,
  TIPOS_ALMACEN_GET_LIST_SUCCESS,
  TIPOS_ALMACEN_GET_LIST_ERROR,
  ALMACENES_ACTIVOS_GET_LIST,
  ALMACENES_ACTIVOS_GET_LIST_SUCCESS,
  ALMACENES_ACTIVOS_GET_LIST_ERROR,
} from '../actions';

const INIT_STATE = {
  tiposAlmacen: null,
  error: '',
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TIPOS_ALMACEN_GET_LIST:
      return { ...state, loading: false };

    case TIPOS_ALMACEN_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        tiposAlmacen: action.payload,
      };

    case TIPOS_ALMACEN_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case ALMACENES_ACTIVOS_GET_LIST:
      return { ...state, loadingAA: false };

    case ALMACENES_ACTIVOS_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingAA: true,
        almacenesActivos: action.payload,
      };

    case ALMACENES_ACTIVOS_GET_LIST_ERROR:
      return { ...state, loadingAA: true, errorAA: action.payload };

    default:
      return { ...state };
  }
};
